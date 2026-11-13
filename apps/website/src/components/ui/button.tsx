"use client"

import { useThemerStore } from "@/lib/themer-store"
import {
	BUTTON_PADDING_PRESETS,
	BUTTON_RADIUS_PRESETS,
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
import { CSSProperties } from "react"

export { ButtonGroup }
export type { ButtonProps, IconButtonProps, CompactButtonProps }

export function Button({ size, variant, style, ...props }: ButtonProps) {
	const config = useThemerStore((s) => s.params.components?.Button)
	const effectiveSize = size ?? config?.size ?? "md"
	const effectiveRadius = config?.radius ?? "md"
	const effectivePadding = config?.padding ?? "md"

	const radius = BUTTON_RADIUS_PRESETS[effectiveRadius][effectiveSize]
	const paddingX = BUTTON_PADDING_PRESETS[effectivePadding][effectiveSize]

	const buttonStyle = {
		borderRadius: `${radius}px`,
		paddingInline: `${paddingX}px`,
		...style,
	} as CSSProperties

	return (
		<RealButton
			size={size ?? config?.size}
			variant={variant ?? config?.variant}
			style={buttonStyle}
			{...props}
		/>
	)
}

export function IconButton({ size, ...props }: IconButtonProps) {
	return <RealIconButton {...props} />
}

export function CompactButton({ variant, ...props }: CompactButtonProps) {
	return <RealCompactButton {...props} />
}
