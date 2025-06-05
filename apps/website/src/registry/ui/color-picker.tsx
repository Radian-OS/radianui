"use client"

import React, { useEffect, useRef, useState } from "react"
import { Pipette } from "lucide-react"
import { Button, ButtonGroup } from "./button"
import { Input } from "./input"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Select, SelectItem } from "./select"

// Type definitions
interface RGBColor {
	r: number
	g: number
	b: number
}

interface HSVColor {
	h: number
	s: number
	v: number
}

type DragType = "saturation" | "hue" | "alpha" | null
export type SizeOptions = "0" | "28" | "32" | "36" | "40" | "44" | "48"
export type RoundedOptions = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
interface ColorPickerProps {
	onColorChange?: (hsv: number[], rgb: number[]) => void
	defaultColor?: {
		h?: number
		s?: number
		v?: number
		a?: number
	}
	size?: SizeOptions
	rounded?: RoundedOptions
	label?: string
	hint?: string
	hasError?: boolean
	disabled?: boolean
}

// Extend Window interface for EyeDropper API
declare global {
	interface Window {
		EyeDropper?: {
			new (): {
				open(): Promise<{ sRGBHex: string }>
			}
		}
	}
}
export const defaultInputSize = "36"
export const defaultInputRadius = "lg"

const ColorPicker: React.FC<ColorPickerProps> = ({
	label,
	disabled,
	hint,
	hasError,
	size = defaultInputSize,
	rounded = defaultInputRadius,
	onColorChange,
	defaultColor = { h: 210, s: 100, v: 100, a: 100 },
}) => {
	const [selectedColor, setSelectedColor] = useState<RGBColor>({ r: 0, g: 123, b: 255 })
	const [hue, setHue] = useState<number>(defaultColor.h || 210)
	const [saturation, setSaturation] = useState<number>(defaultColor.s || 100)
	const [value, setValue] = useState<number>(defaultColor.v || 100)
	const [alpha, setAlpha] = useState<number>(defaultColor.a || 100)
	const [isDragging, setIsDragging] = useState<DragType>(null)
	const [isEyedropperSupported, setIsEyedropperSupported] = useState<boolean>(false)
	const [colorFormat, setColorFormat] = useState<"HSL" | "RGB" | "HSV" | "HEX">("HSL")
	const [hexInput, setHexInput] = useState<string>("")

	const saturationRef = useRef<HTMLDivElement>(null)
	const hueRef = useRef<HTMLDivElement>(null)
	const alphaRef = useRef<HTMLDivElement>(null)

	// Handler for Select component
	function setSelectedValues(values: string[]): void {
		if (values.length > 0) {
			const value = values[0] as "HSL" | "RGB" | "HEX" | "HSV"
			setColorFormat(value)
		}
	}

	// Check if EyeDropper API is supported
	useEffect(() => {
		setIsEyedropperSupported("EyeDropper" in window)
	}, [])

	// Convert HSV to RGB
	const hsvToRgb = (h: number, s: number, v: number): RGBColor => {
		h /= 360
		s /= 100
		v /= 100

		const c = v * s
		const x = c * (1 - Math.abs(((h * 6) % 2) - 1))
		const m = v - c

		let r: number, g: number, b: number
		if (h < 1 / 6) {
			r = c
			g = x
			b = 0
		} else if (h < 2 / 6) {
			r = x
			g = c
			b = 0
		} else if (h < 3 / 6) {
			r = 0
			g = c
			b = x
		} else if (h < 4 / 6) {
			r = 0
			g = x
			b = c
		} else if (h < 5 / 6) {
			r = x
			g = 0
			b = c
		} else {
			r = c
			g = 0
			b = x
		}

		return {
			r: Math.round((r + m) * 255),
			g: Math.round((g + m) * 255),
			b: Math.round((b + m) * 255),
		}
	}

	// Convert RGB to HSV
	const rgbToHsv = (r: number, g: number, b: number): HSVColor => {
		r /= 255
		g /= 255
		b /= 255

		const max = Math.max(r, g, b)
		const min = Math.min(r, g, b)
		const diff = max - min

		let h = 0
		if (diff !== 0) {
			if (max === r) {
				h = ((g - b) / diff) % 6
			} else if (max === g) {
				h = (b - r) / diff + 2
			} else {
				h = (r - g) / diff + 4
			}
		}
		h = Math.round(h * 60)
		if (h < 0) h += 360

		const s = max === 0 ? 0 : Math.round((diff / max) * 100)
		const v = Math.round(max * 100)

		return { h, s, v }
	}

	// Convert hex to RGB
	const hexToRgb = (hex: string): RGBColor | null => {
		// Remove # if present and ensure 6 characters
		const cleanHex = hex.replace("#", "").toUpperCase()

		// Handle 3-character hex codes
		const fullHex =
			cleanHex.length === 3
				? cleanHex
						.split("")
						.map((char) => char + char)
						.join("")
				: cleanHex

		if (!/^[0-9A-F]{6}$/.test(fullHex)) {
			return null
		}

		const r = parseInt(fullHex.substr(0, 2), 16)
		const g = parseInt(fullHex.substr(2, 2), 16)
		const b = parseInt(fullHex.substr(4, 2), 16)

		return { r, g, b }
	}

	// Convert RGB to hex
	const rgbToHex = (r: number, g: number, b: number): string => {
		return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`.toUpperCase()
	}

	// Get current hex color
	const getCurrentHexColor = (): string => {
		return rgbToHex(selectedColor.r, selectedColor.g, selectedColor.b)
	}

	// Update hex input when color changes
	useEffect(() => {
		const hexColor = getCurrentHexColor()
		setHexInput(hexColor)
	}, [selectedColor])

	// Handle hex input change
	const handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const inputValue = e.target.value
		setHexInput(inputValue)

		// Try to parse and update color if valid hex
		const rgb = hexToRgb(inputValue)
		if (rgb) {
			const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b)
			setHue(hsv.h)
			setSaturation(hsv.s)
			setValue(hsv.v)
			setSelectedColor(rgb)
		}
	}

	// Update color when HSV values change
	useEffect(() => {
		const rgb = hsvToRgb(hue, saturation, value)
		setSelectedColor(rgb)

		// Call onColorChange callback if provided
		if (onColorChange) {
			const hsvArray = [Math.round(hue), Math.round(saturation), Math.round(value), Math.round(alpha)]
			const rgbArray = [rgb.r, rgb.g, rgb.b, Math.round(alpha)]
			onColorChange(hsvArray, rgbArray)
		}
	}, [hue, saturation, value, alpha, onColorChange])

	// Calculate saturation and value from mouse position
	const calculateSaturationAndValue = (x: number, y: number, rect: DOMRect): { saturation: number; value: number } => {
		const padding = 2
		const effectiveWidth = rect.width - 2 * padding
		const effectiveHeight = rect.height - 2 * padding

		const adjustedX = Math.max(padding, Math.min(rect.width - padding, x))
		const adjustedY = Math.max(padding, Math.min(rect.height - padding, y))

		const newSaturation = ((adjustedX - padding) / effectiveWidth) * 100
		const newValue = 100 - ((adjustedY - padding) / effectiveHeight) * 100

		return {
			saturation: Math.max(0, Math.min(100, newSaturation)),
			value: Math.max(0, Math.min(100, newValue)),
		}
	}

	// Handle mouse events for dragging
	useEffect(() => {
		const handleMouseMove = (e: MouseEvent): void => {
			if (!isDragging) return

			if (isDragging === "saturation" && saturationRef.current) {
				const rect = saturationRef.current.getBoundingClientRect()
				const x = e.clientX - rect.left
				const y = e.clientY - rect.top

				const { saturation: newSaturation, value: newValue } = calculateSaturationAndValue(x, y, rect)

				setSaturation(newSaturation)
				setValue(newValue)
			} else if (isDragging === "hue" && hueRef.current) {
				const rect = hueRef.current.getBoundingClientRect()
				const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left))
				const newHue = (x / rect.width) * 360
				setHue(newHue)
			} else if (isDragging === "alpha" && alphaRef.current) {
				const rect = alphaRef.current.getBoundingClientRect()
				const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left))
				const newAlpha = (x / rect.width) * 100
				setAlpha(newAlpha)
			}
		}

		const handleMouseUp = (): void => {
			setIsDragging(null)
		}

		if (isDragging) {
			document.addEventListener("mousemove", handleMouseMove)
			document.addEventListener("mouseup", handleMouseUp)
		}

		return () => {
			document.removeEventListener("mousemove", handleMouseMove)
			document.removeEventListener("mouseup", handleMouseUp)
		}
	}, [isDragging])

	const handleSaturationMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
		if (!saturationRef.current) return
		const rect = saturationRef.current.getBoundingClientRect()
		const x = e.clientX - rect.left
		const y = e.clientY - rect.top

		const { saturation: newSaturation, value: newValue } = calculateSaturationAndValue(x, y, rect)

		setSaturation(newSaturation)
		setValue(newValue)
		setIsDragging("saturation")
	}

	const handleHueMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
		if (!hueRef.current) return
		const rect = hueRef.current.getBoundingClientRect()
		const x = e.clientX - rect.left
		const newHue = Math.max(0, Math.min(360, (x / rect.width) * 360))
		setHue(newHue)
		setIsDragging("hue")
	}

	const handleAlphaMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
		if (!alphaRef.current) return
		const rect = alphaRef.current.getBoundingClientRect()
		const x = e.clientX - rect.left
		const newAlpha = Math.max(0, Math.min(100, (x / rect.width) * 100))
		setAlpha(newAlpha)
		setIsDragging("alpha")
	}

	// Handle eyedropper tool
	const handleEyedropper = async (): Promise<void> => {
		if (!isEyedropperSupported || !window.EyeDropper) {
			alert("EyeDropper API is not supported in this browser. Try using Chrome/Edge 95+ or Safari 16.4+")
			return
		}

		try {
			const eyeDropper = new window.EyeDropper()
			const result = await eyeDropper.open()

			if (result.sRGBHex) {
				// Convert hex to RGB
				const rgb = hexToRgb(result.sRGBHex)
				if (rgb) {
					// Convert RGB to HSV and update state
					const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b)
					setHue(hsv.h)
					setSaturation(hsv.s)
					setValue(hsv.v)
					setSelectedColor(rgb)
				}
			}
		} catch (error) {
			if (error instanceof Error && error.name !== "AbortError") {
				console.error("EyeDropper error:", error)
			}
		}
	}

	const hsvToHsl = (h: number, s: number, v: number): { h: number; s: number; l: number } => {
		s /= 100
		v /= 100

		const l = (v * (2 - s)) / 2
		const sl = l !== 0 && l !== 1 ? (v - l) / Math.min(l, 1 - l) : 0

		return {
			h: Math.round(h),
			s: Math.round(sl * 100),
			l: Math.round(l * 100),
		}
	}

	// Get HSL array
	const getHSLArray = (): number[] => {
		const hsl = hsvToHsl(hue, saturation, value)
		return [hsl.h, hsl.s, hsl.l, Math.round(alpha)]
	}

	return (
		<Popover>
			<PopoverTrigger disabled={disabled}>
				{/* Color Preview - Remove disabled prop to make it clickable */}
				<Input
					label={label}
					disabled={disabled}
					hint={hint}
					hasError={hasError}
					size={size}
					rounded={rounded}
					className="w-72"
					lead={
						<div
							className="h-5 w-5 cursor-pointer rounded"
							style={{
								backgroundColor: `rgba(${selectedColor.r}, ${selectedColor.g}, ${selectedColor.b}, ${alpha / 100})`,
							}}
						/>
					}
					value={hexInput}
					onChange={handleHexInputChange}
				/>
			</PopoverTrigger>
			<PopoverContent className="p-0">
				<div className="flex w-full flex-col gap-2 p-2">
					{/* Color Picker Area */}
					<div className="flex flex-col gap-3">
						<div
							ref={saturationRef}
							onMouseDown={handleSaturationMouseDown}
							className="h-66 relative cursor-pointer select-none rounded-sm"
							style={{
								background: `
              linear-gradient(to bottom, transparent, black),
              linear-gradient(to right, white, hsl(${hue}, 100%, 50%))
            `,
							}}>
							{/* Color picker dot */}

							<div
								className="pointer-events-none absolute h-4 w-4 -translate-x-2 -translate-y-2 transform rounded-full border-2 border-white shadow-lg"
								style={{
									left: `${saturation}%`,
									top: `${100 - value}%`,
									backgroundColor: "transparent",
									borderWidth: "4px",
									borderColor: "white",
									boxShadow: "0 0 0 1px rgba(0,0,0,0.2), 0 2px 4px rgba(0,0,0,0.3)",
								}}></div>
						</div>

						{/* Color Palette Icon and Eyedropper */}
						<div className="flex w-full items-center gap-3">
							{/* Eyedropper Tool */}
							<div
								onClick={handleEyedropper}
								className={`flex h-9 w-9 items-center justify-center rounded p-2 transition-colors ${
									isEyedropperSupported ? "bg-border-alpha text-text-secondary cursor-pointer" : "cursor-not-allowed bg-gray-800 text-gray-600"
								}`}
								title={isEyedropperSupported ? "Pick color from screen" : "EyeDropper not supported in this browser"}>
								<Pipette className="h-5 w-5" />
							</div>
							<div className="flex w-full flex-col gap-2">
								<div className="flex items-center">
									{/* Hue Slider */}
									<div
										ref={hueRef}
										onMouseDown={handleHueMouseDown}
										className="relative h-4 flex-1 cursor-pointer select-none rounded-full shadow-lg"
										style={{
											background: "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
										}}>
										<div
											className="pointer-events-none absolute h-4 w-4 -translate-x-2 -translate-y-0 transform rounded-full"
											style={{
												left: `calc(8px + ${hue / 360} * (100% - 16px))`,
												backgroundColor: "transparent",
												borderWidth: "4px",
												borderColor: "white",
												boxShadow: "0 0 0 1px rgba(0,0,0,0.2), 0 2px 4px rgba(0,0,0,0.3)",
											}}
										/>
									</div>
								</div>

								{/* Alpha Slider */}
								<div className="relative">
									{/* Checkerboard background for transparency */}
									<div
										className="absolute inset-0 h-4 rounded-full"
										style={{
											backgroundImage: `url("data:image/svg+xml,%3csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='checkerboard' x='0' y='0' width='20' height='20' patternUnits='userSpaceOnUse'%3e%3crect fill='%23cccccc' x='0' width='10' height='10' y='0'/%3e%3crect fill='%23cccccc' x='10' width='10' height='10' y='10'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='url(%23checkerboard)' /%3e%3c/svg%3e")`,
											backgroundSize: "20px 20px",
										}}
									/>
									<div
										ref={alphaRef}
										onMouseDown={handleAlphaMouseDown}
										className="relative h-4 w-full cursor-pointer select-none overflow-hidden rounded-full shadow-lg"
										style={{
											background: `linear-gradient(to right, transparent, hsl(${hue}, ${saturation}%, ${value / 2}%))`,
										}}>
										<div
											className="pointer-events-none absolute h-4 w-4 -translate-x-2 -translate-y-0 transform rounded-full"
											style={{
												left: `calc(8px + ${alpha / 100} * (100% - 16px))`,
												backgroundColor: "transparent",
												borderWidth: "4px",
												borderColor: "white",
												boxShadow: "0 0 0 1px rgba(0,0,0,0.2), 0 2px 4px rgba(0,0,0,0.3)",
											}}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="flex items-center gap-4 p-2 pl-0">
						<Select size="32" selectedValues={[colorFormat]} onSelectedChange={setSelectedValues}>
							<SelectItem value="HSV">HSV</SelectItem>
							<SelectItem value="HSL">HSL</SelectItem>
							<SelectItem value="RGB">RGB</SelectItem>
						</Select>
						<div className="text-text-secondary font-mono text-sm">
							{colorFormat === "HSV" && (
								<ButtonGroup variant="neutral-outline" size="32" color="primary">
									<Button className="w-10">{Math.round(hue)}</Button>
									<Button className="w-10">{Math.round(saturation)}</Button>
									<Button className="w-10">{Math.round(value)}</Button>
									<Button className="w-10">{Math.round(alpha)}%</Button>
								</ButtonGroup>
							)}
							{colorFormat === "RGB" && (
								<ButtonGroup variant="neutral-outline" size="32" color="primary">
									<Button className="w-10">{selectedColor.r}</Button>
									<Button className="w-10">{selectedColor.g}</Button>
									<Button className="w-10">{selectedColor.b}</Button>
									<Button className="w-10">{Math.round(alpha)}%</Button>
								</ButtonGroup>
							)}
							{colorFormat === "HSL" && (
								<ButtonGroup variant="neutral-outline" size="32" color="primary">
									<Button className="w-10">{getHSLArray()[0]}</Button>
									<Button className="w-10">{getHSLArray()[1]}</Button>
									<Button className="w-10">{getHSLArray()[2]}</Button>
									<Button className="w-10">{Math.round(alpha)}%</Button>
								</ButtonGroup>
							)}
						</div>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	)
}

export default ColorPicker
