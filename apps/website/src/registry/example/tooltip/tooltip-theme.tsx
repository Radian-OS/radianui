import React from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/styles/default/ui/button"
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/styles/default/ui/tooltip"

export default function TooltipTheme() {
	return (
		<div className="flex gap-3">
			<Tooltip>
				<TooltipTrigger asChild>
					<Button color="neutral" variant="outline">
						<Sun />
						Light Tooltip
					</Button>
				</TooltipTrigger>
				<TooltipContent theme="light">
					Access the full documentation.
				</TooltipContent>
			</Tooltip>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button color="neutral" variant="outline">
						<Moon />
						Dark Tooltip
					</Button>
				</TooltipTrigger>
				<TooltipContent theme="default">
					Access the full documentation.
				</TooltipContent>
			</Tooltip>
		</div>
	)
}
