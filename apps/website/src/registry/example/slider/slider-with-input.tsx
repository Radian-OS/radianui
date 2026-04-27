"use client"

import * as React from "react"
import { Input } from "@/styles/default/ui/input"
import { Slider, SliderThumb } from "@/styles/default/ui/slider"

export default function SlideWithInput() {
	const [value, setValue] = React.useState(50)

	return (
		<div className="w-100 flex gap-2">
			<Slider value={[value]} onValueChange={([value]) => setValue(value)}>
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
