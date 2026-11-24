"use client"

import { type ReactNode, useId, useState } from "react"
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Badge as RegistryBadge } from "@/registry/ui/badge"
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
	BADGE_PADDING_PRESETS,
	BADGE_RADIUS_PRESETS,
	BADGE_SIZES,
	BADGE_VARIANTS,
	type BadgeConfig,
	type BadgeSize,
	type BadgeVariant,
	type BadgePaddingPreset,
	DEFAULT_BADGE_CONFIG,
} from "@/registry/component-presets/badge-presets"
import { Button as ControlButton, IconButton } from "@/styles/default/ui/button"
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/styles/default/ui/popover"
import { ScrollArea } from "@/styles/default/ui/scroll-area"
import { ComponentSettingsPopover } from "../components-settings-popover"
import { ComponentPreview, type PreviewDimensions } from "./component-preview"
import { useThemerPickerPlacement } from "../themer-picker-placement"
import { cn } from "@/lib/utils"
import { MobileComponentSettings } from "./mobile-component-settings"
import { PresetSlider } from "./preset-slider"

const PRESET_NAMES = Object.keys(BADGE_PADDING_PRESETS) as BadgePaddingPreset[]

export function updateBadge(updates?: Partial<BadgeConfig> | null) {
	const { params, setParams } = useThemerStore.getState()
	setParams({
		components: {
			...params.components,
			Badge: updates
				? {
						...DEFAULT_BADGE_CONFIG,
						...params.components.Badge,
						...updates,
					}
				: undefined,
		},
	})
}

export const setBadgeConfig = updateBadge

function BadgePreview({
	variant,
	componentConfig,
	onMeasure,
}: {
	variant?: BadgeVariant
	componentConfig?: BadgeConfig
	onMeasure?: (dimensions: PreviewDimensions) => void
}) {
	return (
		<ComponentPreview
			onMeasure={onMeasure}
			defaultSample={
				onMeasure && (
					<RegistryBadge
						size={componentConfig?.size}
						variant={componentConfig?.variant}
						className="transition-none">
						Primary
					</RegistryBadge>
				)
			}>
			<Badge variant={variant}>Primary</Badge>
			<Badge color="neutral" variant="outline">
				Secondary
			</Badge>
		</ComponentPreview>
	)
}

function VariantPicker() {
	const placement = useThemerPickerPlacement("start", 16)
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
					aria-label="Choose default badge variant">
					<span>Default variant</span>
					<span className="flex items-center gap-1">
						{
							BADGE_VARIANTS.find(
								(entry) =>
									entry.value === (params.components.Badge?.variant ?? "soft")
							)?.label
						}
						<ChevronRight className="text-fg-tertiary" />
					</span>
				</ControlButton>
			</PopoverTrigger>
			<PopoverContent
				{...placement}
				collisionPadding={12}
				className="bg-bg w-70 max-w-[calc(100vw-1.5rem)] rounded-xl p-0 shadow-lg"
				aria-label="Default variant">
				<div className="border-border flex h-9 items-center gap-1 border-b px-2">
					<IconButton
						size="xs"
						variant="ghost"
						color="neutral"
						aria-label="Back to badge settings"
						onClick={() => setOpen(false)}>
						<ChevronLeft />
					</IconButton>
					<span className="text-xs">Default variant</span>
				</div>
				<ScrollArea
					type="auto"
					className="h-[min(430px,60dvh,max(7rem,calc(var(--radix-popover-content-available-height)-2.25rem)))]">
					<div className="flex flex-col gap-2 p-2">
						{BADGE_VARIANTS.map(({ value, label }) => (
							<Card
								key={value}
								className="bg-fill1 relative gap-1 rounded-xl border-0 p-1 shadow-none">
								<ControlButton
									variant="ghost"
									color="neutral"
									className="absolute inset-0 z-10 h-full w-full rounded-xl hover:bg-transparent"
									aria-label={`Use ${label} variant`}
									aria-pressed={
										(params.components.Badge?.variant ?? "soft") === value
									}
									onClick={() => updateBadge({ variant: value })}>
									{null}
								</ControlButton>
								<span className="flex items-center justify-between px-1 py-1 text-xs">
									{label}
									{(params.components.Badge?.variant ?? "soft") === value && (
										<CheckCircle2 className="text-primary size-3.5" />
									)}
								</span>
								<div className="pointer-events-none" inert>
									<BadgePreview variant={value} />
								</div>
							</Card>
						))}
					</div>
				</ScrollArea>
			</PopoverContent>
		</Popover>
	)
}

