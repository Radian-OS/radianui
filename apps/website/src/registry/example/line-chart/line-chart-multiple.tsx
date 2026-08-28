"use client"

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
		color: "var(--color-blue)",
	},
	mobile: {
		label: "Mobile",
		color: "var(--color-rose)",
	},
} satisfies ChartConfig

export default function LineChartMultiple() {
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
				<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
				<Line
					dataKey="desktop"
					type="monotone"
					stroke="var(--color-desktop)"
					strokeWidth={2}
					dot={false}
				/>
				<Line
					dataKey="mobile"
					type="monotone"
					stroke="var(--color-mobile)"
					strokeWidth={2}
					dot={false}
				/>
			</LineChart>
		</ChartContainer>
	)
}
