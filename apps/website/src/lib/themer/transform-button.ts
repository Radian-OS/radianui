import {
	BUTTON_PADDING_PRESETS,
	BUTTON_RADIUS_PRESETS,
	COMPACT_BUTTON_RADIUS_PRESETS,
	type ButtonConfig,
} from "@/registry/component-presets/button-presets"
import { Project, ScriptKind, SyntaxKind } from "ts-morph"
import {
	getVariantCall,
	setRadiusClass,
	setSizeStyles,
	setVariantDefaults,
} from "./transform-variants"

export function transformButtonCode(
	sourceCode: string,
	config?: Partial<ButtonConfig>
): string {
	if (!config) return sourceCode

	const source = new Project({ useInMemoryFileSystem: true }).createSourceFile(
		"button.tsx",
		sourceCode,
		{ scriptKind: ScriptKind.TSX }
	)
	const button = getVariantCall(source, "buttonVariants")
	const icon = getVariantCall(source, "iconButtonSizeVariants")
	const compact = getVariantCall(source, "compactButtonVariants")
	const { size, variant, radius, padding } = config

	setVariantDefaults(button, size, variant)
	setVariantDefaults(icon, size)
	setVariantDefaults(
		compact,
		size === "sm" || size === "md" ? size : undefined,
		variant
	)

	const radii = radius ? BUTTON_RADIUS_PRESETS[radius] : undefined
	setSizeStyles(
		button,
		radii,
		padding ? BUTTON_PADDING_PRESETS[padding] : undefined
	)
	setSizeStyles(icon, radii)

	const compactClasses = compact
		?.getArguments()[0]
		?.asKind(SyntaxKind.StringLiteral)
	if (radius && compactClasses) {
		compactClasses.setLiteralValue(
			setRadiusClass(
				compactClasses.getLiteralValue(),
				COMPACT_BUTTON_RADIUS_PRESETS[radius]
			)
		)
	}

	return source.getText()
}
