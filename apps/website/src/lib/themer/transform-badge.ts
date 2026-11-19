import {
	BADGE_PADDING_PRESETS,
	BADGE_RADIUS_PRESETS,
	type BadgeConfig,
} from "@/registry/component-presets/badge-presets"
import { Project, ScriptKind } from "ts-morph"
import {
	getVariantCall,
	setSizeStyles,
	setVariantDefaults,
} from "./transform-variants"

export function transformBadgeCode(
	sourceCode: string,
	config?: Partial<BadgeConfig>
): string {
	if (!config) return sourceCode

	const source = new Project({ useInMemoryFileSystem: true }).createSourceFile(
		"badge.tsx",
		sourceCode,
		{ scriptKind: ScriptKind.TSX }
	)
	const badge = getVariantCall(source, "badgeVariants")
	const { size, variant, radius, padding } = config

	setVariantDefaults(badge, size, variant)
	setSizeStyles(
		badge,
		radius ? BADGE_RADIUS_PRESETS[radius] : undefined,
		padding ? BADGE_PADDING_PRESETS[padding] : undefined
	)

	return source.getText()
}
