"use client"

import { ThemerMobilePicker } from "./themer-mobile-picker"
import { ScrollArea } from "@/styles/default/ui/scroll-area"
import {
	ThemerDrawerContext,
	useThemerPickerPlacement,
} from "./themer-picker-placement"
import * as React from "react"
import { useTheme } from "next-themes"
import { motion, useDragControls } from "motion/react"
import { converter, formatHex, formatHsl, formatRgb, parse } from "culori"
import {
	Check,
	ChevronDown,
	ChevronLeft,
	Copy,
	Info,
	Lock,
	Plus,
	Shuffle,
	Trash2,
	Unlock,
	X,
} from "lucide-react"
import { cn } from "@/lib/utils"
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
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/styles/default/ui/tabs"
import { Button, IconButton } from "@/styles/default/ui/button"

const toHsv = converter("hsv")

type ColorFormat = "Hex" | "RGB" | "HSL"

const MAX_COLORS = 5

const PRESET_ORDER = [
	"red",
	"orange",
	"amber",
	"yellow",
	"neon",
	"green",
	"emerald",
	"teal",
	"cyan",
	"light-blue",
	"blue",
	"violet-blue",
	"purple",
	"dark-orchid",
	"fuchsia",
	"magenta",
	"rose",
	"neutral",
] as const

// ─── helpers ──────────────────────────────────────────────────────────────────

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

function resolvePrefix(val: string, fallbackName?: string) {
	const preset = PRIMARY_COLORS.find(
		(c) =>
			c.value === val ||
			formatHex(parse(c.cssVars.light["--color-primary"]))?.toLowerCase() ===
				val.toLowerCase()
	)
	if (preset) {
		return preset.value === "neutral" ? "black" : preset.value
	}
	if (val.startsWith("#")) {
		const n = ntc.name(val)[1]
		if (n) {
			const slug = n
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, "-")
				.replace(/^-|-$/g, "")
			if (slug) return slug
		}
	}
	if (fallbackName) {
		const slug = fallbackName
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/^-|-$/g, "")
		if (slug) return slug
	}
	return "custom"
}

function resolvePrimaryColorInfo(
	value = "#623DF5",
	mode: "light" | "dark" = "light",
	prefix = "primary"
) {
	const preset = PRIMARY_COLORS.find(
		(c) =>
			c.value === value ||
			formatHex(parse(c.cssVars.light["--color-primary"]))?.toLowerCase() ===
				value.toLowerCase()
	)
	if (preset) {
		const rawShades = preset.cssVars[mode] as Record<string, string>
		const shades: Record<string, string> = {}
		for (const [k, v] of Object.entries(rawShades)) {
			const remappedKey = k.replace("--color-primary", `--color-${prefix}`)
			shades[remappedKey] = v
			shades[k] = v
		}
		return {
			name: preset.value === "neutral" ? "Black" : preset.name,
			hex:
				formatHex(parse(preset.cssVars[mode]["--color-primary"])) || "#623DF5",
			shades,
		}
	}
	return {
		name: value.startsWith("#") ? ntc.name(value)[1] || "Custom" : "Custom",
		hex: value,
		shades: generateCustomColorShades(value, prefix, mode),
	}
}

const SHADE_GROUPS = [
	{
		label: "Pastel",
		suffixes: ["-fg", "-accent", "-focus"],
	},
	{
		label: "Mid tones",
		suffixes: ["", "-text", "-border", "-hover"],
	},
]

