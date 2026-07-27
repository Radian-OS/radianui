import React from "react"
import { AlignCenter, AlignLeft, AlignRight } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip"

export default function TooltipAlign() {
	return (
		<div className="flex flex-col items-center justify-center gap-3">
			<Tooltip>
				<TooltipTrigger asChild>
					<Button className="w-full" color="neutral" variant="outline">
						<AlignLeft className="text-fg-secondary" />
						Start
					</Button>
				</TooltipTrigger>
				<TooltipContent align="start">
					Access the full documentation.
				</TooltipContent>
			</Tooltip>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button className="w-full" color="neutral" variant="outline">
						<AlignCenter className="text-fg-secondary" />
						Center
					</Button>
				</TooltipTrigger>
				<TooltipContent align="center">
					Access the full documentation.
				</TooltipContent>
			</Tooltip>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button className="w-full" color="neutral" variant="outline">
						<AlignRight className="text-fg-secondary" />
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
