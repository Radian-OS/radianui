import * as React from "react"
import { Slider, SliderThumb } from "@/registry/ui/slider"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip"

export default function SlideWithTooltip() {
	const [value, setValue] = React.useState(50)
	const [open, setOpen] = React.useState(false)

	return (
		<div className="w-100 flex gap-2">
			<Slider
				value={[value]}
				onValueChange={([value]) => {
					setValue(value)
					setOpen(true)
				}}
				onValueCommit={() => setOpen(false)}>
				<Tooltip open={open}>
					<TooltipTrigger asChild>
						<SliderThumb />
					</TooltipTrigger>
					<TooltipContent>{value}</TooltipContent>
				</Tooltip>
			</Slider>
		</div>
	)
}
