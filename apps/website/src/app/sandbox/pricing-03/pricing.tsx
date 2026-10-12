"use client"

import React, { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/styles/default/ui/button"
import { PricingHeader } from "./pricing-header"
import { PricingCard } from "./pricing-card"
import { PricingComparisonTable } from "./pricing-comparison-table"
import { PRICING_PLANS, FEATURE_CATEGORIES } from "./pricing-data"

export function Pricing() {
	const [isBilledMonthly, setIsBilledMonthly] = useState(false)
	const [isViewFeatureList, setIsViewFeatureList] = useState(false)

	return (
		<section
			id="pricing-section"
			className="mx-auto flex max-w-screen-xl flex-col gap-8 px-5 py-8 md:px-6 md:py-15">
			{/* Header & Toggle */}
			<PricingHeader
				isBilledMonthly={isBilledMonthly}
				onBilledMonthlyChange={() => setIsBilledMonthly(!isBilledMonthly)}
			/>

			{/* Pricing Cards Grid */}
			<div className="flex flex-col gap-5 lg:flex-row">
				{PRICING_PLANS.map((plan) => (
					<PricingCard
						key={plan.id}
						plan={plan}
						isBilledMonthly={isBilledMonthly}
					/>
				))}
			</div>

			{/* Toggle Full Feature List Button */}
			<Button
				variant="outline"
				className="mx-auto w-fit gap-1 px-3.5 py-2.5"
				onClick={() => setIsViewFeatureList(!isViewFeatureList)}>
				View full Features List{" "}
				{isViewFeatureList ? (
					<ChevronDown className="size-4" />
				) : (
					<ChevronUp className="size-4" />
				)}
			</Button>

			{/* Collapsible Feature Comparison Table */}
			{isViewFeatureList && (
				<PricingComparisonTable
					plans={PRICING_PLANS}
					categories={FEATURE_CATEGORIES}
					isBilledMonthly={isBilledMonthly}
				/>
			)}
		</section>
	)
}

export default Pricing
