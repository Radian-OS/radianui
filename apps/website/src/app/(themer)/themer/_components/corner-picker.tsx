"use client"

import { useThemerPickerPlacement } from "./themer-picker-placement"
import { useEffect, useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import { Check, ChevronLeft, Info, RotateCcw, Shuffle } from "lucide-react"
import { Button, IconButton } from "@/styles/default/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@/styles/default/ui/dropdown-menu"
import { DrawerTitle } from "@/styles/default/ui/drawer"
import { ScrollArea } from "@/styles/default/ui/scroll-area"
import { Slider, SliderThumb } from "@/styles/default/ui/slider"
import { RADIUS } from "@/registry/radius"
import { useThemerPreset } from "@/lib/themer-preset"
import { cn } from "@/lib/utils"
import { Divider } from "@/styles/default/ui/divider"
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/styles/default/ui/tooltip"

const SMALL = [0, 2, 4, 6, 8, 99] as const
const CONTAINER = [0, 4, 8, 12, 16, 20] as const

const toCss = (v: number) => (v === 99 ? "calc(infinity * 1px)" : `${v}px`)

function toPxNumber(val?: string, isControl = false) {
	const preset = RADIUS.find((r) => r.value === val)
	const raw = preset
		? isControl
			? preset.radius["control-radius-base"]
			: preset.radius["radius-base"]
		: val
	if (raw === "calc(infinity * 1px)" || raw === "99") return 99
	return parseInt(raw || (isControl ? "4" : "8"), 10) || 0
}

function RadiusSlider({
	label,
	tooltipContent,
	steps,
	value,
	onChange,
	mobile,
}: {
	label: string
	tooltipContent: string
	steps: readonly number[]
	value: number
	onChange: (val: number) => void
	mobile?: boolean
}) {
	const idx = Math.max(0, steps.indexOf(value))
	const [localIdx, setLocalIdx] = useState(idx)

	useEffect(() => {
		setLocalIdx(idx)
	}, [idx])

	const debouncedOnChange = useDebouncedCallback(onChange, 150)

	const handleChange = (i: number) => {
		setLocalIdx(i)
		debouncedOnChange(steps[i])
	}

	return (
		<div
			className={cn("flex flex-col gap-2", mobile && "px-1 py-1.5")}
			data-vaul-no-drag={mobile || undefined}>
			<div className="text-fg flex items-center gap-1.5 text-xs">
				<span>{label}</span>
				<Tooltip>
					<TooltipTrigger>
						<Info className="text-fg-tertiary size-3.5" />
					</TooltipTrigger>
					<TooltipContent withArrow>
						<p className="text-xs">{tooltipContent}</p>
					</TooltipContent>
				</Tooltip>
			</div>
			<Slider
				min={0}
				max={steps.length - 1}
				step={1}
				value={[localIdx]}
				onValueChange={([i]) => handleChange(i)}
				onValueCommit={() => debouncedOnChange.flush()}>
				<SliderThumb />
			</Slider>
			<div className="text-fg-tertiary flex justify-between px-1 text-xs">
				{steps.map((s, i) => (
					<button
						key={s}
						type="button"
						onClick={() => handleChange(i)}
						className={cn(
							"flex cursor-pointer flex-col items-center gap-1 select-none",
							i === localIdx ? "text-fg font-bold" : "font-normal"
						)}>
						<div className="h-1.5 w-px bg-current opacity-40" />
						<span>{s}</span>
					</button>
				))}
			</div>
		</div>
	)
}

export default function CornerPicker({ onBack }: { onBack?: () => void }) {
	const placement = useThemerPickerPlacement("start", 12)
	const [params, setParams] = useThemerPreset()
	const [advancedSelected, setIsAdvanced] = useState(false)
	const isAdvanced =
		advancedSelected ||
		(params.radius ?? "default") !== (params.controlRadius ?? "default") ||
		!RADIUS.some((preset) => preset.value === (params.radius ?? "default"))
	const [showAdvanced, setShowAdvanced] = useState(false)

	const selectedPreset = isAdvanced
		? undefined
		: RADIUS.find((r) => r.value === params.radius)

	const handleShuffle = (advanced = isAdvanced) => {
		setIsAdvanced(advanced)
		if (advanced) {
			setParams({
				controlRadius: toCss(SMALL[Math.floor(Math.random() * SMALL.length)]),
				radius: toCss(CONTAINER[Math.floor(Math.random() * CONTAINER.length)]),
			})
		} else {
			const r = RADIUS[Math.floor(Math.random() * RADIUS.length)].value
			setParams({ radius: r, controlRadius: r })
		}
	}

	const selectPreset = (value: string) => {
		setIsAdvanced(value === "advanced")
		if (value !== "advanced") setParams({ radius: value, controlRadius: value })
	}
	const sliders = (
		<>
			<RadiusSlider
				label={onBack ? "Small contents" : "Controls"}
				mobile={Boolean(onBack)}
				tooltipContent="Changes the radius of controls like Button, Input, and Checkbox."
				steps={SMALL}
				value={toPxNumber(params.controlRadius, true)}
				onChange={(v) => setParams({ controlRadius: toCss(v) })}
			/>
			<RadiusSlider
				label={onBack ? "Bigger containers" : "Containers"}
				mobile={Boolean(onBack)}
				tooltipContent="Changes the radius of containers like Card, Dropdown, and Dialog."
				steps={CONTAINER}
				value={toPxNumber(params.radius, false)}
				onChange={(v) => setParams({ radius: toCss(v) })}
			/>
		</>
	)

	if (onBack) {
		return (
			<div className="flex min-h-0 flex-col gap-2 px-3 pb-[max(12px,env(safe-area-inset-bottom))]">
				<div className="flex shrink-0 touch-none items-center justify-between">
					<div className="flex items-center gap-2">
						<IconButton
							size="xs"
							variant="ghost"
							color="neutral"
							className="text-fg-secondary"
							aria-label={
								showAdvanced
									? "Back to radius presets"
									: "Close radius settings"
							}
							onClick={showAdvanced ? () => setShowAdvanced(false) : onBack}>
							<ChevronLeft className="size-5!" />
						</IconButton>
						<DrawerTitle className="text-fg text-base font-medium">
							{showAdvanced ? "Advanced" : "Radius"}
						</DrawerTitle>
					</div>
					<div className="flex items-center gap-2">
						<IconButton
							size="md"
							variant="ghost"
							color="neutral"
							className="text-fg-secondary"
							aria-label="Reset radius"
							onClick={() => {
								setParams({ radius: "default", controlRadius: "default" })
								setIsAdvanced(showAdvanced)
							}}>
							<RotateCcw />
						</IconButton>
						<IconButton
							size="md"
							variant="ghost"
							color="neutral"
							className="text-fg-secondary"
							aria-label="Randomize radius"
							onClick={() => handleShuffle(showAdvanced)}>
							<Shuffle />
						</IconButton>
					</div>
				</div>
				<ScrollArea
					type="auto"
					className="[&>[data-slot=scroll-area-viewport]]:max-h-[calc(85dvh-6rem)] [&>[data-slot=scroll-area-viewport]]:overscroll-y-contain">
					{showAdvanced ? (
						<div className="flex flex-col gap-1">{sliders}</div>
					) : (
						<div className="flex flex-col gap-0.5">
							{[...RADIUS, { value: "advanced", name: "Advanced" }].map(
								({ value, name }) => {
									const selected =
										value === (isAdvanced ? "advanced" : params.radius)
									return (
										<Button
											key={value}
											size="sm"
											variant="ghost"
											color="neutral"
											className={cn(
												"w-full justify-between px-2 text-sm font-normal",
												selected && "bg-fill1-alpha"
											)}
											aria-pressed={selected}
											onClick={() => {
												selectPreset(value)
												setShowAdvanced(value === "advanced")
											}}>
											{name}
											{selected && <Check className="text-fg-tertiary" />}
										</Button>
									)
								}
							)}
						</div>
					)}
				</ScrollArea>
			</div>
		)
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					className="bg-fill1-alpha w-full justify-between p-3 text-[13px] select-none"
					variant="soft"
					color="neutral">
					<span>Radius</span>{" "}
					<span className="text-fg-tertiary font-medium">
						{isAdvanced ? "Advanced" : selectedPreset?.name || "Default"}
					</span>
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent
				{...placement}
				className="w-70 max-w-[calc(100vw-1.5rem)] shadow-sm select-none">
				<div className="flex items-center justify-between">
					<DropdownMenuLabel className="text-fg-tertiary">
						Radius
					</DropdownMenuLabel>
					<button
						type="button"
						onClick={() => handleShuffle()}
						className="text-fg-tertiary hover:text-fg cursor-pointer rounded p-1 transition-colors"
						aria-label="Randomize radius">
						<Shuffle className="size-4" />
					</button>
				</div>

				<DropdownMenuRadioGroup
					value={isAdvanced ? "advanced" : params.radius}
					onValueChange={selectPreset}>
					{RADIUS.map((r) => (
						<DropdownMenuRadioItem
							key={r.value}
							value={r.value}
							onSelect={(e) => e.preventDefault()}>
							{r.name}
						</DropdownMenuRadioItem>
					))}
					<DropdownMenuRadioItem
						value="advanced"
						onSelect={(e) => e.preventDefault()}>
						Advanced
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>

				{isAdvanced && <Divider className="my-1" />}

				{isAdvanced && (
					<div
						className="mt-3 flex flex-col gap-4"
						onKeyDown={(e) => e.stopPropagation()}>
						{sliders}
					</div>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
