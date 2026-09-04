"use client"

import React from "react"
import {
	LayoutTemplate,
	PenLine,
	RefreshCw,
	SlidersHorizontal,
} from "lucide-react"

interface FeatureItem {
	title: string
	description: string
	tagline: string
	icon: React.ComponentType<{ className?: string }>
}

const features: FeatureItem[] = [
	{
		title: "Smart Rewrite",
		description:
			"Improve clarity, structure, and tone instantly without rewriting from scratch.",
		tagline: "Fix and refine in one click.",
		icon: RefreshCw,
	},
	{
		title: "AI Writing",
		description:
			"Start from a simple idea and turn it into structured, high-quality content in seconds.",
		tagline: "No more blank pages.",
		icon: PenLine,
	},
	{
		title: "Tone Control",
		description:
			"Keep your voice consistent across every channel — from emails to social posts.",
		tagline: "Write like your brand, every time.",
		icon: SlidersHorizontal,
	},
	{
		title: "Ready Templates",
		description:
			"Use proven formats for real-world use cases — from ads to product descriptions.",
		tagline: "Start faster with the right structure.",
		icon: LayoutTemplate,
	},
]

export function VerseoFeaturesSection() {
	return (
		<section
			id="product"
			className="border-border/40 bg-fill1/30 border-t py-20 md:py-28">
			<div className="mx-auto max-w-5xl px-4">
				{/* Section Header */}
				<div className="flex flex-col items-center text-center">
					<div className="border-border/70 bg-background text-fg-secondary shadow-xs mb-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold">
						<span>[</span>
						<span className="text-foreground">features</span>
						<span>]</span>
					</div>

					{/* Rule 13: heading-2 */}
					<h2 className="heading-2 text-foreground max-w-2xl text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
						Everything you need to create better content
					</h2>

					<p className="text-fg-secondary mt-4 max-w-xl text-center text-sm leading-relaxed md:text-base">
						Create, refine, and scale content - faster and without starting from
						scratch.
					</p>
				</div>

				{/* 4 Feature Cards Grid (Rule 18: map) */}
				<div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
					{features.map((feature) => {
						const Icon = feature.icon
						return (
							<div
								key={feature.title}
								className="border-border/70 bg-background/90 hover:border-primary/40 group flex flex-col justify-between rounded-2xl border p-6 shadow-sm transition-all duration-300 hover:shadow-md md:p-8">
								<div>
									<div className="bg-primary/10 text-primary flex size-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105">
										<Icon className="size-5" />
									</div>

									<h3 className="text-foreground mt-5 text-xl font-bold tracking-tight">
										{feature.title}
									</h3>

									<p className="text-fg-secondary mt-2 text-sm leading-relaxed">
										{feature.description}
									</p>
								</div>

								<div className="border-border/40 mt-6 border-t pt-4">
									<span className="text-primary text-xs font-semibold">
										✦ {feature.tagline}
									</span>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</section>
	)
}
