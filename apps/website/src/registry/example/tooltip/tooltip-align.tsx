import React from "react"
import { IconSlot } from "@/registry/icon/icon-library"
import { Button } from "@/registry/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip"

export default function TooltipAlign() {
	return (
		<div className="flex flex-col items-center justify-center gap-3">
			<Tooltip>
				<TooltipTrigger asChild>
					<Button color="neutral" variant="outline">
						<IconSlot slot="text-align-left" />
						Start
					</Button>
				</TooltipTrigger>
				<TooltipContent align="start">
					Access the full documentation.
				</TooltipContent>
			</Tooltip>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button color="neutral" variant="outline">
						<IconSlot slot="text-align-center" />
						Center
					</Button>
				</TooltipTrigger>
				<TooltipContent align="center">
					Access the full documentation.
				</TooltipContent>
			</Tooltip>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button color="neutral" variant="outline">
						<IconSlot slot="text-align-right" />
						End
					</Button>
				</TooltipTrigger>
				<TooltipContent align="end">
					Access the full documentation.
				</TooltipContent>
			</Tooltip>
		</div>
	)
}
