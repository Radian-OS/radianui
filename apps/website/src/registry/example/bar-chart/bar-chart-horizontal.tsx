"use client"

import { Bar, BarChart, XAxis, YAxis } from "recharts"
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/registry/ui/chart"

const chartData = [
	{ month: "January", desktop: 186 },
	{ month: "February", desktop: 310 },
	{ month: "March", desktop: 237 },
	{ month: "April", desktop: 73 },
	{ month: "May", desktop: 209 },
	{ month: "June", desktop: 214 },
]

const chartConfig = {
	desktop: {
		label: "Desktop",
		color: "var(--color-orange)",
	},
} satisfies ChartConfig

export default function BarChartHorizontal() {
	return (
		<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
			<BarChart
				accessibilityLayer
				data={chartData}
				layout="vertical"
				margin={{
					left: -20,
				}}>
				<XAxis type="number" dataKey="desktop" hide />
				<YAxis
					dataKey="month"
					type="category"
					tickLine={false}
					tickMargin={10}
					axisLine={false}
					tickFormatter={(value) => value.slice(0, 3)}
				/>
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent hideLabel />}
				/>
				<Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
			</BarChart>
		</ChartContainer>
	)
}
