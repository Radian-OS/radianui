"use client"

import * as React from "react"

import { Bar, BarChart, Cell, YAxis } from "recharts"

import { cn } from "@/lib/utils"
import { IconSlot } from "@/registry/icon/icon-library"
import { Card } from "@/registry/ui/card"
import { type ChartConfig, ChartContainer } from "@/registry/ui/chart"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip"

import { STAT_METRICS } from "./data"

const sparklineConfig = {
	value: {
		label: "Value",
		color: "var(--color-primary)",
	},
} satisfies ChartConfig

export function StatMetrics() {
	return (
		<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
			{STAT_METRICS.map((metric) => (
				<Card
					key={metric.title}
					className="bg-fill1 border-border/70 flex min-w-0 flex-col justify-between gap-0 p-0.5 pb-2 shadow-2xs">
					{/* Inner White Container Box */}
					<Card className="bg-elevation-level1 border-border/60 flex min-w-0 flex-col justify-between gap-3 border px-3 pt-3.5 pb-3 shadow-2xs">
						{/* Header Label */}
						<div className="font-heading text-fg-tertiary text-xs leading-none font-semibold tracking-wider uppercase">
							{metric.title}
						</div>

						{/* Metric Value & Sparklines */}
						<div className="flex items-end justify-between gap-2">
							<div className="flex min-w-0 items-baseline gap-1.5">
								<span className="font-heading text-fg text-lg leading-none font-bold tracking-tight">
									{metric.value}
								</span>
								{metric.unit && (
									<span className="text-fg-secondary text-xs font-normal">
										{metric.unit}
									</span>
								)}
							</div>

							{/* Sparkline Bar Graph (Radian ChartContainer): highlight peak bar */}
							<div className="shrink-0 pb-0.5">
								{(() => {
									const peak = Math.max(...metric.bars)
									const barData = metric.bars.map((value, idx) => ({
										idx,
										value,
									}))

									return (
										<ChartContainer
											config={sparklineConfig}
											className="aspect-auto h-8 w-14">
											<BarChart
												data={barData}
												margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
												barCategoryGap={3}>
												<YAxis hide domain={[0, 100]} />
												<Bar
													dataKey="value"
													barSize={4}
													isAnimationActive={false}>
													{barData.map((entry) => (
														<Cell
															key={entry.idx}
															fill={
																entry.value === peak
																	? "var(--color-primary)"
																	: "var(--color-fill2)"
															}
														/>
													))}
												</Bar>
											</BarChart>
										</ChartContainer>
									)
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
