"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/registry/ui/chart"

const chartData = [
	{ month: "January", desktop: 186, mobile: 80 },
	{ month: "February", desktop: 305, mobile: 210 },
	{ month: "March", desktop: 237, mobile: 120 },
	{ month: "April", desktop: 73, mobile: 180 },
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

export default function ChartAreaAxes() {
	return (
		<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
			<AreaChart
				accessibilityLayer
				data={chartData}
				margin={{
					left: -20,
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
				<YAxis tickLine={false} axisLine={false} tickMargin={8} tickCount={3} />
				<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
				<Area
					dataKey="mobile"
					type="natural"
					fill="var(--color-mobile)"
					fillOpacity={0.4}
					stroke="var(--color-mobile)"
					stackId="a"
				/>
				<Area
					dataKey="desktop"
					type="natural"
					fill="var(--color-desktop)"
					fillOpacity={0.4}
					stroke="var(--color-desktop)"
					stackId="a"
				/>
			</AreaChart>
		</ChartContainer>
	)
}
