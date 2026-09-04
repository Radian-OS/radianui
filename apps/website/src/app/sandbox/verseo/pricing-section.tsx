"use client"

import React, { useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/styles/default/ui/button"

interface PricingTier {
	name: string
	description: string
	monthlyPrice: number
	annualPrice: number
	popular?: boolean
	features: string[]
}

const tiers: PricingTier[] = [
	{
		name: "Starter",
		description: "For individuals and freelancers",
		monthlyPrice: 12,
		annualPrice: 10,
		features: [
			"AI writing assistant",
			"Essential content templates",
			"Rewrite and improve text",
			"Standard support",
		],
	},
	{
		name: "Pro",
		description: "For creators and professionals",
		monthlyPrice: 29,
		annualPrice: 24,
		popular: true,
		features: [
			"Advanced AI generation",
			"Brand voice controls",
			"Full template library",
			"Priority content tools",
		],
	},
	{
		name: "Team",
		description: "For agencies and growing teams",
		monthlyPrice: 79,
		annualPrice: 64,
		features: [
			"Shared workspace",
			"Team collaboration tools",
			"Unlimited team projects",
			"Priority support",
		],
	},
]

export function VerseoPricingSection() {
	const [isAnnual, setIsAnnual] = useState(false)

	return (
		<section
			id="pricing"
			className="border-border/40 bg-fill1/30 border-t py-20 md:py-28">
			<div className="mx-auto max-w-5xl px-4">
				{/* Section Header */}
				<div className="flex flex-col items-center text-center">
					<div className="border-border/70 bg-background text-fg-secondary shadow-xs mb-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold">
						<span>[</span>
						<span className="text-foreground">pricing</span>
						<span>]</span>
					</div>

					{/* Rule 13: heading-2 */}
					<h2 className="heading-2 text-foreground max-w-2xl text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
						Choose the plan that grows with you
					</h2>

					<p className="text-fg-secondary mt-4 max-w-xl text-center text-sm leading-relaxed md:text-base">
						Whether you’re creating content solo or collaborating with a team,
						there’s a plan designed for your workflow.
					</p>

					{/* Monthly / Annual Billing Toggle */}
					<div className="border-border/70 bg-background/90 shadow-xs mt-8 inline-flex items-center gap-2 rounded-full border p-1.5">
						<button
							type="button"
							onClick={() => setIsAnnual(false)}
							className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
								!isAnnual
									? "bg-foreground text-background shadow-xs"
									: "text-fg-secondary hover:text-foreground"
							}`}>
							Monthly
						</button>
						<button
							type="button"
							onClick={() => setIsAnnual(true)}
							className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
								isAnnual
									? "bg-foreground text-background shadow-xs"
									: "text-fg-secondary hover:text-foreground"
							}`}>
							<span>Annual</span>
							<span className="bg-primary/20 text-primary rounded px-1.5 py-0.5 text-[10px] font-bold">
								Save 20%
							</span>
						</button>
					</div>
				</div>

				{/* 3 Pricing Cards Grid (Rule 18: map) */}
				<div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
					{tiers.map((tier) => {
						const price = isAnnual ? tier.annualPrice : tier.monthlyPrice
						return (
							<div
								key={tier.name}
								className={`relative flex flex-col justify-between rounded-2xl border p-6 transition-all duration-300 sm:p-8 ${
									tier.popular
										? "border-primary bg-background ring-primary/20 shadow-xl ring-2"
										: "border-border/70 bg-background/90 hover:border-primary/40 shadow-sm hover:shadow-md"
								}`}>
								{tier.popular && (
									<div className="bg-primary text-primary-fg shadow-xs absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider">
										Popular
									</div>
								)}

								<div>
									<h3 className="text-foreground text-xl font-bold">
										{tier.name}
									</h3>
									<p className="text-fg-secondary mt-1 text-xs">
										{tier.description}
									</p>

									<div className="mt-6 flex items-baseline gap-1">
										<span className="text-foreground text-4xl font-extrabold tracking-tight sm:text-5xl">
											${price}
										</span>
										<span className="text-fg-tertiary text-xs font-medium">
											/ month
										</span>
									</div>

									<div className="border-border/40 mt-6 space-y-3 border-t pt-6">
										{tier.features.map((feat) => (
											<div
												key={feat}
												className="text-foreground flex items-center gap-2.5 text-xs sm:text-sm">
												<div className="bg-primary/10 text-primary flex size-4 shrink-0 items-center justify-center rounded-full">
													<Check className="size-2.5" />
												</div>
												<span>{feat}</span>
											</div>
										))}
									</div>
								</div>

								{/* CTA Button (Rule 15: explicit color prop) */}
								<div className="mt-8 pt-4">
									<Button
										variant={tier.popular ? "strong" : "outline"}
										color={tier.popular ? "primary" : "neutral"}
										size="40"
										className="w-full justify-center rounded-xl text-xs font-bold tracking-tight">
										<span>Get Started</span>
									</Button>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</section>
	)
}
