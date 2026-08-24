"use client"

import { Bar, BarChart, CartesianGrid } from "recharts"
import { type ChartConfig, ChartContainer } from "@/registry/ui/chart"

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
	},
	mobile: {
		label: "Mobile",
	},
} satisfies ChartConfig

export default function ChartPreview() {
	return (
		<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
			<BarChart accessibilityLayer data={chartData}>
				<CartesianGrid vertical={false} />
				<Bar dataKey="desktop" fill="var(--color-success)" radius={4} />
				<Bar dataKey="mobile" fill="var(--color-error)" radius={4} />
			</BarChart>
		</ChartContainer>
	)
}
