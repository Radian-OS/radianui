import * as React from "react"
import { Minus, Plus } from "lucide-react"
import { IconButton } from "@/registry/ui/button"
import { Slider, SliderThumb } from "@/registry/ui/slider"

export default function SliderWithStepper() {
	const [value, setValue] = React.useState(50)

	return (
		<div className="w-100 flex gap-2">
			<IconButton className="size-8" variant="outline" onClick={() => setValue((prev) => Math.max(prev - 10, 0))}>
				<Minus size={16} />
			</IconButton>
			<Slider value={[value]} onValueChange={([value]) => setValue(value)}>
				<SliderThumb />
			</Slider>
			<IconButton className="size-8" variant="outline" onClick={() => setValue((prev) => Math.min(prev + 10, 100))}>
				<Plus size={16} />
			</IconButton>
		</div>
	)
}
