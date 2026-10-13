"use client"

import React from "react"
import { Check } from "lucide-react"
import { Badge } from "@/styles/default/ui/badge"
import { Button } from "@/styles/default/ui/button"
import { Card, CardContent } from "@/styles/default/ui/card"
import type { PricingPlan } from "./pricing-types"

export interface PricingCardProps {
	plan: PricingPlan
}

export function PricingCard({ plan }: PricingCardProps) {
	return (
		<Card className="gap-0 border-0 bg-transparent p-0 shadow-none">
			<CardContent className="flex flex-col p-6 sm:p-8">
				{/* Top Plan Badge */}
				<div className="flex items-center">
					<Badge
						variant={plan.isPopular ? "soft" : "soft"}
						color={plan.isPopular ? "primary" : "neutral"}>
						{plan.badge}
					</Badge>
				</div>

				{/* Price Display */}
				<div className="mt-4 flex items-baseline gap-1.5">
					<span className="text-fg text-4xl font-semibold tracking-tight sm:text-5xl">
						{plan.price}
					</span>
					<span className="text-fg-secondary text-sm font-normal">
						{plan.period}
					</span>
				</div>

				{/* Description */}
				<p className="text-fg-secondary mt-3 min-h-[44px] text-sm leading-relaxed">
					{plan.description}
				</p>

				{/* Call To Action Button */}
				<div className="mt-6">
					<Button
						variant={plan.buttonVariant}
						color={plan.buttonColor}
						className="w-full">
						{plan.buttonText}
					</Button>
				</div>

				{/* Features List */}
				<ul className="mt-8 flex flex-col gap-3">
					{plan.features.map((feature, idx) => (
						<li
							key={idx}
							className="text-fg-secondary flex items-center gap-2.5 text-sm">
							<Check className="text-fg size-4 shrink-0" />
							<span>{feature}</span>
						</li>
					))}
				</ul>
			</CardContent>
		</Card>
	)
}
