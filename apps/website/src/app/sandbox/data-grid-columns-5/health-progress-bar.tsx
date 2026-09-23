"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface HealthProgressBarProps {
	health: number
}

export function HealthProgressBar({ health }: HealthProgressBarProps) {
	const getBarColor = (val: number) => {
		if (val >= 70) return "bg-emerald-400"
		if (val >= 50) return "bg-amber-400"
		return "bg-rose-500"
	}

	return (
		<div className="flex items-center gap-2.5">
			<div className="bg-elevation-level1/60 h-1.5 w-16 overflow-hidden rounded-full">
				<div
					className={cn(
						"h-full rounded-full transition-all duration-300",
						getBarColor(health)
					)}
					style={{ width: `${Math.min(100, Math.max(0, health))}%` }}
				/>
			</div>
			<span className="text-fg-secondary font-mono text-xs font-medium">
				{health}
			</span>
		</div>
	)
}
