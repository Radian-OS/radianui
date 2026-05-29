"use client"

import * as React from "react"
import { IconSlot } from "@/registry/icon/icon-library"
import { IconButton } from "@/registry/ui/button"
import { Slider, SliderThumb } from "@/registry/ui/slider"

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
				<IconSlot slot="minus" size={16} />
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
				<IconSlot slot="plus" size={16} />
			</IconButton>
		</div>
	)
}
