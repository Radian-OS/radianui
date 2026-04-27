import React from "react"
import { Button } from "@/styles/default/ui/button"
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/styles/default/ui/tooltip"

export default function TooltipPreview() {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button color="neutral" variant="outline">
					Hover me
				</Button>
			</TooltipTrigger>
			<TooltipContent>
				<p>This is a Tooltip Description.</p>
			</TooltipContent>
		</Tooltip>
	)
}
