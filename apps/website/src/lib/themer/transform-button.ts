import {
	BUTTON_PADDING_PRESETS,
	BUTTON_RADIUS_PRESETS,
	COMPACT_BUTTON_RADIUS_PRESETS,
	ButtonConfig,
	ButtonSize,
	DEFAULT_BUTTON_CONFIG,
} from "@/registry/component-presets/button-presets"
import { Project, ScriptKind, SyntaxKind } from "ts-morph"

export function transformButtonCode(
	sourceCode: string,
	buttonConfig?: Partial<ButtonConfig>
): string {
	if (!buttonConfig) return sourceCode

	const project = new Project({ useInMemoryFileSystem: true })
	const sourceFile = project.createSourceFile("button.tsx", sourceCode, {
		scriptKind: ScriptKind.TSX,
		overwrite: true,
	})

	const targetVariant = buttonConfig.variant ?? DEFAULT_BUTTON_CONFIG.variant
	const targetSize = buttonConfig.size ?? DEFAULT_BUTTON_CONFIG.size
	const paddingPreset = buttonConfig.padding ?? DEFAULT_BUTTON_CONFIG.padding
	const radiusPreset = buttonConfig.radius ?? DEFAULT_BUTTON_CONFIG.radius

	// Update defaultVariants in cva: { variant: "...", size: "..." }
	sourceFile
		.getDescendantsOfKind(SyntaxKind.PropertyAssignment)
		.forEach((prop) => {
			if (prop.getName() === "defaultVariants") {
				const obj = prop.getInitializerIfKind(
					SyntaxKind.ObjectLiteralExpression
				)
				if (obj) {
					const varDecl = prop.getFirstAncestorByKind(
						SyntaxKind.VariableDeclaration
					)
					const varName = varDecl?.getName()

					const variantProp = obj
						.getProperty("variant")
						?.asKind(SyntaxKind.PropertyAssignment)
					if (
						variantProp &&
						(varName === "buttonVariants" ||
							varName === "compactButtonVariants")
					) {
						variantProp.setInitializer(`"${targetVariant}"`)
					}

					const sizeProp = obj
						.getProperty("size")
						?.asKind(SyntaxKind.PropertyAssignment)
					if (sizeProp) {
						if (
							varName === "buttonVariants" ||
							varName === "iconButtonSizeVariants"
						) {
							sizeProp.setInitializer(`"${targetSize}"`)
						} else if (
							varName === "compactButtonVariants" &&
							(targetSize === "sm" || targetSize === "md")
						) {
							sizeProp.setInitializer(`"${targetSize}"`)
						}
					}
				}
			}
		})

	// Update radius classes in buttonVariants.variants.size and iconButtonSizeVariants.variants.size
	sourceFile
		.getDescendantsOfKind(SyntaxKind.PropertyAssignment)
		.forEach((prop) => {
			const parent = prop.getParent()
			const grandParent = parent?.getParent()
			if (
				prop.getName() === "size" &&
				grandParent?.isKind(SyntaxKind.PropertyAssignment) &&
				grandParent.getName() === "variants"
			) {
				const sizeObj = prop.getInitializerIfKind(
					SyntaxKind.ObjectLiteralExpression
				)
				if (sizeObj) {
					sizeObj.getProperties().forEach((sizeProp) => {
						if (sizeProp.isKind(SyntaxKind.PropertyAssignment)) {
							const sizeKey = sizeProp
								.getName()
								.replace(/^["']|["']$/g, "") as ButtonSize
							const radiusPx = BUTTON_RADIUS_PRESETS[radiusPreset]?.[sizeKey]
							if (radiusPx !== undefined) {
								const strNode = sizeProp.getInitializerIfKind(
									SyntaxKind.StringLiteral
								)
								if (strNode) {
									const radiusClass =
										radiusPx >= 999
											? "rounded-full"
											: radiusPx === 0
												? "rounded-none"
												: `rounded-[${radiusPx}px]`
									// Replaces rounded-control-*, rounded-[...], rounded-md, etc.
									const updated = strNode
										.getLiteralValue()
										.replace(
											/\brounded-(?:control-\w+|\[[^\]]+\]|\w+)\b/,
											radiusClass
										)
									strNode.setLiteralValue(updated)
								}
							}
						}
					})
				}
			}
		})

	// Update compactButtonVariants base radius
	const compactRadiusPx = COMPACT_BUTTON_RADIUS_PRESETS[radiusPreset]
	if (compactRadiusPx !== undefined) {
		const compactRadiusClass =
			compactRadiusPx >= 999
				? "rounded-full"
				: compactRadiusPx === 0
					? "rounded-none"
					: `rounded-[${compactRadiusPx}px]`

		const compactVar = sourceFile.getVariableDeclaration(
			"compactButtonVariants"
		)
		const callExpr = compactVar?.getInitializerIfKind(SyntaxKind.CallExpression)
		const firstArg = callExpr
			?.getArguments()[0]
			?.asKind(SyntaxKind.StringLiteral)
		if (firstArg) {
			const updated = firstArg
				.getLiteralValue()
				.replace(
					/\brounded-(?:control-\w+|\[[^\]]+\]|\w+)\b/,
					compactRadiusClass
				)
			firstArg.setLiteralValue(updated)
		}
	}

	// Update horizontal padding in buttonVariants.compoundVariants
	sourceFile
		.getDescendantsOfKind(SyntaxKind.PropertyAssignment)
		.forEach((prop) => {
			if (prop.getName() === "compoundVariants") {
				const arrayLit = prop.getInitializerIfKind(
					SyntaxKind.ArrayLiteralExpression
				)
				if (arrayLit) {
					arrayLit.getElements().forEach((element) => {
						if (element.isKind(SyntaxKind.ObjectLiteralExpression)) {
							const sizeProp = element
								.getProperty("size")
								?.asKind(SyntaxKind.PropertyAssignment)
							const classProp = element
								.getProperty("className")
								?.asKind(SyntaxKind.PropertyAssignment)
							if (sizeProp && classProp) {
								const sizeVal = sizeProp
									.getInitializerIfKind(SyntaxKind.StringLiteral)
									?.getLiteralValue() as ButtonSize | undefined
								const classStrNode = classProp.getInitializerIfKind(
									SyntaxKind.StringLiteral
								)
								if (sizeVal && classStrNode) {
									const paddingPx =
										BUTTON_PADDING_PRESETS[paddingPreset]?.[sizeVal]
									if (paddingPx !== undefined) {
										// Replaces px-2, px-3, etc., with exact preset pixels
										const updated = classStrNode
											.getLiteralValue()
											.replace(/\bpx-(?:\d+|\[.*?\])/, `px-[${paddingPx}px]`)
										classStrNode.setLiteralValue(updated)
									}
								}
							}
						}
					})
				}
			}
		})

	return sourceFile.getText()
}
