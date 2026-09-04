"use client"

import React from "react"
import { CheckCircle2, Sparkles, XCircle } from "lucide-react"

interface FrictionItem {
	title: string
	points: string[]
}

const frictionPoints: FrictionItem[] = [
	{
		title: "Ideas don't translate into clear content",
		points: [
			"Constantly starting from a blank page",
			"No clear structure or direction",
		],
	},
	{
		title: "Writing takes too much time",
		points: [
			"Endless editing and rewriting",
			"Inconsistent tone across channels",
		],
	},
]

const claritySolutions = [
	"Generate structured content in seconds",
	"Keep your voice consistent everywhere",
	"Refine, edit, and scale effortlessly",
]

export function VerseoProblemDifferenceSection() {
	return (
		<section className="py-20 md:py-28">
			<div className="mx-auto max-w-5xl px-4">
				{/* Section Header */}
				<div className="flex flex-col items-center text-center">
					<div className="border-border/70 bg-fill1 text-fg-secondary mb-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold">
						<span>[</span>
						<span className="text-foreground">problem &amp; difference</span>
						<span>]</span>
					</div>

					{/* Rule 13: heading-2 */}
					<h2 className="heading-2 text-foreground max-w-2xl text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
						Where content friction ends, clarity begins
					</h2>
				</div>

				{/* Comparison Grid: Friction vs Clarity (Rule 18: map) */}
				<div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
					{/* Left Card: The Friction (Before) */}
					<div className="border-destructive/20 bg-destructive/5 flex flex-col justify-between rounded-2xl border p-6 md:p-8">
						<div>
							<div className="text-destructive flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
								<XCircle className="size-4" />
								<span>The Content Friction</span>
							</div>

							<div className="mt-6 space-y-6">
								{frictionPoints.map((item) => (
									<div key={item.title} className="space-y-2">
										<h3 className="text-foreground text-base font-bold">
											{item.title}
										</h3>
										<ul className="space-y-1.5 pl-1">
											{item.points.map((point) => (
												<li
													key={point}
													className="text-fg-secondary flex items-center gap-2 text-xs">
													<span className="bg-destructive/60 size-1 rounded-full" />
													<span>{point}</span>
												</li>
											))}
										</ul>
									</div>
								))}
							</div>
						</div>

						<div className="border-border/60 bg-background/60 text-fg-tertiary mt-8 rounded-xl border p-3 text-center text-xs font-medium">
							Traditional writing workflows waste 10+ hours every week on
							revisions.
						</div>
					</div>

					{/* Right Card: The Verseo Difference (After) */}
					<div className="border-primary/30 bg-primary/5 flex flex-col justify-between rounded-2xl border p-6 shadow-sm md:p-8">
						<div>
							<div className="text-primary flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
								<Sparkles className="size-4" />
								<span>With Verseo</span>
							</div>

							<h3 className="text-foreground mt-4 text-xl font-bold tracking-tight sm:text-2xl">
								A clear system for fast, high-converting content
							</h3>

							<div className="mt-6 space-y-3.5">
								{claritySolutions.map((solution) => (
									<div
										key={solution}
										className="border-border/60 bg-background/80 shadow-xs flex items-center gap-3 rounded-xl border p-3.5 backdrop-blur-sm">
										<div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
											<CheckCircle2 className="size-4" />
										</div>
										<span className="text-foreground text-xs font-semibold sm:text-sm">
											{solution}
										</span>
									</div>
								))}
							</div>
						</div>

						<div className="border-primary/20 bg-primary/10 text-primary mt-8 rounded-xl border p-3 text-center text-xs font-semibold">
							Accelerate creation from idea to publish-ready copy in under 30
							seconds.
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
