"use client"

import { useThemerStore } from "@/lib/themer-store"
import {
	BADGE_PADDING_PRESETS,
	BADGE_RADIUS_PRESETS,
} from "@/registry/component-presets/badge-presets"
import { Badge as RealBadge, type BadgeProps } from "@/registry/ui/badge"

export { BadgeDot, badgeVariants } from "@/registry/ui/badge"
export type { BadgeProps, BadgeDotProps } from "@/registry/ui/badge"

export function Badge({ size, variant, style, ...props }: BadgeProps) {
	const config = useThemerStore((state) => state.params.components.Badge)

	const effectiveSize = size ?? config?.size ?? "md"
	const radiusPreset = config?.radius
	const effectivePadding = config?.padding ?? "md"

	return (
		<RealBadge
			{...props}
			size={effectiveSize}
			variant={variant ?? config?.variant ?? "soft"}
			style={{
				borderRadius: radiusPreset
					? `${BADGE_RADIUS_PRESETS[radiusPreset][effectiveSize]}px`
					: undefined,
				paddingInline: `${BADGE_PADDING_PRESETS[effectivePadding][effectiveSize]}px`,
				...style,
			}}
		/>
	)
}
