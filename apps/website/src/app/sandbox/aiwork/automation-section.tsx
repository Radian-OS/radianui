"use client"

import React from "react"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import { Button } from "@/styles/default/ui/button"

interface AutomationFeature {
	title: string
	description: string
	imageUrl: string
	imagePosition: "left" | "right"
}

const automationFeatures: AutomationFeature[] = [
	{
		title: "Smarter Timing for Faster Workflows",
		description:
			"The Workflow Time Optimizer monitors your automated freight processes, flags operational bottlenecks in real time, and provides data-driven recommendations to accelerate turnaround.",
		imageUrl:
			"https://framerusercontent.com/images/l1CpF5EzDSCksVlxtEBU1RLqPI.png",
		imagePosition: "left",
	},
	{
		title: "AI-Driven Form Parsing and Workflow Automation",
		description:
			"Our Form Intelligence agent scans, parses, and routes structured information from rate confirmations, customs forms, and bills of lading into your CRM and TMS instantly.",
		imageUrl:
			"https://framerusercontent.com/images/veTFqarPod5nyzjlnsyKI6W1o.png",
		imagePosition: "right",
	},
]

export function AiworkAutomationSection() {
	return (
		<section className="py-20 md:py-28">
			<div className="mx-auto max-w-5xl px-4">
				{/* Section Header */}
				<div className="flex flex-col items-center text-center">
					<div className="border-primary/20 bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold">
						<span className="bg-primary size-1.5 rounded-full" />
						<span>AI Automation</span>
					</div>

					{/* Rule 13: heading-2 */}
					<h2 className="heading-2 text-foreground mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
						AI agents built to remove
						<br />
						manual work permanently
					</h2>
				</div>

				{/* 2 Alternating Feature Cards (Rule 17: direct image mockup, Rule 18: map) */}
				<div className="mt-14 space-y-8">
					{automationFeatures.map((feature) => {
						const isImageLeft = feature.imagePosition === "left"
						return (
							<div
								key={feature.title}
								className="border-border/70 bg-fill1/40 hover:border-primary/40 grid grid-cols-1 items-center gap-8 rounded-3xl border p-6 transition-all duration-300 md:grid-cols-2 md:p-10">
								{/* Mockup Graphic (Rule 17: high-fidelity direct asset) */}
								<div
									className={`border-border/60 bg-background/90 relative aspect-[1936/1680] w-full overflow-hidden rounded-2xl border shadow-sm ${
										isImageLeft ? "order-1" : "order-1 md:order-2"
									}`}>
									<Image
										src={feature.imageUrl}
										alt={feature.title}
										fill
										sizes="(min-width: 768px) 500px, 100vw"
										className="object-cover"
									/>
								</div>

								{/* Text Information */}
								<div
									className={`space-y-4 ${
										isImageLeft ? "order-2" : "order-2 md:order-1"
									}`}>
									<h3 className="text-foreground text-2xl font-bold tracking-tight md:text-3xl">
										{feature.title}
									</h3>
									<p className="text-fg-secondary text-sm leading-relaxed md:text-base">
										{feature.description}
									</p>
									<div className="pt-2">
										{/* Rule 15: explicit color prop on Button */}
										<Button
											variant="outline"
											color="neutral"
											size="36"
											className="gap-1.5 rounded-full px-4 text-xs font-semibold">
											<span>View Details</span>
											<ChevronRight className="size-3.5" />
										</Button>
									</div>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</section>
	)
}
