"use client"

import React, { useEffect, useRef, useState } from "react"
import { oklch, rgb } from "culori"
import { Pipette } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input, InputGroup, InputWrapper } from "./input"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"

// Type definitions
type RGBColor = {
	r: number
	g: number
	b: number
}

type HSVColor = {
	h: number
	s: number
	v: number
}

type DragType = "saturation" | "hue" | "alpha" | null
export type SizeOptions = "28" | "32" | "36" | "40" | "44" | "48"
type ColorPickerProps = {
	onColorChange?: (hsv: number[], rgb: number[], hex: string) => void
	defaultColor?:
		| string
		| {
				h?: number
				s?: number
				v?: number
				a?: number
		  }
	size?: SizeOptions
	label?: string
	hint?: string
	hasError?: boolean
	disabled?: boolean
	inputFormat?: "HEX" | "HSL" | "OKLCH" | "HSB" | "RGBA"
	onInputFormatChange?: (format: "HEX" | "HSL" | "OKLCH" | "HSB" | "RGBA") => void
	className?: string
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
	size = defaultInputSize,
	onColorChange,
	defaultColor = "#007BFF",
	inputFormat: externalInputFormat = "HEX",
	onInputFormatChange,
	className,
	disabled = false,
	hasError = false,
}) => {
	// Initialize color values from defaultColor
	useEffect(() => {
		if (typeof defaultColor === "string") {
			// Handle hex string
			const rgb = hexToRgb(defaultColor)
			if (rgb) {
				const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b)
				setHue(hsv.h)
				setSaturation(hsv.s)
				setValue(hsv.v)
				setAlpha(100) // Default alpha to 100%
			}
		} else {
			// Handle HSV object (existing behavior)
			setHue(defaultColor.h || 210)
			setSaturation(defaultColor.s || 100)
			setValue(defaultColor.v || 100)
			setAlpha(defaultColor.a || 100)
		}
	}, [])

	const [internalInputFormat, setInternalInputFormat] = useState<"HEX" | "HSL" | "OKLCH" | "HSB" | "RGBA">(externalInputFormat)
	const inputFormat = onInputFormatChange ? externalInputFormat : internalInputFormat
	const setInputFormat = onInputFormatChange ? onInputFormatChange : setInternalInputFormat
	const [selectedColor, setSelectedColor] = useState<RGBColor>({ r: 0, g: 123, b: 255 })
	const [hue, setHue] = useState<number>(0)
	const [saturation, setSaturation] = useState<number>(0)
	const [value, setValue] = useState<number>(0)
	const [alpha, setAlpha] = useState<number>(0)
	const [isDragging, setIsDragging] = useState<DragType>(null)
	const [isEyedropperSupported, setIsEyedropperSupported] = useState<boolean>(false)
	const [displayFormat, setDisplayFormat] = useState<"HSL" | "RGB" | "HSV" | "HEX">("HSL")
	const [inputValue, setInputValue] = useState<string>("")
	const [lastValidColor, setLastValidColor] = useState<string>("")
	const [isUserTyping, setIsUserTyping] = useState<boolean>(false)
	const [colorChangeSource, setColorChangeSource] = useState<"picker" | "input" | "initial">("initial")
	const [userHexInput, setUserHexInput] = useState<string>("")

	// Add these new state variables after your existing useState declarations:
	const [userOklchInput, setUserOklchInput] = useState<string>("")
	const [, setOklchValues] = useState({ l: 0, c: 0, h: 0 })

	const saturationRef = useRef<HTMLDivElement>(null)
	const hueRef = useRef<HTMLDivElement>(null)
	const alphaRef = useRef<HTMLDivElement>(null)

	const [displayValues, setDisplayValues] = useState({
		hsv: { h: "", s: "", v: "", a: "" },
		rgb: { r: "", g: "", b: "", a: "" },
		hsl: { h: "", s: "", l: "", a: "" },
		hex: { raw: "", formatted: "" },
	})

	// Add these new handler functions:
	const updateDisplayValues = () => {
		const rgb = hsvToRgb(hue, saturation, value)
		const hsl = hsvToHsl(hue, saturation, value)

		setDisplayValues((prev) => ({
			...prev,
			hsv: {
				h: Math.round(hue).toString(),
				s: Math.round(saturation).toString(),
				v: Math.round(value).toString(),
				a: Math.round(alpha).toString(),
			},
			rgb: {
				r: rgb.r.toString(),
				g: rgb.g.toString(),
				b: rgb.b.toString(),
				a: Math.round(alpha).toString(),
			},
			hsl: {
				h: Math.round(hsl.h).toString(),
				s: Math.round(hsl.s).toString(),
				l: Math.round(hsl.l).toString(),
				a: Math.round(alpha).toString(),
			},
			// Only update formatted hex, keep raw value if user is typing
			hex: {
				...prev.hex,
				formatted: userHexInput && validateInput(userHexInput) ? userHexInput : rgbToHex(rgb.r, rgb.g, rgb.b),
			},
		}))
	}

	const handleDisplayValueChange = (format: "hsv" | "rgb" | "hsl", component: string, value: string) => {
		// Set colorChangeSource to "input" when user starts typing
		setColorChangeSource("input")

		// Update the display values state
		setDisplayValues((prev) => ({
			...prev,
			[format]: {
				...prev[format],
				[component]: value,
			},
		}))
	}

	const handleDisplayValueBlur = (format: "hsv" | "rgb" | "hsl", component: string) => {
		const currentValue = displayValues[format][component as keyof (typeof displayValues)[typeof format]]
		const numValue = parseInt(currentValue) || 0

		setColorChangeSource("input")

		if (format === "hsv") {
			switch (component) {
				case "h":
					setHue(Math.max(0, Math.min(360, numValue)))
					break
				case "s":
					setSaturation(Math.max(0, Math.min(100, numValue)))
					break
				case "v":
					setValue(Math.max(0, Math.min(100, numValue)))
					break
				case "a":
					setAlpha(Math.max(0, Math.min(100, numValue)))
					break
			}
		} else if (format === "rgb") {
			let newR = selectedColor.r
			let newG = selectedColor.g
			let newB = selectedColor.b

			switch (component) {
				case "r":
					newR = Math.max(0, Math.min(255, numValue))
					break
				case "g":
					newG = Math.max(0, Math.min(255, numValue))
					break
				case "b":
					newB = Math.max(0, Math.min(255, numValue))
					break
				case "a":
					setAlpha(Math.max(0, Math.min(100, numValue)))
					return
			}

			const hsv = rgbToHsv(newR, newG, newB)
			setHue(hsv.h)
			setSaturation(hsv.s)
			setValue(hsv.v)
		} else if (format === "hsl") {
			const currentHsl = hsvToHsl(hue, saturation, value)
			let newH = currentHsl.h
			let newS = currentHsl.s
			let newL = currentHsl.l

			switch (component) {
				case "h":
					newH = Math.max(0, Math.min(360, numValue))
					break
				case "s":
					newS = Math.max(0, Math.min(100, numValue))
					break
				case "l":
					newL = Math.max(0, Math.min(100, numValue))
					break
				case "a":
					setAlpha(Math.max(0, Math.min(100, numValue)))
					return
			}

			const rgb = hslToRgb(newH, newS, newL)
			const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b)
			setHue(hsv.h)
			setSaturation(hsv.s)
			setValue(hsv.v)
		}

		// Reset colorChangeSource after a brief delay to allow picker updates again
		setTimeout(() => {
			setColorChangeSource("initial")
		}, 100)
	}

	// Add this useEffect to update display values when color changes
	useEffect(() => {
		// Always update display values unless the change came from typing in display inputs
		if (colorChangeSource !== "input") {
			updateDisplayValues()
		}
	}, [hue, saturation, value, alpha])

	// Separate useEffect to reset colorChangeSource
	useEffect(() => {
		if (colorChangeSource === "picker") {
			// Reset after a brief delay to ensure display values are updated
			const timer = setTimeout(() => {
				setColorChangeSource("initial")
			}, 0)
			return () => clearTimeout(timer)
		}
	}, [colorChangeSource])

	// Initialize display values on mount
	useEffect(() => {
		updateDisplayValues()
	}, [])

	// Handler for Display Format Select component
	function setDisplayFormatValues(value: string): void {
		setDisplayFormat(value as "HSL" | "RGB" | "HEX" | "HSV")
	}

	// Handler for Input Format Select component
	function setInputFormatValues(_value: string): void {
		const value = _value as "HEX" | "HSL" | "OKLCH" | "HSB" | "RGBA"
		setInputFormat(value)
		// Update input value to match new format
		updateInputValue(value)
		// Notify parent component if callback exists
		if (onInputFormatChange) {
			onInputFormatChange(value)
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

	const hexToRgb = (hex: string): RGBColor | null => {
		const cleanHex = hex.replace("#", "").toUpperCase()

		// Allow partial 3-digit hex
		if (cleanHex.length === 3) {
			const expanded = cleanHex
				.split("")
				.map((c) => c + c)
				.join("")
			return {
				r: parseInt(expanded.substring(0, 2), 16),
				g: parseInt(expanded.substring(2, 4), 16),
				b: parseInt(expanded.substring(4, 6), 16),
			}
		}

		// Allow partial 6-digit hex (pads with 0)
		if (cleanHex.length > 0 && cleanHex.length <= 6) {
			const padded = cleanHex.padEnd(6, "0")
			return {
				r: parseInt(padded.substring(0, 2), 16),
				g: parseInt(padded.substring(2, 4), 16),
				b: parseInt(padded.substring(4, 6), 16),
			}
		}

		return null
	}

	// Convert RGB to hex
	const rgbToHex = (r: number, g: number, b: number): string => {
		return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`.toUpperCase()
	}
	const rgbToOklch = (r: number, g: number, b: number): string => {
		// Convert RGB to OKLCH using Culori
		const oklchColor = oklch({ mode: "rgb", r: r / 255, g: g / 255, b: b / 255 })

		if (!oklchColor || oklchColor.l === undefined) {
			return "oklch(0 0 0)"
		}

		// Format with proper precision
		const l = oklchColor.l.toFixed(4)
		const c = (oklchColor.c || 0).toFixed(4)
		const h = oklchColor.h ? oklchColor.h.toFixed(2) : "0"

		return `oklch(${l} ${c} ${h})`
	}

	// Convert HSL to RGB
	const hslToRgb = (h: number, s: number, l: number): RGBColor => {
		h /= 360
		s /= 100
		l /= 100

		const c = (1 - Math.abs(2 * l - 1)) * s
		const x = c * (1 - Math.abs(((h * 6) % 2) - 1))
		const m = l - c / 2

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

	// Parse input value and update color state
	const parseInputValue = (value: string): boolean => {
		try {
			switch (inputFormat) {
				case "HEX": {
					const rgb = hexToRgb(value)
					if (rgb) {
						const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b)
						setHue(hsv.h)
						setSaturation(hsv.s)
						setValue(hsv.v)
						// Preserve the user's exact hex input
						const normalizedHex = value.startsWith("#") ? value.toUpperCase() : "#" + value.toUpperCase()
						setUserHexInput(normalizedHex)
						return true
					}
					break
				}
				case "HSL": {
					const match = value.match(/hsl\(\s*(\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?\s*\)/i)
					if (match) {
						const h = parseInt(match[1])
						const s = parseInt(match[2])
						const l = parseInt(match[3])
						const rgb = hslToRgb(h, s, l)
						const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b)
						setHue(hsv.h)
						setSaturation(hsv.s)
						setValue(hsv.v)
						return true
					}
					break
				}
				case "HSB": {
					const match = value.match(/hsb\(\s*(\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?\s*\)/i)
					if (match) {
						const h = parseInt(match[1])
						const s = parseInt(match[2])
						const v = parseInt(match[3])
						setHue(h)
						setSaturation(s)
						setValue(v)
						return true
					}
					break
				}
				case "RGBA": {
					const match = value.match(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+(?:\.\d+)?|\.\d+)\s*\)/i)
					if (match) {
						const r = parseInt(match[1])
						const g = parseInt(match[2])
						const b = parseInt(match[3])
						const a = parseFloat(match[4]) * 100
						const hsv = rgbToHsv(r, g, b)
						setHue(hsv.h)
						setSaturation(hsv.s)
						setValue(hsv.v)
						setAlpha(Math.round(a))
						return true
					}
					break
				}
				// Convert OKLCH to RGB (accurate implementation)
				case "OKLCH": {
					// More flexible OKLCH parsing - handles both comma-separated and space-separated formats
					const match =
						value.match(/oklch\(\s*(\d*\.?\d*)%?\s*[,\s]\s*(\d*\.?\d*)%?\s*[,\s]\s*(\d*\.?\d*)%?\s*\)/i) ||
						value.match(/oklch\(\s*(\d*\.?\d*)%?\s*(\d*\.?\d*)%?\s*(\d*\.?\d*)%?\s*\)/i)

					if (match) {
						// Handle partial inputs by providing defaults
						const lightness = parseFloat(match[1]) || 0
						const chroma = parseFloat(match[2]) || 0
						const hue = parseFloat(match[3]) || 0

						// Store original OKLCH values
						setOklchValues({ l: lightness, c: chroma, h: hue })
						setUserOklchInput(value)

						// Normalize lightness if it's given as percentage > 1
						const normalizedLightness = lightness > 1 ? lightness / 100 : lightness

						// Convert OKLCH to RGB using Culori
						const rgbColor = rgb({
							mode: "oklch",
							l: normalizedLightness,
							c: chroma,
							h: hue,
						})

						if (rgbColor && rgbColor.r !== undefined && rgbColor.g !== undefined && rgbColor.b !== undefined) {
							const rgbValues = {
								r: Math.max(0, Math.min(255, Math.round(rgbColor.r * 255))),
								g: Math.max(0, Math.min(255, Math.round(rgbColor.g * 255))),
								b: Math.max(0, Math.min(255, Math.round(rgbColor.b * 255))),
							}

							const hsv = rgbToHsv(rgbValues.r, rgbValues.g, rgbValues.b)
							setHue(hsv.h)
							setSaturation(hsv.s)
							setValue(hsv.v)
							return true
						}
					}
					break
				}
			}
		} catch (error) {
			console.error("Error parsing color input:", error)
		}
		return false
	}

	// Update input value based on current color and format
	const updateInputValue = (format: "HEX" | "HSL" | "OKLCH" | "HSB" | "RGBA") => {
		// For HEX format, preserve user's exact input if it's valid
		if (format === "HEX" && userHexInput && validateInput(userHexInput)) {
			setInputValue(userHexInput)
			setLastValidColor(userHexInput)
			return
		}

		const rgb = hsvToRgb(hue, saturation, value)
		let newValue = ""

		switch (format) {
			case "HEX":
				newValue = rgbToHex(rgb.r, rgb.g, rgb.b)
				break
			case "HSL":
				const hsl = hsvToHsl(hue, saturation, value)
				newValue = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
				break
			case "OKLCH":
				if (userOklchInput && validateInput(userOklchInput) && inputFormat === "OKLCH") {
					newValue = userOklchInput
				} else {
					newValue = rgbToOklch(rgb.r, rgb.g, rgb.b)
				}
				break
			case "HSB": // Same as HSV
				newValue = `hsb(${Math.round(hue)}, ${Math.round(saturation)}%, ${Math.round(value)}%)`
				break
			case "RGBA":
				newValue = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${(alpha / 100).toFixed(2)})`
				break
		}

		setInputValue(newValue)
		setLastValidColor(newValue)
	}

	const clearUserInputs = () => {
		setUserHexInput("")
		setUserOklchInput("")
	}

	const validateInput = (value: string): boolean => {
		switch (inputFormat) {
			case "HEX":
				return /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/i.test(value)
			case "HSL":
				return /^hsl\(\s*\d+\s*,\s*\d+%?\s*,\s*\d+%?\s*\)$/i.test(value)
			case "OKLCH":
				return /^oklch\(\s*\d*\.?\d*%?\s*,?\s*\d*\.?\d*%?\s*,?\s*\d*\.?\d*%?\s*\)$/i.test(value) || /^oklch\(\s*\d*\.?\d*\s+\d*\.?\d*\s+\d*\.?\d*\s*\)$/i.test(value)
			case "HSB":
				return /^hsb\(\s*\d+\s*,\s*\d+%?\s*,\s*\d+%?\s*\)$/i.test(value)
			case "RGBA":
				return /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*(\d+(\.\d+)?|\.\d+)\s*\)$/i.test(value)
			default:
				return false
		}
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsUserTyping(true)
		setInputValue(e.target.value)
	}

	const handleInputBlur = () => {
		setIsUserTyping(false)
		if (!validateInput(inputValue)) {
			// Revert to last valid color if invalid
			setInputValue(lastValidColor)
		} else {
			// Parse and apply the new color
			const parsed = parseInputValue(inputValue)
			if (parsed) {
				setLastValidColor(inputValue)
			} else {
				setInputValue(lastValidColor)
			}
		}
	}

	const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
		if (e.key === "Enter") {
			setIsUserTyping(false)
			if (!validateInput(inputValue)) {
				setInputValue(lastValidColor)
			} else {
				const parsed = parseInputValue(inputValue)
				if (parsed) {
					setLastValidColor(inputValue)
				} else {
					setInputValue(lastValidColor)
				}
			}
			;(e.target as HTMLInputElement).blur()
		}
	}

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
		const handleMove = (e: MouseEvent | TouchEvent): void => {
			if (!isDragging) return

			if ("touches" in e) {
				e.preventDefault()
			}

			// Get coordinates from either mouse or touch event
			const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
			const clientY = "touches" in e ? e.touches[0].clientY : e.clientY

			if (isDragging === "saturation" && saturationRef.current) {
				const rect = saturationRef.current.getBoundingClientRect()
				const x = clientX - rect.left
				const y = clientY - rect.top

				const { saturation: newSaturation, value: newValue } = calculateSaturationAndValue(x, y, rect)

				setSaturation(newSaturation)
				setValue(newValue)
			} else if (isDragging === "hue" && hueRef.current) {
				const rect = hueRef.current.getBoundingClientRect()
				const x = Math.max(0, Math.min(rect.width, clientX - rect.left))
				const newHue = (x / rect.width) * 360
				setHue(newHue)
			} else if (isDragging === "alpha" && alphaRef.current) {
				const rect = alphaRef.current.getBoundingClientRect()
				const x = Math.max(0, Math.min(rect.width, clientX - rect.left))
				const newAlpha = (x / rect.width) * 100
				setAlpha(newAlpha)
			}
		}

		const handleEnd = (): void => {
			setIsDragging(null)
		}

		if (isDragging) {
			// Add both mouse and touch event listeners
			document.addEventListener("mousemove", handleMove)
			document.addEventListener("mouseup", handleEnd)
			document.addEventListener("touchmove", handleMove, { passive: false })
			document.addEventListener("touchend", handleEnd)
		}

		return () => {
			document.removeEventListener("mousemove", handleMove)
			document.removeEventListener("mouseup", handleEnd)
			document.removeEventListener("touchmove", handleMove)
			document.removeEventListener("touchend", handleEnd)
		}
	}, [isDragging])

	const handleSaturationInteraction = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>): void => {
		e.preventDefault() // Prevent scrolling on mobile
		clearUserInputs()

		if (!saturationRef.current) return
		const rect = saturationRef.current.getBoundingClientRect()

		// Get coordinates from either mouse or touch event
		const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
		const clientY = "touches" in e ? e.touches[0].clientY : e.clientY

		const x = clientX - rect.left
		const y = clientY - rect.top

		const { saturation: newSaturation, value: newValue } = calculateSaturationAndValue(x, y, rect)

		setSaturation(newSaturation)
		setValue(newValue)
		setIsDragging("saturation")
	}

	const handleHueInteraction = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>): void => {
		e.preventDefault() // Prevent scrolling on mobile
		clearUserInputs()
		if (!hueRef.current) return
		const rect = hueRef.current.getBoundingClientRect()

		// Get coordinates from either mouse or touch event
		const clientX = "touches" in e ? e.touches[0].clientX : e.clientX

		const x = clientX - rect.left
		const newHue = Math.max(0, Math.min(360, (x / rect.width) * 360))
		setHue(newHue)
		setIsDragging("hue")
	}

	const handleAlphaInteraction = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>): void => {
		e.preventDefault() // Prevent scrolling on mobile
		clearUserInputs()
		if (!alphaRef.current) return
		const rect = alphaRef.current.getBoundingClientRect()

		// Get coordinates from either mouse or touch event
		const clientX = "touches" in e ? e.touches[0].clientX : e.clientX

		const x = clientX - rect.left
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
				const rgb = hexToRgb(result.sRGBHex)
				if (rgb) {
					const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b)
					setHue(hsv.h)
					setSaturation(hsv.s)
					setValue(hsv.v)
					setSelectedColor(rgb)

					// Update the input value and last valid color
					const hexValue = rgbToHex(rgb.r, rgb.g, rgb.b)
					setInputValue(hexValue)
					setLastValidColor(hexValue)
					setUserHexInput(hexValue)

					// Force update display values
					updateDisplayValues()
					setColorChangeSource("picker")
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
	// const getHSLArray = (): number[] => {
	// 	const hsl = hsvToHsl(hue, saturation, value)
	// 	return [hsl.h, hsl.s, hsl.l, Math.round(alpha)]
	// }

	useEffect(() => {
		const rgb = hsvToRgb(hue, saturation, value)
		setSelectedColor(rgb)

		if (onColorChange) {
			onColorChange([Math.round(hue), Math.round(saturation), Math.round(value), Math.round(alpha)], [rgb.r, rgb.g, rgb.b, Math.round(alpha)], rgbToHex(rgb.r, rgb.g, rgb.b))
		}

		// Only update input value if user is not currently typing
		if (!isUserTyping) {
			updateInputValue(inputFormat)
		}
	}, [hue, saturation, value, alpha, inputFormat, isUserTyping])

	type DisplayValues = {
		hsv: { h: string; s: string; v: string; a: string }
		rgb: { r: string; g: string; b: string; a: string }
		hsl: { h: string; s: string; l: string; a: string }
	}

	const formats = {
		HSV: ["h", "s", "v", "a"],
		RGB: ["r", "g", "b", "a"],
		HSL: ["h", "s", "l", "a"],
	} as const

	type FormatKey = keyof typeof formats

	return (
		<Popover>
			{/* Color Preview */}
			<InputWrapper size={size} className={className} disabled={disabled} aria-invalid={hasError}>
				<PopoverTrigger disabled={disabled}>
					<div
						className="relative h-5 w-5 cursor-pointer overflow-hidden rounded-[2px]"
						style={{
							backgroundImage: `url("data:image/svg+xml,%3csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='checkerboard' x='0' y='0' width='20' height='20' patternUnits='userSpaceOnUse'%3e%3crect fill='%23cccccc' x='0' width='10' height='10' y='0'/%3e%3crect fill='%23cccccc' x='10' width='10' height='10' y='10'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='url(%23checkerboard)' /%3e%3c/svg%3e")`,
							backgroundSize: "20px 20px", // Smaller pattern for better visibility at 20px size
						}}>
						{/* Color overlay that respects alpha */}
						<div
							className="absolute inset-0 h-full w-full"
							style={{
								backgroundColor: `rgba(${selectedColor.r}, ${selectedColor.g}, ${selectedColor.b}, ${alpha / 100})`,
							}}
						/>
					</div>
				</PopoverTrigger>
				<Input value={inputValue} disabled={disabled} onChange={handleInputChange} onBlur={handleInputBlur} onKeyPress={handleInputKeyPress} />
			</InputWrapper>

			<PopoverContent alignOffset={-11} className="p-0" sideOffset={14}>
				<div className="flex w-full flex-col gap-2 p-2">
					{/* Color Picker Area */}
					<div className="flex flex-col gap-3">
						<div
							ref={saturationRef}
							onMouseDown={handleSaturationInteraction}
							onTouchStart={handleSaturationInteraction}
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
								className={`flex h-9 w-9 items-center justify-center rounded-sm p-2 transition-colors ${
									isEyedropperSupported ? "bg-border-alpha text-fg-secondary cursor-pointer" : "bg-text-disabled text-fg-disabled cursor-not-allowed"
								}`}
								// title={isEyedropperSupported ? "Pick color from screen" : "EyeDropper not supported in this browser"}
							>
								<Pipette className="h-5 w-5" />
							</div>
							<div className="flex w-full flex-col gap-2">
								<div className="flex items-center">
									{/* Hue Slider */}
									<div
										ref={hueRef}
										onMouseDown={handleHueInteraction}
										onTouchStart={handleHueInteraction}
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
										onTouchStart={handleAlphaInteraction}
										onMouseDown={handleAlphaInteraction}
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

					<div className="flex w-full items-center gap-1">
						{/* Format Selectors */}
						<div className="flex items-center p-2 pl-0">
							<Select value={displayFormat} onValueChange={setDisplayFormatValues}>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="HSV">HSB</SelectItem>
									<SelectItem value="HSL">HSL</SelectItem>
									<SelectItem value="RGB">RGB</SelectItem>
									<SelectItem value="HEX">HEX</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="hidden">
							<Select value={inputFormat} onValueChange={setInputFormatValues}>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="HEX">HEX</SelectItem>
									<SelectItem value="HSL">HSL</SelectItem>
									<SelectItem value="OKLCH">OKLCH</SelectItem>
									<SelectItem value="HSB">HSB</SelectItem>
									<SelectItem value="RGBA">RGBA</SelectItem>
								</SelectContent>
							</Select>
						</div>

						{/* Color Values Display */}
						<div className="text-fg-secondary font-mono text-sm">
							{displayFormat === "HEX" && (
								<Input
									value={isUserTyping ? displayValues.hex.raw : displayValues.hex.formatted}
									onChange={(e) => {
										const value = e.target.value.replace("#", "")
										setIsUserTyping(true)
										setDisplayValues((prev) => ({
											...prev,
											hex: {
												...prev.hex,
												raw: value,
											},
										}))
									}}
									onBlur={() => {
										setIsUserTyping(false)
										// Validate the HEX value
										const rgb = hexToRgb(displayValues.hex.raw)
										if (rgb) {
											const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b)
											setHue(hsv.h)
											setSaturation(hsv.s)
											setValue(hsv.v)
											// FIXED: Keep user's exact input - don't convert back to RGB->HEX
											const userHex = displayValues.hex.raw.startsWith("#") ? displayValues.hex.raw.toUpperCase() : "#" + displayValues.hex.raw.toUpperCase()
											setUserHexInput(userHex)
											setColorChangeSource("input")
											// Keep the exact user input instead of converting
											setDisplayValues((prev) => ({
												...prev,
												hex: {
													raw: displayValues.hex.raw,
													formatted: userHex,
												},
											}))
										} else {
											// Revert to last valid if invalid
											setDisplayValues((prev) => ({
												...prev,
												hex: {
													raw: prev.hex.formatted.replace("#", ""),
													formatted: prev.hex.formatted,
												},
											}))
										}
									}}
									onKeyPress={(e) => {
										if (e.key === "Enter") {
											setIsUserTyping(false)
											const rgb = hexToRgb(displayValues.hex.raw)
											if (rgb) {
												const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b)
												setHue(hsv.h)
												setSaturation(hsv.s)
												setValue(hsv.v)
												// FIXED: Keep user's exact input
												const userHex = displayValues.hex.raw.startsWith("#") ? displayValues.hex.raw.toUpperCase() : "#" + displayValues.hex.raw.toUpperCase()
												setUserHexInput(userHex)
												setColorChangeSource("input")
												setDisplayValues((prev) => ({
													...prev,
													hex: {
														raw: displayValues.hex.raw,
														formatted: userHex,
													},
												}))
											} else {
												setDisplayValues((prev) => ({
													...prev,
													hex: {
														raw: prev.hex.formatted.replace("#", ""),
														formatted: prev.hex.formatted,
													},
												}))
											}
											;(e.target as HTMLInputElement).blur()
										}
									}}
								/>
							)}

							{(displayFormat as FormatKey) in formats && (
								<InputGroup>
									{formats[displayFormat as FormatKey].map((key, index, arr) => (
										<Input
											key={key}
											className={cn(
												"w-full",
												index === 0
													? "rounded-r-none" // first input, remove right radius
													: index === arr.length - 1
														? "rounded-l-none" // last input, remove left radius
														: "rounded-none" // middle inputs, no rounding at all
											)}
											value={displayValues[displayFormat.toLowerCase() as keyof DisplayValues][key as keyof DisplayValues[keyof DisplayValues]]}
											onChange={(e) => handleDisplayValueChange(displayFormat.toLowerCase() as keyof DisplayValues, key as string, e.target.value)}
											onBlur={() => handleDisplayValueBlur(displayFormat.toLowerCase() as keyof DisplayValues, key as string)}
										/>
									))}
								</InputGroup>
							)}
						</div>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	)
}

export default ColorPicker
