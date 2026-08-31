"use client"

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"
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
		color: "var(--color-primary)",
	},
	mobile: {
		label: "Mobile",
		color: "var(--color-primary-border)",
	},
} satisfies ChartConfig

export default function RadarChartLabel() {
	return (
		<ChartContainer config={chartConfig} className="min-h-[250px]">
			<RadarChart
				data={chartData}
				margin={{
					top: 10,
					right: 10,
					bottom: 10,
					left: 10,
				}}>
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent indicator="line" />}
				/>
				<PolarAngleAxis
					dataKey="month"
					tick={({ x, y, textAnchor, index, ...props }) => {
						const data = chartData[index]
						const yValue = typeof y === "number" ? y : 0

						return (
							<text
								x={x}
								y={yValue + (index === 0 ? -10 : 0)}
								textAnchor={textAnchor}
								fontSize={13}
								fontWeight={500}>
								<tspan className="fill-fg">{data.desktop}</tspan>
								<tspan className="fill-fg">/</tspan>
								<tspan className="fill-fg">{data.mobile}</tspan>
								<tspan x={x} dy={"1rem"} fontSize={12} className="fill-fg">
									{data.month}
								</tspan>
							</text>
						)
					}}
				/>

				<PolarGrid />
				<Radar
					dataKey="desktop"
					fill="var(--color-desktop)"
					fillOpacity={0.6}
				/>
				<Radar dataKey="mobile" fill="var(--color-mobile)" />
			</RadarChart>
		</ChartContainer>
	)
}
