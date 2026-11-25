"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { IconSlot } from "@/registry/icon/icon-library"
import { Card } from "@/registry/ui/card"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip"

import { STAT_METRICS } from "./data"

export function StatMetrics() {
	return (
		<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
			{STAT_METRICS.map((metric) => (
				<Card
					key={metric.title}
					className="bg-fill1 border-border/70 flex flex-col justify-between gap-0 p-0.5 pb-2 shadow-2xs">
					{/* Inner White Container Box */}
					<Card className="bg-elevation-level1 border-border/60 flex flex-col justify-between gap-3 border px-3 pt-3.5 pb-3 shadow-2xs">
						{/* Header Label */}
						<div className="font-heading text-fg-tertiary text-xs leading-none font-semibold tracking-wider uppercase">
							{metric.title}
						</div>

						{/* Metric Value & Sparklines */}
						<div className="flex items-end justify-between">
							<div className="flex items-baseline gap-1.5">
								<span className="font-heading text-fg text-lg leading-none font-bold tracking-tight">
									{metric.value}
								</span>
								{metric.unit && (
									<span className="text-fg-secondary text-xs font-normal">
										{metric.unit}
									</span>
								)}
							</div>

							{/* Sparkline Bars: highlight peak bar */}
							<div className="flex shrink-0 items-end gap-1.5 pb-0.5">
								{(() => {
									const peak = Math.max(...metric.bars)
									return metric.bars.map((height, i) => {
										const isHighlighted = height === peak

										return (
											<div
												key={i}
												className={cn(
													"w-1 shrink-0 transition-colors",
													isHighlighted ? "bg-primary" : "bg-fill2"
												)}
												style={{ height: `${(height / 100) * 32}px` }}
											/>
										)
									})
								})()}
							</div>
						</div>
					</Card>

					{/* Bottom Info Row outside inner box, aligned with inner content */}
					<div className="flex items-center justify-between px-2.5 pt-1.5 pb-0.5 text-xs">
						<Tooltip>
							<TooltipTrigger asChild>
								<button
									type="button"
									className="text-fg-secondary hover:text-fg inline-flex cursor-pointer items-center transition-colors"
									aria-label={`${metric.title} info`}>
									<IconSlot slot="info" className="size-4" />
								</button>
							</TooltipTrigger>
							<TooltipContent withArrow>
								{metric.title}: {metric.value} ({metric.change}{" "}
								{metric.changeText})
							</TooltipContent>
						</Tooltip>
						<div className="flex items-center gap-1 text-xs leading-none tabular-nums">
							<span
								className={cn(
									"font-semibold",
									metric.change.startsWith("-") ? "text-error" : "text-success"
								)}>
								{metric.change}
							</span>
							<span className="text-fg-tertiary">{metric.changeText}</span>
						</div>
					</div>
				</Card>
			))}
		</div>
	)
}
