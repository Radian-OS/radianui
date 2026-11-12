"use client"

import Image from "next/image"
import Link from "next/link"

const CDN_BASE =
	"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/charts-thumbnail/src"

interface ChartItem {
	name: string
	description: string
	link: string
	lightImage: string
	darkImage: string
}
const charts: ChartItem[] = [
	{
		name: "Area Chart",
		description:
			"Shows area below the line to highlight trends, growth or volume changes over time.",
		link: "/docs/components/charts/area-chart",
		lightImage: `${CDN_BASE}/area-chart.png`,
		darkImage: `${CDN_BASE}/area-chart-dark.png`,
	},
	{
		name: "Bar Chart",
		description:
			"Compares values across categories to highlight differences, rankings or patterns.",
		link: "/docs/components/charts/bar-chart",
		lightImage: `${CDN_BASE}/bar-chart.png`,
		darkImage: `${CDN_BASE}/bar-chart-dark.png`,
	},
	{
		name: "Donut Chart",
		description:
			"A pie chart with a hollow center that you can use to display a summary value or label.",
		link: "/docs/components/charts/donut-chart",
		lightImage: `${CDN_BASE}/donut-chart.png`,
		darkImage: `${CDN_BASE}/donut-chart-dark.png`,
	},
	{
		name: "Line Chart",
		description:
			"Shows changes over time to highlight trends, growth, decline or fluctuations.",
		link: "/docs/components/charts/line-chart",
		lightImage: `${CDN_BASE}/line-chart.png`,
		darkImage: `${CDN_BASE}/line-chart-dark.png`,
	},
	{
		name: "Pie Chart",
		description:
			"Shows parts of a whole to compare proportions, percentages or category shares.",
		link: "/docs/components/charts/pie-chart",
		lightImage: `${CDN_BASE}/pie-chart.png`,
		darkImage: `${CDN_BASE}/pie-chart-dark.png`,
	},
	{
		name: "Radar Chart",
		description:
			"Compares multiple variables to highlight strength, weaknesses or performance.",
		link: "/docs/components/charts/radar-chart",
		lightImage: `${CDN_BASE}/radar-chart.png`,
		darkImage: `${CDN_BASE}/radar-chart-dark.png`,
	},
]

export default function ChartList() {
	return (
		<div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
			{charts.map((item) => (
				<Link
					key={item.name}
					href={item.link}
					className="bg-bg border-soft flex cursor-pointer flex-col gap-2 rounded-xl border p-2 hover:shadow-sm">
					<div className="border-soft h-52 w-full overflow-clip rounded-lg border">
						<Image
							src={item.lightImage}
							alt={item.name}
							width={498}
							height={314}
							className="h-auto w-full object-cover dark:hidden"
						/>
						<Image
							src={item.darkImage}
							alt={item.name}
							width={498}
							height={314}
							className="hidden h-auto w-full object-cover dark:block"
						/>
					</div>
					<div className="flex flex-col gap-1 p-2">
						<span className="text-fg text-sm font-medium">{item.name}</span>
						<p className="text-fg-secondary text-sm font-normal">
							{item.description}
						</p>
					</div>
				</Link>
			))}
		</div>
	)
}
