"use client"

import { type CSSProperties, type ReactNode, useMemo, useState } from "react"
import { useTheme } from "next-themes"
import { X } from "lucide-react"
import { Button, CompactButton, type ButtonProps } from "@/registry/ui/button"
import { Card, CardContent, CardHeader } from "@/styles/default/ui/card"
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
import { buildRegistryConfig } from "@/registry/config"
import {
	BUTTON_PADDING_PRESETS,
	type ButtonPaddingPreset,
} from "@/registry/component-presets/button-presets"
import { ComponentSettingsPopover } from "./component-settings-popover"

type ButtonSize = NonNullable<ButtonProps["size"]>
type ButtonVariant = NonNullable<ButtonProps["variant"]>
const PRESET_NAMES = Object.keys(
	BUTTON_PADDING_PRESETS
) as ButtonPaddingPreset[]
const BUTTON_SIZES: { value: ButtonSize; height: number }[] = [
	{ value: "xs", height: 28 },
	{ value: "sm", height: 32 },
	{ value: "md", height: 36 },
	{ value: "lg", height: 40 },
	{ value: "xl", height: 44 },
	{ value: "2xl", height: 48 },
]
const BUTTON_VARIANTS: { value: ButtonVariant; label: string }[] = [
	{ value: "strong", label: "Strong" },
	{ value: "soft", label: "Soft" },
	{ value: "outline", label: "Outline" },
	{ value: "ghost", label: "Ghost" },
	{ value: "link", label: "Link" },
	{ value: "glossy", label: "Glossy" },
	{ value: "glossy-inverted", label: "Glossy inverted" },
	{ value: "smooth", label: "Smooth" },
	{ value: "smooth-inverted", label: "Smooth inverted" },
]

function PresetSlider({
	label,
	value,
	onValueChange,
}: {
	label: string
	value: ButtonPaddingPreset | undefined
	onValueChange: (value: ButtonPaddingPreset) => void
}) {
	return (
		<div className="flex flex-col gap-1.5">
			<div className="flex items-center justify-between text-[13px] leading-4">
				<span className="text-fg-secondary">{label}</span>
				<span className="text-fg font-medium">{value ?? "Theme"}</span>
			</div>
			<Slider
				min={0}
				max={PRESET_NAMES.length - 1}
				step={1}
				value={[value ? PRESET_NAMES.indexOf(value) : 2]}
				onValueChange={([next]) => onValueChange(PRESET_NAMES[next])}
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
					aria-valuetext={value ?? "Use theme defaults"}
					className="border-bg bg-primary focus-visible:ring-primary focus-visible:ring-offset-bg z-10 size-4 border-[3px] shadow-sm focus-visible:ring-2 focus-visible:ring-offset-2"
				/>
			</Slider>
		</div>
	)
}

export function ButtonSettings({ children }: { children: ReactNode }) {
	const [params, setParams] = useThemerPreset()
	const { resolvedTheme } = useTheme()
	// Variant and size only configure these samples; theme presets persist in the URL.
	const [size, setSize] = useState<ButtonSize>("md")
	const [variant, setVariant] = useState<ButtonVariant>("strong")
	const config = useMemo(() => buildRegistryConfig(params), [params])
	const previewStyle = {
		...config.cssVars.light,
		...(resolvedTheme === "dark" ? config.cssVars.dark : {}),
		...config.cssVars.theme,
	} as CSSProperties

	const reset = () => {
		setParams({
			buttonPaddingPreset: null,
			buttonRadiusPreset: null,
			compactButtonRadiusPreset: null,
		})
		setSize("md")
		setVariant("strong")
	}
	const shuffle = () => {
		const pickPreset = () =>
			PRESET_NAMES[Math.floor(Math.random() * PRESET_NAMES.length)]
		setParams({
			buttonPaddingPreset: pickPreset(),
			buttonRadiusPreset: pickPreset(),
			compactButtonRadiusPreset: pickPreset(),
		})
		setSize(BUTTON_SIZES[Math.floor(Math.random() * BUTTON_SIZES.length)].value)
		setVariant(
			BUTTON_VARIANTS[Math.floor(Math.random() * BUTTON_VARIANTS.length)].value
		)
	}

	return (
		<ComponentSettingsPopover
			name="Button"
			onReset={reset}
			onShuffle={shuffle}
			content={
				<div className="flex flex-col gap-4 p-2.5">
					<Card className="bg-fill1 gap-1 rounded-xl border-0 p-1 shadow-none">
						<CardHeader className="flex flex-row items-center justify-between gap-2 px-1 py-0">
							<Label
								htmlFor="button-default-variant"
								className="text-xs font-normal">
								Default variant
							</Label>
							<Select
								value={variant}
								onValueChange={(value) => setVariant(value as ButtonVariant)}>
								<SelectTrigger
									id="button-default-variant"
									size="xs"
									className="h-6 w-auto gap-1 border-0 bg-transparent px-0 text-xs shadow-none [&>svg]:-rotate-90">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									{BUTTON_VARIANTS.map(({ value, label }) => (
										<SelectItem key={value} value={value}>
											{label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</CardHeader>
						<CardContent
							className={`style-${params.style} border-soft bg-bg flex min-h-[104px] flex-wrap items-center justify-center gap-2 rounded-lg border p-4`}
							style={previewStyle}>
							<Button variant={variant} size={size} type="button">
								Primary
							</Button>
						</CardContent>
					</Card>

					<div className="flex flex-col gap-4">
						<PresetSlider
							label="Radius"
							value={params.buttonRadiusPreset}
							onValueChange={(buttonRadiusPreset) =>
								setParams({ buttonRadiusPreset })
							}
						/>
						<PresetSlider
							label="Padding"
							value={params.buttonPaddingPreset}
							onValueChange={(buttonPaddingPreset) =>
								setParams({ buttonPaddingPreset })
							}
						/>
						<div className="flex flex-col gap-1.5">
							<Label
								htmlFor="button-default-size"
								className="text-fg-secondary text-[13px] leading-4 font-normal">
								Default Size
							</Label>
							<Select
								value={size}
								onValueChange={(value) => setSize(value as ButtonSize)}>
								<SelectTrigger
									id="button-default-size"
									size="sm"
									className="text-[13px]">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									{BUTTON_SIZES.map(({ value, height }) => (
										<SelectItem key={value} value={value}>
											{height} px
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>

					<div className="border-border flex flex-col gap-3 border-t pt-3">
						<Card className="bg-fill1 gap-1 rounded-xl border-0 p-1 shadow-none">
							<CardHeader className="flex flex-row items-center px-1 py-1">
								<span className="text-fg text-xs">Compact buttons</span>
							</CardHeader>
							<CardContent
								className={`style-${params.style} border-soft bg-bg flex min-h-[104px] items-center justify-center gap-2 rounded-lg border p-4`}
								style={previewStyle}>
								<CompactButton
									size="sm"
									variant="outline"
									color="neutral"
									aria-label="Small compact button">
									<X />
								</CompactButton>
								<CompactButton
									size="md"
									variant="outline"
									color="neutral"
									aria-label="Medium compact button">
									<X />
								</CompactButton>
							</CardContent>
						</Card>
						<PresetSlider
							label="Compact radius"
							value={params.compactButtonRadiusPreset}
							onValueChange={(compactButtonRadiusPreset) =>
								setParams({ compactButtonRadiusPreset })
							}
						/>
					</div>
				</div>
			}>
			{children}
		</ComponentSettingsPopover>
	)
}
