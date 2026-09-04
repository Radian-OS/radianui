"use client"

import React from "react"
import { Clock, Globe2, Sparkles, TrendingUp } from "lucide-react"

interface ResultMetric {
	title: string
	tagline: string
	description: string
	stat: string
	statLabel: string
	icon: React.ComponentType<{ className?: string }>
}

const resultsData: ResultMetric[] = [
	{
		title: "Stay in the flow",
		tagline: "No more switching between tools and tabs.",
		description:
			"Keep momentum while writing. Generate, improve, and expand ideas without breaking your creative process.",
		stat: "5x",
		statLabel: "Faster drafting speed",
		icon: Sparkles,
	},
	{
		title: "Less time spent editing",
		tagline: "Review, refine, and publish in one sitting.",
		description:
			"Refine and finalize content faster with AI-powered suggestions, syntax corrections, and instant rewrites.",
		stat: "70%",
		statLabel: "Reduction in revision cycles",
		icon: Clock,
	},
	{
		title: "Content that fits anywhere",
		tagline: "From social posts to long-form campaigns.",
		description:
			"Keep messaging aligned across emails, social media, landing pages, and marketing campaigns effortlessly.",
		stat: "100%",
		statLabel: "Brand voice alignment",
		icon: Globe2,
	},
]

export function VerseoResultsSection() {
	return (
		<section className="py-20 md:py-28">
			<div className="mx-auto max-w-5xl px-4">
				{/* Section Header */}
				<div className="flex flex-col items-center text-center">
					<div className="border-border/70 bg-fill1 text-fg-secondary mb-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold">
						<span>[</span>
						<span className="text-foreground">results</span>
						<span>]</span>
					</div>

					{/* Rule 13: heading-2 */}
					<h2 className="heading-2 text-foreground max-w-2xl text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
						See the impact instantly
					</h2>

					<p className="text-fg-secondary mt-4 max-w-xl text-center text-sm leading-relaxed md:text-base">
						Create content faster, stay consistent across every channel, and
						achieve better results with less effort.
					</p>
				</div>

				{/* 3 Impact Cards (Rule 18: map) */}
				<div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
					{resultsData.map((item) => {
						const Icon = item.icon
						return (
							<div
								key={item.title}
								className="border-border/70 bg-background/90 hover:border-primary/40 flex flex-col justify-between rounded-2xl border p-6 shadow-sm transition-all duration-300 hover:shadow-md md:p-8">
								<div>
									<div className="flex items-center justify-between">
										<div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-xl">
											<Icon className="size-5" />
										</div>
										<span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
											<TrendingUp className="size-3" />
											<span>Verified</span>
										</span>
									</div>

									<div className="mt-6">
										<div className="text-foreground text-3xl font-extrabold tracking-tight sm:text-4xl">
											{item.stat}
										</div>
										<span className="text-fg-tertiary text-xs font-semibold">
											{item.statLabel}
										</span>
									</div>

									<h3 className="text-foreground mt-5 text-lg font-bold">
										{item.title}
									</h3>

									<p className="text-fg-secondary mt-2 text-xs leading-relaxed sm:text-sm">
										{item.description}
									</p>
								</div>

								<div className="border-border/40 text-primary mt-6 border-t pt-4 text-xs font-medium">
									✦ {item.tagline}
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</section>
	)
}
