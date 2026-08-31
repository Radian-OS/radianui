"use client"

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/registry/ui/chart"

export const description = "A radar chart"

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
		color: "var(--color-primary)",
	},
} satisfies ChartConfig

export default function RadarChartPreview() {
	return (
		<ChartContainer config={chartConfig} className="min-h-[250px] w-full">
			<RadarChart data={chartData}>
				<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
				<PolarAngleAxis dataKey="month" />
				<PolarGrid />
				<Radar
					dataKey="desktop"
					fill="var(--color-desktop)"
					fillOpacity={0.6}
				/>
			</RadarChart>
		</ChartContainer>
	)
}
