"use client"

import React from "react"
import Image from "next/image"

interface AgentCard {
	title: string
	description: string
	imageUrl: string
	width: number
	height: number
	aspect: string
}

const largeAgentCards: AgentCard[] = [
	{
		title: "Smart document agent",
		description:
			"Auto-fill, verify, and dispatch contracts, invoices, and compliance reports with enterprise security.",
		imageUrl:
			"https://framerusercontent.com/images/ll68lemaNuRB1V1tgDKcB0lgIMo.png",
		width: 1788,
		height: 960,
		aspect: "aspect-[1788/960]",
	},
	{
		title: "Custom AI agent builder",
		description:
			"Build specialized AI agents using your own rules, webhook triggers, and workflow logic with zero code required.",
		imageUrl:
			"https://framerusercontent.com/images/k4FW0xmCR8OnVmCfHcN8UrLY0c.png",
		width: 1788,
		height: 960,
		aspect: "aspect-[1788/960]",
	},
]

const smallAgentCards: AgentCard[] = [
	{
		title: "Smart chatbot",
		description:
			"Handles driver inquiries, books appointments, and sends real-time status updates.",
		imageUrl:
			"https://framerusercontent.com/images/CMWCv1aJ3T8Q05vz4cSyjExE8s.png",
		width: 1158,
		height: 759,
		aspect: "aspect-[1158/759]",
	},
	{
		title: "Insight engine",
		description:
			"Delivers instant route analytics, operational trends, and predictive freight forecasts.",
		imageUrl:
			"https://framerusercontent.com/images/Jz9KleJLOcSD4s4U3Kjprs4Fx3s.png",
		width: 1158,
		height: 759,
		aspect: "aspect-[1158/759]",
	},
	{
		title: "Auto-dispatch agent",
		description:
			"Assign loads by location, transit hours, and driver timing with no manual paperwork.",
		imageUrl:
			"https://framerusercontent.com/images/y25C7HJ1wHWV4u0DZaY5UmLwI.png",
		width: 1158,
		height: 759,
		aspect: "aspect-[1158/759]",
	},
]

export function AiworkAgentsSection() {
	return (
		<section className="border-border/60 bg-fill1/20 border-t py-20 md:py-28">
			<div className="mx-auto max-w-5xl px-4">
				{/* Section Header */}
				<div className="flex flex-col items-center text-center">
					<div className="border-primary/20 bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold">
						<span className="bg-primary size-1.5 rounded-full" />
						<span>Features</span>
					</div>

					{/* Rule 13: heading-2 */}
					<h2 className="heading-2 text-foreground mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
						Intelligent AI agents work
					</h2>

					<p className="text-fg-secondary mt-4 max-w-2xl text-sm leading-relaxed md:text-base">
						Our AI agents handle tasks, learn from operational behavior, and
						adapt in real-time giving you more time to focus on scaling what
						matters.
					</p>
				</div>

				{/* Top 2 Large Cards (Rule 17: Mockup image assets, Rule 18: map) */}
				<div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
					{largeAgentCards.map((agent) => (
						<div
							key={agent.title}
							className="border-border/70 bg-fill1/50 hover:border-primary/40 flex flex-col justify-between overflow-hidden rounded-2xl border p-5 transition-all duration-300">
							<div
								className={`relative ${agent.aspect} border-border/60 bg-background/80 mb-5 w-full overflow-hidden rounded-xl border shadow-sm`}>
								<Image
									src={agent.imageUrl}
									alt={agent.title}
									fill
									sizes="(min-width: 768px) 500px, 100vw"
									className="object-cover"
								/>
							</div>

							<div>
								<h3 className="text-foreground text-xl font-bold">
									{agent.title}
								</h3>
								<p className="text-fg-secondary mt-2 text-sm leading-relaxed">
									{agent.description}
								</p>
							</div>
						</div>
					))}
				</div>

				{/* Bottom 3 Cards (Rule 17: Mockup image assets, Rule 18: map) */}
				<div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
					{smallAgentCards.map((agent) => (
						<div
							key={agent.title}
							className="border-border/70 bg-fill1/50 hover:border-primary/40 flex flex-col justify-between overflow-hidden rounded-2xl border p-5 transition-all duration-300">
							<div
								className={`relative ${agent.aspect} border-border/60 bg-background/80 shadow-xs mb-4 w-full overflow-hidden rounded-xl border`}>
								<Image
									src={agent.imageUrl}
									alt={agent.title}
									fill
									sizes="(min-width: 768px) 320px, 100vw"
									className="object-cover"
								/>
							</div>

							<div>
								<h3 className="text-foreground text-lg font-bold">
									{agent.title}
								</h3>
								<p className="text-fg-secondary mt-1.5 text-xs leading-relaxed">
									{agent.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
