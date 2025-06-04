"use client"

import { useState } from "react"
import ColorPicker, { useColorPicker } from "react-best-gradient-color-picker"
import { Button, ButtonGroup } from "./button"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Select, SelectItem } from "./select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"

export default function FillPopover() {
	const [fillType, setFillType] = useState<"solid" | "gradient">("solid")
	const [solidColor, setSolidColor] = useState("#ff0000")
	const [gradientValue, setGradientValue] = useState("linear-gradient(to right, #00f260, #0575e6)")
	const [colorFormat, setColorFormat] = useState<"hex" | "hsl" | "hsv" | "rgb">("hsl")

	const handleChange = (val: string) => {
		if (fillType === "solid") {
			setSolidColor(val)
		} else {
			setGradientValue(val)
		}
	}

	const { valueToHSL, rgbaArr, valueToHSV, valueToHex } = useColorPicker(fillType === "solid" ? solidColor : gradientValue, handleChange)

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
				} else {
					result.push({ label: "Opacity", value: `100%` })
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

	// Get the current color display value based on format
	const getCurrentColorValue = () => {
		if (fillType === "gradient") {
			return "Gradient"
		}

		switch (colorFormat) {
			case "hex":
				return valueToHex()
			case "hsl":
				return valueToHSL()
			case "hsv":
				return valueToHSV()
			case "rgb":
				const rgbArr = rgbaArr
				if (Array.isArray(rgbArr) && rgbArr.length >= 3) {
					const [r, g, b, a] = rgbArr
					return a !== undefined ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`
				}
				return solidColor
			default:
				return solidColor
		}
	}

	// Get the background style for the color preview
	const getBackgroundStyle = () => {
		if (fillType === "gradient") {
			// Extract gradient colors and create a simple linear gradient
			const gradientMatch = gradientValue.match(/#[0-9a-fA-F]{6}/g)
			if (gradientMatch && gradientMatch.length >= 2) {
				return `linear-gradient(90deg, ${gradientMatch[0]}, ${gradientMatch[1]})`
			}
			// Fallback gradient if parsing fails
			return "linear-gradient(90deg, #00f260, #0575e6)"
		}
		return solidColor
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant={"neutral-outline"} className="flex items-center gap-2">
					<div
						className="h-4 w-4 rounded border border-gray-300"
						style={{
							background: getBackgroundStyle(),
						}}
					/>
					<span className="font-mono text-sm">{getCurrentColorValue()}</span>
					{fillType === "solid" && colorFormat !== "hex" && <span className="font-mono text-xs text-gray-500">{valueToHex()}</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="flex w-fit flex-col gap-3">
				<p className="text-sm font-medium">Fill</p>

				<Tabs defaultValue="solid" value={fillType} onValueChange={(val) => setFillType(val as "solid" | "gradient")} variant="outline" size="md">
					<TabsList width="full">
						<TabsTrigger value="solid">Solid</TabsTrigger>
						<TabsTrigger value="gradient">Gradient</TabsTrigger>
					</TabsList>

					<TabsContent value="solid" className="pt-2">
						<ColorPicker
							className="!bg-bg-level1"
							hideControls={false}
							height={264}
							width={264}
							hidePresets={true}
							hideColorTypeBtns={true}
							value={solidColor}
							onChange={handleChange}
							hideInputs={true}
						/>
					</TabsContent>

					<TabsContent value="gradient" className="pt-2">
						<ColorPicker
							hideInputs={true}
							className="!bg-bg-level1"
							hideControls={false}
							height={264}
							width={264}
							hidePresets={true}
							hideColorTypeBtns={true}
							value={gradientValue}
							onChange={handleChange}
						/>
					</TabsContent>
				</Tabs>
				<div className="flex gap-2">
					<Select
						variants="button"
						size="28"
						selectedValues={[colorFormat]} // assuming colorFormat is a string like "hsl"
						onSelectedChange={(val) => {
							if (val.length > 0) setColorFormat(val[0] as "hex" | "hsl" | "hsv" | "rgb")
						}}>
						<SelectItem defaultValue="hsl" value="hsl">
							HSL
						</SelectItem>
						<SelectItem value="hsv">HSV</SelectItem>
						<SelectItem value="rgb">RGB</SelectItem>
					</Select>
					<ButtonGroup variant="neutral-outline" size="28" color="primary">
						{getColorArray().map(({ value }, idx) => (
							<Button key={idx} className="border-r px-2 py-1 text-center font-mono text-sm">
								{value}
							</Button>
						))}
					</ButtonGroup>
				</div>
			</PopoverContent>
		</Popover>
	)
}
