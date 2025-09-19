import React from "react"
import { AlignCenter, AlignLeft, AlignRight } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip"

export default function AlignTooltip() {
	return (
		<div className="flex items-center justify-center gap-6">
			<Tooltip>
				<TooltipTrigger asChild>
					<Button size={"32"} color="neutral" variant="outline">
						<AlignLeft />
						Start
					</Button>
				</TooltipTrigger>
				<TooltipContent align="start">I am a tooltip description.</TooltipContent>
			</Tooltip>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button size={"32"} color="neutral" variant="outline">
						<AlignCenter />
						Center
					</Button>
				</TooltipTrigger>
				<TooltipContent align="center">I am a tooltip description.</TooltipContent>
			</Tooltip>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button size={"32"} color="neutral" variant="outline">
						<AlignRight />
						End
					</Button>
				</TooltipTrigger>
				<TooltipContent align="end">I am a tooltip description.</TooltipContent>
			</Tooltip>
		</div>
	)
}
