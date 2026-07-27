"use client"

import { useState } from "react"
import { Slider, SliderThumb } from "@/registry/ui/slider"

export default function SliderVertical() {
	const [value, setValue] = useState([80])

	return (
		<Slider
			value={value}
			onValueChange={setValue}
			orientation="vertical"
			className="h-60">
			<SliderThumb />
		</Slider>
	)
}
