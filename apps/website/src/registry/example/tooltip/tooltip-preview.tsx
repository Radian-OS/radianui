import React from "react"
import { Button } from "@/registry/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip"

export default function TooltipPreview() {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button color="neutral" variant="outline">
					Default Tooltip
				</Button>
			</TooltipTrigger>
			<TooltipContent>
				<p>I am a default tooltip description.</p>
			</TooltipContent>
		</Tooltip>
	)
}
