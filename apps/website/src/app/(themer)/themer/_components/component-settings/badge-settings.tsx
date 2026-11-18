"use client"

import { type CSSProperties, type ReactNode, useMemo, useState } from "react"
import { useTheme } from "next-themes"
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
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
import { buildRegistryConfig } from "@/registry/config"
import {
	BADGE_PADDING_PRESETS,
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

function BadgePreview({ variant }: { variant?: BadgeVariant }) {
	const [params] = useThemerPreset()
	const { resolvedTheme } = useTheme()
	const config = useMemo(() => buildRegistryConfig(params), [params])
	const style = {
		...config.cssVars.light,
		...(resolvedTheme === "dark" ? config.cssVars.dark : {}),
		...config.cssVars.theme,
	} as CSSProperties

	return (
		<div
			style={style}
			className={`style-${params.style} border-soft bg-bg flex min-h-[104px] items-center justify-center gap-2 rounded-lg border p-4`}>
			<Badge variant={variant}>Primary</Badge>
			<Badge color="neutral" variant="outline">
				Secondary
			</Badge>
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
						aria-label="Back to badge settings"
						onClick={() => setOpen(false)}>
						<ChevronLeft />
					</IconButton>
					<span className="text-xs">Default variant</span>
				</div>
				<ScrollArea className="h-[430px] max-h-[60dvh]">
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

export function BadgeSettings({ children }: { children: ReactNode }) {
	const [params] = useThemerPreset()
	const badgeConfig = params.components.Badge
	const size = badgeConfig?.size ?? "md"

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
							<BadgePreview />
						</CardContent>
					</Card>

					<div className="flex flex-col gap-4">
						<PresetSlider
							options={[undefined, ...PRESET_NAMES]}
							label="Radius"
							value={badgeConfig?.radius}
							onValueChange={(radius) => updateBadge({ radius })}
						/>
						<PresetSlider
							options={PRESET_NAMES}
							label="Padding"
							value={badgeConfig?.padding ?? "md"}
							onValueChange={(padding) =>
								updateBadge({ padding: padding ?? "md" })
							}
						/>
						<div className="flex flex-col gap-1.5">
							<Label
								htmlFor="badge-default-size"
								className="text-fg-secondary text-[13px] leading-4 font-normal">
								Default Size
							</Label>
							<Select
								value={size}
								onValueChange={(value) =>
									updateBadge({ size: value as BadgeSize })
								}>
								<SelectTrigger
									id="badge-default-size"
									size="sm"
									className="text-[13px]">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									{BADGE_SIZES.map(({ value }) => (
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
