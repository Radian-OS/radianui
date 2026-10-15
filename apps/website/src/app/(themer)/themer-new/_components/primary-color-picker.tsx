"use client"

import * as React from "react"
import { converter, formatHex, formatHsl, formatRgb, parse } from "culori"
import {
	Check,
	ChevronDown,
	Copy,
	Info,
	Lock,
	Shuffle,
	Unlock,
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

interface PrimaryColorInfo {
	name: string
	hex: string
	shades: Record<string, string>
}

function resolvePrimaryColorInfo(value?: string): PrimaryColorInfo {
	const defaultHex = "#623DF5"

	if (!value) {
		return {
			name: "Violet Blue",
			hex: defaultHex,
			shades: generateCustomColorShades(defaultHex, "primary"),
		}
	}

	if (value.startsWith("#")) {
		const shades = generateCustomColorShades(value, "primary")
		const preset = PRIMARY_COLORS.find(
			(c) =>
				formatHex(parse(c.cssVars.light["--color-primary"]))?.toLowerCase() ===
				value.toLowerCase()
		)
		const name = preset ? preset.name : ntc.name(value)[1] || "Custom"
		return { name, hex: value, shades }
	}

	const preset = PRIMARY_COLORS.find((c) => c.value === value)
	if (preset) {
		const hex =
			formatHex(parse(preset.cssVars.light["--color-primary"])) || defaultHex
		return {
			name: preset.name,
			hex,
			shades: preset.cssVars.light,
		}
	}

	return {
		name: "Custom",
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

interface PrimaryColorPickerProps {
	value?: string
	onChange: (value: string) => void
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

	const handleCopy = (e: React.MouseEvent) => {
		e.stopPropagation()
		navigator.clipboard.writeText(value)
		setCopied(true)
		setTimeout(() => setCopied(false), 1500)
	}

	return (
		<div
			onClick={handleCopy}
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

export default function PrimaryColorPicker({
	value,
	onChange,
}: PrimaryColorPickerProps) {
	const [isLocked, setIsLocked] = React.useState(false)
	const [colorFormat, setColorFormat] = React.useState<ColorFormat>("Hex")
	const [copiedInput, setCopiedInput] = React.useState(false)
	const [open, setOpen] = React.useState(false)

	const colorInfo = React.useMemo(() => resolvePrimaryColorInfo(value), [value])

	const [hsvState, setHsvState] = React.useState(() => {
		const parsed = parse(colorInfo.hex)
		if (parsed) {
			const hsv = toHsv(parsed)
			return {
				h: hsv.h !== undefined && !isNaN(hsv.h) ? hsv.h : 0,
				s: hsv.s !== undefined && !isNaN(hsv.s) ? hsv.s : 0,
				v: hsv.v !== undefined && !isNaN(hsv.v) ? hsv.v : 1,
			}
		}
		return { h: 160, s: 0.9, v: 0.72 }
	})

	const [displayInput, setDisplayInput] = React.useState(() =>
		formatColor(colorInfo.hex, "Hex")
	)

	const hsvRef = React.useRef(hsvState)
	hsvRef.current = hsvState

	const svAreaRef = React.useRef<HTMLDivElement>(null)
	const hueBarRef = React.useRef<HTMLDivElement>(null)

	// Sync when external value changes
	React.useEffect(() => {
		const currentHex = formatHex({
			mode: "hsv",
			...hsvRef.current,
		})?.toLowerCase()
		if (colorInfo.hex.toLowerCase() !== currentHex) {
			const parsed = parse(colorInfo.hex)
			if (parsed) {
				const hsv = toHsv(parsed)
				const next = {
					h: hsv.h !== undefined && !isNaN(hsv.h) ? hsv.h : hsvRef.current.h,
					s: hsv.s !== undefined && !isNaN(hsv.s) ? hsv.s : 0,
					v: hsv.v !== undefined && !isNaN(hsv.v) ? hsv.v : 1,
				}
				hsvRef.current = next
				setHsvState(next)
				setDisplayInput(formatColor(colorInfo.hex, colorFormat))
			}
		}
	}, [colorInfo.hex, colorFormat])

	const syncColor = React.useCallback(
		(newHex: string, nextHsv: { h: number; s: number; v: number }) => {
			setDisplayInput(formatColor(newHex, colorFormat))
			onChange(newHex)
		},
		[colorFormat, onChange]
	)

	const handleSvPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
		if (!svAreaRef.current) return
		const rect = svAreaRef.current.getBoundingClientRect()

		const updateFromPointer = (clientX: number, clientY: number) => {
			const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
			const y = Math.max(0, Math.min(clientY - rect.top, rect.height))
			const s = x / rect.width
			const v = 1 - y / rect.height

			const next = { ...hsvRef.current, s, v }
			hsvRef.current = next
			setHsvState(next)
			const newHex = formatHex({ mode: "hsv", ...next }) || "#000000"
			syncColor(newHex, next)
		}

		updateFromPointer(e.clientX, e.clientY)

		const handlePointerMove = (ev: PointerEvent) => {
			updateFromPointer(ev.clientX, ev.clientY)
		}

		const handlePointerUp = () => {
			window.removeEventListener("pointermove", handlePointerMove)
			window.removeEventListener("pointerup", handlePointerUp)
		}

		window.addEventListener("pointermove", handlePointerMove)
		window.addEventListener("pointerup", handlePointerUp)
	}

	const handleHuePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
		if (!hueBarRef.current) return
		const rect = hueBarRef.current.getBoundingClientRect()

		const updateFromPointer = (clientX: number) => {
			const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
			const h = (x / rect.width) * 360

			const next = { ...hsvRef.current, h }
			hsvRef.current = next
			setHsvState(next)
			const newHex = formatHex({ mode: "hsv", ...next }) || "#000000"
			syncColor(newHex, next)
		}

		updateFromPointer(e.clientX)

		const handlePointerMove = (ev: PointerEvent) => {
			updateFromPointer(ev.clientX)
		}

		const handlePointerUp = () => {
			window.removeEventListener("pointermove", handlePointerMove)
			window.removeEventListener("pointerup", handlePointerUp)
		}

		window.addEventListener("pointermove", handlePointerMove)
		window.addEventListener("pointerup", handlePointerUp)
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value
		setDisplayInput(val)

		const parsed = parse(val)
		if (parsed) {
			const hsvVal = toHsv(parsed)
			const nextHsv = {
				h:
					hsvVal.h !== undefined && !isNaN(hsvVal.h)
						? hsvVal.h
						: hsvRef.current.h,
				s:
					hsvVal.s !== undefined && !isNaN(hsvVal.s)
						? hsvVal.s
						: hsvRef.current.s,
				v:
					hsvVal.v !== undefined && !isNaN(hsvVal.v)
						? hsvVal.v
						: hsvRef.current.v,
			}
			hsvRef.current = nextHsv
			setHsvState(nextHsv)
			const newHex = formatHex(parsed)
			if (newHex) {
				onChange(newHex)
			}
		}
	}

	const handleInputBlur = () => {
		setDisplayInput(formatColor(colorInfo.hex, colorFormat))
	}

	const handleCopyInput = () => {
		navigator.clipboard.writeText(displayInput)
		setCopiedInput(true)
		setTimeout(() => setCopiedInput(false), 1500)
	}

	const handleShuffle = () => {
		if (isLocked) return
		const h = Math.floor(Math.random() * 360)
		const s = 0.72 + Math.random() * 0.25
		const v = 0.75 + Math.random() * 0.2
		const nextHsv = { h, s, v }
		hsvRef.current = nextHsv
		setHsvState(nextHsv)
		const newHex = formatHex({ mode: "hsv", ...nextHsv }) || "#10b981"
		syncColor(newHex, nextHsv)
	}

	const hueColor =
		formatHex({ mode: "hsv", h: hsvState.h, s: 1, v: 1 }) || "#ff0000"

	const isLight =
		colorInfo.shades["--color-primary-fg"]?.includes("0.2") || false
	const textColor = isLight ? "#18181b" : "#ffffff"

	const pastelShades = [
		{
			token: "--color-primary-fg",
			value: colorInfo.shades["--color-primary-fg"] || "#ffffff",
		},
		{
			token: "--color-primary-accent",
			value: colorInfo.shades["--color-primary-accent"] || colorInfo.hex,
		},
		{
			token: "--color-primary-focus",
			value: colorInfo.shades["--color-primary-focus"] || colorInfo.hex,
		},
	]

	const midToneShades = [
		{
			token: "--color-primary",
			value: colorInfo.shades["--color-primary"] || colorInfo.hex,
			isBase: true,
		},
		{
			token: "--color-primary-text",
			value: colorInfo.shades["--color-primary-text"] || colorInfo.hex,
		},
		{
			token: "--color-primary-border",
			value: colorInfo.shades["--color-primary-border"] || colorInfo.hex,
		},
		{
			token: "--color-primary-hover",
			value: colorInfo.shades["--color-primary-hover"] || colorInfo.hex,
		},
	]

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
				className="w-[300px] px-2.5 py-1.5 shadow-sm select-none">
				{/* Header */}
				<div className="flex items-center justify-between p-1 pb-2">
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
					</div>
				</div>

				{/* SV 2D Area */}
				<div
					ref={svAreaRef}
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
					ref={hueBarRef}
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
							<DropdownMenuItem onClick={() => setColorFormat("Hex")}>
								Hex
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setColorFormat("RGB")}>
								RGB
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setColorFormat("HSL")}>
								HSL
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					<InputWrapper size="xs">
						<Input
							type="text"
							value={displayInput}
							onChange={handleInputChange}
							onBlur={handleInputBlur}
							spellCheck={false}
							className="text-xs"
						/>
						<button
							type="button"
							onClick={handleCopyInput}
							className="text-fg-tertiary hover:text-fg shrink-0 p-0.5 transition-colors"
							aria-label="Copy color value">
							{copiedInput ? (
								<Check className="size-4" />
							) : (
								<Copy className="size-4" />
							)}
						</button>
					</InputWrapper>
					{/* <div className="border-border bg-fill1 focus-within:border-ring focus-within:ring-ring flex h-8 flex-1 items-center justify-between rounded-lg border px-2.5 transition-colors focus-within:ring-1"> */}
					{/* <input
							type="text"
							value={displayInput}
							onChange={handleInputChange}
							onBlur={handleInputBlur}
							spellCheck={false}
							className="text-fg w-full bg-transparent font-mono text-xs uppercase outline-hidden"
						/>
						<button
							type="button"
							onClick={handleCopyInput}
							className="text-fg-tertiary hover:text-fg ml-1 shrink-0 p-0.5 transition-colors"
							aria-label="Copy color value">
							{copiedInput ? (
								<Check className="size-3.5 text-emerald-500" />
							) : (
								<Copy className="size-3.5" />
							)}
						</button> */}
					{/* </div> */}
				</div>

				{/* Shades breakdown */}
				<div className="mt-4 flex flex-col gap-3">
					{/* Pastel */}
					<div>
						<span className="text-fg-tertiary text-xs font-medium">Pastel</span>
						<div className="mt-2 flex flex-col gap-1.5">
							{pastelShades.map((shade) => (
								<ShadeRow
									key={shade.token}
									token={shade.token}
									value={shade.value}
								/>
							))}
						</div>
					</div>

					{/* Mid tones */}
					<div>
						<span className="text-fg-tertiary text-xs font-medium">
							Mid tones
						</span>
						<div className="mt-2 flex flex-col gap-1.5">
							{midToneShades.map((shade) => (
								<ShadeRow
									key={shade.token}
									token={shade.token}
									value={shade.value}
									isBase={shade.isBase}
								/>
							))}
						</div>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	)
}
