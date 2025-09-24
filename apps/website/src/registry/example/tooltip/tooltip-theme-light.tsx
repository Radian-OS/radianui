import React from "react"
import { Button } from "@/registry/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip"

export default function TooltipThemeLight() {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button color="neutral" variant="outline">
					Hover me
				</Button>
			</TooltipTrigger>
			<TooltipContent theme="light">I am a tooltip description.</TooltipContent>
		</Tooltip>
	)
}
