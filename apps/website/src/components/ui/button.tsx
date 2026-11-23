"use client"

import { cn } from "@/lib/utils"
import { useThemerStore } from "@/lib/themer-store"
import {
	BUTTON_PADDING_PRESETS,
	BUTTON_RADIUS_PRESETS,
	COMPACT_BUTTON_RADIUS_PRESETS,
} from "@/registry/component-presets/button-presets"
import {
	Button as RealButton,
	IconButton as RealIconButton,
	CompactButton as RealCompactButton,
	ButtonGroup,
	type ButtonProps,
	type IconButtonProps,
	type CompactButtonProps,
} from "@/registry/ui/button"

export { ButtonGroup }
export type { ButtonProps, IconButtonProps, CompactButtonProps }

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

export function Button({ size, variant, className, ...props }: ButtonProps) {
	const config = useThemerStore((s) => s.params.components?.Button)
	const effectiveSize = size ?? config?.size ?? "md"
	const radiusPreset = config?.radius
	const paddingPreset = config?.padding

	const radius = radiusPreset
		? BUTTON_RADIUS_PRESETS[radiusPreset][effectiveSize]
		: undefined
	const padding = paddingPreset
		? BUTTON_PADDING_PRESETS[paddingPreset][effectiveSize]
		: undefined

	return (
		<RealButton
			size={size ?? config?.size}
			variant={variant ?? config?.variant}
			className={cn(
				getRadiusClass(radius),
				getPaddingClass(padding),
				className
			)}
			{...props}
		/>
	)
}

export function IconButton({ size, className, ...props }: IconButtonProps) {
	const radiusPreset = useThemerStore((s) => s.params.components.Button?.radius)
	const radius = radiusPreset
		? BUTTON_RADIUS_PRESETS[radiusPreset][size ?? "md"]
		: undefined

	return (
		<RealIconButton
			{...props}
			size={size}
			className={cn(getRadiusClass(radius), className)}
		/>
	)
}

export function CompactButton({ className, ...props }: CompactButtonProps) {
	const radiusPreset = useThemerStore((s) => s.params.components.Button?.radius)
	const radius = radiusPreset
		? COMPACT_BUTTON_RADIUS_PRESETS[radiusPreset]
		: undefined

	return (
		<RealCompactButton
			{...props}
			className={cn(getRadiusClass(radius), className)}
		/>
	)
}
