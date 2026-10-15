"use client"

import * as React from "react"
import { Check, Info, Shuffle } from "lucide-react"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/styles/default/ui/popover"
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/styles/default/ui/tooltip"
import { Button } from "@/styles/default/ui/button"
import { Badge } from "@/styles/default/ui/badge"
import { BaseColorValue } from "@/registry/base-colors"
import { PRIMARY_COLORS } from "@/registry/primary-colors"
import { converter, formatHex, parse } from "culori"

const toOklch = converter("oklch")

export function getAutoBaseColor(
	primaryColorValue?: string
): "warm-gray" | "neutral-gray" | "default" {
	if (!primaryColorValue) return "default"

	let oklchColor: { h?: number; c?: number } | undefined

	if (primaryColorValue.startsWith("#")) {
		const parsed = parse(primaryColorValue)
		if (parsed) oklchColor = toOklch(parsed)
	} else {
		const preset = PRIMARY_COLORS.find((c) => c.value === primaryColorValue)
		if (preset) {
			const parsed = parse(preset.cssVars.light["--color-primary"])
			if (parsed) oklchColor = toOklch(parsed)
		}
	}

	if (!oklchColor) return "default"

	const chroma = oklchColor.c ?? 0
	const hue = oklchColor.h ?? 0

	// anything low chroma -> neutral gray
	if (chroma < 0.04) {
		return "neutral-gray"
	}

	const h = ((hue % 360) + 360) % 360

	// hue (0-60) -> warm gray
	if (h >= 0 && h <= 60) {
		return "warm-gray"
	}
	// hue (61-150) -> neutral gray
	if (h > 60 && h <= 150) {
		return "neutral-gray"
	}
	// hue (151-320) -> cool gray
	if (h > 150 && h <= 320) {
		return "default"
	}
	// hue (321-360) -> warm gray
	return "warm-gray"
}

function resolvePrimaryHex(primaryColorValue?: string): string {
	if (!primaryColorValue) return "#623DF5"
	if (primaryColorValue.startsWith("#")) return primaryColorValue
	const preset = PRIMARY_COLORS.find((c) => c.value === primaryColorValue)
	if (preset) {
		return (
			formatHex(parse(preset.cssVars.light["--color-primary"])) || "#623DF5"
		)
	}
	return "#623DF5"
}

const SWATCH_MAP = {
	"warm-gray": ["#d6d3d1", "#a8a29e", "#78716c", "#44403c", "#1c1917"],
	"neutral-gray": ["#d4d4d8", "#a1a1aa", "#71717a", "#3f3f46", "#18181b"],
	default: ["#cbd5e1", "#94a3b8", "#64748b", "#334155", "#0f172a"],
} as const

interface BaseColorPickerProps {
	baseColor?: BaseColorValue
	primaryColor?: string
	onBaseColorChange: (value: BaseColorValue) => void
}

type BaseMode = "auto" | "cool" | "neutral" | "warm"

