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

	applyToCvaCalls(sourceFile, styleMap, matchedClasses)
	applyToClassNameAttributes(sourceFile, styleMap, matchedClasses)
	applyToMergePropsCalls(sourceFile, styleMap, matchedClasses)

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

function applyToCvaCalls(
	sourceFile: SourceFile,
	styleMap: StyleMap,
	matchedClasses: Set<string>
) {
	sourceFile.forEachDescendant((node) => {
		if (!Node.isCallExpression(node)) {
			return
		}

		const expression = node.getExpression()
		if (!Node.isIdentifier(expression) || expression.getText() !== "cva") {
			return
		}

		const baseArg = node.getArguments()[0]
		if (Node.isStringLiteral(baseArg)) {
			applyStyleToCvaString(baseArg, styleMap, matchedClasses)
		}

		const configArg = node.getArguments()[1]
		if (!configArg || !Node.isObjectLiteralExpression(configArg)) {
			return
		}

		const variantsProp = configArg
			.getProperties()
			.find(
				(prop) =>
					Node.isPropertyAssignment(prop) &&
					Node.isIdentifier(prop.getNameNode()) &&
					prop.getNameNode().getText() === "variants"
			)

		if (!variantsProp || !Node.isPropertyAssignment(variantsProp)) {
			return
		}

		const variantsObj = variantsProp.getInitializer()
		if (!variantsObj || !Node.isObjectLiteralExpression(variantsObj)) {
			return
		}

		variantsObj.getProperties().forEach((typeProp) => {
			if (!Node.isPropertyAssignment(typeProp)) {
				return
			}

			const typeObj = typeProp.getInitializer()
			if (!typeObj || !Node.isObjectLiteralExpression(typeObj)) {
				return
			}

			typeObj.getProperties().forEach((prop) => {
				if (!Node.isPropertyAssignment(prop)) {
					return
				}

				const propValue = prop.getInitializer()
				if (propValue && Node.isStringLiteral(propValue)) {
					applyStyleToCvaString(propValue, styleMap, matchedClasses)
				}
			})
		})

		const compoundVariantsProp = configArg
			.getProperties()
			.find(
				(prop) =>
					Node.isPropertyAssignment(prop) &&
					Node.isIdentifier(prop.getNameNode()) &&
					prop.getNameNode().getText() === "compoundVariants"
			)

		if (
			compoundVariantsProp &&
			Node.isPropertyAssignment(compoundVariantsProp)
		) {
			const compoundVariantsArray = compoundVariantsProp.getInitializer()
			if (
				compoundVariantsArray &&
				Node.isArrayLiteralExpression(compoundVariantsArray)
			) {
				compoundVariantsArray.getElements().forEach((element) => {
					if (Node.isObjectLiteralExpression(element)) {
						const classNameProp = element
							.getProperties()
							.find(
								(prop) =>
									Node.isPropertyAssignment(prop) &&
									Node.isIdentifier(prop.getNameNode()) &&
									prop.getNameNode().getText() === "className"
							)
						if (classNameProp && Node.isPropertyAssignment(classNameProp)) {
							const classNameValue = classNameProp.getInitializer()
							if (classNameValue && Node.isStringLiteral(classNameValue)) {
								applyStyleToCvaString(classNameValue, styleMap, matchedClasses)
							}
						}
					}
				})
			}
		}
	})
}

function applyToClassNameAttributes(
	sourceFile: SourceFile,
	styleMap: StyleMap,
	matchedClasses: Set<string>
) {
	sourceFile.forEachDescendant((node) => {
		if (
			!Node.isJsxAttribute(node) ||
			node.getNameNode().getText() !== "className"
		) {
			return
		}

		const initializer = node.getInitializer()
		if (!initializer) {
			return
		}

		const stringLiterals: (StringLiteral | NoSubstitutionTemplateLiteral)[] = []
		if (isStringLiteralLike(initializer)) {
			stringLiterals.push(initializer)
		} else {
			initializer.forEachDescendant((descendant) => {
				if (isStringLiteralLike(descendant)) {
					stringLiterals.push(descendant)
				}
			})
		}

		for (const stringLiteral of stringLiterals) {
			applyStyleToCvaString(stringLiteral, styleMap, matchedClasses)
		}

		if (!isStringLiteralLike(initializer)) {
			initializer.forEachDescendant((descendant) => {
				if (Node.isCallExpression(descendant) && isCnCall(descendant)) {
					removeEmptyArgumentsFromCnCall(descendant)
				}
			})
			if (Node.isCallExpression(initializer) && isCnCall(initializer)) {
				removeEmptyArgumentsFromCnCall(initializer)
			}
		}
	})
}

// function extractCnClassesFromAttribute(initializer: Node) {
// 	const classes: string[] = []

// 	if (isStringLiteralLike(initializer)) {
// 		return extractCnClasses(initializer.getLiteralText())
// 	}

// 	if (!Node.isJsxExpression(initializer)) {
// 		return classes
// 	}

// 	const expression = initializer.getExpression()
// 	if (!expression) {
// 		return classes
// 	}

