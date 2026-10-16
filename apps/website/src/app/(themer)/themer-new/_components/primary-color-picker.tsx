"use client"

import * as React from "react"
import { motion, useDragControls } from "motion/react"
import { converter, formatHex, formatHsl, formatRgb, parse } from "culori"
import {
	Check,
	ChevronDown,
	Copy,
	Info,
	Lock,
	Shuffle,
	Unlock,
	X,
} from "lucide-react"
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
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/styles/default/ui/dropdown-menu"
import { PRIMARY_COLORS } from "@/registry/primary-colors"
import { generateCustomColorShades } from "@/lib/shade-generator"
import ntc from "ntcjs"
import { Badge } from "@/styles/default/ui/badge"
import { Input, InputWrapper } from "@/styles/default/ui/input"

const toHsv = converter("hsv")

type ColorFormat = "Hex" | "RGB" | "HSL"

const SHADE_GROUPS = [
	{
		label: "Pastel",
		tokens: [
			"--color-primary-fg",
			"--color-primary-accent",
			"--color-primary-focus",
		],
	},
	{
		label: "Mid tones",
		tokens: [
			"--color-primary",
			"--color-primary-text",
			"--color-primary-border",
			"--color-primary-hover",
		],
	},
]

function hexToHsv(hex: string, fallbackH = 0) {
	const parsed = parse(hex)
	if (!parsed) return { h: fallbackH, s: 0, v: 1 }
	const hsv = toHsv(parsed)
	return {
		h: hsv.h !== undefined && !isNaN(hsv.h) ? hsv.h : fallbackH,
		s: hsv.s ?? 0,
		v: hsv.v ?? 1,
	}
}

function resolvePrimaryColorInfo(value = "#623DF5") {
	const preset = PRIMARY_COLORS.find(
		(c) =>
			c.value === value ||
			formatHex(parse(c.cssVars.light["--color-primary"]))?.toLowerCase() ===
				value.toLowerCase()
	)
	if (preset) {
		return {
			name: preset.name,
			hex:
				formatHex(parse(preset.cssVars.light["--color-primary"])) || "#623DF5",
			shades: preset.cssVars.light as Record<string, string>,
		}
	}
	return {
		name: value.startsWith("#") ? ntc.name(value)[1] || "Custom" : "Custom",
		hex: value,
		shades: generateCustomColorShades(value, "primary"),
	}
}

function formatColor(hex: string, format: ColorFormat): string {
	const parsed = parse(hex)
	if (!parsed) return hex.toUpperCase()
	if (format === "RGB") return formatRgb(parsed) || hex.toUpperCase()
	if (format === "HSL") return formatHsl(parsed) || hex.toUpperCase()
	return (formatHex(parsed) || hex).toUpperCase()
}

function startDrag(onMove: (e: PointerEvent) => void) {
	const onUp = () => {
		window.removeEventListener("pointermove", onMove)
		window.removeEventListener("pointerup", onUp)
	}
	window.addEventListener("pointermove", onMove)
	window.addEventListener("pointerup", onUp)
}

function ShadeRow({
	token,
	value,
	isBase,
}: {
	token: string
	value: string
	isBase?: boolean
}) {
	const [copied, setCopied] = React.useState(false)

	return (
		<div
			onClick={() => {
				navigator.clipboard.writeText(value)
				setCopied(true)
				setTimeout(() => setCopied(false), 1500)
			}}
			title={`Click to copy: ${value}`}
			className="hover:bg-fill2 group -mx-1.5 flex cursor-pointer items-center justify-between rounded-md px-1.5 py-1 transition-colors">
			<div className="flex items-center gap-2.5">
				<div
					className="border-border size-4 shrink-0 rounded-full border shadow-2xs"
					style={{ backgroundColor: value }}
				/>
				<span className="text-fg-secondary group-hover:text-fg font-mono text-xs transition-colors">
					{token}
				</span>
			</div>
			{isBase ? (
				<span className="rounded bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-medium text-emerald-700 dark:text-emerald-400">
					Base
				</span>
			) : (
				copied && (
					<span className="text-fg-tertiary text-[10px] font-medium">
						Copied!
					</span>
				)
			)}
		</div>
	)
}

interface PrimaryColorPickerProps {
	value?: string
	onChange: (value: string) => void
}

