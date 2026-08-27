"use client"

import {
	AreaChart,
	BarChart3,
	Donut,
	LineChart,
	PieChart,
	Radar,
} from "lucide-react"
import Link from "next/link"

const charts = [
	{
		name: "Area Chart",
		link: "/docs/components/charts/area-chart",
		icon: AreaChart,
	},
	{
		name: "Bar Chart",
		link: "/docs/components/charts/bar-chart",
		icon: BarChart3,
	},
	{
		name: "Donut Chart",
		link: "/docs/components/charts/donut-chart",
		icon: Donut,
	},
	{
		name: "Line Chart",
		link: "/docs/components/charts/line-chart",
		icon: LineChart,
	},
	{
		name: "Pie Chart",
		link: "/docs/components/charts/pie-chart",
		icon: PieChart,
	},
	{
		name: "Radar Chart",
		link: "/docs/components/charts/radar-chart",
		icon: Radar,
	},
]

export default function ChartList() {
	return (
		<div className="mt-6 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
			{charts.map((item) => (
				<Link
					key={item.name}
					href={item.link}
					className="hover:bg-elevation-level1 flex flex-col items-center justify-center gap-2 rounded-[10px] border px-6 py-10 transition-all duration-200 hover:shadow-md">
					<span className="sr-only">{item.name}</span>
					<item.icon className="text-fg-secondary size-10" strokeWidth={1.5} />
					<p>{item.name}</p>
				</Link>
			))}
		</div>
	)
}