function ShadeRow({
	token,
	value,
	isBase,
	inDrawer,
}: {
	token: string
	value: string
	isBase?: boolean
	inDrawer: boolean
}) {
	const [copied, setCopied] = React.useState(false)

	return (
		<div
			onClick={
				inDrawer
					? undefined
					: () => {
							navigator.clipboard.writeText(value)
							setCopied(true)
							setTimeout(() => setCopied(false), 1500)
						}
			}
			title={inDrawer ? undefined : `Click to copy: ${value}`}
			className={cn(
				"group flex items-center justify-between rounded-md",
				inDrawer
					? "px-2.5 py-1.5"
					: "hover:bg-fill2 -mx-1.5 cursor-pointer px-1.5 py-1 transition-colors"
			)}>
			<div className="flex items-center gap-2.5">
				<div
					className="border-border size-4 shrink-0 rounded-full border shadow-2xs"
					style={{ backgroundColor: value }}
				/>
				<span
					className={cn(
						"group-hover:text-fg transition-colors",
						inDrawer
							? "text-fg text-sm font-normal"
							: "text-fg-secondary font-mono text-xs"
					)}>
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

function formatColor(hex: string, format: ColorFormat): string {
	const parsed = parse(hex)
	if (!parsed) return hex.toUpperCase()
	if (format === "RGB") return formatRgb(parsed) || hex.toUpperCase()
	if (format === "HSL") return formatHsl(parsed) || hex.toUpperCase()
	return (formatHex(parsed) || hex).toUpperCase()
}

let cleanupDrag: (() => void) | null = null

function startDrag(onMove: (e: PointerEvent) => void) {
	cleanupDrag?.()

	const iframes = document.querySelectorAll("iframe")
	iframes.forEach((el) => {
		el.style.pointerEvents = "none"
	})

	const onUp = () => {
		window.removeEventListener("pointermove", onMove)
		window.removeEventListener("pointerup", onUp)
		window.removeEventListener("pointercancel", onUp)
		window.removeEventListener("blur", onUp)
		iframes.forEach((el) => {
			el.style.pointerEvents = ""
		})
		cleanupDrag = null
	}

	window.addEventListener("pointermove", onMove)
	window.addEventListener("pointerup", onUp)
	window.addEventListener("pointercancel", onUp)
	window.addEventListener("blur", onUp)

	cleanupDrag = onUp
}

function getCardLabel(index: number): string {
	if (index === 0) return "Primary"
	return `#${index + 1}`
}

// ─── ColorPickerPopover ────────────────────────────────────────────────────────

interface ColorPickerPopoverProps {
	value: string
	onChange: (value: string) => void
	open: boolean
	onOpenChange: (open: boolean) => void
	prefix?: string
	mode?: "edit" | "add"
	onSelect?: (value: string) => void
	children: React.ReactNode
}

function ColorPickerPopover({
	value,
	onChange,
	open,
	onOpenChange,
	prefix,
	mode = "edit",
	onSelect,
	children,
}: ColorPickerPopoverProps) {
	const inDrawer = React.useContext(ThemerDrawerContext)
	const placement = useThemerPickerPlacement("start", 16)
	const dragControls = useDragControls()
	const [activeTab, setActiveTab] = React.useState(
		inDrawer ? "custom" : "presets"
	)
	const [colorFormat, setColorFormat] = React.useState<ColorFormat>("Hex")
	const [copiedInput, setCopiedInput] = React.useState(false)

	const { resolvedTheme } = useTheme()
	const isDark = resolvedTheme === "dark"

	const currentPrefix = prefix || resolvePrefix(value)

	const colorInfo = React.useMemo(
		() =>
			resolvePrimaryColorInfo(value, isDark ? "dark" : "light", currentPrefix),
		[value, isDark, currentPrefix]
	)

	const orderedPresets = React.useMemo(() => {
		const orderMap = new Map<string, number>(
			PRESET_ORDER.map((val, idx) => [val, idx])
		)
		return [...PRIMARY_COLORS].sort((a, b) => {
			const idxA = orderMap.has(a.value) ? orderMap.get(a.value)! : 999
			const idxB = orderMap.has(b.value) ? orderMap.get(b.value)! : 999
			return idxA - idxB
		})
	}, [])

	const [hsvState, setHsvState] = React.useState(() => hexToHsv(colorInfo.hex))
	const [displayInput, setDisplayInput] = React.useState(() =>
		formatColor(colorInfo.hex, "Hex")
	)

	React.useEffect(() => {
		const currentHex = formatHex({ mode: "hsv", ...hsvState })?.toLowerCase()
		if (colorInfo.hex.toLowerCase() !== currentHex) {
			setHsvState((prev) => hexToHsv(colorInfo.hex, prev.h))
			setDisplayInput(formatColor(colorInfo.hex, colorFormat))
		}
	}, [colorInfo.hex])

	React.useEffect(() => {
		if (!open) {
			cleanupDrag?.()
		}
		return () => {
			cleanupDrag?.()
		}
	}, [open])

	const updateHsv = (next: { h: number; s: number; v: number }) => {
		setHsvState(next)
		const hex = formatHex({ mode: "hsv", ...next }) || "#000000"
		setDisplayInput(formatColor(hex, colorFormat))
		onChange(hex)
	}

	const handleSvPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
		e.preventDefault()
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
		e.preventDefault()
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
		if (activeTab === "presets") {
			const randomPreset =
				orderedPresets[Math.floor(Math.random() * orderedPresets.length)]
			onChange(randomPreset.value)
			return
		}
		updateHsv({
			h: Math.floor(Math.random() * 360),
			s: 0.72 + Math.random() * 0.25,
			v: 0.75 + Math.random() * 0.2,
		})
	}

	const hueColor = `hsl(${hsvState.h} 100% 50%)`

	const customColorControls = (
		<>
			{/* SV 2D Area */}
			<div
				onPointerDown={handleSvPointerDown}
				data-vaul-no-drag
				className={cn(
					"relative w-full cursor-crosshair touch-none overflow-hidden border",
					inDrawer
						? "border-border h-[120px] rounded-sm"
						: "border-fill4 h-44 rounded-lg"
				)}
				style={{ backgroundColor: hueColor }}>
				<div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white to-transparent" />
				<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black to-transparent" />
				<div
					className={cn(
						"pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-white shadow-[0_1px_4px_rgba(0,0,0,0.35)] transition-none",
						inDrawer ? "size-3.5 border-3" : "size-5 border-[2.5px]"
					)}
					style={{
						left: `${hsvState.s * 100}%`,
						top: `${(1 - hsvState.v) * 100}%`,
					}}
				/>
			</div>

			{/* Hue Slider */}
			<div
				onPointerDown={handleHuePointerDown}
				data-vaul-no-drag
				className="relative mt-3 flex h-4 w-full cursor-pointer touch-none items-center rounded-full"
				style={{
					background:
						"linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)",
				}}>
				<div
					className={cn(
						"pointer-events-none absolute -translate-x-1/2 rounded-full border-white shadow-[0_1px_3px_rgba(0,0,0,0.3)]",
						inDrawer ? "size-3.5 border-3" : "size-4.5 border-2"
					)}
					style={{
						left: `${(hsvState.h / 360) * 100}%`,
						backgroundColor: hueColor,
					}}
				/>
			</div>

			{/* Format and Input Row */}
			<div
				className={cn("mt-3 flex items-center", inDrawer ? "gap-3" : "gap-2")}>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<button
							type="button"
							className={cn(
								"border-border bg-fill1 hover:bg-fill2 text-fg flex shrink-0 cursor-pointer items-center gap-1 rounded-lg border px-2.5 text-xs font-medium transition-colors",
								inDrawer ? "h-9 w-[100px] justify-between text-sm" : "h-7"
							)}>
							<span>{colorFormat}</span>
							<ChevronDown
								className={cn(
									"text-fg-tertiary",
									inDrawer ? "size-5" : "size-3"
								)}
							/>
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

				<InputWrapper
					size={inDrawer ? "md" : "xs"}
					className={inDrawer ? "w-[298px] min-w-0" : undefined}>
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
					{!inDrawer && (
						<button
							type="button"
							onClick={() => {
								navigator.clipboard.writeText(displayInput)
								setCopiedInput(true)
								setTimeout(() => setCopiedInput(false), 1500)
							}}
							className="text-fg-secondary hover:text-fg shrink-0 p-0.5 transition-colors"
							aria-label="Copy color value">
							{copiedInput ? (
								<Check className="size-4" />
							) : (
								<Copy className="size-4" />
							)}
						</button>
					)}
				</InputWrapper>
			</div>

			{/* Shades breakdown */}
			<div
				className={cn(
					"mt-4 flex flex-col gap-3",
					inDrawer && "border-soft-alpha -mx-3 border-t px-3 pt-3"
				)}>
				{SHADE_GROUPS.map(({ label, suffixes }) => (
					<div key={label}>
						<span className="text-fg-tertiary text-xs font-medium">
							{label}
						</span>
						<div className={cn("mt-2 flex flex-col", !inDrawer && "gap-1.5")}>
							{suffixes.map((suffix) => {
								const token = `--color-${currentPrefix}${suffix}`
								const val =
									colorInfo.shades[token] ||
									colorInfo.shades[`--color-primary${suffix}`] ||
									(suffix === "-fg" ? "#ffffff" : colorInfo.hex)
								return (
									<ShadeRow
										key={token}
										token={token}
										value={val}
										isBase={suffix === ""}
										inDrawer={inDrawer}
									/>
								)
							})}
						</div>
					</div>
				))}
			</div>

			{mode === "add" && onSelect && (
				<Button
					type="button"
					size="sm"
					className="mt-3 w-full"
					onClick={() => {
						const hex = formatHex({ mode: "hsv", ...hsvState }) || colorInfo.hex
						onSelect(hex)
					}}>
					Add color
				</Button>
			)}
		</>
	)

	const editor = (
		<Tabs
			defaultValue="presets"
			value={activeTab}
			onValueChange={setActiveTab}
			className={inDrawer ? "h-full min-h-0" : undefined}>
			<motion.div
				drag={!inDrawer}
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
				className={cn(
					"select-none",
					inDrawer
						? "flex min-h-0 w-full flex-1 flex-col"
						: "bg-popover border-border w-[300px] max-w-[calc(100vw-2rem)] rounded-lg border px-2.5 py-1.5 shadow-sm will-change-transform"
				)}>
				{inDrawer ? (
					<div className="mb-3 flex shrink-0 touch-none items-center justify-between">
						<div className="flex items-center gap-2">
							<IconButton
								size="md"
								variant="ghost"
								color="neutral"
								className="text-fg-secondary"
								aria-label="Back to colors"
								onClick={() => onOpenChange(false)}>
								<ChevronLeft />
							</IconButton>
							<h2 className="sr-only">
								{mode === "add"
									? "Generate Color Palette"
									: prefix === "primary"
										? "Primary Color"
										: colorInfo.name}
							</h2>
							<TabsList aria-label="Color source">
								<TabsTrigger value="custom">Custom</TabsTrigger>
								<TabsTrigger value="presets">Presets</TabsTrigger>
							</TabsList>
						</div>
						<p className="sr-only">
							Choose a color and view its generated shades.
						</p>
						<div className="flex items-center gap-2">
							<Tooltip>
								<TooltipTrigger asChild>
									<IconButton
										size="md"
										variant="ghost"
										color="neutral"
										className="text-fg-secondary"
										aria-label="Color information">
										<Info />
									</IconButton>
								</TooltipTrigger>
								<TooltipContent withArrow>
									Shades are generated automatically from the selected color.
								</TooltipContent>
							</Tooltip>
							<IconButton
								size="md"
								variant="ghost"
								color="neutral"
								className="text-fg-secondary"
								aria-label="Randomize color"
								onClick={handleShuffle}>
								<Shuffle />
							</IconButton>
						</div>
					</div>
				) : (
					<div
						onPointerDown={(e) => {
							if (!(e.target as HTMLElement).closest("button")) {
								dragControls.start(e)
							}
						}}
						className="flex cursor-grab items-center justify-between p-1 pb-2 active:cursor-grabbing">
						<TabsList
							variant="ghost"
							className="p-0.5 data-[orientation=horizontal]:h-7">
							<TabsTrigger
								value="custom"
								className="data-[state=active]:text-fg-secondary">
								Custom
							</TabsTrigger>
							<TabsTrigger
								value="presets"
								className="data-[state=active]:text-fg-secondary">
								Presets
							</TabsTrigger>
						</TabsList>

						<div className="flex items-center gap-2">
							<Tooltip>
								<TooltipTrigger asChild>
									<button
										type="button"
										className="text-fg-secondary hover:text-fg rounded-md p-1 transition-colors"
										aria-label="Color information">
										<Info className="size-4" />
									</button>
								</TooltipTrigger>
								<TooltipContent withArrow>
									The shades for the picked color are generated automatically
								</TooltipContent>
							</Tooltip>

							<Tooltip>
								<TooltipTrigger asChild>
									<button
										type="button"
										onClick={handleShuffle}
										className="text-fg-secondary hover:text-fg rounded-md p-1 transition-colors"
										aria-label="Randomize color">
										<Shuffle className="size-4" />
									</button>
								</TooltipTrigger>
								<TooltipContent withArrow>Shuffle color</TooltipContent>
							</Tooltip>

							<button
								type="button"
								onClick={() => onOpenChange(false)}
								className="text-fg-secondary hover:text-fg rounded-md p-1 transition-colors"
								aria-label="Close color picker">
								<X className="size-4" />
							</button>
						</div>
					</div>
				)}

				<TabsContent
					value="custom"
					className={
						inDrawer ? "min-h-0 flex-col data-[state=active]:flex" : undefined
					}>
					{inDrawer ? (
						<ScrollArea
							type="auto"
							data-vaul-no-drag
							className="-mx-3 min-h-0 flex-1 [&>[data-slot=scroll-area-viewport]]:absolute [&>[data-slot=scroll-area-viewport]]:inset-0 [&>[data-slot=scroll-area-viewport]]:touch-pan-y [&>[data-slot=scroll-area-viewport]]:overscroll-y-contain">
							<div className="px-3 pb-3">{customColorControls}</div>
						</ScrollArea>
					) : (
						customColorControls
					)}
				</TabsContent>

				<TabsContent
					value="presets"
					className={
						inDrawer
							? "border-soft-alpha -mx-3 min-h-0 flex-col border-t pt-3 data-[state=active]:flex"
							: undefined
					}>
					<div
						className={cn(
							"text-fg-tertiary text-xs",
							inDrawer
								? "shrink-0 px-3.5 pb-2 font-medium"
								: "px-2 pb-1.5 font-normal"
						)}>
						Select colors
					</div>
					<ScrollArea
						type="auto"
						data-vaul-no-drag={inDrawer || undefined}
						className={
							inDrawer
								? "min-h-0 flex-1 [&>[data-slot=scroll-area-viewport]]:absolute [&>[data-slot=scroll-area-viewport]]:inset-0 [&>[data-slot=scroll-area-viewport]]:touch-pan-y [&>[data-slot=scroll-area-viewport]]:overscroll-y-contain [&>[data-slot=scroll-area-viewport]]:px-3"
								: "[&_[data-slot=scroll-area-viewport]]:max-h-[min(500px,max(6rem,calc(var(--radix-popover-content-available-height)-4rem)))]"
						}>
						{orderedPresets.map((preset) => {
							const isSelected =
								value === preset.value ||
								colorInfo.name.toLowerCase() === preset.name.toLowerCase() ||
								(colorInfo.name.toLowerCase() === "black" &&
									preset.value === "neutral")
							const displayName =
								preset.value === "neutral" ? "Black" : preset.name
							const swatchColor = preset.cssVars.light["--color-primary"]

							return (
								<button
									key={preset.value}
									type="button"
									onClick={() => {
										if (mode === "add" && onSelect) {
											onSelect(preset.value)
										} else {
											onChange(preset.value)
										}
									}}
									className={cn(
										"flex w-full cursor-pointer items-center justify-between rounded-md text-left transition-colors",
										inDrawer ? "min-h-10 px-2.5 py-2" : "px-2 py-1.5",
										isSelected ? "bg-fill2" : "hover:bg-fill2"
									)}>
									<div className="flex items-center gap-2.5">
										<div
											className="size-4 shrink-0 rounded-[6px]"
											style={{ backgroundColor: swatchColor }}
										/>
										<span
											className={cn(
												"text-fg font-normal",
												inDrawer ? "text-sm" : "text-xs"
											)}>
											{displayName}
										</span>
									</div>
									{isSelected && (
										<Check
											className={cn(
												"size-4 shrink-0",
												inDrawer ? "text-fg-tertiary" : "text-fg-secondary"
											)}
										/>
									)}
								</button>
							)
						})}
					</ScrollArea>
				</TabsContent>
			</motion.div>
		</Tabs>
	)

	if (inDrawer) {
		return (
			<ThemerMobilePicker
				trigger={children}
				open={open}
				onOpenChange={onOpenChange}
				label={mode === "add" ? "Generate Color Palette" : "Color settings"}
				className="flex h-[calc(82dvh-28px)] min-h-0 flex-col outline-none">
				<div className="min-h-0 flex-1 px-3 pb-[env(safe-area-inset-bottom)]">
					{editor}
				</div>
			</ThemerMobilePicker>
		)
	}

	return (
		<Popover open={open} onOpenChange={onOpenChange}>
			<PopoverTrigger asChild>{children}</PopoverTrigger>
			<PopoverContent
				{...placement}
				collisionPadding={16}
				onOpenAutoFocus={(event) => event.preventDefault()}
				className="w-auto border-none bg-transparent p-0 shadow-none">
				{editor}
			</PopoverContent>
		</Popover>
	)
}

// ─── ColorSchemeCard ───────────────────────────────────────────────────────────

interface ColorSchemeCardProps {
	index: number
	value: string
	isPrimary: boolean
	isCompact?: boolean
	className?: string
	onDelete?: () => void
	onChange: (value: string) => void
}

function ColorSchemeCard({
	index,
	value,
	isPrimary,
	isCompact = false,
	className,
	onDelete,
	onChange,
}: ColorSchemeCardProps) {
	const inDrawer = React.useContext(ThemerDrawerContext)
	const [open, setOpen] = React.useState(false)
	const [isLocked, setIsLocked] = React.useState(false)

	const { resolvedTheme } = useTheme()
	const isDark = resolvedTheme === "dark"

	const colorInfo = React.useMemo(
		() => resolvePrimaryColorInfo(value, isDark ? "dark" : "light"),
		[value, isDark]
	)

	const colorPrefix = isPrimary
		? "primary"
		: resolvePrefix(value, colorInfo.name)

	const label = inDrawer && index > 0 ? `#${index + 1}` : getCardLabel(index)
	const bgColor =
		colorInfo.shades[`--color-${colorPrefix}`] ||
		colorInfo.shades["--color-primary"] ||
		colorInfo.hex
	const textColor = (
		colorInfo.shades[`--color-${colorPrefix}-fg`] ||
		colorInfo.shades["--color-primary-fg"]
	)?.includes("0.2")
		? "#18181b"
		: "#ffffff"

	return (
		<ColorPickerPopover
			value={value}
			onChange={onChange}
			open={open}
			onOpenChange={setOpen}
			prefix={colorPrefix}>
			<button
				type="button"
				className={cn(
					"focus-visible:ring-primary flex w-full cursor-pointer flex-col justify-between overflow-hidden rounded-lg text-left transition-transform outline-none select-none hover:scale-[1.01] focus-visible:ring-2 active:scale-[0.99]",
					isCompact ? "p-2" : "p-2.5",
					className
				)}
				style={{ backgroundColor: bgColor, color: textColor }}>
				<div className="flex w-full items-start justify-between">
					<span
						className={cn(
							"font-medium",
							isCompact ? "text-[11px]" : "text-xs"
						)}>
						{label}
					</span>
					<div className="flex items-center gap-1">
						{!isPrimary && (
							<div
								role="button"
								tabIndex={0}
								onClick={(e) => {
									e.stopPropagation()
									onDelete?.()
								}}
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ") {
										e.stopPropagation()
										onDelete?.()
									}
								}}
								className="p-0.5 opacity-70 transition-opacity hover:opacity-100"
								title="Remove color scheme">
								<Trash2 className="size-3" />
							</div>
						)}
						<div
							role="button"
							tabIndex={0}
							onClick={(e) => {
								e.stopPropagation()
								setIsLocked(!isLocked)
							}}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") {
									e.stopPropagation()
									setIsLocked(!isLocked)
								}
							}}
							className="p-0.5 opacity-70 transition-opacity hover:opacity-100"
							title={isLocked ? "Unlock color" : "Lock color"}>
							{isLocked ? (
								<Lock className="size-3" />
							) : (
								<Unlock className="size-3 opacity-60" />
							)}
						</div>
					</div>
				</div>

				<div
					className={cn(
						"flex w-full flex-col",
						isCompact ? "gap-0.5" : "gap-1.5"
					)}>
					{isPrimary && (
						<Badge size="sm" color="neutral" className="w-fit">
							Main
						</Badge>
					)}
					<span
						className={cn(
							"truncate font-medium",
							isCompact ? "text-[11px]" : "text-xs"
						)}>
						{colorInfo.name}
					</span>
					<div className="flex gap-0.25">
						<div className="h-1 w-full rounded-l-full bg-current/30" />
						<div className="h-1 w-full rounded-none bg-current/30" />
						<div className="h-1 w-full rounded-none bg-current/30" />
						<div className="h-1 w-full rounded-r-full bg-current" />
					</div>
				</div>
			</button>
		</ColorPickerPopover>
	)
}

