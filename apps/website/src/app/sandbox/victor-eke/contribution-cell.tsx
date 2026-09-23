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
	0: "bg-neutral-800/70 hover:bg-neutral-700",
	1: "bg-emerald-950 border border-emerald-800/50 hover:bg-emerald-900",
	2: "bg-emerald-700 hover:bg-emerald-600",
	3: "bg-emerald-500 hover:bg-emerald-400",
	4: "bg-emerald-400 hover:bg-emerald-300",
}

export function ContributionCell({ day }: ContributionCellProps) {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<button
					type="button"
					aria-label={`${day.count} contributions on ${day.date}`}
					className={`size-2.5 rounded-xs transition-colors focus-visible:ring-1 focus-visible:ring-emerald-400 focus-visible:outline-none sm:size-3 ${LEVEL_CLASSES[day.level]}`}
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