const BADGE_SIZE_PIXELS: Record<BadgeSize, number> = { sm: 20, md: 24, lg: 28 }

export function BadgeSettings({
	children,
	mobile = false,
}: {
	children: ReactNode
	mobile?: boolean
}) {
	const [params] = useThemerPreset()
	const badgeConfig = params.components.Badge
	const size = badgeConfig?.size ?? DEFAULT_BADGE_CONFIG.size
	const [dimensions, setDimensions] = useState<PreviewDimensions>()
	const sizeId = useId()

	const reset = () => {
		updateBadge()
	}
	const shuffle = () => {
		const pickPreset = () =>
			PRESET_NAMES[Math.floor(Math.random() * PRESET_NAMES.length)]
		updateBadge({
			padding: pickPreset(),
			radius: pickPreset(),
			size: BADGE_SIZES[Math.floor(Math.random() * BADGE_SIZES.length)].value,
			variant:
				BADGE_VARIANTS[Math.floor(Math.random() * BADGE_VARIANTS.length)].value,
		})
	}

	const controls = (
		<div className={cn("flex flex-col", mobile ? "gap-1.5" : "gap-4")}>
			<PresetSlider
				className={mobile ? "px-1 py-1.5" : undefined}
				options={PRESET_NAMES}
				label="Radius"
				value={badgeConfig?.radius}
				defaultLabel={
					params.style === "default" ? "Themer default" : "Component default"
				}
				defaultValue={dimensions?.radius}
				presetValue={(preset) => BADGE_RADIUS_PRESETS[preset][size]}
				onValueChange={(radius) => updateBadge({ radius })}
			/>
			<PresetSlider
				className={mobile ? "px-1 py-1.5" : undefined}
				options={PRESET_NAMES}
				label="Padding"
				value={badgeConfig?.padding}
				defaultLabel="Component default"
				defaultValue={dimensions?.padding}
				presetValue={(preset) => BADGE_PADDING_PRESETS[preset][size]}
				onValueChange={(padding) => updateBadge({ padding })}
			/>
			<div className={cn("flex flex-col gap-1.5", mobile && "px-1 py-1.5")}>
				<Label
					htmlFor={sizeId}
					className="text-fg-secondary text-[13px] leading-4 font-normal">
					Default Size
				</Label>
				<Select
					value={size}
					onValueChange={(value) => updateBadge({ size: value as BadgeSize })}>
					<SelectTrigger
						id={sizeId}
						size={mobile ? "md" : "sm"}
						className="text-[13px]">
						<SelectValue>
							{mobile ? `${BADGE_SIZE_PIXELS[size]} px` : undefined}
						</SelectValue>
					</SelectTrigger>
					<SelectContent>
						{BADGE_SIZES.map(({ value }) => (
							<SelectItem key={value} value={value}>
								{mobile ? `${BADGE_SIZE_PIXELS[value]} px` : value}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		</div>
	)

	if (mobile) {
		return (
			<MobileComponentSettings
				name="Badges"
				variant={badgeConfig?.variant ?? DEFAULT_BADGE_CONFIG.variant}
				variants={BADGE_VARIANTS}
				onSelectVariant={(variant) => updateBadge({ variant })}
				renderVariant={(variant) => <BadgePreview variant={variant} />}
				preview={
					<BadgePreview
						componentConfig={badgeConfig}
						onMeasure={setDimensions}
					/>
				}
				controls={controls}
				onReset={reset}
				onShuffle={shuffle}>
				{children}
			</MobileComponentSettings>
		)
	}

	return (
		<ComponentSettingsPopover
			name="Badges"
			onReset={reset}
			onShuffle={shuffle}
			content={
				<div className="flex flex-col gap-4 p-2.5">
					<Card className="bg-fill1 gap-1 rounded-xl border-0 p-1 shadow-none">
						<VariantPicker />
						<CardContent className="p-0">
							<BadgePreview
								componentConfig={badgeConfig}
								onMeasure={setDimensions}
							/>
						</CardContent>
					</Card>

					{controls}
				</div>
			}>
			{children}
		</ComponentSettingsPopover>
	)
}
