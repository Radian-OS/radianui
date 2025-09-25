import React from "react"
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip"

export default function TooltipSide() {
	return (
		<div className="flex items-center justify-center gap-6">
			<Tooltip>
				<TooltipTrigger asChild>
					<Button size={"32"} color="neutral" variant="outline">
						<ChevronLeft />
						Left
					</Button>
				</TooltipTrigger>
				<TooltipContent side="left">I am a tooltip description on left.</TooltipContent>
			</Tooltip>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button size={"32"} color="neutral" variant="outline">
						<ChevronUp />
						Top
					</Button>
				</TooltipTrigger>
				<TooltipContent side="top">I am a tooltip description on top.</TooltipContent>
			</Tooltip>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button size={"32"} color="neutral" variant="outline">
						<ChevronRight />
						Right
					</Button>
				</TooltipTrigger>
				<TooltipContent side="right">I am a tooltip description on right.</TooltipContent>
			</Tooltip>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button size={"32"} color="neutral" variant="outline">
						<ChevronDown />
						Bottom
					</Button>
				</TooltipTrigger>
				<TooltipContent side="bottom">I am a tooltip description on bottom.</TooltipContent>
			</Tooltip>
		</div>
	)
}
