"use client"

import * as React from "react"
import { Scatter, ScatterChart, XAxis, YAxis } from "recharts"
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
} from "@/registry/ui/chart"
import { cn } from "@/lib/utils"

type ContributionPoint = {
	date: string
	week: number
	dayIndex: number
	count: number
	level: 0 | 1 | 2 | 3 | 4
}

const MONTH_TICKS = [0, 5, 9, 13, 18, 22, 26, 31, 35, 39, 44, 48]
const MONTH_NAMES: Record<number, string> = {
	0: "Jan",
	5: "Feb",
	9: "Mar",
	13: "Apr",
	18: "May",
	22: "Jun",
	26: "Jul",
	31: "Aug",
	35: "Sep",
	39: "Oct",
	44: "Nov",
	48: "Dec",
}

function generateContributions(): ContributionPoint[] {
	const values: ContributionPoint[] = []
	const baseDate = new Date("2026-01-01")

	const highSpots = new Set([
		"3-1",
		"3-2",
		"3-5",
		"4-0",
		"4-3",
		"7-1",
		"7-2",
		"8-3",
		"8-4",
		"8-6",
		"10-2",
		"11-0",
		"11-3",
		"11-5",
		"12-1",
		"12-4",
		"15-2",
		"16-1",
		"16-4",
		"17-3",
		"20-1",
		"20-5",
		"21-2",
		"22-0",
		"22-4",
		"23-3",
		"24-1",
		"24-5",
		"27-0",
		"27-4",
		"28-2",
		"29-1",
		"29-5",
		"30-3",
		"33-2",
		"34-1",
		"34-4",
		"35-0",
		"35-5",
		"38-1",
		"38-4",
		"39-2",
		"39-5",
		"40-3",
		"43-0",
		"43-4",
		"44-2",
		"44-5",
		"45-1",
		"48-2",
		"49-0",
		"49-3",
		"50-1",
		"50-4",
		"51-2",
		"51-5",
	])

	const mediumSpots = new Set([
		"2-2",
		"4-1",
		"4-5",
		"5-3",
		"6-2",
		"9-1",
		"10-5",
		"12-2",
		"13-4",
		"14-1",
		"17-1",
		"18-3",
		"19-2",
		"21-5",
		"25-2",
		"26-4",
		"28-0",
		"31-2",
		"32-4",
		"36-2",
		"37-4",
		"41-1",
		"42-3",
		"46-2",
		"47-4",
		"49-5",
		"51-0",
	])

	const lowSpots = new Set([
		"1-3",
		"2-5",
		"5-1",
		"6-4",
		"8-1",
		"13-2",
		"15-5",
		"18-1",
		"21-0",
		"23-5",
		"26-1",
		"31-5",
		"36-5",
		"41-4",
		"46-5",
		"47-1",
	])

	for (let w = 0; w < 52; w++) {
		for (let d = 0; d < 7; d++) {
			const dayOffset = w * 7 + d
			const currentDate = new Date(baseDate)
			currentDate.setDate(baseDate.getDate() + dayOffset)
			const dateStr = currentDate.toISOString().split("T")[0]

			const key = `${w}-${d}`
			let count = 0
			let level: 0 | 1 | 2 | 3 | 4 = 0

			if (highSpots.has(key)) {
				level = (w + d) % 2 === 0 ? 4 : 3
				count = level === 4 ? 18 : 12
			} else if (mediumSpots.has(key)) {
				level = (w + d) % 2 === 0 ? 2 : 1
				count = level === 2 ? 7 : 4
			} else if (lowSpots.has(key)) {
				level = 1
				count = 2
			}

			values.push({
				date: dateStr,
				week: w,
				dayIndex: d,
				count,
				level,
			})
		}
	}

	return values
}

const chartConfig = {
	contributions: {
		label: "Contributions",
		color: "var(--color-primary)",
	},
} satisfies ChartConfig

