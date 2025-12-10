"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/registry/ui/chart"

const data = [
	{ month: "Jan", revenue: 1860, expenses: 1200 },
	{ month: "Feb", revenue: 3050, expenses: 2000 },
	{ month: "Mar", revenue: 2370, expenses: 2100 },
	{ month: "Apr", revenue: 3490, expenses: 2400 },
	{ month: "May", revenue: 4100, expenses: 2800 },
	{ month: "Jun", revenue: 3490, expenses: 2600 },
]

const config = {
	revenue: {
		label: "Revenue",
	},
	expenses: {
		label: "Expenses",
	},
}

export default function LineChartExample() {
	return (
		<ChartContainer className="min-w-full" config={config}>
			<LineChart data={data}>
				<CartesianGrid vertical={false} />
				<XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
				<YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => `$${value}`} />
				<ChartTooltip content={<ChartTooltipContent />} />
				<ChartLegend content={<ChartLegendContent />} />
				<Line dataKey="revenue" type="monotone" stroke="var(--color-success)" strokeWidth={2} dot={false} />
				<Line dataKey="expenses" type="monotone" stroke="var(--color-primary)" strokeWidth={2} dot={false} />
			</LineChart>
		</ChartContainer>
	)
}
