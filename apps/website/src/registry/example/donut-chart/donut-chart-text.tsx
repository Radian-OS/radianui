"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/registry/ui/chart"

const chartData = [
	{ browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
	{ browser: "safari", visitors: 200, fill: "var(--color-safari)" },
	{ browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
	{ browser: "edge", visitors: 173, fill: "var(--color-edge)" },
	{ browser: "other", visitors: 190, fill: "var(--color-other)" },
]

const chartConfig = {
	visitors: {
		label: "Visitors",
	},
	chrome: {
		label: "Chrome",
		color: "var(--color-red)",
	},
	safari: {
		label: "Safari",
		color: "var(--color-orange)",
	},
	firefox: {
		label: "Firefox",
		color: "var(--color-yellow)",
	},
	edge: {
		label: "Edge",
		color: "var(--color-blue)",
	},
	other: {
		label: "Other",
		color: "var(--color-green)",
	},
} satisfies ChartConfig

export default function DonutChartPreview() {
	const totalVisitors = React.useMemo(() => {
		return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
	}, [])

	return (
		<ChartContainer
			config={chartConfig}
			className="mx-auto aspect-square min-h-[250px]">
			<PieChart>
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent hideLabel />}
				/>
				<Pie
					data={chartData}
					dataKey="visitors"
					nameKey="browser"
					innerRadius={60}
					strokeWidth={5}>
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
											className="fill-fg text-3xl font-bold">
											{totalVisitors.toLocaleString()}
										</tspan>
										<tspan
											x={viewBox.cx}
											y={(viewBox.cy || 0) + 24}
											className="fill-fg">
											Visitors
										</tspan>
									</text>
								)
							}
						}}
					/>
				</Pie>
			</PieChart>
		</ChartContainer>
	)
}
