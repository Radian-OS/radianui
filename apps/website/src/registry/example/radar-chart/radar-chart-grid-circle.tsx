"use client"

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/registry/ui/chart"

const chartData = [
	{ month: "January", desktop: 186 },
	{ month: "February", desktop: 305 },
	{ month: "March", desktop: 237 },
	{ month: "April", desktop: 273 },
	{ month: "May", desktop: 209 },
	{ month: "June", desktop: 214 },
]

const chartConfig = {
	desktop: {
		label: "Desktop",
		color: "var(--color-rose)",
	},
} satisfies ChartConfig

export default function RadarChartGridCircle() {
	return (
		<ChartContainer config={chartConfig} className="min-h-[250px]">
			<RadarChart data={chartData}>
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent hideLabel />}
				/>
				<PolarGrid gridType="circle" />
				<PolarAngleAxis dataKey="month" />
				<Radar
					dataKey="desktop"
					fill="var(--color-desktop)"
					fillOpacity={0.6}
					dot={{
						r: 4,
						fillOpacity: 1,
					}}
				/>
			</RadarChart>
		</ChartContainer>
	)
}
