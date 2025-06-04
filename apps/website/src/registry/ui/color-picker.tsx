"use client"

import React, { useState } from "react"
import ColorPicker from "react-best-gradient-color-picker"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "./button"

const ColorPickers: React.FC = () => {
	const [color, setColor] = useState("linear-gradient(90deg, rgba(96,93,93,1) 0%, rgba(255,255,255,1) 100%)")
	// const { getGradientObject } = useColorPicker(color, setColor)
	// const gradientObject = getGradientObject(color)
	// console.log("Gradient Object:", gradientObject?.colors)
	return (
		<div className="my-10">
			<Popover side="bottom" align="start">
				<PopoverTrigger asChild>
					<Button variant={"neutral-outline"}>Aurthur Dominic</Button>
				</PopoverTrigger>
				<PopoverContent className="flex w-fit flex-col gap-3">
					<ColorPicker value={color} onChange={setColor} />
				</PopoverContent>
			</Popover>
		</div>
	)
}

export default ColorPickers
