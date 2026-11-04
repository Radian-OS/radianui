"use client"

import { type CSSProperties, type ReactNode, useMemo, useState } from "react"
import { useTheme } from "next-themes"
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react"
import { Button, ButtonGroup } from "@/registry/ui/button"
import { Card, CardContent } from "@/styles/default/ui/card"
import { Label } from "@/styles/default/ui/label"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/styles/default/ui/select"
import { Slider, SliderThumb } from "@/styles/default/ui/slider"
import { useThemerPreset } from "@/lib/themer-preset"
import { useThemerStore } from "@/lib/themer-store"
import { buildRegistryConfig } from "@/registry/config"
import {
	BUTTON_PADDING_PRESETS,
	BUTTON_RADIUS_PRESETS,
	BUTTON_SIZES,
	BUTTON_VARIANTS,
	type ButtonConfig,
	type ButtonSize,
	type ButtonVariant,
	type ButtonPaddingPreset,
	type ButtonRadiusPreset,
} from "@/registry/component-presets/button-presets"
import { Button as ControlButton, IconButton } from "@/styles/default/ui/button"
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/styles/default/ui/popover"
import { ScrollArea } from "@/styles/default/ui/scroll-area"
import { ComponentSettingsPopover } from "../components-settings-popover"

const PRESET_NAMES = Object.keys(
	BUTTON_PADDING_PRESETS
) as ButtonPaddingPreset[]

const DEFAULT_BUTTON_CONFIG: ButtonConfig = {
	padding: "md",
	radius: "md",
	size: "md",
	variant: "strong",
}

export function updateButton(updates?: Partial<ButtonConfig> | null) {
	const { params, setParams } = useThemerStore.getState()
	setParams({
		components: {
			...params.components,
			Button: updates
				? {
						...DEFAULT_BUTTON_CONFIG,
						...params.components.Button,
						...updates,
					}
				: undefined,
		},
	})
}

export const setButtonConfig = updateButton

function ButtonPreview({ variant }: { variant?: ButtonVariant }) {
	const [params] = useThemerPreset()
	const { resolvedTheme } = useTheme()
	const config = useMemo(() => buildRegistryConfig(params), [params])
	const style = {
		...config.cssVars.light,
		...(resolvedTheme === "dark" ? config.cssVars.dark : {}),
		...config.cssVars.theme,
	} as CSSProperties
	const buttonConfig = params.components.Button
	const effectiveVariant = variant ?? buttonConfig?.variant
	const size = buttonConfig?.size
	const effectiveSize = size ?? "md"
	const paddingPreset = buttonConfig?.padding ?? "md"
	const radiusPreset = buttonConfig?.radius ?? "md"

	const paddingX = BUTTON_PADDING_PRESETS[paddingPreset]?.[effectiveSize]
	const radius = BUTTON_RADIUS_PRESETS[radiusPreset]?.[effectiveSize]

	const buttonStyle: CSSProperties = {
		...(radius !== undefined ? { borderRadius: `${radius}px` } : {}),
		...(paddingX !== undefined
			? { paddingLeft: `${paddingX}px`, paddingRight: `${paddingX}px` }
			: {}),
	}

	return (
		<div
			style={style}
			className={`style-${params.style} border-soft bg-bg flex min-h-[104px] items-center justify-center gap-2 rounded-lg border p-4`}>
			<Button
				type="button"
				variant={effectiveVariant}
				size={size}
				style={buttonStyle}>
				Primary
			</Button>
			<Button
				type="button"
				color="neutral"
				variant="outline"
				size={size}
				style={buttonStyle}>
				Secondary
			</Button>
		</div>
	)
}

function VariantPicker() {
	const [params] = useThemerPreset()
	const [open, setOpen] = useState(false)
	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<ControlButton
					variant="ghost"
					color="neutral"
					size="xs"
					className="h-7 w-full justify-between px-1 text-xs"
					aria-label="Choose default button variant">
					<span>Default variant</span>
					<span className="flex items-center gap-1">
						{
							BUTTON_VARIANTS.find(
								(entry) =>
									entry.value ===
									(params.components.Button?.variant ?? "strong")
							)?.label
						}
						<ChevronRight className="text-fg-tertiary" />
					</span>
				</ControlButton>
			</PopoverTrigger>
			<PopoverContent
				side="right"
				align="start"
				sideOffset={16}
				collisionPadding={12}
				className="bg-bg w-[280px] rounded-xl p-0 shadow-lg"
				aria-label="Default variant">
				<div className="border-border flex h-9 items-center gap-1 border-b px-2">
					<IconButton
						size="xs"
						variant="ghost"
						color="neutral"
						aria-label="Back to button settings"
						onClick={() => setOpen(false)}>
						<ChevronLeft />
					</IconButton>
					<span className="text-xs">Default variant</span>
				</div>
				<ScrollArea className="h-[430px] max-h-[60dvh]">
					<div className="flex flex-col gap-2 p-2">
						{BUTTON_VARIANTS.map(({ value, label }) => (
							<Card
								key={value}
								className="bg-fill1 relative gap-1 rounded-xl border-0 p-1 shadow-none">
								<ControlButton
									variant="ghost"
									color="neutral"
									className="absolute inset-0 z-10 h-full w-full rounded-xl hover:bg-transparent"
									aria-label={`Use ${label} variant`}
									aria-pressed={
										(params.components.Button?.variant ?? "strong") === value
									}
									onClick={() => updateButton({ variant: value })}>
									{null}
								</ControlButton>
								<span className="flex items-center justify-between px-1 py-1 text-xs">
									{label}
									{(params.components.Button?.variant ?? "strong") ===
										value && <CheckCircle2 className="text-primary size-3.5" />}
								</span>
								<div className="pointer-events-none" inert>
									<ButtonPreview variant={value} />
								</div>
							</Card>
						))}
					</div>
				</ScrollArea>
			</PopoverContent>
		</Popover>
	)
}

