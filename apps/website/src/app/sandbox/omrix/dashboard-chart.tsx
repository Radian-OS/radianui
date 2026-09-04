"use client"

import React from "react"

interface ChartBarItem {
	label: string
	height: number // percentage
	isHighlighted?: boolean
}

const barData: ChartBarItem[] = [
	{ label: "1", height: 48, isHighlighted: true },
	{ label: "2", height: 72, isHighlighted: false },
	{ label: "3", height: 54, isHighlighted: true },
	{ label: "4", height: 36, isHighlighted: false },
	{ label: "5", height: 84, isHighlighted: false },
	{ label: "6", height: 68, isHighlighted: true },
	{ label: "7", height: 26, isHighlighted: true },
	{ label: "8", height: 26, isHighlighted: false },
]

export function OmrixDashboardChart() {
	return (
		<div className="bg-neutral text-neutral-fg flex flex-col justify-between rounded-xl p-5 shadow-sm">
			{/* Chart Header */}
			<div className="mb-6">
				<h3 className="text-neutral-fg text-sm font-semibold">
					Automation Runs
				</h3>
				<p className="text-neutral-text text-[11px]">Last 30 Days</p>
			</div>

			{/* Bar Chart Graphics */}
			<div className="flex h-36 items-end gap-2.5 pt-2 sm:gap-3.5">
				{barData.map((bar) => (
					<div
						key={bar.label}
						className="group flex flex-1 flex-col items-center gap-2">
						{/* Bar Column */}
						<div className="flex h-28 w-full items-end justify-center">
							<div
								style={{ height: `${bar.height}%` }}
								className={`w-full max-w-[28px] rounded-t-sm transition-all duration-300 group-hover:opacity-90 ${
									bar.isHighlighted
										? "bg-neutral-fg"
										: "bg-neutral-hover opacity-50"
								}`}
							/>
						</div>
						{/* X-axis label */}
						<span className="text-neutral-text text-[11px] font-medium">
							{bar.label}
						</span>
					</div>
				))}
			</div>
		</div>
	)
}
