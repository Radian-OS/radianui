"use client"

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"
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
		color: "var(--color-primary)",
	},
	mobile: {
		label: "Mobile",
		color: "var(--color-primary-border)",
	},
} satisfies ChartConfig

export default function RadarChartLegend() {
	return (
		<ChartContainer config={chartConfig} className="min-h-[250px]">
			<RadarChart
				data={chartData}
				margin={{
					top: -40,
					bottom: -10,
					left: 0,
					right: 0,
				}}>
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent indicator="line" />}
				/>
				<PolarAngleAxis dataKey="month" />
				<PolarGrid />
				<Radar
					dataKey="desktop"
					fill="var(--color-desktop)"
					fillOpacity={0.6}
				/>
				<Radar dataKey="mobile" fill="var(--color-mobile)" />
				<ChartLegend content={<ChartLegendContent />} />
			</RadarChart>
		</ChartContainer>
	)
}
