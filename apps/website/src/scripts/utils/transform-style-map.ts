import { twMerge } from "tailwind-merge"
import {
	type CallExpression,
	type NoSubstitutionTemplateLiteral,
	Node,
	type SourceFile,
	type StringLiteral,
} from "ts-morph"
import { type StyleMap } from "./create-style-map"
import { TransformerStyle } from "./transform"

/**
 * Classes that should never be removed during transformation.
 * These are typically used as CSS selectors or for other purposes
 * that require the class name to remain in the code.
 */
// TODO: all cn-* classes to be allowedlisted.
const ALLOWLIST = new Set([
	"cn-menu-target",
	"cn-menu-translucent",
	"cn-logical-sides",
	"cn-rtl-flip",
	"cn-font-heading",
])

function isStringLiteralLike(
	node: Node
): node is StringLiteral | NoSubstitutionTemplateLiteral {
	return (
		Node.isStringLiteral(node) || Node.isNoSubstitutionTemplateLiteral(node)
	)
}

export const transformStyleMap: TransformerStyle<SourceFile> = async ({
	sourceFile,
	styleMap,
}) => {
	const matchedClasses = new Set<string>()

	// Find ALL string literals and no-substitution template literals in the file
	const stringLiterals: (StringLiteral | NoSubstitutionTemplateLiteral)[] = []
	sourceFile.forEachDescendant((node) => {
		if (isStringLiteralLike(node)) {
			stringLiterals.push(node)
		}
	})

	// Process all string literals in-place
	for (const stringLiteral of stringLiterals) {
		applyStyleToCvaString(stringLiteral, styleMap, matchedClasses)
	}

	// Clean up empty arguments in all cn() calls in the file
	const cnCalls: CallExpression[] = []
	sourceFile.forEachDescendant((node) => {
		if (Node.isCallExpression(node) && isCnCall(node)) {
			cnCalls.push(node)
		}
	})

	// Process bottom-up to avoid invalidating AST nodes
	cnCalls.reverse().forEach((call) => {
		if (!call.wasForgotten()) {
			removeEmptyArgumentsFromCnCall(call)
		}
	})

	return sourceFile
}

function applyStyleToCvaString(
	stringNode: StringLiteral | NoSubstitutionTemplateLiteral,
	styleMap: StyleMap,
	matchedClasses: Set<string>
) {
	const stringValue = stringNode.getLiteralText()
	const cnClasses = extractCnClasses(stringValue)

	if (cnClasses.length === 0) {
		return
	}

	// Skip allowlisted classes — they are handled at CLI install time.
	const classesToInline = cnClasses.filter((cnClass) => !ALLOWLIST.has(cnClass))

	const tailwindClassesToApply = classesToInline
		.map((cnClass) => styleMap[cnClass])
		.filter((classes): classes is string => Boolean(classes))

	if (tailwindClassesToApply.length > 0) {
		const mergedClasses = tailwindClassesToApply.join(" ")
		const updated = removeCnClasses(mergeClasses(mergedClasses, stringValue))
		stringNode.setLiteralValue(updated)
		cnClasses.forEach((cnClass) => matchedClasses.add(cnClass))
	} else {
		// No styles to apply, but still need to clean up non-allowlisted classes.
		const updated = removeCnClasses(stringValue)
		stringNode.setLiteralValue(updated)
	}
}

function extractCnClasses(str: string) {
	const matches = str.matchAll(/\bcn-[\w-]+\b/g)
	return Array.from(matches, (match) => match[0])
}

function removeCnClasses(str: string) {
	return str
		.replace(/\bcn-[\w-]+\b/g, (match) => {
			// Preserve allowlisted classes
			if (ALLOWLIST.has(match)) {
				return match
			}
			return ""
		})
		.replace(/\s+/g, " ")
		.trim()
}

function mergeClasses(newClasses: string, existing: string) {
	return twMerge(existing, newClasses)
}

function isCnCall(call: CallExpression) {
	const expression = call.getExpression()
	return Node.isIdentifier(expression) && expression.getText() === "cn"
}

function removeEmptyArgumentsFromCnCall(callExpression: CallExpression) {
	if (!isCnCall(callExpression)) {
		return
	}

	const args = callExpression.getArguments()
	const nonEmptyArgs = args.filter((arg) => {
		if (isStringLiteralLike(arg)) {
			const text = arg.getLiteralText().trim()
			return text !== ""
		}
		return true
	})

	if (nonEmptyArgs.length !== args.length) {
		const argTexts = nonEmptyArgs.map((arg) => arg.getText())
		const parent = callExpression.getParent()
		if (parent && Node.isJsxExpression(parent)) {
			parent.replaceWithText(`{cn(${argTexts.join(", ")})}`)
		} else {
			callExpression.replaceWithText(`cn(${argTexts.join(", ")})`)
		}
	}
}