export default function BaseColorPicker({
	baseColor = "default",
	primaryColor,
	onBaseColorChange,
}: BaseColorPickerProps) {
	const [open, setOpen] = React.useState(false)

	// Determine initial mode based on whether baseColor matches auto-derived base color
	const autoColor = React.useMemo(
		() => getAutoBaseColor(primaryColor),
		[primaryColor]
	)

	const [mode, setMode] = React.useState<BaseMode>(() => {
		if (baseColor === autoColor) return "auto"
		if (baseColor === "warm-gray") return "warm"
		if (baseColor === "neutral-gray") return "neutral"
		return "cool"
	})

	const onBaseColorChangeRef = React.useRef(onBaseColorChange)
	onBaseColorChangeRef.current = onBaseColorChange

	// When primaryColor changes and in auto mode, update base color
	React.useEffect(() => {
		if (mode === "auto") {
			const nextAuto = getAutoBaseColor(primaryColor)
			if (nextAuto !== baseColor) {
				onBaseColorChangeRef.current(nextAuto)
			}
		}
	}, [primaryColor, mode, baseColor])

	const handleSelect = (selectedMode: BaseMode) => {
		setMode(selectedMode)
		if (selectedMode === "auto") {
			onBaseColorChange(getAutoBaseColor(primaryColor))
		} else if (selectedMode === "cool") {
			onBaseColorChange("default")
		} else if (selectedMode === "neutral") {
			onBaseColorChange("neutral-gray")
		} else if (selectedMode === "warm") {
			onBaseColorChange("warm-gray")
		}
	}

	const handleShuffle = () => {
		const modes: BaseMode[] = ["auto", "cool", "neutral", "warm"]
		const currentIdx = modes.indexOf(mode)
		const nextMode = modes[(currentIdx + 1) % modes.length]
		handleSelect(nextMode)
	}

	const displayName =
		baseColor === "warm-gray"
			? "Warm Grey"
			: baseColor === "neutral-gray"
				? "Neutral Grey"
				: "Cool Grey"

	const currentSwatches = SWATCH_MAP[baseColor] || SWATCH_MAP.default

	const primaryHex = resolvePrimaryHex(primaryColor)

	// Tinted dots for Auto matching primary hue
	const autoDots: [string, string, string] = [
		`color-mix(in srgb, ${primaryHex} 18%, #334155)`,
		`color-mix(in srgb, ${primaryHex} 18%, #64748b)`,
		`color-mix(in srgb, ${primaryHex} 18%, #94a3b8)`,
	]

	const options = [
		{
			id: "auto" as const,
			label: "Auto",
			dots: autoDots,
			badge: "Recommended",
			isSelected: mode === "auto",
			onSelect: () => handleSelect("auto"),
		},
		{
			id: "cool" as const,
			label: "Cool",
			dots: ["#334155", "#64748b", "#94a3b8"] as [string, string, string],
			isSelected: mode === "cool",
			onSelect: () => handleSelect("cool"),
		},
		{
			id: "neutral" as const,
			label: "Neutral",
			dots: ["#27272a", "#52525b", "#a1a1aa"] as [string, string, string],
			isSelected: mode === "neutral",
			onSelect: () => handleSelect("neutral"),
		},
		{
			id: "warm" as const,
			label: "Warm",
			dots: ["#292524", "#57534e", "#a8a29e"] as [string, string, string],
			isSelected: mode === "warm",
			onSelect: () => handleSelect("warm"),
		},
	]

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<button
					type="button"
					className="bg-fill2 hover:bg-fill3/60 focus-visible:ring-primary flex w-full cursor-pointer flex-col gap-3 rounded-lg p-2.5 text-left transition-colors outline-none select-none focus-visible:ring-2">
					<div className="flex w-full justify-between text-xs">
						<span className="text-fg font-medium">{displayName}</span>
						<div className="flex items-center gap-1.5">
							<span className="text-fg-tertiary font-normal">
								{mode === "auto" ? "Tinted by primary" : "Manual preset"}
							</span>
							<Tooltip>
								<TooltipTrigger asChild>
									<span
										onClick={(e) => e.stopPropagation()}
										className="text-fg-tertiary hover:text-fg cursor-help p-0.5 transition-colors">
										<Info className="size-3.5" />
									</span>
								</TooltipTrigger>
								<TooltipContent withArrow>
									Change neutral base color
								</TooltipContent>
							</Tooltip>
						</div>
					</div>
					<div className="flex h-4 w-full gap-0.5 overflow-hidden rounded-sm">
						{currentSwatches.map((color, idx) => (
							<div
								key={idx}
								className="flex-1 transition-colors duration-200"
								style={{ backgroundColor: color }}
							/>
						))}
					</div>
				</button>
			</PopoverTrigger>

			<PopoverContent
				side="right"
				align="start"
				sideOffset={16}
				collisionPadding={16}
				onOpenAutoFocus={(e) => e.preventDefault()}
				className="w-[280px] rounded-lg px-2.5 py-1.5 shadow-sm select-none">
				{/* Header */}
				<div className="flex items-center justify-between px-1 py-1.5">
					<span className="text-fg-secondary text-[13px] font-medium">
						Preset
					</span>
					<div className="flex items-center gap-1">
						<Tooltip>
							<TooltipTrigger asChild>
								<button
									type="button"
									className="text-fg-tertiary hover:text-fg rounded-md p-1 transition-colors"
									aria-label="Preset information">
									<Info className="size-4" />
								</button>
							</TooltipTrigger>
							<TooltipContent withArrow>
								Neutral base colors define the surface, border, and text scale
							</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger asChild>
								<button
									type="button"
									onClick={handleShuffle}
									className="text-fg-tertiary hover:text-fg rounded-md p-1 transition-colors"
									aria-label="Cycle preset">
									<Shuffle className="size-4" />
								</button>
							</TooltipTrigger>
							<TooltipContent withArrow>Cycle preset</TooltipContent>
						</Tooltip>
					</div>
				</div>

				{/* Preset list */}
				<div className="flex flex-col gap-0.5">
					{options.map((opt) => (
						<button
							key={opt.id}
							type="button"
							onClick={opt.onSelect}
							className="hover:bg-fill2 flex w-full items-center justify-between rounded-lg px-2 py-2 text-left transition-colors">
							<div className="flex items-center gap-2.5">
								<div className="flex shrink-0 items-center -space-x-1.5">
									{opt.dots.map((c, i) => (
										<div
											key={i}
											className="size-3.5 rounded-full shadow-2xs"
											style={{ backgroundColor: c }}
										/>
									))}
								</div>
								<span className="text-fg text-xs font-medium">{opt.label}</span>
							</div>
							<div className="flex items-center gap-2">
								{opt.badge && (
									<Badge
										size="sm"
										color="neutral"
										variant="soft"
										className="h-4.5 px-1.5 py-0 text-[10px] font-medium">
										{opt.badge}
									</Badge>
								)}
								{opt.isSelected && (
									<Check className="text-fg size-4 shrink-0" />
								)}
							</div>
						</button>
					))}
				</div>

				{/* Custom button */}
				<Button
					variant="outline"
					size="sm"
					color="neutral"
					className="mt-2 w-full text-xs font-medium">
					Custom
				</Button>
			</PopoverContent>
		</Popover>
	)
}
