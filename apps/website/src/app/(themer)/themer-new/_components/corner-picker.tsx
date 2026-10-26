"use client"

import { useEffect, useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import { Info, Shuffle } from "lucide-react"
import { Button } from "@/styles/default/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@/styles/default/ui/dropdown-menu"
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
}: {
	label: string
	tooltipContent: string
	steps: readonly number[]
	value: number
	onChange: (val: number) => void
}) {
	const idx = Math.max(0, steps.indexOf(value as any))
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
		<div className="flex flex-col gap-2">
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
				onValueChange={([i]) => handleChange(i)}>
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

export default function CornerPicker() {
	const [params, setParams] = useThemerPreset()
	const [isAdvanced, setIsAdvanced] = useState(false)

	const selectedPreset = isAdvanced
		? undefined
		: RADIUS.find((r) => r.value === params.radius)

	const handleShuffle = () => {
		if (isAdvanced) {
			setParams({
				controlRadius: toCss(SMALL[Math.floor(Math.random() * SMALL.length)]),
				radius: toCss(CONTAINER[Math.floor(Math.random() * CONTAINER.length)]),
			})
		} else {
			const r = RADIUS[Math.floor(Math.random() * RADIUS.length)].value
			setParams({ radius: r, controlRadius: r })
		}
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
				side="right"
				align="start"
				sideOffset={20}
				className="min-w-[280px] shadow-sm select-none">
				<div className="flex items-center justify-between">
					<DropdownMenuLabel className="text-fg-tertiary">
						Radius
					</DropdownMenuLabel>
					<button
						type="button"
						onClick={handleShuffle}
						className="text-fg-tertiary hover:text-fg cursor-pointer rounded p-1 transition-colors"
						aria-label="Randomize radius">
						<Shuffle className="size-4" />
					</button>
				</div>

				<DropdownMenuRadioGroup
					value={isAdvanced ? "advanced" : params.radius}
					onValueChange={(val) => {
						if (val === "advanced") {
							setIsAdvanced(true)
						} else {
							setIsAdvanced(false)
							setParams({ radius: val, controlRadius: val })
						}
					}}>
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

				<Divider className="my-1" />

				{isAdvanced && (
					<div
						className="mt-3 flex flex-col gap-4"
						onKeyDown={(e) => e.stopPropagation()}>
						<RadiusSlider
							label="Controls"
							tooltipContent="Changes the radius of controls like Button, Input, and Checkbox."
							steps={SMALL}
							value={toPxNumber(params.controlRadius, true)}
							onChange={(v) => setParams({ controlRadius: toCss(v) })}
						/>
						<RadiusSlider
							label="Containers"
							tooltipContent="Changes the radius of containers like Card, Dropdown, and Dialog."
							steps={CONTAINER}
							value={toPxNumber(params.radius, false)}
							onChange={(v) => setParams({ radius: toCss(v) })}
						/>
					</div>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
