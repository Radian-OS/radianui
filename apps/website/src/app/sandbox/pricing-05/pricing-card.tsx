"use client"

import React from "react"
import { Check } from "lucide-react"
import { Badge } from "@/styles/default/ui/badge"
import { Button } from "@/styles/default/ui/button"
import { Card, CardContent } from "@/styles/default/ui/card"
import type { BillingCycle, UntitledPricingPlan } from "./pricing-types"

export interface PricingCardProps {
	plan: UntitledPricingPlan
	billingCycle: BillingCycle
}

export function PricingCard({ plan, billingCycle }: PricingCardProps) {
	const price =
		billingCycle === "monthly" ? plan.monthlyPrice : plan.annualPrice

	return (
		<Card className="border-border/80 bg-elevation-level1 gap-0 rounded-3xl border p-0 shadow-xs transition-shadow duration-300 hover:shadow-md">
			<CardContent className="flex flex-col p-6 sm:p-8">
				{/* Top Row: Plan Name & Optional Popular Badge */}
				<div className="flex items-center justify-between gap-2">
					<h2 className="text-fg text-xl font-bold tracking-tight">
						{plan.name}
					</h2>
					{plan.isPopular && plan.badgeText && (
						<Badge variant="outline" color="neutral">
							{plan.badgeText}
						</Badge>
					)}
				</div>

				{/* Price Section */}
				<div className="mt-6 flex items-baseline gap-2">
					<span className="text-fg text-5xl font-extrabold tracking-tight">
						{price}
					</span>
					<div className="text-fg-secondary flex flex-col text-xs leading-tight">
						<span>per user</span>
						<span>per month</span>
					</div>
				</div>

				{/* Plan Description */}
				<p className="text-fg-secondary mt-4 min-h-[40px] text-sm leading-relaxed">
					{plan.description}
				</p>

				{/* CTA Button */}
				<div className="mt-6">
					<Button
						variant="strong"
						color="neutral"
						size="40"
						className="w-full font-semibold">
						{plan.buttonText}
					</Button>
				</div>

				{/* Divider */}
				<div className="border-border/70 my-8 border-t" />

				{/* Features Section */}
				<div className="flex flex-col gap-4">
					<div>
						<p className="text-fg-secondary text-xs font-bold tracking-wider uppercase">
							Features
						</p>
						<p className="text-fg mt-1 text-sm font-medium">
							{plan.featuresHeadline}
						</p>
					</div>

					<ul className="flex flex-col gap-3.5">
						{plan.features.map((feature, idx) => (
							<li key={idx} className="flex items-center gap-3">
								<span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#9bf00b]/25 text-emerald-800 dark:text-emerald-300">
									<Check className="size-3.5 stroke-[3]" />
								</span>
								<span className="text-fg-secondary text-sm font-normal">
									{feature}
								</span>
							</li>
						))}
					</ul>
				</div>
			</CardContent>
		</Card>
	)
}
