"use client"

import React from "react"
import { PricingCard } from "./pricing-card"
import type { PricingPlan } from "./types"

const DEFAULT_PLANS: PricingPlan[] = [
	{
		id: "launch",
		name: "Launch",
		price: "$699",
		period: "month",
		description:
			"Ideal for startups and small businesses taking their first steps online.",
		buttonText: "Subscribe now",
		buttonHref: "#subscribe",
		featuresTitle: "What's Included:",
		features: [
			"Access to all core Shadcn UI blocks",
			"Copy-paste ready React Tailwind code",
			"Regular library updates",
			"Commercial use license",
			"Community support & documentation",
		],
	},
	{
		id: "scale",
		name: "Scale",
		price: "$1699",
		period: "month",
		isPopular: true,
		badgeText: "Most popular",
		description:
			"Perfect for growing brands needing more customization and flexibility.",
		buttonText: "Subscribe now",
		buttonHref: "#subscribe",
		featuresTitle: "What's Included:",
		features: [
			"Everything in Launch Plan",
			"Premium templates & more sections",
			"Early access to new components",
			"Private Discord & priority support",
			"Monthly strategy & growth sessions",
		],
	},
	{
		id: "elevate",
		name: "Elevate",
		price: "$3499",
		period: "month",
		description:
			"Best suited for established businesses wanting a fully tailored experience.",
		buttonText: "Subscribe now",
		buttonHref: "#subscribe",
		featuresTitle: "What's Included:",
		features: [
			"Everything in Scale Plan",
			"Unlimited team seats",
			"Dedicated UI & integration support",
			"Custom component requests",
			"One-on-one implementation",
		],
	},
]

interface PricingCardsProps {
	plans?: PricingPlan[]
}

export function PricingCards({ plans = DEFAULT_PLANS }: PricingCardsProps) {
	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
			{plans.map((plan) => (
				<PricingCard key={plan.id} plan={plan} />
			))}
		</div>
	)
}
