"use client"

import { Bar, BarChart, CartesianGrid, Cell, LabelList } from "recharts"
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/registry/ui/chart"

export const description = "A bar chart with negative values"

const chartData = [
	{ month: "January", visitors: 186 },
	{ month: "February", visitors: 205 },
	{ month: "March", visitors: -207 },
	{ month: "April", visitors: 173 },
	{ month: "May", visitors: -209 },
	{ month: "June", visitors: 214 },
]

const chartConfig = {
	visitors: {
		label: "Visitors",
	},
} satisfies ChartConfig

export default function BarChartNegative() {
	return (
		<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
			<BarChart accessibilityLayer data={chartData}>
				<CartesianGrid vertical={false} />
				<ChartTooltip
					cursor={false}
					content={<ChartTooltipContent hideLabel hideIndicator />}
				/>
				<Bar dataKey="visitors">
					<LabelList position="top" dataKey="month" fillOpacity={1} />
					{chartData.map((item) => (
						<Cell
							key={item.month}
							fill={
								item.visitors > 0 ? "var(--color-orange)" : "var(--color-red)"
							}
						/>
					))}
				</Bar>
			</BarChart>
		</ChartContainer>
	)
}
