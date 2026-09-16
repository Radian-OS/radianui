"use client"

import * as React from "react"
import { Input } from "@/registry/ui/input"
import { Slider, SliderThumb } from "@/registry/ui/slider"

export default function SlideWithInput() {
	const [value, setValue] = React.useState(50)

	return (
		<div className="flex w-100 gap-2">
			<Slider
				className="flex-1"
				value={[value]}
				onValueChange={([value]) => setValue(value)}>
				<SliderThumb />
			</Slider>
			<Input
				className="w-18"
				size="32"
				value={value}
				onChange={(e) => {
					if (!e.target.value) return
					else setValue(parseInt(e.target.value))
				}}
				onBlur={() => setValue((prev) => Math.min(prev, 100))}
			/>
		</div>
	)
}