function PresetSlider<T extends ButtonPaddingPreset | ButtonRadiusPreset>({
	label,
	value,
	onValueChange,
}: {
	label: string
	value: T | undefined
	onValueChange: (value: T) => void
}) {
	return (
		<div className="flex flex-col gap-1.5">
			<div className="flex items-center justify-between text-[13px] leading-4">
				<span className="text-fg-secondary">{label}</span>
				<span className="text-fg font-medium">{value ?? "md"}</span>
			</div>
			<Slider
				min={0}
				max={PRESET_NAMES.length - 1}
				step={1}
				value={[value ? PRESET_NAMES.indexOf(value as ButtonPaddingPreset) : 2]}
				onValueChange={([next]) => onValueChange(PRESET_NAMES[next] as T)}
				classNames={{ sliderTrack: "border-border bg-fill2 h-4 border" }}>
				<span
					aria-hidden="true"
					className="pointer-events-none absolute inset-x-2 top-1/2 flex -translate-y-1/2 justify-between">
					{PRESET_NAMES.map((preset) => (
						<span key={preset} className="bg-bg/60 h-1.5 w-px" />
					))}
				</span>
				<SliderThumb
					aria-label={`${label} preset`}
					aria-valuetext={value ?? "md"}
					className="border-bg bg-primary focus-visible:ring-primary focus-visible:ring-offset-bg z-10 size-4 border-[3px] shadow-sm focus-visible:ring-2 focus-visible:ring-offset-2"
				/>
			</Slider>
		</div>
	)
}

export function ButtonSettings({
	children,
	group = false,
}: {
	children: ReactNode
	group?: boolean
}) {
	const [params] = useThemerPreset()
	const buttonConfig = params.components.Button
	const size = buttonConfig?.size ?? "md"

	const reset = () => {
		updateButton()
	}
	const shuffle = () => {
		const pickPreset = () =>
			PRESET_NAMES[Math.floor(Math.random() * PRESET_NAMES.length)]
		updateButton({
			padding: pickPreset(),
			radius: pickPreset(),
			size: BUTTON_SIZES[Math.floor(Math.random() * BUTTON_SIZES.length)].value,
			variant:
				BUTTON_VARIANTS[Math.floor(Math.random() * BUTTON_VARIANTS.length)]
					.value,
		})
	}

	return (
		<ComponentSettingsPopover
			name={group ? "Button Group" : "Buttons"}
			onReset={reset}
			onShuffle={shuffle}
			content={
				<div className="flex flex-col gap-4 p-2.5">
					<Card className="bg-fill1 gap-1 rounded-xl border-0 p-1 shadow-none">
						<VariantPicker />
						<CardContent className="p-0">
							<ButtonPreview />
						</CardContent>
					</Card>

					<div className="flex flex-col gap-4">
						<PresetSlider
							label="Radius"
							value={buttonConfig?.radius}
							onValueChange={(radius) => updateButton({ radius })}
						/>
						<PresetSlider
							label="Padding"
							value={buttonConfig?.padding}
							onValueChange={(padding) => updateButton({ padding })}
						/>
						<div className="flex flex-col gap-1.5">
							<Label
								htmlFor="button-default-size"
								className="text-fg-secondary text-[13px] leading-4 font-normal">
								Default Size
							</Label>
							<Select
								value={size}
								onValueChange={(value) =>
									updateButton({ size: value as ButtonSize })
								}>
								<SelectTrigger
									id="button-default-size"
									size="sm"
									className="text-[13px]">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									{BUTTON_SIZES.map(({ value }) => (
										<SelectItem key={value} value={value}>
											{value}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>
				</div>
			}>
			{children}
		</ComponentSettingsPopover>
	)
}
