"use client"

import { Pie, PieChart, Sector } from "recharts"
import type { PieSectorShapeProps } from "recharts/types/polar/Pie"
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/registry/ui/chart"

const chartData = [
	{ browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
	{ browser: "safari", visitors: 200, fill: "var(--color-safari)" },
	{ browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
	{ browser: "edge", visitors: 173, fill: "var(--color-edge)" },
	{ browser: "other", visitors: 90, fill: "var(--color-other)" },
]

const chartConfig = {
	visitors: {
		label: "Visitors",
	},
	chrome: {
		label: "Chrome",
		color: "var(--color-primary)",
	},
	safari: {
		label: "Safari",
		color: "var(--color-primary-hover)",
	},
	firefox: {
		label: "Firefox",
		color: "var(--color-primary-border)",
	},
	edge: {
		label: "Edge",
		color: "var(--color-primary-focus)",
	},
	other: {
		label: "Other",
		color: "var(--color-primary-accent)",
	},
} satisfies ChartConfig

const ACTIVE_INDEX = 0

export default function DonutChartActive() {
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
					strokeWidth={5}
					shape={({ index, outerRadius = 0, ...props }: PieSectorShapeProps) =>
						index === ACTIVE_INDEX ? (
							<Sector {...props} outerRadius={outerRadius + 10} />
						) : (
							<Sector {...props} outerRadius={outerRadius} />
						)
					}
				/>
			</PieChart>
		</ChartContainer>
	)
}
