"use client"

import * as React from "react"
import { Minus, Plus } from "lucide-react"
import { IconButton } from "@/styles/default/ui/button"
import { Slider, SliderThumb } from "@/styles/default/ui/slider"

export default function SliderWithStepper() {
	const [value, setValue] = React.useState(50)

	return (
		<div className="w-100 flex gap-2">
			<IconButton
				aria-label="Reduce Button"
				size="28"
				variant="outline"
				color="neutral"
				onClick={() => setValue((prev) => Math.max(prev - 10, 0))}>
				<Minus size={16} />
			</IconButton>
			<Slider value={[value]} onValueChange={([value]) => setValue(value)}>
				<SliderThumb />
			</Slider>
			<IconButton
				aria-label="Increase Button"
				size="28"
				variant="outline"
				color="neutral"
				onClick={() => setValue((prev) => Math.min(prev + 10, 100))}>
				<Plus size={16} />
			</IconButton>
		</div>
	)
}
