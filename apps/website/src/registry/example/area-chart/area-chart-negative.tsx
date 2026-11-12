"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/registry/ui/chart"

const chartData = [
	{ month: "January", desktop: 120 },
	{ month: "February", desktop: -305 },
	{ month: "March", desktop: 250 },
	{ month: "April", desktop: -73 },
	{ month: "May", desktop: 209 },
	{ month: "June", desktop: 214 },
]

const chartConfig = {
	desktop: {
		label: "Desktop",
		color: "var(--color-primary)",
	},
} satisfies ChartConfig

export default function ChartAreaNegative() {
	return (
		<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
			<AreaChart
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
					content={<ChartTooltipContent indicator="line" />}
				/>
				<Area
					dataKey="desktop"
					type="natural"
					fill="var(--color-desktop)"
					fillOpacity={0.4}
					stroke="var(--color-desktop)"
				/>
			</AreaChart>
		</ChartContainer>
	)
}
