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
		if (val >= 80) return "text-success stroke-success"
		if (val >= 50) return "text-warning stroke-warning"
		return "text-error stroke-error"
	}

	return (
		<div className="flex items-center gap-2">
			<svg className="size-4 -rotate-90" viewBox="0 0 18 18" aria-hidden="true">
				{/* Background Track */}
				<circle
					cx="9"
					cy="9"
					r={radius}
					className="stroke-border"
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
			<span className="text-fg text-xs font-semibold">{percentage}%</span>
		</div>
	)
}
