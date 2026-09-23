"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface CourseCompletionRingProps {
	percentage: number | null
}

export function CourseCompletionRing({
	percentage,
}: CourseCompletionRingProps) {
	if (percentage === null || percentage === undefined) {
		return <span className="text-fg-tertiary text-xs">-</span>
	}

	const radius = 6.5
	const circumference = 2 * Math.PI * radius
	const strokeDashoffset = circumference - (percentage / 100) * circumference

	const getProgressColor = (val: number) => {
		if (val >= 80) return "text-emerald-400 stroke-emerald-400"
		if (val >= 50) return "text-amber-500 stroke-amber-500"
		return "text-rose-500 stroke-rose-500"
	}

	return (
		<div className="flex items-center gap-2">
			<svg className="size-4 -rotate-90" viewBox="0 0 18 18" aria-hidden="true">
				{/* Background Track */}
				<circle
					cx="9"
					cy="9"
					r={radius}
					className="stroke-muted/30"
					strokeWidth="2"
					fill="transparent"
				/>
				{/* Progress Arc */}
				<circle
					cx="9"
					cy="9"
					r={radius}
					className={cn(
						"transition-all duration-300",
						getProgressColor(percentage)
					)}
					strokeWidth="2"
					strokeDasharray={circumference}
					strokeDashoffset={strokeDashoffset}
					strokeLinecap="round"
					fill="transparent"
				/>
			</svg>
			<span className="text-foreground text-xs font-semibold">
				{percentage}%
			</span>
		</div>
	)
}
