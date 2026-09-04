"use client"

import React from "react"
import { CheckCircle2 } from "lucide-react"
import Image from "next/image"

interface ExampleCard {
	title: string
	category: string
	description: string
	imageUrl: string
	badges: string[]
}

const examples: ExampleCard[] = [
	{
		title: "5 Ways AI Saves Time",
		category: "Productivity | AI | Teams",
		description:
			"Learn how modern teams use AI to streamline content creation, improve consistency, and free up time for more meaningful work.",
		imageUrl:
			"https://framerusercontent.com/images/m3aswBY1UUBkd3vPtSwGvdxjNsg.png",
		badges: ["Ready to publish", "Generated in 3 sec"],
	},
	{
		title: "Ready To Send",
		category: "Campaign | Marketing | Outreach",
		description:
			"Generate engaging emails with clear messaging, strong structure, and a tone that matches your brand in just a few seconds.",
		imageUrl:
			"https://framerusercontent.com/images/iMm875MSCvJtmlENPQwNDe1KjyE.png",
		badges: ["Engaging structure", "1-click tone adapt"],
	},
	{
		title: "Built For Growth",
		category: "SaaS | Product | Copywriting",
		description:
			"Create polished product descriptions that communicate benefits clearly, build trust, and support better conversion rates.",
		imageUrl:
			"https://framerusercontent.com/images/Vf63KZZ3HXH75JHpG3fMZT1DL7o.png",
		badges: ["Optimized for conversion", "SEO-aligned"],
	},
]

export function VerseoExamplesSection() {
	return (
		<section
			id="examples"
			className="border-border/40 bg-fill1/30 border-t py-20 md:py-28">
			<div className="mx-auto max-w-5xl px-4">
				{/* Section Header */}
				<div className="flex flex-col items-center text-center">
					<div className="border-border/70 bg-background text-fg-secondary shadow-xs mb-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold">
						<span>[</span>
						<span className="text-foreground">examples</span>
						<span>]</span>
					</div>

					{/* Rule 13: heading-2 */}
					<h2 className="heading-2 text-foreground max-w-2xl text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
						See what you can create with Verseo
					</h2>

					<p className="text-fg-secondary mt-4 max-w-xl text-center text-sm leading-relaxed md:text-base">
						From social media posts and email campaigns to product descriptions
						and ad copy — generate content tailored to any channel in seconds.
					</p>
				</div>

				{/* 3 Showcase Cards (Rule 17: direct public image assets, Rule 18: map) */}
				<div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
					{examples.map((item) => (
						<div
							key={item.title}
							className="border-border/70 bg-background/90 hover:border-primary/40 flex flex-col justify-between overflow-hidden rounded-2xl border p-5 shadow-sm transition-all duration-300 hover:shadow-md">
							<div>
								{/* Graphic Asset Mockup */}
								<div className="border-border/60 bg-fill1 relative aspect-[756/472] w-full overflow-hidden rounded-xl border">
									<Image
										src={item.imageUrl}
										alt={item.title}
										fill
										sizes="(min-width: 768px) 350px, 100vw"
										className="object-cover"
									/>
								</div>

								<div className="mt-4">
									<span className="text-primary text-[11px] font-semibold">
										{item.category}
									</span>

									<h3 className="text-foreground mt-1 text-lg font-bold">
										{item.title}
									</h3>

									<p className="text-fg-secondary mt-2 text-xs leading-relaxed sm:text-sm">
										{item.description}
									</p>
								</div>
							</div>

							<div className="border-border/40 mt-5 flex flex-wrap items-center gap-1.5 border-t pt-3">
								{item.badges.map((badge) => (
									<span
										key={badge}
										className="bg-fill2 text-fg-secondary flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-semibold">
										<CheckCircle2 className="text-primary size-2.5" />
										<span>{badge}</span>
									</span>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
