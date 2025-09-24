import React from "react"
import { MoveDown, MoveLeft, MoveRight, MoveUp } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip"

export default function TooltipSide() {
	return (
		<div className="flex items-center justify-center gap-6">
			<Tooltip>
				<TooltipTrigger asChild>
					<Button size={"32"} color="neutral" variant="outline">
						<MoveLeft />
						Left
					</Button>
				</TooltipTrigger>
				<TooltipContent side="left">I am a tooltip description.</TooltipContent>
			</Tooltip>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button size={"32"} color="neutral" variant="outline">
						<MoveUp />
						Top
					</Button>
				</TooltipTrigger>
				<TooltipContent side="top">I am a tooltip description.</TooltipContent>
			</Tooltip>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button size={"32"} color="neutral" variant="outline">
						<MoveRight />
						Right
					</Button>
				</TooltipTrigger>
				<TooltipContent side="right">I am a tooltip description.</TooltipContent>
			</Tooltip>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button size={"32"} color="neutral" variant="outline">
						<MoveDown />
						Bottom
					</Button>
				</TooltipTrigger>
				<TooltipContent side="bottom">I am a tooltip description.</TooltipContent>
			</Tooltip>
		</div>
	)
}
