import React from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip"

export default function TooltipTheme() {
	return (
		<div className="flex gap-3">
			<Tooltip>
				<TooltipTrigger asChild>
					<Button color="neutral" variant="outline">
						<Sun className="text-fg-secondary" />
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
						<Moon className="text-fg-secondary" />
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
