"use client"

import { Pie, PieChart } from "recharts"
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

export default function PieChartLabel() {
	return (
		<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
			<PieChart>
				<ChartTooltip content={<ChartTooltipContent hideLabel />} />
				<Pie data={chartData} dataKey="visitors" label nameKey="browser" />
			</PieChart>
		</ChartContainer>
	)
}
