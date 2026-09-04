"use client"

import React from "react"
import { Check, ChevronRight, X } from "lucide-react"
import { Button } from "@/styles/default/ui/button"

interface PricingPlan {
	name: string
	price: string
	period: string
	subtitle: string
	isPopular?: boolean
	badge?: string
	features: { text: string; included: boolean }[]
}

const pricingPlans: PricingPlan[] = [
	{
		name: "Starter",
		price: "$29",
		period: "/ month",
		subtitle: "Perfect for small teams just starting",
		features: [
			{ text: "1 AI agent", included: true },
			{ text: "Sandbox mode (unlimited)", included: true },
			{ text: "Embed for internal tools", included: true },
			{ text: "Per-document usage: $0.10/doc", included: true },
			{ text: "API access for testing", included: false },
		],
	},
	{
		name: "Growth",
		price: "$79",
		period: "/ month",
		subtitle: "For growing teams ready to automate",
		isPopular: true,
		badge: "Save 20%",
		features: [
			{ text: "Up to 3 AI agents", included: true },
			{ text: "Real-time task automation", included: true },
			{ text: "Smart document processing", included: true },
			{ text: "Email + live chat support", included: true },
			{ text: "100 documents/month included", included: true },
		],
	},
	{
		name: "Pro",
		price: "$299",
		period: "/ month",
		subtitle: "Unlimited agents and complex workflows",
		features: [
			{ text: "Unlimited agents & workflows", included: true },
			{ text: "AI model integrations", included: true },
			{ text: "Priority API access", included: true },
			{ text: "Advanced analytics & insights", included: true },
			{ text: "Team roles & permissions", included: true },
		],
	},
]

export function AiworkPricingSection() {
	return (
		<section id="pricing" className="py-20 md:py-28">
			<div className="mx-auto max-w-5xl px-4">
				{/* Section Header */}
				<div className="flex flex-col items-center text-center">
					<div className="border-primary/20 bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold">
						<span className="bg-primary size-1.5 rounded-full" />
						<span>Pricing</span>
					</div>

					{/* Rule 13: heading-2 */}
					<h2 className="heading-2 text-foreground mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
						Start small, scale with AI
					</h2>

					<p className="text-fg-secondary mt-3 max-w-xl text-sm leading-relaxed md:text-base">
						Flexible plans built for teams automating repetitive tasks and
						scaling smarter workflows.
					</p>
				</div>

				{/* 3 Pricing Cards */}
				<div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
					{pricingPlans.map((plan) => (
						<div
							key={plan.name}
							className={`relative flex flex-col justify-between rounded-3xl p-7 transition-all duration-300 ${
								plan.isPopular
									? "bg-primary text-primary-fg shadow-primary/30 ring-primary shadow-2xl ring-2"
									: "border-border/70 bg-fill1/40 hover:border-primary/40 hover:bg-fill1 border"
							}`}>
							<div>
								<div className="flex items-center justify-between">
									<h3
										className={`text-lg font-bold ${
											plan.isPopular ? "text-white" : "text-foreground"
										}`}>
										{plan.name}
									</h3>
									{plan.badge && (
										<span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-bold text-white">
											{plan.badge}
										</span>
									)}
								</div>

								{/* Price */}
								<div className="mt-4 flex items-baseline gap-1">
									<span
										className={`text-4xl font-extrabold tracking-tight ${
											plan.isPopular ? "text-white" : "text-foreground"
										}`}>
										{plan.price}
									</span>
									<span
										className={`text-xs ${
											plan.isPopular ? "text-white/80" : "text-fg-tertiary"
										}`}>
										{plan.period}
									</span>
								</div>

								<p
									className={`mt-2 text-xs leading-relaxed ${
										plan.isPopular ? "text-white/80" : "text-fg-secondary"
									}`}>
									{plan.subtitle}
								</p>

								<div
									className={`my-6 border-t ${
										plan.isPopular ? "border-white/20" : "border-border/60"
									}`}
								/>

								<div
									className={`mb-3 text-[11px] font-bold uppercase tracking-wider ${
										plan.isPopular ? "text-white/90" : "text-fg-tertiary"
									}`}>
									Sandbox
								</div>

								{/* Features List */}
								<ul className="space-y-3">
									{plan.features.map((feat) => (
										<li
											key={feat.text}
											className="flex items-center gap-2.5 text-xs">
											{feat.included ? (
												<Check
													className={`size-3.5 shrink-0 ${
														plan.isPopular ? "text-white" : "text-primary"
													}`}
												/>
											) : (
												<X className="text-fg-tertiary/60 size-3.5 shrink-0" />
											)}
											<span
												className={
													plan.isPopular
														? "text-white"
														: feat.included
															? "text-foreground"
															: "text-fg-tertiary line-through"
												}>
												{feat.text}
											</span>
										</li>
									))}
								</ul>
							</div>

							<div className="mt-8 pt-2">
								{/* Rule 15: Explicit color prop on all Button variants */}
								<Button
									variant="strong"
									color={plan.isPopular ? "neutral" : "neutral"}
									size="36"
									className={`w-full justify-center gap-1.5 rounded-full text-xs font-semibold ${
										plan.isPopular
											? "text-primary bg-white hover:bg-white/90"
											: "bg-foreground text-background hover:bg-foreground/90"
									}`}>
									<span>Get Started</span>
									<ChevronRight className="size-3.5" />
								</Button>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
