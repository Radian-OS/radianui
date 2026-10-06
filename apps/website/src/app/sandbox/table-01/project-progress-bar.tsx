"use client"

import React from "react"

interface ProjectProgressBarProps {
	step: number
	total: number
}

export function ProjectProgressBar({ step, total }: ProjectProgressBarProps) {
	const percentage = total > 0 ? (step / total) * 100 : 0

	return (
		<div className="flex items-center gap-2.5">
			<span className="text-fg-secondary font-mono text-xs">
				{step}/{total}
			</span>
			<div className="bg-elevation-level1/60 h-1 w-12 overflow-hidden rounded-full">
				<div
					className="bg-fg h-full rounded-full transition-all duration-300"
					style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
				/>
			</div>
		</div>
	)
}
