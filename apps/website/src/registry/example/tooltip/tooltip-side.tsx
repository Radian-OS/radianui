import React from "react"
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip"

export default function TooltipSide() {
	return (
		<div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
			<Tooltip>
				<TooltipTrigger asChild>
					<Button color="neutral" variant="outline">
						<ChevronLeft className="text-fg-secondary" />
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
						<ChevronUp className="text-fg-secondary" />
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
						<ChevronDown className="text-fg-secondary" />
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
						<ChevronRight className="text-fg-secondary" />
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
