"use client"

import { type ReactNode, useState } from "react"
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Button as RegistryButton } from "@/registry/ui/button"
import { Card, CardContent } from "@/styles/default/ui/card"
import { Label } from "@/styles/default/ui/label"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/styles/default/ui/select"
import { useThemerPreset } from "@/lib/themer-preset"
import { useThemerStore } from "@/lib/themer-store"
import {
	BUTTON_PADDING_PRESETS,
	BUTTON_RADIUS_PRESETS,
	BUTTON_SIZES,
	BUTTON_VARIANTS,
	type ButtonConfig,
	type ButtonSize,
	type ButtonVariant,
	type ButtonPaddingPreset,
	DEFAULT_BUTTON_CONFIG,
} from "@/registry/component-presets/button-presets"
import { Button as ControlButton, IconButton } from "@/styles/default/ui/button"
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/styles/default/ui/popover"
import { ScrollArea } from "@/styles/default/ui/scroll-area"
import { ComponentSettingsPopover } from "../components-settings-popover"
import { ComponentPreview, type PreviewDimensions } from "./component-preview"
import { PresetSlider } from "./preset-slider"

const PRESET_NAMES = Object.keys(
	BUTTON_PADDING_PRESETS
) as ButtonPaddingPreset[]

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

function ButtonPreview({
	variant,
	componentConfig,
	onMeasure,
}: {
	variant?: ButtonVariant
	componentConfig?: ButtonConfig
	onMeasure?: (dimensions: PreviewDimensions) => void
}) {
	return (
		<ComponentPreview
			onMeasure={onMeasure}
			defaultSample={
				onMeasure && (
					<RegistryButton
						size={componentConfig?.size}
						variant={componentConfig?.variant}
						className="transition-none">
						Primary
					</RegistryButton>
				)
			}>
			<Button variant={variant}>Primary</Button>
			<Button color="neutral" variant="outline">
				Secondary
			</Button>
		</ComponentPreview>
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

export function ButtonSettings({
	children,
	group = false,
}: {
	children: ReactNode
	group?: boolean
}) {
	const [params] = useThemerPreset()
	const buttonConfig = params.components.Button
	const size = buttonConfig?.size ?? DEFAULT_BUTTON_CONFIG.size
	const [dimensions, setDimensions] = useState<PreviewDimensions>()
	const [slidersActivated, setSlidersActivated] = useState(false)

	const reset = () => {
		setSlidersActivated(true)
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
							<ButtonPreview
								componentConfig={buttonConfig}
								onMeasure={setDimensions}
							/>
						</CardContent>
					</Card>

					<div className="flex flex-col gap-4">
						<PresetSlider
							showActive={slidersActivated}
							options={PRESET_NAMES}
							label="Radius"
							value={buttonConfig?.radius}
							defaultLabel={
								params.style === "default"
									? "Themer default"
									: "Component default"
							}
							defaultValue={dimensions?.radius}
							presetValue={(preset) => BUTTON_RADIUS_PRESETS[preset][size]}
							onValueChange={(radius) => updateButton({ radius })}
						/>
						<PresetSlider
							showActive={slidersActivated}
							options={PRESET_NAMES}
							label="Padding"
							value={buttonConfig?.padding}
							defaultLabel="Component default"
							defaultValue={dimensions?.padding}
							presetValue={(preset) => BUTTON_PADDING_PRESETS[preset][size]}
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
