"use client"

import {
	Label,
	PolarGrid,
	PolarRadiusAxis,
	RadialBar,
	RadialBarChart,
} from "recharts"
import { type ChartConfig, ChartContainer } from "@/registry/ui/chart"

const chartData = [
	{ browser: "safari", visitors: 200, fill: "var(--color-safari)" },
]

const chartConfig = {
	visitors: {
		label: "Visitors",
	},
	safari: {
		label: "Safari",
		color: "var(--color-primary)",
	},
} satisfies ChartConfig

export default function DonutChartPreview() {
	return (
		<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
			<RadialBarChart
				data={chartData}
				startAngle={0}
				endAngle={250}
				outerRadius={90}
				innerRadius={80}>
				<PolarGrid
					gridType="circle"
					radialLines={false}
					stroke="none"
					className="first:fill-fill1 last:fill-bg"
					polarRadius={[90, 80]}
				/>
				<RadialBar dataKey="visitors" background cornerRadius={10} />
				<PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
					<Label
						content={({ viewBox }) => {
							if (viewBox && "cx" in viewBox && "cy" in viewBox) {
								return (
									<text
										x={viewBox.cx}
										y={viewBox.cy}
										textAnchor="middle"
										dominantBaseline="middle">
										<tspan
											x={viewBox.cx}
											y={viewBox.cy}
											className="fill-fg text-4xl font-bold">
											{chartData[0].visitors.toLocaleString()}
										</tspan>
										<tspan
											x={viewBox.cx}
											y={(viewBox.cy || 0) + 24}
											className="fill-fg-secondary">
											Visitors
										</tspan>
									</text>
								)
							}
						}}
					/>
				</PolarRadiusAxis>
			</RadialBarChart>
		</ChartContainer>
	)
}
