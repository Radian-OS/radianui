"use client"

import * as React from "react"
import { Calendar } from "lucide-react"
import { Scatter, ScatterChart, XAxis, YAxis } from "recharts"
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/styles/default/ui/card"
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
} from "@/registry/ui/chart"
import { cn } from "@/lib/utils"

type HeatmapPoint = {
	day: string
	dayIndex: number
	hour: string
	hourIndex: number
	users: number
	level: 0 | 1 | 2 | 3 | 4
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const HOURS = [
	"00",
	"02",
	"04",
	"06",
	"08",
	"10",
	"12",
	"14",
	"16",
	"18",
	"20",
	"22",
]

function generateHeatmapData(): HeatmapPoint[] {
	const pattern: (0 | 1 | 2 | 3 | 4)[][] = [
		[0, 0, 0, 0, 1, 2, 2, 4, 3, 2, 1, 0],
		[0, 0, 0, 0, 1, 2, 3, 4, 3, 2, 1, 0],
		[0, 0, 0, 0, 1, 2, 3, 4, 3, 2, 1, 0],
		[0, 0, 0, 0, 1, 2, 4, 4, 3, 2, 1, 0],
		[0, 0, 0, 0, 1, 2, 3, 3, 2, 2, 1, 0],
		[0, 0, 0, 0, 0, 1, 1, 2, 2, 1, 0, 0],
		[0, 0, 0, 0, 0, 1, 1, 2, 2, 1, 0, 0],
	]

	const data: HeatmapPoint[] = []

	for (let d = 0; d < DAYS.length; d++) {
		for (let h = 0; h < HOURS.length; h++) {
			const level = pattern[d][h]
			let baseCount = 0
			if (level === 4) baseCount = 138 + ((d * 7 + h * 3) % 19)
			else if (level === 3) baseCount = 92 + ((d * 5 + h * 4) % 15)
			else if (level === 2) baseCount = 54 + ((d * 4 + h * 2) % 12)
			else if (level === 1) baseCount = 24 + ((d * 3 + h) % 8)
			else baseCount = 4 + ((d + h) % 4)

			data.push({
				day: DAYS[d],
				dayIndex: d,
				hour: HOURS[h],
				hourIndex: h,
				users: baseCount,
				level,
			})
		}
	}

	return data
}

const chartConfig = {
	users: {
		label: "Active Users",
		color: "var(--color-primary)",
	},
} satisfies ChartConfig

const renderHeatmapCell = (props: any) => {
	const { cx, cy, payload } = props
	if (cx == null || cy == null) return null

	const width = 32
	const height = 20
	const rx = 4
	const level = payload?.level ?? 0

	const fillClass =
		level === 0
			? "fill-fill2"
			: level === 1
				? "fill-primary/25"
				: level === 2
					? "fill-primary/50"
					: level === 3
						? "fill-primary/75"
						: "fill-primary"

	return (
		<rect
			x={cx - width / 2}
			y={cy - height / 2}
			width={width}
			height={height}
			rx={rx}
			ry={rx}
			className={cn(
				fillClass,
				"hover:stroke-primary cursor-pointer hover:stroke-[1.5px] hover:opacity-90 focus:outline-none"
			)}
		/>
	)
}

export default function HeatmapPreview() {
	const data = React.useMemo(() => generateHeatmapData(), [])

	return (
		<Card className="w-full max-w-xl">
			<CardHeader className="pb-3">
				<CardTitle className="flex items-baseline gap-2">
					<span className="text-2xl font-bold tracking-tight">1,890</span>
					<span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-500">
						+5.2%
					</span>
				</CardTitle>
				<CardDescription>Active users</CardDescription>
				<CardAction>
					<div className="border-border bg-fill1 text-fg flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium">
						<Calendar className="text-fg-secondary size-3.5" />
						<span>Last 7 days</span>
					</div>
				</CardAction>
			</CardHeader>
			<CardContent className="p-0">
				<div className="w-full overflow-x-auto pb-2">
					<div className="min-w-[500px] px-4">
						<ChartContainer
							config={chartConfig}
							className="aspect-auto h-[260px] w-full">
							<ScatterChart margin={{ top: 58, right: 10, bottom: 0, left: 0 }}>
								<XAxis
									type="number"
									dataKey="hourIndex"
									domain={[-0.5, 11.5]}
									ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
									tickFormatter={(val) => HOURS[val] ?? ""}
									interval={0}
									tickLine={false}
									axisLine={false}
									tick={{ fontSize: 11, fill: "var(--color-fg-secondary)" }}
								/>
								<YAxis
									type="number"
									dataKey="dayIndex"
									domain={[-0.5, 6.5]}
									ticks={[0, 1, 2, 3, 4, 5, 6]}
									tickFormatter={(val) => DAYS[val] ?? ""}
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
										const item = payload[0]?.payload as HeatmapPoint | undefined
										if (!item) return null

										return (
											<div className="border-border bg-bg pointer-events-none min-w-32 -translate-x-1/2 -translate-y-[calc(100%+12px)] rounded-lg border px-2.5 py-1.5 text-xs shadow-xl">
												<div className="flex flex-col gap-0.5">
													<span className="text-fg font-semibold">
														{item.users.toLocaleString()} active users
													</span>
													<span className="text-fg-tertiary text-[11px]">
														{item.day} at {item.hour}:00
													</span>
												</div>
											</div>
										)
									}}
								/>
								<Scatter
									data={data}
									shape={renderHeatmapCell}
									isAnimationActive={false}
								/>
							</ScatterChart>
						</ChartContainer>
					</div>
				</div>
			</CardContent>
			<CardFooter className="text-fg-secondary justify-end gap-1.5 border-t py-3 text-xs">
				<span>Less</span>
				<span className="bg-fill2 size-3 rounded-[3px]" />
				<span className="bg-primary/25 size-3 rounded-[3px]" />
				<span className="bg-primary/50 size-3 rounded-[3px]" />
				<span className="bg-primary/75 size-3 rounded-[3px]" />
				<span className="bg-primary size-3 rounded-[3px]" />
				<span>More</span>
			</CardFooter>
		</Card>
	)
}
