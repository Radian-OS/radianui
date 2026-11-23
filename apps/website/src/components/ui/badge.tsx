"use client"

import { cn } from "@/lib/utils"
import { useThemerStore } from "@/lib/themer-store"
import {
	BADGE_PADDING_PRESETS,
	BADGE_RADIUS_PRESETS,
} from "@/registry/component-presets/badge-presets"
import { Badge as RealBadge, type BadgeProps } from "@/registry/ui/badge"

export { BadgeDot, badgeVariants } from "@/registry/ui/badge"
export type { BadgeProps, BadgeDotProps } from "@/registry/ui/badge"

const getRadiusClass = (radius?: number) => {
	if (radius === undefined) return undefined
	if (radius >= 999) return "rounded-full"
	if (radius === 0) return "rounded-none"
	return `rounded-[${radius}px]`
}

const getPaddingClass = (padding?: number) => {
	if (padding === undefined) return undefined
	return `px-[${padding}px]`
}

export function Badge({ size, variant, className, ...props }: BadgeProps) {
	const config = useThemerStore((state) => state.params.components.Badge)

	const effectiveSize = size ?? config?.size ?? "md"
	const radiusPreset = config?.radius
	const paddingPreset = config?.padding

	const radius = radiusPreset
		? BADGE_RADIUS_PRESETS[radiusPreset][effectiveSize]
		: undefined
	const padding = paddingPreset
		? BADGE_PADDING_PRESETS[paddingPreset][effectiveSize]
		: undefined

	return (
		<RealBadge
			{...props}
			size={effectiveSize}
			variant={variant ?? config?.variant ?? "soft"}
			className={cn(
				getRadiusClass(radius),
				getPaddingClass(padding),
				className
			)}
		/>
	)
}
