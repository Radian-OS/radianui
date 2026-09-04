"use client"

import React from "react"
import { Check, Edit3, Send, Sparkles } from "lucide-react"
import Image from "next/image"

interface StepItem {
	stepNumber: string
	title: string
	description: string
	icon: React.ComponentType<{ className?: string }>
}

const steps: StepItem[] = [
	{
		stepNumber: "Step 1",
		title: "Enter your idea",
		description:
			"Describe what you want to create in a simple prompt - even a rough idea works.",
		icon: Edit3,
	},
	{
		stepNumber: "Step 2",
		title: "Generate content",
		description:
			"Verseo turns your input into structured, high-quality content in seconds.",
		icon: Sparkles,
	},
	{
		stepNumber: "Step 3",
		title: "Refine and publish",
		description:
			"Adjust tone, edit, and use your content anywhere - ready when you are.",
		icon: Send,
	},
]

export function VerseoHowItWorksSection() {
	return (
		<section className="border-border/40 bg-fill1/30 border-t py-20 md:py-28">
			<div className="mx-auto max-w-5xl px-4">
				{/* Section Header */}
				<div className="flex flex-col items-center text-center">
					<div className="border-border/70 bg-background text-fg-secondary shadow-xs mb-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold">
						<span>[</span>
						<span className="text-foreground">how it works</span>
						<span>]</span>
					</div>

					{/* Rule 13: heading-2 */}
					<h2 className="heading-2 text-foreground max-w-2xl text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
						Turn any idea into ready-to-use content in seconds
					</h2>

					<p className="text-fg-secondary mt-4 max-w-xl text-center text-sm leading-relaxed md:text-base">
						No complex tools or long workflows - just describe what you need,
						and Verseo does the rest.
					</p>

					<div className="border-primary/20 bg-primary/10 text-primary mt-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold">
						<Check className="size-3" />
						<span>The simpler the input, the faster you get results</span>
					</div>
				</div>

				{/* 3 Sequential Step Cards (Rule 18: map) */}
				<div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
					{steps.map((step) => {
						const Icon = step.icon
						return (
							<div
								key={step.stepNumber}
								className="border-border/70 bg-background/90 hover:border-primary/40 flex flex-col justify-between rounded-2xl border p-6 shadow-sm transition-all duration-300">
								<div>
									<div className="flex items-center justify-between">
										<span className="text-primary font-mono text-xs font-bold">
											{step.stepNumber}
										</span>
										<div className="bg-fill2 text-foreground flex size-8 items-center justify-center rounded-lg">
											<Icon className="size-4" />
										</div>
									</div>

									<h3 className="text-foreground mt-4 text-lg font-bold">
										{step.title}
									</h3>

									<p className="text-fg-secondary mt-2 text-xs leading-relaxed sm:text-sm">
										{step.description}
									</p>
								</div>
							</div>
						)
					})}
				</div>

				{/* Official Workflow Preview Mockup Graphic (Rule 17: direct public image asset) */}
				<div className="border-border/80 bg-background/90 mt-10 overflow-hidden rounded-2xl border p-2 shadow-2xl backdrop-blur-sm sm:p-3">
					<div className="border-border/60 bg-fill1 relative aspect-[1040/530] w-full overflow-hidden rounded-xl border">
						<Image
							src="https://framerusercontent.com/images/2uCm8cnVOvjGE6PdFkpqiqkTM.png"
							alt="Step-by-step AI content workflow preview inside Verseo"
							fill
							sizes="(min-width: 1280px) 1024px, 100vw"
							className="object-cover"
						/>
					</div>
				</div>
			</div>
		</section>
	)
}
