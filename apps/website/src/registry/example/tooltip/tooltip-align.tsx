import React from "react"
import { AlignCenter, AlignLeft, AlignRight } from "lucide-react"
import { Button } from "@/styles/default/ui/button"
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/styles/default/ui/tooltip"

export default function TooltipAlign() {
	return (
		<div className="flex flex-col items-center justify-center gap-3">
			<Tooltip>
				<TooltipTrigger asChild>
					<Button color="neutral" variant="outline">
						<AlignLeft />
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
						<AlignCenter />
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
						<AlignRight />
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