export default function PrimaryColorPicker({
	value,
	onChange,
}: PrimaryColorPickerProps) {
	const dragControls = useDragControls()
	const [isLocked, setIsLocked] = React.useState(false)
	const [colorFormat, setColorFormat] = React.useState<ColorFormat>("Hex")
	const [copiedInput, setCopiedInput] = React.useState(false)
	const [open, setOpen] = React.useState(false)

	const colorInfo = React.useMemo(() => resolvePrimaryColorInfo(value), [value])

	const [hsvState, setHsvState] = React.useState(() => hexToHsv(colorInfo.hex))
	const [displayInput, setDisplayInput] = React.useState(() =>
		formatColor(colorInfo.hex, "Hex")
	)

	// Sync when external value changes
	React.useEffect(() => {
		const currentHex = formatHex({ mode: "hsv", ...hsvState })?.toLowerCase()
		if (colorInfo.hex.toLowerCase() !== currentHex) {
			setHsvState((prev) => hexToHsv(colorInfo.hex, prev.h))
			setDisplayInput(formatColor(colorInfo.hex, colorFormat))
		}
	}, [colorInfo.hex])

	const updateHsv = (next: { h: number; s: number; v: number }) => {
		setHsvState(next)
		const hex = formatHex({ mode: "hsv", ...next }) || "#000000"
		setDisplayInput(formatColor(hex, colorFormat))
		onChange(hex)
	}

	const handleSvPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
		const rect = e.currentTarget.getBoundingClientRect()
		const h = hsvState.h
		const update = (x: number, y: number) => {
			const s = Math.max(0, Math.min(x - rect.left, rect.width)) / rect.width
			const v =
				1 - Math.max(0, Math.min(y - rect.top, rect.height)) / rect.height
			updateHsv({ h, s, v })
		}
		update(e.clientX, e.clientY)
		startDrag((ev) => update(ev.clientX, ev.clientY))
	}

	const handleHuePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
		const rect = e.currentTarget.getBoundingClientRect()
		const { s, v } = hsvState
		const update = (x: number) => {
			const h =
				(Math.max(0, Math.min(x - rect.left, rect.width)) / rect.width) * 360
			updateHsv({ h, s, v })
		}
		update(e.clientX)
		startDrag((ev) => update(ev.clientX))
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value
		setDisplayInput(val)
		const parsed = parse(val)
		if (parsed) {
			const newHex = formatHex(parsed)
			if (newHex) {
				setHsvState((prev) => hexToHsv(newHex, prev.h))
				onChange(newHex)
			}
		}
	}

	const handleShuffle = () => {
		if (isLocked) return
		updateHsv({
			h: Math.floor(Math.random() * 360),
			s: 0.72 + Math.random() * 0.25,
			v: 0.75 + Math.random() * 0.2,
		})
	}

	const hueColor = `hsl(${hsvState.h} 100% 50%)`
	const textColor = colorInfo.shades["--color-primary-fg"]?.includes("0.2")
		? "#18181b"
		: "#ffffff"

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<button
					type="button"
					className="focus-visible:ring-primary col-span-1 row-span-2 flex h-[136px] w-full cursor-pointer flex-col justify-between overflow-hidden rounded-lg p-2.5 text-left transition-transform outline-none select-none hover:scale-[1.01] focus-visible:ring-2 active:scale-[0.99]"
					style={{
						backgroundColor:
							colorInfo.shades["--color-primary"] || colorInfo.hex,
						color: textColor,
					}}>
					<div className="flex w-full items-start justify-between">
						<span className="text-xs font-medium">Primary</span>
						<div
							role="button"
							tabIndex={0}
							onClick={(e) => {
								e.stopPropagation()
								setIsLocked(!isLocked)
							}}
							className="p-0.5 opacity-70 transition-opacity hover:opacity-100"
							title={isLocked ? "Unlock primary color" : "Lock primary color"}>
							{isLocked ? (
								<Lock className="size-3.5" />
							) : (
								<Unlock className="size-3.5 opacity-60" />
							)}
						</div>
					</div>
					<div className="flex w-full flex-col gap-1.5">
						<Badge size="sm" color="neutral">
							Main
						</Badge>
						<span className="truncate text-xs font-medium">
							{colorInfo.name}
						</span>
						<div className="mt-1 flex gap-0.25">
							<div className="h-1 w-full rounded-l-full bg-current/30" />
							<div className="h-1 w-full rounded-none bg-current/30" />
							<div className="h-1 w-full rounded-none bg-current/30" />
							<div className="h-1 w-full rounded-r-full bg-current" />
						</div>
					</div>
				</button>
			</PopoverTrigger>

			<PopoverContent
				align="start"
				side="right"
				sideOffset={16}
				collisionPadding={16}
				onOpenAutoFocus={(e) => e.preventDefault()}
				className="w-auto border-none bg-transparent p-0 shadow-none">
				<motion.div
					drag
					dragControls={dragControls}
					dragListener={false}
					dragMomentum={false}
					onDragStart={() => {
						document.querySelectorAll("iframe").forEach((el) => {
							el.style.pointerEvents = "none"
						})
					}}
					onDragEnd={() => {
						document.querySelectorAll("iframe").forEach((el) => {
							el.style.pointerEvents = ""
						})
					}}
					className="bg-popover border-border w-[300px] rounded-lg border px-2.5 py-1.5 shadow-sm will-change-transform select-none">
					{/* Header */}
					<div
						onPointerDown={(e) => {
							if (!(e.target as HTMLElement).closest("button")) {
								dragControls.start(e)
							}
						}}
						className="flex cursor-grab items-center justify-between p-1 pb-2 active:cursor-grabbing">
						<span className="text-fg-secondary text-[13px] font-medium">
							Primary colour
						</span>
						<div className="flex items-center gap-2">
							<Tooltip>
								<TooltipTrigger asChild>
									<button
										type="button"
										className="text-fg-tertiary hover:text-fg rounded-md p-1 transition-colors"
										aria-label="Color information">
										<Info className="size-4" />
									</button>
								</TooltipTrigger>
								<TooltipContent withArrow>
									Primary color generates all semantic shades and tokens
								</TooltipContent>
							</Tooltip>

							<Tooltip>
								<TooltipTrigger asChild>
									<button
										type="button"
										onClick={handleShuffle}
										className="text-fg-tertiary hover:text-fg rounded-md p-1 transition-colors"
										aria-label="Randomize primary color">
										<Shuffle className="size-4" />
									</button>
								</TooltipTrigger>
								<TooltipContent withArrow>Shuffle color</TooltipContent>
							</Tooltip>

							<button
								type="button"
								onClick={() => setOpen(false)}
								className="text-fg-tertiary hover:text-fg rounded-md p-1 transition-colors"
								aria-label="Close color picker">
								<X className="size-4" />
							</button>
						</div>
					</div>

					{/* SV 2D Area */}
					<div
						onPointerDown={handleSvPointerDown}
						className="border-fill4 relative h-44 w-full cursor-crosshair touch-none overflow-hidden rounded-lg border"
						style={{ backgroundColor: hueColor }}>
						<div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white to-transparent" />
						<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black to-transparent" />
						<div
							className="pointer-events-none absolute size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[2.5px] border-white shadow-[0_1px_4px_rgba(0,0,0,0.35)] transition-none"
							style={{
								left: `${hsvState.s * 100}%`,
								top: `${(1 - hsvState.v) * 100}%`,
							}}
						/>
					</div>

					{/* Hue Slider */}
					<div
						onPointerDown={handleHuePointerDown}
						className="relative mt-3 flex h-4 w-full cursor-pointer touch-none items-center rounded-full"
						style={{
							background:
								"linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)",
						}}>
						<div
							className="pointer-events-none absolute size-4.5 -translate-x-1/2 rounded-full border-2 border-white shadow-[0_1px_3px_rgba(0,0,0,0.3)]"
							style={{
								left: `${(hsvState.h / 360) * 100}%`,
								backgroundColor: hueColor,
							}}
						/>
					</div>

					{/* Format and Input Row */}
					<div className="mt-3 flex items-center gap-2">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<button
									type="button"
									className="border-border bg-fill1 hover:bg-fill2 text-fg flex h-7 shrink-0 cursor-pointer items-center gap-1 rounded-lg border px-2.5 text-xs font-medium transition-colors">
									<span>{colorFormat}</span>
									<ChevronDown className="text-fg-tertiary size-3" />
								</button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="start" className="min-w-[100px]">
								{(["Hex", "RGB", "HSL"] as const).map((fmt) => (
									<DropdownMenuItem
										key={fmt}
										onClick={() => {
											setColorFormat(fmt)
											setDisplayInput(formatColor(colorInfo.hex, fmt))
										}}>
										{fmt}
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>

						<InputWrapper size="xs">
							<Input
								type="text"
								value={displayInput}
								onChange={handleInputChange}
								onBlur={() =>
									setDisplayInput(formatColor(colorInfo.hex, colorFormat))
								}
								spellCheck={false}
								className="text-xs"
							/>
							<button
								type="button"
								onClick={() => {
									navigator.clipboard.writeText(displayInput)
									setCopiedInput(true)
									setTimeout(() => setCopiedInput(false), 1500)
								}}
								className="text-fg-tertiary hover:text-fg shrink-0 p-0.5 transition-colors"
								aria-label="Copy color value">
								{copiedInput ? (
									<Check className="size-4" />
								) : (
									<Copy className="size-4" />
								)}
							</button>
						</InputWrapper>
					</div>

					{/* Shades breakdown */}
					<div className="mt-4 flex flex-col gap-3">
						{SHADE_GROUPS.map(({ label, tokens }) => (
							<div key={label}>
								<span className="text-fg-tertiary text-xs font-medium">
									{label}
								</span>
								<div className="mt-2 flex flex-col gap-1.5">
									{tokens.map((token) => (
										<ShadeRow
											key={token}
											token={token}
											value={
												colorInfo.shades[token] ||
												(token.endsWith("-fg") ? "#ffffff" : colorInfo.hex)
											}
											isBase={token === "--color-primary"}
										/>
									))}
								</div>
							</div>
						))}
					</div>
				</motion.div>
			</PopoverContent>
		</Popover>
	)
}
