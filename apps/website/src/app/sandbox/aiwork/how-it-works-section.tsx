"use client"

import React from "react"
import { Bot, LineChart, Plug } from "lucide-react"

interface StepItem {
	stepNumber: string
	title: string
	description: string
	icon: React.ComponentType<{ className?: string }>
}

const steps: StepItem[] = [
	{
		stepNumber: "01",
		title: "Connect tools",
		description:
			"Easily integrate your existing apps like Slack, Google Docs, TMS platforms, and CRMs with 1-click connectors.",
		icon: Plug,
	},
	{
		stepNumber: "02",
		title: "Deploy agents",
		description:
			"Choose or customize intelligent AI agents to automate dispatching, customer messaging, and compliance tasks instantly.",
		icon: Bot,
	},
	{
		stepNumber: "03",
		title: "Track & Improve",
		description:
			"Monitor load volumes and response times in real time while AI continuously optimizes delivery efficiency.",
		icon: LineChart,
	},
]

export function AiworkHowItWorksSection() {
	return (
		<section className="py-20 md:py-28">
			<div className="mx-auto max-w-5xl px-4">
				{/* Section Header */}
				<div className="flex flex-col items-center text-center">
					<div className="border-primary/20 bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold">
						<span className="bg-primary size-1.5 rounded-full" />
						<span>How It&#39;s work</span>
					</div>

					{/* Rule 13: heading-2 */}
					<h2 className="heading-2 text-foreground mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
						Setup your AI workflows
					</h2>

					<p className="text-fg-secondary mt-3 max-w-xl text-sm leading-relaxed md:text-base">
						Deploy intelligent AI agents without technical effort. Just connect
						your tools, define your rules, and let automation take over.
					</p>
				</div>

				{/* 3 Step Cards Grid */}
				<div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
					{steps.map((item) => {
						const Icon = item.icon
						return (
							<div
								key={item.stepNumber}
								className="border-border/70 bg-fill1/40 hover:border-primary/40 relative flex flex-col justify-between rounded-2xl border p-6 transition-all duration-300 hover:shadow-md">
								<div>
									<div className="flex items-center justify-between">
										<div className="bg-primary/10 text-primary flex size-11 items-center justify-center rounded-xl">
											<Icon className="size-5" />
										</div>
										<span className="text-fg-tertiary/40 font-mono text-2xl font-black">
											{item.stepNumber}
										</span>
									</div>

									<h3 className="text-foreground mt-5 text-xl font-bold">
										{item.title}
									</h3>

									<p className="text-fg-secondary mt-2.5 text-xs leading-relaxed">
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
