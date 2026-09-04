"use client"

import React from "react"
import { TrendingUp } from "lucide-react"

interface MetricCardItem {
	label: string
	value: string
	change: string
	cardClass: string
	labelClass: string
	valueClass: string
	trendClass: string
}

const metrics: MetricCardItem[] = [
	{
		label: "Automation Runs",
		value: "24,891",
		change: "+12%",
		cardClass: "bg-amber-accent border-amber-border/30",
		labelClass: "text-amber-text",
		valueClass: "text-amber-text",
		trendClass: "text-amber-text",
	},
	{
		label: "Active Workflows",
		value: "143",
		change: "+8%",
		cardClass: "bg-cyan-accent border-cyan-border/30",
		labelClass: "text-cyan-text",
		valueClass: "text-cyan-text",
		trendClass: "text-cyan-text",
	},
	{
		label: "Time Saved",
		value: "1,240hr",
		change: "+24%",
		cardClass: "bg-purple-accent border-purple-border/30",
		labelClass: "text-purple-text",
		valueClass: "text-purple-text",
		trendClass: "text-purple-text",
	},
]

export function OmrixDashboardMetrics() {
	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
			{metrics.map((item) => (
				<div
					key={item.label}
					className={`p-4.5 flex flex-col justify-between rounded-xl border transition-all ${item.cardClass}`}>
					<span className={`text-xs font-semibold ${item.labelClass}`}>
						{item.label}
					</span>

					<div className="mt-3 flex flex-col">
						<span
							className={`text-2xl font-bold tracking-tight sm:text-3xl ${item.valueClass}`}>
							{item.value}
						</span>
						<div
							className={`mt-1.5 flex items-center gap-1 text-xs font-semibold ${item.trendClass}`}>
							<TrendingUp className="size-3.5" />
							<span>{item.change}</span>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}
