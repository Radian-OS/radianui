"use client"

import React from "react"
import { PricingCard } from "./pricing-card"
import type { PricingPlan } from "./types"

const DEFAULT_PLANS: PricingPlan[] = [
	{
		id: "basic",
		name: "Basic",
		price: "$29",
		period: "one-time",
		description: "Essential components for developers and solo founders.",
		buttonText: "Get Started",
		buttonHref: "#get-started",
		featuresTitle: "What's Included:",
		features: [
			"Access to 50+ core Radian UI blocks",
			"Copy-paste ready React Tailwind code",
			"1 year of free library updates",
			"Personal use license",
			"Community support",
		],
	},
	{
		id: "pro",
		name: "Pro",
		price: "$99",
		period: "one-time",
		isPopular: true,
		badgeText: "Most popular",
		description: "Complete toolkit for agencies, freelancers, and power users.",
		buttonText: "Get Pro",
		buttonHref: "#get-pro",
		featuresTitle: "What's Included:",
		features: [
			"Everything in Basic Plan",
			"Premium templates & advanced blocks",
			"Lifetime free updates",
			"Commercial use license",
			"Private Discord & priority support",
		],
	},
	{
		id: "enterprise",
		name: "Enterprise",
		price: "$299",
		period: "one-time",
		description: "Tailored support and design assets for ambitious teams.",
		buttonText: "Contact Us",
		buttonHref: "#contact",
		featuresTitle: "What's Included:",
		features: [
			"Everything in Pro Plan",
			"Unlimited team seats",
			"Figma design source files",
			"Custom component requests",
			"1-on-1 onboarding session",
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
