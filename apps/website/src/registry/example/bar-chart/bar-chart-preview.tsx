"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
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
		color: "var(--color-orange)",
	},
	mobile: {
		label: "Mobile",
		color: "var(--color-emerald)",
	},
} satisfies ChartConfig

export default function BarChartPreview() {
	return (
		<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
			<BarChart accessibilityLayer data={chartData}>
				<CartesianGrid vertical={false} />
				<XAxis
					dataKey="month"
					tickLine={false}
					tickMargin={10}
					axisLine={false}
					tickFormatter={(value) => value.slice(0, 3)}
				/>
				<ChartTooltip content={<ChartTooltipContent hideLabel />} />
				<ChartLegend content={<ChartLegendContent />} />
				<Bar
					dataKey="desktop"
					stackId="a"
					fill="var(--color-desktop)"
					radius={[0, 0, 4, 4]}
				/>
				<Bar
					dataKey="mobile"
					stackId="a"
					fill="var(--color-mobile)"
					radius={[4, 4, 0, 0]}
				/>
			</BarChart>
		</ChartContainer>
	)
}
