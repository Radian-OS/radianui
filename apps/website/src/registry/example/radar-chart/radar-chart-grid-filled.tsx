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
	{ month: "February", desktop: 285 },
	{ month: "March", desktop: 237 },
	{ month: "April", desktop: 203 },
	{ month: "May", desktop: 209 },
	{ month: "June", desktop: 264 },
]

const chartConfig = {
	desktop: {
		label: "Desktop",
		color: "var(--color-blue)",
	},
} satisfies ChartConfig

export default function RadarChartGridFill() {
	return (
		<ChartContainer config={chartConfig} className="min-h-[250px]">
			<RadarChart data={chartData}>
				<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
				<PolarGrid
					className="fill-(--color-desktop) opacity-20"
					gridType="circle"
				/>
				<PolarAngleAxis dataKey="month" />
				<Radar
					dataKey="desktop"
					fill="var(--color-desktop)"
					fillOpacity={0.5}
				/>
			</RadarChart>
		</ChartContainer>
	)
}
