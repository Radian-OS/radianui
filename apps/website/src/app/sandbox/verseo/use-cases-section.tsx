"use client"

import React, { useState } from "react"
import { ChevronDown, ChevronUp, Megaphone, Rocket, Users } from "lucide-react"

interface UseCaseItem {
	number: string
	title: string
	audience: string
	description: string
	icon: React.ComponentType<{ className?: string }>
	deliverables: string[]
}

const useCases: UseCaseItem[] = [
	{
		number: "001",
		title: "For marketers",
		audience: "Growth Marketers, Ad Specialists, Content Creators",
		description:
			"Create ads, emails, landing pages, and social content - without starting from scratch. Quickly generate multiple variations, test different angles, and adapt your message for every platform in seconds.",
		icon: Megaphone,
		deliverables: [
			"High-converting ad copy",
			"Multi-channel email drip campaigns",
			"Engaging social threads",
		],
	},
	{
		number: "002",
		title: "For founders",
		audience: "Startup Founders, Solo Entrepreneurs, Executives",
		description:
			"Draft pitches, investor updates, announcements, and vision posts in minutes. Communicate clearly and keep your audience engaged as you build, without spending hours writing.",
		icon: Rocket,
		deliverables: [
			"Monthly investor updates",
			"Product launch announcements",
			"Thought leadership posts",
		],
	},
	{
		number: "003",
		title: "For teams",
		audience: "Agencies, Marketing Departments, Cross-functional Squads",
		description:
			"Collaborate on content with shared workspaces, consistent brand voice guidelines, and fast approval cycles. Keep all team outputs aligned to company standards seamlessly.",
		icon: Users,
		deliverables: [
			"Unified brand voice libraries",
			"Multi-user shared workflows",
			"Instant approval-ready assets",
		],
	},
]

export function VerseoUseCasesSection() {
	const [expandedIndex, setExpandedIndex] = useState<number>(0)

	const toggleAccordion = (idx: number) => {
		setExpandedIndex(expandedIndex === idx ? -1 : idx)
	}

	return (
		<section id="use-cases" className="py-20 md:py-28">
			<div className="mx-auto max-w-5xl px-4">
				{/* Section Header */}
				<div className="flex flex-col items-center text-center">
					<div className="border-border/70 bg-fill1 text-fg-secondary mb-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold">
						<span>[</span>
						<span className="text-foreground">use cases</span>
						<span>]</span>
					</div>

					{/* Rule 13: heading-2 */}
					<h2 className="heading-2 text-foreground max-w-2xl text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
						Built for how you actually create content
					</h2>

					<p className="text-fg-secondary mt-4 max-w-xl text-center text-sm leading-relaxed md:text-base">
						Whether you’re creating content daily or scaling it across a team,
						Verseo adapts to your workflow.
					</p>
				</div>

				{/* Interactive Use Cases Accordion List (Rule 18: map) */}
				<div className="mt-14 space-y-4">
					{useCases.map((item, idx) => {
						const isExpanded = expandedIndex === idx
						const Icon = item.icon
						return (
							<div
								key={item.number}
								className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
									isExpanded
										? "border-primary/40 bg-primary/[0.02] shadow-md"
										: "border-border/70 bg-background/80 hover:border-border"
								}`}>
								{/* Accordion Header Bar */}
								<button
									type="button"
									onClick={() => toggleAccordion(idx)}
									className="flex w-full items-center justify-between p-6 text-left transition-colors sm:p-7">
									<div className="flex items-center gap-4">
										<span className="text-fg-tertiary font-mono text-xs font-bold sm:text-sm">
											{item.number}
										</span>
										<div className="bg-fill2 text-foreground flex size-9 items-center justify-center rounded-xl">
											<Icon className="size-4" />
										</div>
										<div>
											<h3 className="text-foreground text-lg font-bold sm:text-xl">
												{item.title}
											</h3>
											<span className="text-fg-secondary text-xs">
												{item.audience}
											</span>
										</div>
									</div>

									<div className="border-border/60 bg-fill1 text-fg-secondary flex size-8 items-center justify-center rounded-full border">
										{isExpanded ? (
											<ChevronUp className="text-primary size-4" />
										) : (
											<ChevronDown className="size-4" />
										)}
									</div>
								</button>

								{/* Accordion Content Body */}
								{isExpanded && (
									<div className="border-border/40 border-t px-6 pb-7 pt-4 sm:px-7">
										<p className="text-fg-secondary max-w-3xl text-sm leading-relaxed md:text-base">
											{item.description}
										</p>

										<div className="mt-6">
											<span className="text-foreground text-xs font-bold uppercase tracking-wider">
												Key Deliverables:
											</span>
											<div className="mt-2.5 flex flex-wrap gap-2">
												{item.deliverables.map((deliv) => (
													<span
														key={deliv}
														className="border-border/70 bg-fill1 text-foreground rounded-lg border px-3 py-1.5 text-xs font-medium">
														✓ {deliv}
													</span>
												))}
											</div>
										</div>
									</div>
								)}
							</div>
						)
					})}
				</div>
			</div>
		</section>
	)
}
