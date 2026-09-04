"use client"

import React from "react"
import {
	BarChart3,
	Grid3X3,
	MailCheck,
	MessageSquare,
	ShieldCheck,
	Zap,
} from "lucide-react"

interface SolutionCard {
	title: string
	description: string
	icon: React.ComponentType<{ className?: string }>
}

const solutions: SolutionCard[] = [
	{
		title: "Task automation",
		description:
			"Let AI handle repetitive tasks like dispatching, paperwork, and form filling automatically.",
		icon: Zap,
	},
	{
		title: "Smart chat",
		description:
			"AI responds instantly to customer queries, driver updates, and operational requests 24/7.",
		icon: MessageSquare,
	},
	{
		title: "Live Insights",
		description:
			"Track key logistics metrics, delivery trends, and fleet performance with real-time AI analytics.",
		icon: BarChart3,
	},
	{
		title: "AI Security Monitor",
		description:
			"Detect anomalies, flag sensitive actions, and maintain compliance standards effortlessly.",
		icon: ShieldCheck,
	},
	{
		title: "Agent Marketplace",
		description:
			"Deploy specialized pre-built AI agents crafted for trucking, freight, and supply chains.",
		icon: Grid3X3,
	},
	{
		title: "Inbox Automation",
		description:
			"Scan, categorize, extract documents, and auto-respond to incoming emails in seconds.",
		icon: MailCheck,
	},
]

export function AiworkSolutionsSection() {
	return (
		<section className="py-20 md:py-28">
			<div className="mx-auto max-w-5xl px-4">
				{/* Section Header */}
				<div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
					<div className="space-y-4">
						<div className="border-primary/20 bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold">
							<span className="bg-primary size-1.5 rounded-full" />
							<span>Solutions</span>
						</div>
						{/* Rule 13: heading-2 */}
						<h2 className="heading-2 text-foreground text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
							Smart AI solutions for
							<br />
							modern teams
						</h2>
					</div>
					<p className="text-fg-secondary max-w-md text-sm leading-relaxed md:text-base">
						Unlock smooth, automated workflows with smart tools that reduce
						manual work, speed up operational decisions, and maximize team
						efficiency.
					</p>
				</div>

				{/* 3x2 Bento Solution Cards Grid */}
				<div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{solutions.map((item) => {
						const Icon = item.icon
						return (
							<div
								key={item.title}
								className="border-border/70 bg-fill1/40 hover:border-primary/40 hover:bg-fill1 group flex flex-col justify-between rounded-2xl border p-6 transition-all duration-300 hover:shadow-lg">
								<div>
									<div className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-fg flex size-11 items-center justify-center rounded-xl transition-colors duration-200">
										<Icon className="size-5" />
									</div>
									<h3 className="text-foreground mt-5 text-lg font-bold">
										{item.title}
									</h3>
									<p className="text-fg-secondary mt-2 text-sm leading-relaxed">
										{item.description}
									</p>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</section>
	)
}
