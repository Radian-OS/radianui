"use client"

import React from "react"
import { Card, CardContent } from "@/styles/default/ui/card"
import { ORDER_METRICS } from "./types"

export function OrdersMetrics() {
	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
			{ORDER_METRICS.map((metric) => (
				<Card key={metric.label} className="border-border bg-card shadow-xs">
					<CardContent className="p-4 sm:p-5">
						<span className="text-fg-secondary text-xs font-medium">
							{metric.label}
						</span>
						<div className="mt-2 flex items-baseline gap-2.5">
							<span className="text-fg text-2xl font-bold sm:text-3xl">
								{metric.value}
							</span>

							{metric.changeType === "positive" && (
								<span className="bg-success-accent text-success-text inline-flex items-center rounded-sm px-1.5 py-0.5 text-[11px] font-semibold">
									{metric.change}
								</span>
							)}

							{metric.changeType === "negative" && (
								<span className="bg-error-accent text-error-text inline-flex items-center rounded-sm px-1.5 py-0.5 text-[11px] font-semibold">
									{metric.change}
								</span>
							)}

							{metric.changeType === "warning" && (
								<span className="text-fg-secondary text-xs">
									{metric.change}
								</span>
							)}

							{metric.period && (
								<span className="text-fg-secondary text-xs">
									{metric.period}
								</span>
							)}
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	)
}
