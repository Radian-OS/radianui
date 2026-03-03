import React from "react"
import { Button } from "@/registry/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip"

export default function TooltipWithChart() {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button color="neutral" variant="outline">
					Activity Log
				</Button>
			</TooltipTrigger>
			<TooltipContent
				theme={"light"}
				className="w-45 flex flex-col gap-2 rounded-lg p-3">
				{/* Title */}
				<p className="text-fg-secondary text-sm font-medium">Tuesday, Oct 14</p>
				<div className="flex flex-col gap-1.5">
					{/* Completed */}
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<div className="bg-success size-3 rounded-sm" />
							<p className="text-fg-secondary text-xs">Completed</p>
						</div>
						<p className="text-fg text-xs font-medium">150</p>
					</div>

					{/* On-going */}
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<div className="bg-info size-3 rounded-sm" />
							<p className="text-fg-secondary text-xs">On-going</p>
						</div>
						<p className="text-fg text-xs font-medium">142</p>
					</div>

					{/* Overdue */}
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<div className="bg-error size-3 rounded-sm" />
							<p className="text-fg-secondary text-xs">Overdue</p>
						</div>
						<p className="text-fg text-xs font-medium">89</p>
					</div>
				</div>
			</TooltipContent>
		</Tooltip>
	)
}
