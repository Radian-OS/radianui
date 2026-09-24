"use client"

import * as React from "react"
import { converter, formatHex, parse } from "culori"
import { Input } from "@/styles/default/ui/input"
import { Button } from "@/styles/default/ui/button"

const toHsv = converter("hsv")

interface CustomColorPickerProps {
	color: string
	onChange: (color: string) => void
	colorName?: string
}

export function CustomColorPicker({
	color,
	onChange,
	colorName = "Custom Color",
}: CustomColorPickerProps) {
	// Internal HSV state for smooth dragging without precision loss from hex conversions
	const [hsvState, setHsvState] = React.useState({ h: 0, s: 0, v: 1 })
	const [hexInput, setHexInput] = React.useState(color)
	const [copied, setCopied] = React.useState(false)

	const svAreaRef = React.useRef<HTMLDivElement>(null)

	// Sync from external color when it changes significantly
	React.useEffect(() => {
		if (color && color !== formatHex({ mode: "hsv", ...hsvState })) {
			const parsed = parse(color)
			if (parsed) {
				const hsvVal = toHsv(parsed)
				setHsvState({
					h: hsvVal.h || 0,
					s: hsvVal.s || 0,
					v: hsvVal.v || 0,
				})
				setHexInput(formatHex(parsed) || color)
			}
		}
	}, [color])

	const handleSvPointerDown = (e: React.PointerEvent) => {
		if (!svAreaRef.current) return
		const rect = svAreaRef.current.getBoundingClientRect()

		const updateSv = (clientX: number, clientY: number) => {
			let x = Math.max(0, Math.min(clientX - rect.left, rect.width))
			let y = Math.max(0, Math.min(clientY - rect.top, rect.height))

			const newS = x / rect.width
			const newV = 1 - y / rect.height

			const newHsv = { ...hsvState, s: newS, v: newV }
			setHsvState(newHsv)

			const newHex = formatHex({ mode: "hsv", ...newHsv }) || "#000000"
			setHexInput(newHex)
			onChange(newHex)
		}

		updateSv(e.clientX, e.clientY)

		const handlePointerMove = (moveEvent: PointerEvent) => {
			updateSv(moveEvent.clientX, moveEvent.clientY)
		}

		const handlePointerUp = () => {
			window.removeEventListener("pointermove", handlePointerMove)
			window.removeEventListener("pointerup", handlePointerUp)
		}

		window.addEventListener("pointermove", handlePointerMove)
		window.addEventListener("pointerup", handlePointerUp)
	}

	const handleHueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newH = parseFloat(e.target.value)
		const newHsv = { ...hsvState, h: newH }
		setHsvState(newHsv)
		const newHex = formatHex({ mode: "hsv", ...newHsv }) || "#000000"
		setHexInput(newHex)
		onChange(newHex)
	}

	const handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value
		setHexInput(val)
		if (/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(val)) {
			const parsed = parse(val)
			if (parsed) {
				const hsvVal = toHsv(parsed)
				setHsvState({
					h: hsvVal.h || 0,
					s: hsvVal.s || 0,
					v: hsvVal.v || 0,
				})
				onChange(val)
			}
		}
	}

	const handleCopy = () => {
		navigator.clipboard.writeText(hexInput)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	// Hue color for the background of the SV area
	const hueColor =
		formatHex({ mode: "hsv", h: hsvState.h, s: 1, v: 1 }) || "#ff0000"

	return (
		<div className="flex flex-col gap-4 p-1">
			{/* SV Area */}
			<div
				ref={svAreaRef}
				onPointerDown={handleSvPointerDown}
				className="relative h-48 w-full cursor-crosshair touch-none overflow-hidden rounded-md"
				style={{ backgroundColor: hueColor }}>
				{/* White gradient (saturation) */}
				<div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white to-transparent" />
				{/* Black gradient (value) */}
				<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black to-transparent" />
				{/* Dragger */}
				<div
					className="pointer-events-none absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.1),inset_0_0_0_1px_rgba(0,0,0,0.1)] transition-none"
					style={{
						left: `${hsvState.s * 100}%`,
						top: `${(1 - hsvState.v) * 100}%`,
					}}
				/>
			</div>

			{/* Hue Slider */}
			<div className="relative flex h-4 w-full items-center">
				<input
					type="range"
					min="0"
					max="360"
					step="0.1"
					value={hsvState.h}
					onChange={handleHueChange}
					className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
				/>
				<div
					className="pointer-events-none h-3 w-full rounded-full"
					style={{
						background:
							"linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)",
					}}
				/>
				{/* Hue Dragger */}
				<div
					className="pointer-events-none absolute h-5 w-5 -translate-x-1/2 rounded-full border-2 border-white bg-white shadow-sm"
					style={{
						left: `${(hsvState.h / 360) * 100}%`,
						backgroundColor: hueColor,
					}}
				/>
			</div>

			<div className="mt-1 flex flex-col gap-3">
				{/* Hex Input Row */}
				<div className="flex items-center gap-3">
					<span className="text-fg-tertiary w-10 text-xs font-medium">Hex</span>
					<div className="relative flex-1">
						<Input
							value={hexInput}
							onChange={handleHexInputChange}
							className="bg-elevation-level2 h-8 border-transparent pr-16 font-mono text-sm uppercase"
							spellCheck={false}
						/>
						<Button
							size="28"
							variant="ghost"
							color="neutral"
							className="bg-elevation-level3 hover:bg-elevation-level4 absolute top-1 right-1 h-6 px-2 text-[11px]"
							onClick={handleCopy}>
							{copied ? "Copied" : "Copy"}
						</Button>
					</div>
				</div>

				{/* Name Row */}
				<div className="flex items-center gap-3">
					<span className="text-fg-tertiary w-10 text-xs font-medium">
						Name
					</span>
					<Input
						value={colorName}
						readOnly
						className="bg-elevation-level2 h-8 border-transparent text-sm"
					/>
				</div>
			</div>
		</div>
	)
}
