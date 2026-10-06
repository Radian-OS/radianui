import React from "react"
import { cn } from "@/lib/utils"
import type { StatItem } from "./types"

export const DEFAULT_STATS: StatItem[] = [
	{ value: "38+", label: "Agencies approved" },
	{ value: "256+", label: "Successful projects" },
	{ value: "06+", label: "Team members" },
	{ value: "98%", label: "Clients satisfied" },
]

interface StatsGridProps {
	stats?: StatItem[]
}

function getStatBorderClass(index: number): string {
	switch (index) {
		case 0:
			return "border-b sm:border-r sm:border-b lg:border-b-0 lg:border-r"
		case 1:
			return "border-b sm:border-b sm:border-r-0 lg:border-b-0 lg:border-r"
		case 2:
			return "border-b sm:border-r sm:border-b-0 lg:border-b-0 lg:border-r"
		case 3:
			return "border-b-0 sm:border-b-0 sm:border-r-0 lg:border-b-0 lg:border-r-0"
		default:
			return ""
	}
}

export function StatsGrid({ stats = DEFAULT_STATS }: StatsGridProps) {
	return (
		<div className="mx-auto max-w-7xl px-4 lg:px-8 xl:px-16">
			<div className="border-border border-x">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
					{stats.map((item, index) => (
						<div
							key={item.label}
							className={cn(
								"border-border flex flex-col items-center justify-center gap-2 px-3 py-12 text-center md:py-16",
								getStatBorderClass(index)
							)}>
							<span className="text-fg text-4xl font-semibold tracking-tight sm:text-5xl">
								{item.value}
							</span>
							<p className="text-fg-secondary text-base font-normal sm:text-lg">
								{item.label}
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
