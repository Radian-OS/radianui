"use client"

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

export function Button({ size, variant, style, ...props }: ButtonProps) {
	const config = useThemerStore((s) => s.params.components?.Button)
	const effectiveSize = size ?? config?.size ?? "md"
	const radiusPreset = config?.radius
	const paddingPreset = config?.padding

	const buttonStyle = {
		borderRadius: radiusPreset
			? `${BUTTON_RADIUS_PRESETS[radiusPreset][effectiveSize]}px`
			: undefined,
		paddingInline: paddingPreset
			? `${BUTTON_PADDING_PRESETS[paddingPreset][effectiveSize]}px`
			: undefined,
		...style,
	}

	return (
		<RealButton
			size={size ?? config?.size}
			variant={variant ?? config?.variant}
			style={buttonStyle}
			{...props}
		/>
	)
}

export function IconButton({ size, style, ...props }: IconButtonProps) {
	const radiusPreset = useThemerStore((s) => s.params.components.Button?.radius)

	return (
		<RealIconButton
			{...props}
			size={size}
			style={{
				borderRadius: radiusPreset
					? `${BUTTON_RADIUS_PRESETS[radiusPreset][size ?? "md"]}px`
					: undefined,
				...style,
			}}
		/>
	)
}

export function CompactButton({ style, ...props }: CompactButtonProps) {
	const radiusPreset = useThemerStore((s) => s.params.components.Button?.radius)

	return (
		<RealCompactButton
			{...props}
			style={{
				borderRadius: radiusPreset
					? `${COMPACT_BUTTON_RADIUS_PRESETS[radiusPreset]}px`
					: undefined,
				...style,
			}}
		/>
	)
}