// 	if (isStringLiteralLike(expression)) {
// 		return extractCnClasses(expression.getLiteralText())
// 	}

// 	if (Node.isCallExpression(expression) && isCnCall(expression)) {
// 		for (const argument of expression.getArguments()) {
// 			if (isStringLiteralLike(argument)) {
// 				classes.push(...extractCnClasses(argument.getLiteralText()))
// 			}
// 		}
// 	}

// 	return classes
// }

// function cleanCnClassesFromAttribute(initializer: Node) {
// 	if (isStringLiteralLike(initializer)) {
// 		const cleaned = removeCnClasses(initializer.getLiteralText())
// 		initializer.setLiteralValue(cleaned)
// 		return
// 	}

// 	if (!Node.isJsxExpression(initializer)) {
// 		return
// 	}

// 	const expression = initializer.getExpression()
// 	if (!expression) {
// 		return
// 	}

// 	if (isStringLiteralLike(expression)) {
// 		const cleaned = removeCnClasses(expression.getLiteralText())
// 		expression.setLiteralValue(cleaned)
// 		return
// 	}

// 	if (Node.isCallExpression(expression) && isCnCall(expression)) {
// 		for (const argument of expression.getArguments()) {
// 			if (isStringLiteralLike(argument)) {
// 				const cleaned = removeCnClasses(argument.getLiteralText())
// 				argument.setLiteralValue(cleaned)
// 			}
// 		}

// 		removeEmptyArgumentsFromCnCall(expression)
// 	}
// }

function extractCnClasses(str: string) {
	const matches = str.matchAll(/\bcn-[\w-]+\b/g)
	return Array.from(matches, (match) => match[0])
}

// function extractCnClass(str: string) {
// 	const classes = extractCnClasses(str)
// 	return classes[0] ?? null
// }

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

// function applyClassesToElement(element: Node, tailwindClasses: string) {
// 	if (
// 		!Node.isJsxOpeningElement(element) &&
// 		!Node.isJsxSelfClosingElement(element)
// 	) {
// 		return
// 	}

// 	const attribute = element
// 		.getAttributes()
// 		.find(
// 			(attr) =>
// 				Node.isJsxAttribute(attr) &&
// 				attr.getNameNode().getText() === "className"
// 		)

// 	if (!attribute || !Node.isJsxAttribute(attribute)) {
// 		element.addAttribute({
// 			name: "className",
// 			initializer: `{cn(${JSON.stringify(tailwindClasses)})}`,
// 		})
// 		return
// 	}

// 	const initializer = attribute.getInitializer()

// 	if (!initializer) {
// 		attribute.setInitializer(`{cn(${JSON.stringify(tailwindClasses)})}`)
// 		return
// 	}

// 	if (isStringLiteralLike(initializer)) {
// 		const existing = initializer.getLiteralText()
// 		const updated = removeCnClasses(mergeClasses(tailwindClasses, existing))
// 		initializer.setLiteralValue(updated)
// 		return
// 	}

// 	if (!Node.isJsxExpression(initializer)) {
// 		return
// 	}

// 	const expression = initializer.getExpression()

// 	if (!expression) {
// 		attribute.setInitializer(`{cn(${JSON.stringify(tailwindClasses)})}`)
// 		return
// 	}

// 	if (isStringLiteralLike(expression)) {
// 		const existing = expression.getLiteralText()
// 		const updated = removeCnClasses(mergeClasses(tailwindClasses, existing))
// 		expression.setLiteralValue(updated)
// 		return
// 	}

// 	if (Node.isCallExpression(expression) && isCnCall(expression)) {
// 		const firstArg = expression.getArguments()[0]
// 		if (isStringLiteralLike(firstArg)) {
// 			const existing = firstArg.getLiteralText()
// 			const updated = removeCnClasses(mergeClasses(tailwindClasses, existing))
// 			firstArg.setLiteralValue(updated)

// 			for (let i = 1; i < expression.getArguments().length; i++) {
// 				const arg = expression.getArguments()[i]
// 				if (isStringLiteralLike(arg)) {
// 					const argText = arg.getLiteralText()
// 					const cleaned = removeCnClasses(argText)
// 					if (cleaned !== argText) {
// 						arg.setLiteralValue(cleaned)
// 					}
// 				}
// 			}

// 			removeEmptyArgumentsFromCnCall(expression)
// 			return
// 		}

// 		const argumentTexts = expression
// 			.getArguments()
// 			.map((argument) => {
// 				if (isStringLiteralLike(argument)) {
// 					const cleaned = removeCnClasses(argument.getLiteralText())
// 					return cleaned ? JSON.stringify(cleaned) : null
// 				}
// 				return argument.getText()
// 			})
// 			.filter((arg): arg is string => arg !== null)

// 		const updatedArguments = [JSON.stringify(tailwindClasses), ...argumentTexts]

// 		attribute.setInitializer(`{cn(${updatedArguments.join(", ")})}`)
// 		return
// 	}

// 	attribute.setInitializer(
// 		`{cn(${JSON.stringify(tailwindClasses)}, ${expression.getText()})}`
// 	)
// }

