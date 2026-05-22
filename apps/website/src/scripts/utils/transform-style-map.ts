import {
	type CallExpression,
	type NoSubstitutionTemplateLiteral,
	Node,
	type SourceFile,
	type StringLiteral,
} from "ts-morph"
import { type StyleMap } from "./create-style-map"
import { TransformerStyle } from "./transform"

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

function isCnCall(call: CallExpression) {
	const expression = call.getExpression()
	return Node.isIdentifier(expression) && expression.getText() === "cn"
}

export const transformStyleMap: TransformerStyle<SourceFile> = async ({
	sourceFile,
	styleMap,
}) => {
	const matchedClasses = new Set<string>()

	const stringLiterals: (StringLiteral | NoSubstitutionTemplateLiteral)[] = []
	sourceFile.forEachDescendant((node) => {
		if (isStringLiteralLike(node)) {
			stringLiterals.push(node)
		}
	})

	for (const stringLiteral of stringLiterals) {
		applyStyleToCvaString(stringLiteral, styleMap, matchedClasses)
	}

	const cnCalls: CallExpression[] = []
	sourceFile.forEachDescendant((node) => {
		if (Node.isCallExpression(node) && isCnCall(node)) {
			cnCalls.push(node)
		}
	})

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

	// --- cn-* logic ---
	const cnClasses = extractCnClasses(stringValue)
	const classesToInline = cnClasses.filter((c) => !ALLOWLIST.has(c))
	const tailwindClassesToApply = classesToInline
		.map((c) => styleMap[c])
		.filter((c): c is string => Boolean(c))

	// Strip cn-* tokens from the string first
	let updated = removeCnClasses(stringValue)

	if (tailwindClassesToApply.length > 0) {
		// Append cn-expanded classes AFTER stripping cn-* tokens
		// Do NOT use twMerge here — it drops classes that look like conflicts
		const expanded = tailwindClassesToApply.join(" ")
		updated = `${updated} ${expanded}`.trim()
		cnClasses.forEach((c) => matchedClasses.add(c))
	}

	// --- r-* inline replacement ---
	// Only swaps the r-* token itself; all other classes untouched
	updated = updated.replace(/\br-[\w-]+\b/g, (token) => {
		const mapped = styleMap[token]
		if (!mapped) return token
		matchedClasses.add(token)
		return mapped
	})

	updated = updated.replace(/\s+/g, " ").trim()

	stringNode.setLiteralValue(updated)
}
function extractCnClasses(str: string) {
	const matches = str.matchAll(/\bcn-[\w-]+\b/g)
	return Array.from(matches, (match) => match[0])
}

function removeCnClasses(str: string) {
	return str
		.replace(/\bcn-[\w-]+\b/g, (match) => {
			if (ALLOWLIST.has(match)) return match
			return ""
		})
		.replace(/\s+/g, " ")
		.trim()
}

// function mergeClasses(newClasses: string, existing: string) {
// 	return twMerge(existing, newClasses)
// }

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
