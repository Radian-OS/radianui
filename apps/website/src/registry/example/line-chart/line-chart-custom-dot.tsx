"use client"

import { GitCommitVertical } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/registry/ui/chart"

const chartData = [
	{ month: "January", desktop: 186, mobile: 80 },
	{ month: "February", desktop: 305, mobile: 200 },
	{ month: "March", desktop: 237, mobile: 120 },
	{ month: "April", desktop: 73, mobile: 190 },
	{ month: "May", desktop: 209, mobile: 130 },
	{ month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
	desktop: {
		label: "Desktop",
		color: "var(--color-primary)",
	},
	mobile: {
		label: "Mobile",
		color: "var(--color-primary-border)",
	},
} satisfies ChartConfig

export default function LineChartDotsCustom() {
	return (
		<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
			<LineChart
				accessibilityLayer
				data={chartData}
				margin={{
					left: 12,
					right: 12,
				}}>
				<CartesianGrid vertical={false} />
				<XAxis
					dataKey="month"
					tickLine={false}
					axisLine={false}
					tickMargin={8}
					tickFormatter={(value) => value.slice(0, 3)}
				/>
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent hideLabel />}
				/>
				<Line
					dataKey="desktop"
					type="natural"
					stroke="var(--color-desktop)"
					strokeWidth={2}
					dot={({ cx, cy, payload }) => {
						if (cx == null || cy == null) {
							return null
						}

						const r = 24

						return (
							<GitCommitVertical
								key={payload.month}
								x={cx - r / 2}
								y={cy - r / 2}
								width={r}
								height={r}
								fill="hsl(var(--background))"
								stroke="var(--color-desktop)"
							/>
						)
					}}
				/>
			</LineChart>
		</ChartContainer>
	)
}