function mergeClasses(newClasses: string, existing: string) {
	return twMerge(existing, newClasses)
}

function isCnCall(call: CallExpression) {
	const expression = call.getExpression()
	return Node.isIdentifier(expression) && expression.getText() === "cn"
}

function applyToMergePropsCalls(
	sourceFile: SourceFile,
	styleMap: StyleMap,
	matchedClasses: Set<string>
) {
	sourceFile.forEachDescendant((node) => {
		if (!Node.isCallExpression(node)) {
			return
		}

		const expression = node.getExpression()
		if (
			!Node.isIdentifier(expression) ||
			expression.getText() !== "mergeProps"
		) {
			return
		}

		for (const arg of node.getArguments()) {
			if (!Node.isObjectLiteralExpression(arg)) {
				continue
			}

			const classNameProp = arg
				.getProperties()
				.find(
					(prop) =>
						Node.isPropertyAssignment(prop) &&
						Node.isIdentifier(prop.getNameNode()) &&
						prop.getNameNode().getText() === "className"
				)

			if (!classNameProp || !Node.isPropertyAssignment(classNameProp)) {
				continue
			}

			const classNameInitializer = classNameProp.getInitializer()
			if (!classNameInitializer) {
				continue
			}

			const stringLiterals: (StringLiteral | NoSubstitutionTemplateLiteral)[] =
				[]
			if (isStringLiteralLike(classNameInitializer)) {
				stringLiterals.push(classNameInitializer)
			} else {
				classNameInitializer.forEachDescendant((descendant) => {
					if (isStringLiteralLike(descendant)) {
						stringLiterals.push(descendant)
					}
				})
			}

			for (const stringLiteral of stringLiterals) {
				applyStyleToCvaString(stringLiteral, styleMap, matchedClasses)
			}

			if (!isStringLiteralLike(classNameInitializer)) {
				classNameInitializer.forEachDescendant((descendant) => {
					if (Node.isCallExpression(descendant) && isCnCall(descendant)) {
						removeEmptyArgumentsFromCnCall(descendant)
					}
				})
				if (
					Node.isCallExpression(classNameInitializer) &&
					isCnCall(classNameInitializer)
				) {
					removeEmptyArgumentsFromCnCall(classNameInitializer)
				}
			}
		}
	})
}

// function extractCnClassesFromCnCall(cnCall: CallExpression): string[] {
// 	const classes: string[] = []

// 	for (const argument of cnCall.getArguments()) {
// 		if (isStringLiteralLike(argument)) {
// 			classes.push(...extractCnClasses(argument.getLiteralText()))
// 		}
// 	}

// 	return classes
// }

// function cleanCnClassesFromCnCall(cnCall: CallExpression) {
// 	for (const argument of cnCall.getArguments()) {
// 		if (isStringLiteralLike(argument)) {
// 			const cleaned = removeCnClasses(argument.getLiteralText())
// 			argument.setLiteralValue(cleaned)
// 		}
// 	}

// 	removeEmptyArgumentsFromCnCall(cnCall)
// }

// function applyClassesToCnCall(
// 	cnCall: CallExpression,
// 	tailwindClasses: string,
// 	matchedClasses: Set<string>,
// 	unmatchedClasses: string[]
// ) {
// 	const firstArg = cnCall.getArguments()[0]

// 	if (isStringLiteralLike(firstArg)) {
// 		const existing = firstArg.getLiteralText()
// 		const updated = removeCnClasses(mergeClasses(tailwindClasses, existing))
// 		firstArg.setLiteralValue(updated)

// 		// Mark classes as matched
// 		unmatchedClasses.forEach((cnClass) => matchedClasses.add(cnClass))

// 		// Clean up cn-* classes from remaining arguments
// 		for (let i = 1; i < cnCall.getArguments().length; i++) {
// 			const arg = cnCall.getArguments()[i]
// 			if (isStringLiteralLike(arg)) {
// 				const argText = arg.getLiteralText()
// 				const cleaned = removeCnClasses(argText)
// 				if (cleaned !== argText) {
// 					arg.setLiteralValue(cleaned)
// 				}
// 			}
// 		}

// 		removeEmptyArgumentsFromCnCall(cnCall)
// 		return
// 	}

// 	// If first arg is not a string literal, prepend tailwind classes
// 	const argumentTexts = cnCall
// 		.getArguments()
// 		.map((argument) => {
// 			if (isStringLiteralLike(argument)) {
// 				const cleaned = removeCnClasses(argument.getLiteralText())
// 				return cleaned ? JSON.stringify(cleaned) : null
// 			}
// 			return argument.getText()
// 		})
// 		.filter((arg): arg is string => arg !== null)

// 	const updatedArguments = [JSON.stringify(tailwindClasses), ...argumentTexts]

// 	// Mark classes as matched
// 	unmatchedClasses.forEach((cnClass) => matchedClasses.add(cnClass))

// 	const parent = cnCall.getParent()
// 	if (parent) {
// 		cnCall.replaceWithText(`cn(${updatedArguments.join(", ")})`)
// 	}
// }
