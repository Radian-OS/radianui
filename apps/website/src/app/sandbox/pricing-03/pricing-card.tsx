import React from "react"
import { Check } from "lucide-react"
import { Badge } from "@/styles/default/ui/badge"
import { Button } from "@/styles/default/ui/button"
import { Card } from "@/styles/default/ui/card"
import type { PricingPlan } from "./pricing-types"

export interface PricingCardProps {
	plan: PricingPlan
	isBilledMonthly: boolean
}

export function PricingCard({ plan, isBilledMonthly }: PricingCardProps) {
	const price = plan.isCustomPrice
		? plan.monthlyPrice
		: isBilledMonthly
			? plan.annualPrice
			: plan.monthlyPrice

	const billingPeriod = plan.isCustomPrice
		? null
		: isBilledMonthly
			? plan.pricePeriodAnnual
			: plan.pricePeriodMonthly

	return (
		<Card className="gap-0 overflow-hidden rounded-xl border p-0 lg:w-1/4">
			<div className="flex flex-col gap-4 p-5">
				<div className="flex flex-col gap-0.5">
					<div className="flex items-center gap-2">
						<h1 className="heading-2">{plan.name}</h1>
						{plan.badge && <Badge>{plan.badge}</Badge>}
					</div>
					<p className="text-sm font-normal">{plan.description}</p>
				</div>

				<div className="relative flex gap-2">
					<div>
						<h1 className="heading-6">{price}</h1>
					</div>
					{billingPeriod && (
						<div className="py-1">
							<p className="absolute bottom-1 text-sm font-normal">
								{billingPeriod}
							</p>
						</div>
					)}
				</div>

				<Button
					variant={plan.buttonVariant ?? "strong"}
					className="order-1 w-full">
					{plan.buttonText}
				</Button>
			</div>

			<div className="border-t p-5">
				<div className="flex flex-col gap-4">
					<div>
						<h1 className="text-sm font-medium">{plan.featuresHeader}</h1>
					</div>
					<div className="flex flex-col gap-2">
						{plan.features.map((feature, idx) => (
							<div key={idx} className="flex items-center gap-2">
								<Check className="h-4 w-4" />
								<p className="text-sm font-normal">{feature}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</Card>
	)
}