// ─── ColorSchemesPicker ────────────────────────────────────────────────────────

interface ColorSchemesPickerProps {
	primaryColor: string
	onPrimaryChange: (value: string) => void
	extraColorSchemes: string[]
	onExtraColorSchemesChange: (value: string[]) => void
}

export function ColorSchemesPicker({
	primaryColor,
	onPrimaryChange,
	extraColorSchemes,
	onExtraColorSchemesChange,
}: ColorSchemesPickerProps) {
	const inDrawer = React.useContext(ThemerDrawerContext)
	const [addOpen, setAddOpen] = React.useState(false)

	const used = new Set([primaryColor, ...extraColorSchemes])
	const nextSuggestion = PRESET_ORDER.find((p) => !used.has(p)) ?? "orange"
	const [newColorCandidate, setNewColorCandidate] =
		React.useState<string>(nextSuggestion)

	React.useEffect(() => {
		if (!addOpen) {
			setNewColorCandidate(nextSuggestion)
		}
	}, [addOpen, nextSuggestion])

	const removeColor = (index: number) => {
		onExtraColorSchemesChange(extraColorSchemes.filter((_, i) => i !== index))
	}

	const updateColor = (index: number, value: string) => {
		const next = [...extraColorSchemes]
		next[index] = value
		onExtraColorSchemesChange(next)
	}

	// Build all scheme entries: primary + extras
	const allColors = [
		{ id: "primary", value: primaryColor },
		...extraColorSchemes.map((v, i) => ({ id: String(i), value: v })),
	]

	const numColors = allColors.length
	const canAdd = numColors < MAX_COLORS
	const smallCards = allColors.slice(2) // indices 2..4 (#3, #4, #5)

	const renderPlusButton = (btnClass: string) => (
		<ColorPickerPopover
			value={newColorCandidate}
			onChange={setNewColorCandidate}
			open={addOpen}
			onOpenChange={setAddOpen}
			mode="add"
			onSelect={(chosenColor) => {
				onExtraColorSchemesChange([...extraColorSchemes, chosenColor])
				setAddOpen(false)
			}}>
			<button
				type="button"
				aria-label="Add color scheme"
				className={cn(
					"bg-fill1 border-border text-sidebar-fg/50 hover:bg-fill2 focus-visible:ring-primary flex cursor-pointer items-center justify-center rounded-lg border border-dashed transition-colors outline-none focus-visible:ring-2",
					btnClass
				)}>
				<Plus className="size-4" />
			</button>
		</ColorPickerPopover>
	)

	if (inDrawer) {
		const compactRow = numColors >= 4

		return (
			<div className="grid grid-cols-6 gap-2">
				{allColors.map(({ id, value }, index) => {
					const compact = index > 1
					return (
						<ColorSchemeCard
							key={id}
							index={index}
							value={value}
							isPrimary={index === 0}
							isCompact={compact}
							className={cn(
								compact && compactRow ? "col-span-2" : "col-span-3",
								compact ? "h-[76px]" : "h-28"
							)}
							onChange={
								index === 0
									? onPrimaryChange
									: (value) => updateColor(index - 1, value)
							}
							onDelete={index === 0 ? undefined : () => removeColor(index - 1)}
						/>
					)
				})}
				{canAdd &&
					renderPlusButton(
						numColors === 1
							? "col-span-3 h-28"
							: numColors === 2
								? "col-span-6 h-[76px]"
								: compactRow
									? "col-span-2 h-[76px]"
									: "col-span-3 h-[76px]"
					)}
			</div>
		)
	}

	return (
		<div>
			{/* State 1: 1 color (Primary + Plus in 2 columns) */}
			{numColors === 1 && (
				<div className="grid grid-cols-2 gap-2">
					<ColorSchemeCard
						index={0}
						value={allColors[0].value}
						isPrimary={true}
						className="h-[130px]"
						onChange={onPrimaryChange}
					/>
					{renderPlusButton("h-[130px] w-full")}
				</div>
			)}

			{/* State 2: 2 colors (Primary + Secondary + Plus in 3 columns) */}
			{numColors === 2 && (
				<div className="grid grid-cols-3 gap-2">
					<ColorSchemeCard
						index={0}
						value={allColors[0].value}
						isPrimary={true}
						className="h-[130px]"
						onChange={onPrimaryChange}
					/>
					<ColorSchemeCard
						index={1}
						value={allColors[1].value}
						isPrimary={false}
						className="h-[130px]"
						onDelete={() => removeColor(0)}
						onChange={(v) => updateColor(0, v)}
					/>
					{renderPlusButton("h-[130px] w-full")}
				</div>
			)}

			{/* States 3, 4, 5: 3 to 5 colors (Col 1 & 2 tall, Col 3 stacked) */}
			{numColors >= 3 && (
				<div className="grid grid-cols-3 items-stretch gap-2">
					{/* Column 1: Primary (tall) */}
					<ColorSchemeCard
						index={0}
						value={allColors[0].value}
						isPrimary={true}
						className={cn(
							"col-span-1 h-full",
							numColors <= 3 ? "min-h-[160px]" : "min-h-[244px]"
						)}
						onChange={onPrimaryChange}
					/>

					{/* Column 2: Secondary (tall) */}
					<ColorSchemeCard
						index={1}
						value={allColors[1].value}
						isPrimary={false}
						className={cn(
							"col-span-1 h-full",
							numColors <= 3 ? "min-h-[160px]" : "min-h-[244px]"
						)}
						onDelete={() => removeColor(0)}
						onChange={(v) => updateColor(0, v)}
					/>

					{/* Column 3: Stacked small cards + Plus */}
					<div
						className={cn(
							"col-span-1 flex flex-col",
							numColors === 3 ? "gap-2" : "gap-1.5"
						)}>
						{smallCards.map((scheme, i) => (
							<ColorSchemeCard
								key={scheme.id}
								index={i + 2}
								value={scheme.value}
								isPrimary={false}
								isCompact={true}
								className="h-[76px]"
								onDelete={() => removeColor(i + 1)}
								onChange={(v) => updateColor(i + 1, v)}
							/>
						))}
						{canAdd && renderPlusButton("h-[76px] w-full")}
					</div>
				</div>
			)}
		</div>
	)
}
