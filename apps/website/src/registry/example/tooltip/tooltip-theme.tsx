import React from "react"
import { IconSlot } from "@/registry/icon/icon-library"
import { Button } from "@/registry/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip"

export default function TooltipTheme() {
	return (
		<div className="flex gap-3">
			<Tooltip>
				<TooltipTrigger asChild>
					<Button color="neutral" variant="outline">
						<IconSlot slot="sun" />
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
						<IconSlot slot="moon" />
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