const renderContributionCell = (props: any) => {
	const { cx, cy, payload } = props
	if (cx == null || cy == null) return null

	const size = 11
	const rx = 2.5
	const level = payload?.level ?? 0

	const fillClass =
		level === 0
			? "fill-fill2"
			: level === 1
				? "fill-primary/20"
				: level === 2
					? "fill-primary/45"
					: level === 3
						? "fill-primary/70"
						: "fill-primary"

	return (
		<rect
			x={cx - size / 2}
			y={cy - size / 2}
			width={size}
			height={size}
			rx={rx}
			ry={rx}
			className={cn(
				fillClass,
				"hover:stroke-primary cursor-pointer hover:stroke-[1.5px] hover:opacity-85 focus:outline-none"
			)}
		/>
	)
}

export default function ContributionsCardPreview() {
	const data = React.useMemo(() => generateContributions(), [])

	return (
		<div className="flex w-full flex-col gap-2 p-2">
			<div className="w-full overflow-x-auto">
				<div className="min-w-[780px]">
					<ChartContainer
						config={chartConfig}
						className="aspect-auto h-[195px] w-full">
						<ScatterChart margin={{ top: 56, right: 10, bottom: 0, left: 0 }}>
							<XAxis
								type="number"
								dataKey="week"
								domain={[-0.5, 51.5]}
								ticks={MONTH_TICKS}
								tickFormatter={(tick) => MONTH_NAMES[tick] ?? ""}
								interval={0}
								tickLine={false}
								axisLine={false}
								tick={{ fontSize: 11, fill: "var(--color-fg-secondary)" }}
							/>
							<YAxis
								type="number"
								dataKey="dayIndex"
								domain={[-0.5, 6.5]}
								ticks={[1, 3, 5]}
								tickFormatter={(val) =>
									val === 1 ? "Mon" : val === 3 ? "Wed" : val === 5 ? "Fri" : ""
								}
								width={36}
								interval={0}
								tickLine={false}
								axisLine={false}
								tick={{ fontSize: 11, fill: "var(--color-fg-secondary)" }}
								reversed
							/>
							<ChartTooltip
								cursor={false}
								offset={0}
								isAnimationActive={false}
								animationDuration={0}
								allowEscapeViewBox={{ x: true, y: true }}
								content={({ active, payload }) => {
									if (!active || !payload?.length) return null
									const item = payload[0]?.payload as
										| ContributionPoint
										| undefined
									if (!item) return null

									return (
										<div className="border-border bg-bg pointer-events-none min-w-36 -translate-x-1/2 -translate-y-[calc(100%+8px)] rounded-lg border px-2.5 py-1.5 text-xs shadow-xl">
											<div className="flex flex-col gap-0.5">
												<span className="text-fg font-semibold">
													{item.count > 0
														? `${item.count} contributions`
														: "No contributions"}
												</span>
												<span className="text-fg-tertiary text-[11px]">
													{new Date(item.date).toLocaleDateString("en-US", {
														weekday: "short",
														month: "short",
														day: "numeric",
														year: "numeric",
													})}
												</span>
											</div>
										</div>
									)
								}}
							/>
							<Scatter
								data={data}
								shape={renderContributionCell}
								isAnimationActive={false}
							/>
						</ScatterChart>
					</ChartContainer>
				</div>
			</div>
			<div className="text-fg-secondary flex items-center justify-between px-3 text-xs">
				<span>958 contributions in the last year</span>
				<div className="flex items-center gap-1.5">
					<span>Less</span>
					<span className="bg-fill2 size-2.5 rounded-[2px]" />
					<span className="bg-primary/20 size-2.5 rounded-[2px]" />
					<span className="bg-primary/45 size-2.5 rounded-[2px]" />
					<span className="bg-primary/70 size-2.5 rounded-[2px]" />
					<span className="bg-primary size-2.5 rounded-[2px]" />
					<span>More</span>
				</div>
			</div>
		</div>
	)
}
