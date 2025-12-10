"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/registry/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/registry/ui/chart"

export const description = "A pie chart with a label"

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
		color: "var(--color-info)",
	},
	firefox: {
		label: "Firefox",
		color: "var(--color-success)",
	},
	edge: {
		label: "Edge",
		color: "var(--color-warning)",
	},
	other: {
		label: "Other",
		color: "var(--color-error)",
	},
} satisfies ChartConfig

export default function ChartPieLabel() {
	return (
		<Card className="flex w-full flex-col">
			<CardHeader className="items-center pb-0">
				<CardTitle>Pie Chart - Label</CardTitle>
				<CardDescription>January - June 2024</CardDescription>
			</CardHeader>
			<CardContent className="flex-1 pb-0">
				<ChartContainer config={chartConfig} className="[&_.recharts-pie-label-text]:fill-fg mx-auto aspect-square max-h-[250px] pb-0">
					<PieChart>
						<ChartTooltip content={<ChartTooltipContent hideLabel />} />
						<Pie data={chartData} dataKey="visitors" label nameKey="browser" />
					</PieChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col gap-2 text-sm">
				<div className="flex items-center gap-2 font-medium leading-none">
					Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
				</div>
				<div className="text-fg-secondary leading-none">Showing total visitors for the last 6 months</div>
			</CardFooter>
		</Card>
	)
}
