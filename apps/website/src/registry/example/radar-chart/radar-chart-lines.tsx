"use client"

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/registry/ui/chart"

const chartData = [
	{ month: "January", desktop: 186, mobile: 160 },
	{ month: "February", desktop: 185, mobile: 170 },
	{ month: "March", desktop: 207, mobile: 180 },
	{ month: "April", desktop: 173, mobile: 160 },
	{ month: "May", desktop: 160, mobile: 190 },
	{ month: "June", desktop: 174, mobile: 204 },
]

const chartConfig = {
	desktop: {
		label: "Desktop",
		color: "var(--color-neon)",
	},
	mobile: {
		label: "Mobile",
		color: "var(--color-rose)",
	},
} satisfies ChartConfig

export default function RadarChartLine() {
	return (
		<ChartContainer config={chartConfig} className="min-h-[250px]">
			<RadarChart data={chartData}>
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent indicator="line" />}
				/>
				<PolarAngleAxis dataKey="month" />
				<PolarGrid radialLines={false} />
				<Radar
					dataKey="desktop"
					fill="var(--color-desktop)"
					fillOpacity={0}
					stroke="var(--color-desktop)"
					strokeWidth={2}
				/>
				<Radar
					dataKey="mobile"
					fill="var(--color-mobile)"
					fillOpacity={0}
					stroke="var(--color-mobile)"
					strokeWidth={2}
				/>
			</RadarChart>
		</ChartContainer>
	)
}
