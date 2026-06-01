import React from "react"
import { IconSlot } from "@/registry/icon/icon-library"
import { Button } from "@/registry/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip"

export default function TooltipSide() {
	return (
		<div className="flex items-center justify-center gap-3">
			<Tooltip>
				<TooltipTrigger asChild>
					<Button color="neutral" variant="outline">
						<IconSlot slot="left" />
						Left
					</Button>
				</TooltipTrigger>
				<TooltipContent side="left" withArrow>
					Access the full documentation.
				</TooltipContent>
			</Tooltip>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button color="neutral" variant="outline">
						<IconSlot slot="up" />
						Top
					</Button>
				</TooltipTrigger>
				<TooltipContent side="top" withArrow>
					Access the full documentation.
				</TooltipContent>
			</Tooltip>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button color="neutral" variant="outline">
						<IconSlot slot="down" />
						Bottom
					</Button>
				</TooltipTrigger>
				<TooltipContent side="bottom" withArrow>
					Access the full documentation.
				</TooltipContent>
			</Tooltip>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button color="neutral" variant="outline">
						<IconSlot slot="right" />
						Right
					</Button>
				</TooltipTrigger>
				<TooltipContent side="right" withArrow>
					Access the full documentation.
				</TooltipContent>
			</Tooltip>
		</div>
	)
}
