"use client"

import React, { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"

const ColorPicker: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [activeTab, setActiveTab] = useState<"solid" | "gradient">("solid")
	const [selectedColor, setSelectedColor] = useState({ r: 0, g: 123, b: 255 })
	const [hue, setHue] = useState(210)
	const [saturation, setSaturation] = useState(100)
	const [lightness, setLightness] = useState(50)
	const [alpha, setAlpha] = useState(100)
	const [colorFormat, setColorFormat] = useState<"HSL" | "RGB" | "HEX">("HSL")
	const [isDragging, setIsDragging] = useState<"saturation" | "hue" | "alpha" | null>(null)

	const saturationRef = useRef<HTMLDivElement>(null)
	const hueRef = useRef<HTMLDivElement>(null)
	const alphaRef = useRef<HTMLDivElement>(null)
	const modalRef = useRef<HTMLDivElement>(null)

	// Convert HSL to RGB
	const hslToRgb = (h: number, s: number, l: number) => {
		h /= 360
		s /= 100
		l /= 100

		const a = s * Math.min(l, 1 - l)
		const f = (n: number) => {
			const k = (n + h / (1 / 12)) % 12
			return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
		}

		return {
			r: Math.round(f(0) * 255),
			g: Math.round(f(8) * 255),
			b: Math.round(f(4) * 255),
		}
	}

	// Convert RGB to Hex
	const rgbToHex = (r: number, g: number, b: number) => {
		return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`
	}

	// Convert HSL to HSV for proper positioning in the color picker
	const hslToHsv = (h: number, s: number, l: number) => {
		s /= 100
		l /= 100
		const v = l + s * Math.min(l, 1 - l)
		const newS = v === 0 ? 0 : 2 * (1 - l / v)
		return {
			h: h,
			s: newS * 100,
			v: v * 100,
		}
	}

	const getPickerPosition = () => {
		const hsv = hslToHsv(hue, saturation, lightness)
		return {
			x: hsv.s,
			y: 100 - hsv.v,
		}
	}

	// Update color when HSL values change
	useEffect(() => {
		const rgb = hslToRgb(hue, saturation, lightness)
		setSelectedColor(rgb)
	}, [hue, saturation, lightness])

	// Handle mouse events for dragging
	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (!isDragging) return

			if (isDragging === "saturation" && saturationRef.current) {
				const rect = saturationRef.current.getBoundingClientRect()
				const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left))
				const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top))

				const newSaturation = (x / rect.width) * 100
				const newValue = 100 - (y / rect.height) * 100 // Value instead of lightness

				// Convert HSV to HSL for our internal representation
				const hslLightness = (newValue * (2 - newSaturation / 100)) / 2
				const hslSaturation = (newSaturation * newValue) / (hslLightness <= 50 ? 2 * hslLightness : 200 - 2 * hslLightness) || 0

				setSaturation(hslSaturation)
				setLightness(hslLightness)
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

		const handleMouseUp = () => {
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

	// Close modal when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
				setIsOpen(false)
			}
		}

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside)
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [isOpen])

	const handleSaturationMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!saturationRef.current) return
		const rect = saturationRef.current.getBoundingClientRect()
		const x = e.clientX - rect.left
		const y = e.clientY - rect.top

		const newSaturation = Math.max(0, Math.min(100, (x / rect.width) * 100))
		const newValue = Math.max(0, Math.min(100, 100 - (y / rect.height) * 100)) // Value instead of lightness

		// Convert HSV to HSL for our internal representation
		const hslLightness = (newValue * (2 - newSaturation / 100)) / 2
		const hslSaturation = (newSaturation * newValue) / (hslLightness <= 50 ? 2 * hslLightness : 200 - 2 * hslLightness) || 0

		setSaturation(hslSaturation)
		setLightness(hslLightness)
		setIsDragging("saturation")
	}

	const handleHueMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!hueRef.current) return
		const rect = hueRef.current.getBoundingClientRect()
		const x = e.clientX - rect.left
		const newHue = Math.max(0, Math.min(360, (x / rect.width) * 360))
		setHue(newHue)
		setIsDragging("hue")
	}

	const handleAlphaMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!alphaRef.current) return
		const rect = alphaRef.current.getBoundingClientRect()
		const x = e.clientX - rect.left
		const newAlpha = Math.max(0, Math.min(100, (x / rect.width) * 100))
		setAlpha(newAlpha)
		setIsDragging("alpha")
	}

	const getColorValue = () => {
		switch (colorFormat) {
			case "RGB":
				return `${selectedColor.r}, ${selectedColor.g}, ${selectedColor.b}`
			case "HEX":
				return rgbToHex(selectedColor.r, selectedColor.g, selectedColor.b)
			case "HSL":
			default:
				return `${Math.round(hue)}, ${Math.round(saturation)}, ${Math.round(lightness)}`
		}
	}

	const getCurrentColor = () => {
		return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha / 100})`
	}

	const getCurrentHexColor = () => {
		return rgbToHex(selectedColor.r, selectedColor.g, selectedColor.b)
	}

	return (
		<div className="relative">
			{/* Color Input */}
			<div className="flex items-center gap-3">
				<input
					type="text"
					value={getCurrentHexColor()}
					onClick={() => setIsOpen(true)}
					onChange={() => {}} // Prevent default color picker from opening
					className="h-12 w-12 cursor-pointer rounded-lg border-2 border-gray-300 transition-colors hover:border-gray-400"
				/>
				<div className="font-mono text-sm text-gray-700">{getCurrentHexColor()}</div>
			</div>

			{/* Modal Overlay */}
			{isOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
					<div ref={modalRef} className="w-96 rounded-2xl bg-white p-6 font-sans shadow-2xl">
						{/* Header */}
						<div className="mb-6 flex items-center justify-between">
							<h2 className="text-xl font-semibold text-gray-800">Fill</h2>
							<X className="h-5 w-5 cursor-pointer text-gray-400 hover:text-gray-600" onClick={() => setIsOpen(false)} />
						</div>

						{/* Tabs */}
						<div className="mb-6 flex rounded-lg bg-gray-100 p-1">
							<button
								onClick={() => setActiveTab("solid")}
								className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${
									activeTab === "solid" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
								}`}>
								Solid
							</button>
							<button
								onClick={() => setActiveTab("gradient")}
								className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${
									activeTab === "gradient" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
								}`}>
								Gradient
							</button>
						</div>

						{/* Color Picker Area */}
						<div className="mb-6">
							<div
								ref={saturationRef}
								onMouseDown={handleSaturationMouseDown}
								className="relative mb-4 h-64 w-full cursor-crosshair select-none rounded-xl"
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
										left: `${getPickerPosition().x}%`,
										top: `${getPickerPosition().y}%`,
										backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
									}}
								/>
							</div>

							{/* Hue Slider */}
							<div
								ref={hueRef}
								onMouseDown={handleHueMouseDown}
								className="relative mb-4 h-4 w-full cursor-pointer select-none rounded-full"
								style={{
									background: "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
								}}>
								<div
									className="pointer-events-none absolute h-4 w-4 -translate-x-2 -translate-y-0 transform rounded-full border-2 border-white shadow-lg"
									style={{
										left: `${(hue / 360) * 100}%`,
										backgroundColor: `hsl(${hue}, 100%, 50%)`,
									}}
								/>
							</div>

							{/* Alpha Slider */}
							<div className="relative">
								<div
									className="absolute inset-0 rounded-full"
									style={{
										backgroundImage: `repeating-conic-gradient(#ccc 0% 25%, white 0% 50%) 50% / 12px 12px`,
									}}
								/>
								<div
									ref={alphaRef}
									onMouseDown={handleAlphaMouseDown}
									className="relative h-4 w-full cursor-pointer select-none rounded-full"
									style={{
										background: `linear-gradient(to right, transparent, hsl(${hue}, ${saturation}%, ${lightness}%))`,
									}}>
									<div
										className="pointer-events-none absolute h-4 w-4 -translate-x-2 -translate-y-0 transform rounded-full border-2 border-white shadow-lg"
										style={{
											left: `${alpha}%`,
											backgroundColor: `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha / 100})`,
										}}
									/>
								</div>
							</div>
						</div>

						{/* Controls */}
						<div className="flex items-center gap-4">
							<select
								value={colorFormat}
								onChange={(e) => setColorFormat(e.target.value as "HSL" | "RGB" | "HEX")}
								className="rounded-lg border border-gray-200 bg-gray-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
								<option value="HSL">HSL</option>
								<option value="RGB">RGB</option>
								<option value="HEX">HEX</option>
							</select>

							<div className="flex-1 rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-700">{getColorValue()}</div>

							<div className="text-sm text-gray-600">{Math.round(alpha)}%</div>
						</div>

						{/* Selected Color Display */}
						<div className="mt-4 rounded-lg bg-gray-50 p-3">
							<div className="mb-2 text-sm text-gray-600">Selected Color:</div>
							<div
								className="h-12 w-full rounded-lg border border-gray-200"
								style={{
									backgroundColor: getCurrentColor(),
								}}
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default ColorPicker
