"use client"

import React from "react"
import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from "@/styles/default/ui/tooltip"
import type { ContributionDay } from "./types"

interface ContributionCellProps {
	day: ContributionDay
}

const LEVEL_CLASSES: Record<ContributionDay["level"], string> = {
	0: "bg-fill2 hover:bg-fill3",
	1: "bg-fill3 border border-success-border hover:bg-fill4",
	2: "bg-success-accent hover:bg-success-focus",
	3: "bg-success hover:bg-success-hover",
	4: "bg-success-hover hover:bg-success-focus",
}

export function ContributionCell({ day }: ContributionCellProps) {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<button
					type="button"
					aria-label={`${day.count} contributions on ${day.date}`}
					className={`focus-visible:ring-success size-2.5 rounded-xs transition-colors focus-visible:ring-1 focus-visible:outline-none sm:size-3 ${LEVEL_CLASSES[day.level]}`}
				/>
			</TooltipTrigger>
			<TooltipContent side="top" className="text-xs">
				{day.count === 0
					? `No contributions on ${day.date}`
					: `${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
			</TooltipContent>
		</Tooltip>
	)
}
