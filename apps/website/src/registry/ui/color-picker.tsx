"use client"

import { useState } from "react"
import ColorPicker, { useColorPicker } from "react-best-gradient-color-picker"
import { Button, ButtonGroup } from "./button"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"

export default function FillPopover() {
	const [fillType, setFillType] = useState<"solid" | "gradient">("solid")
	const [solidColor, setSolidColor] = useState("#ff0000")
	const [gradientValue, setGradientValue] = useState("linear-gradient(to right, #00f260, #0575e6)")
	const [colorFormat, setColorFormat] = useState<"hex" | "hsl" | "hsv" | "rgb">("hex")

	const handleChange = (val: string) => {
		if (fillType === "solid") {
			setSolidColor(val)
		} else {
			setGradientValue(val)
		}
	}

	const { valueToHSL, rgbaArr, valueToHSV, valueToHex } = useColorPicker(fillType === "solid" ? solidColor : gradientValue, handleChange)

	// Get the current color value in the selected format
	// const getCurrentColorValue = () => {
	// 	if (fillType === "gradient") {
	// 		return gradientValue
	// 	}

	// 	if (colorFormat === "hsv") {
	// 		const hsvStr = valueToHSV()
	// 		const match = hsvStr.match(/hsv\(([^,]+),\s*([^,]+)%,\s*([^%)]+)%\)/)

	// 		if (match) {
	// 			const [, h, s, v] = match
	// 			const hsvArray = [parseFloat(h), parseFloat(s), parseFloat(v)]
	// 			return hsvArray
	// 		}
	// 	} else {
	// 		// Convert HSL to show opacity as percentage (1-100%)
	// 		const hslValue = valueToHSL()
	// 		const hsvValue = valueToHSV()
	// 		// Check if it's HSLA format (has alpha channel) or convert HSL to HSLA with 100%
	// 		if (hslValue.includes("hsla")) {
	// 			// Extract alpha value and convert to percentage
	// 			const match = hslValue.match(/hsla\(([^,]+),\s*([^,]+),\s*([^,]+),\s*([^)]+)\)/)
	// 			if (match) {
	// 				const [, h, s, l, a] = match
	// 				const alphaPercent = Math.round(parseFloat(a) * 100)
	// 				return `hsla(${h}, ${s}, ${l}, ${alphaPercent}%)`
	// 			}
	// 		} else if (hslValue.includes("hsl")) {
	// 			// Convert HSL to HSLA with 100% opacity
	// 			const match = hslValue.match(/hsl\(([^,]+),\s*([^,]+),\s*([^)]+)\)/)
	// 			if (match) {
	// 				const [, h, s, l] = match
	// 				return `hsla(${h}, ${s}, ${l}, 100%)`
	// 			}
	// 		}
	// 		return hsvValue
	// 	}
	// }

	// Copy color value to clipboard
	// const copyToClipboard = (value: string) => {
	// 	navigator.clipboard.writeText(value)
	// }

	const getColorArray = () => {
		// HSV with alpha (optional)
		if (colorFormat === "hsv") {
			const hsvStr = valueToHSV()
			const match = hsvStr.match(/hsva?\(([^,]+),\s*([^,]+)%,\s*([^,%]+)%?(?:,\s*([^)]+))?\)/)
			if (match) {
				const [, h, s, v, a] = match
				const result = [
					{ label: "H", value: h },
					{ label: "S", value: s },
					{ label: "V", value: v },
				]
				if (a !== undefined) {
					result.push({ label: "Opacity", value: `${Math.round(parseFloat(a) * 100)}%` })
				}
				return result
			}
		}

		if (colorFormat === "rgb") {
			const rgbArr = rgbaArr
			if (Array.isArray(rgbArr) && (rgbArr.length === 3 || rgbArr.length === 4)) {
				const [r, g, b, a] = rgbArr
				const result = [
					{ label: "R", value: r.toString() },
					{ label: "G", value: g.toString() },
					{ label: "B", value: b.toString() },
				]
				if (a !== undefined) {
					result.push({ label: "Opacity", value: `${Math.round(a * 100)}%` })
				} else {
					result.push({ label: "Opacity", value: `100%` })
				}
				return result
			}
		}
		// HSL or HSLA
		if (colorFormat === "hsl") {
			const hslStr = valueToHSL()
			const match = hslStr.match(/hsl(?:a)?\(([^,]+),\s*([^,]+),\s*([^,%]+)%?(?:,\s*([^)]+))?\)/)
			if (match) {
				const [, h, s, l, a] = match
				const result = [
					{ label: "H", value: h },
					{ label: "S", value: s.replace("%", "").trim() },
					{ label: "L", value: l },
				]
				if (a !== undefined) {
					result.push({ label: "Opacity", value: `${Math.round(parseFloat(a) * 100)}%` })
				} else {
					result.push({ label: "Opacity", value: `100%` })
				}
				return result
			}
		}

		// HEX with opacity
		if (colorFormat === "hex") {
			const hex = valueToHex()
			let opacity: string | undefined
			if (hex.length === 9) {
				// HEX with alpha (#rrggbbaa)
				const alphaHex = hex.slice(-2)
				opacity = `${Math.round((parseInt(alphaHex, 16) / 255) * 100)}%`
			}
			const result = [{ label: "HEX", value: hex }]
			if (opacity) {
				result.push({ label: "Opacity", value: opacity })
			}
			return result
		}

		return []
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant={"neutral-outline"}>Aurthur Dominic</Button>
			</PopoverTrigger>
			<PopoverContent className="flex w-fit flex-col gap-3">
				<p className="text-sm font-medium">Fill</p>

				<Tabs defaultValue="solid" value={fillType} onValueChange={(val) => setFillType(val as "solid" | "gradient")} variant="outline" size="md">
					<TabsList width="full">
						<TabsTrigger value="solid">Solid</TabsTrigger>
						<TabsTrigger value="gradient">Gradient</TabsTrigger>
					</TabsList>

					<TabsContent value="solid" className="pt-2">
						<ColorPicker className="!bg-bg-level1" height={264} width={264} hidePresets={true} hideColorTypeBtns={true} value={solidColor} onChange={handleChange} />

						{/* Format Selection for Solid Colors */}
						<div className="mt-3 space-y-2">
							<p className="text-xs font-medium text-gray-600">Color Format</p>
							<div className="flex gap-2">
								<Button onClick={() => setColorFormat("hex")} className="text-xs">
									HEX
								</Button>
								<Button onClick={() => setColorFormat("hsl")} className="text-xs">
									HSL
								</Button>
								<Button onClick={() => setColorFormat("hsv")} className="text-xs">
									HSv
								</Button>
								<Button onClick={() => setColorFormat("rgb")} className="text-xs">
									RGB
								</Button>
							</div>
						</div>
					</TabsContent>

					<TabsContent value="gradient" className="pt-2">
						<ColorPicker
							className="!bg-bg-level1"
							hideControls={true}
							height={264}
							width={264}
							hidePresets={true}
							hideColorTypeBtns={true}
							value={gradientValue}
							onChange={handleChange}
						/>
					</TabsContent>
				</Tabs>

				{/* Color Value Display and Copy */}
				<div className="space-y-2">
					<p className="text-xs font-medium text-gray-600">Current Value</p>
					<div className="flex items-center gap-2">
						{/* <div className="flex-1 rounded border bg-gray-50 px-2 py-1 font-mono text-xs text-gray-800" title="Click to copy">
							{getCurrentColorValue()}
						</div> */}
						{/* <Button variant="outline" onClick={() => copyToClipboard()} className="text-xs">
							Copy
						</Button> */}
						<ButtonGroup variant="neutral-outline" size="40" color="primary">
							{getColorArray().map(({ value }, idx) => (
								<Button key={idx} className="min-w-[60px] border-r bg-white px-2 py-1 text-center font-mono text-sm text-gray-700">
									{value}
								</Button>
							))}
						</ButtonGroup>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	)
}
