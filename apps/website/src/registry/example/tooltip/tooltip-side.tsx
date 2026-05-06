import React from "react"
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react"
import { Button } from "@/styles/default/ui/button"
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/styles/default/ui/tooltip"

export default function TooltipSide() {
	return (
		<div className="flex items-center justify-center gap-3">
			<Tooltip>
				<TooltipTrigger asChild>
					<Button color="neutral" variant="outline">
						<ChevronLeft />
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
						<ChevronUp />
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
						<ChevronDown />
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
						<ChevronRight />
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
