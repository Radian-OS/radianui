"use client"

import React, { useState } from "react"
import { CheckCircle } from "lucide-react"
import { Badge } from "@/styles/default/ui/badge"
import { Button } from "@/styles/default/ui/button"
import type { FeatureCategory, PlanId, PricingPlan } from "./pricing-types"

interface PricingComparisonTableProps {
	plans: PricingPlan[]
	categories: FeatureCategory[]
	isBilledMonthly: boolean
}

export function PricingComparisonTable({
	plans,
	categories,
	isBilledMonthly,
}: PricingComparisonTableProps) {
	const [selectedPlanId, setSelectedPlanId] = useState<PlanId>("free")
	const activePlan = plans.find((p) => p.id === selectedPlanId)

	return (
		<div>
			{/* Mobile Plan Tabs */}
			<div className="sticky top-18 z-10 -mx-5 flex border md:-mx-6 lg:hidden">
				{plans.map((p) => {
					const isSelected = selectedPlanId === p.id
					return (
						<div
							key={p.id}
							className="w-1/4 cursor-pointer border-r text-center last:border-r-0"
							onClick={() => setSelectedPlanId(p.id)}>
							<div
								className={`px-2.5 py-3 ${
									isSelected ? "border-b-2 border-black dark:border-white" : ""
								}`}>
								{p.name}
							</div>
						</div>
					)
				})}
			</div>

			{/* Mobile Selected Plan Summary Header */}
			{activePlan && (
				<div className="flex flex-col gap-2 py-4 lg:hidden">
					<div>
						<h1 className="heading-2">{activePlan.name}</h1>
						<div className="flex gap-2">
							<p className="text-base font-semibold">
								{activePlan.isCustomPrice
									? activePlan.monthlyPrice
									: isBilledMonthly
										? activePlan.annualPrice
										: activePlan.monthlyPrice}
							</p>
							{!activePlan.isCustomPrice && (
								<p className="text-base font-normal">
									{isBilledMonthly
										? activePlan.pricePeriodAnnual
										: activePlan.pricePeriodMonthly}
								</p>
							)}
						</div>
					</div>
					<Button
						variant={activePlan.buttonVariant ?? "strong"}
						className="w-full">
						{activePlan.id === "enterprise"
							? "Get Started"
							: activePlan.buttonText}
					</Button>
				</div>
			)}

			{/* Mobile Features List */}
			<div className="lg:hidden">
				{categories.map((cat) => (
					<div key={cat.category}>
						<div className="border-b py-4">
							<h2 className="text-base font-semibold">{cat.category}</h2>
						</div>
						{cat.features.map((feat) => {
							const val = feat.values[selectedPlanId]
							return (
								<div
									key={feat.name}
									className="flex justify-between gap-4 border-b py-4">
									<h4 className="heading-6">{feat.name}</h4>
									<h4 className="heading-6">
										{val === true ? (
											<CheckCircle className="text-success-text" />
										) : (
											val
										)}
									</h4>
								</div>
							)
						})}
					</div>
				))}
			</div>

			{/* Desktop Sticky Header and Grid Table */}
			<div className="hidden lg:block">
				<div className="sticky top-10 z-10">
					<div className="grid grid-cols-[1.64fr_1fr_1fr_1fr_1fr] gap-8 border-b py-6">
						<div className="relative">
							<h2 className="heading-3 absolute bottom-4">Features</h2>
						</div>
						{plans.map((p) => {
							const price = p.isCustomPrice
								? p.monthlyPrice
								: isBilledMonthly
									? p.annualPrice
									: p.monthlyPrice

							return (
								<div key={p.id} className="text-sm font-medium">
									<div className="flex flex-col gap-2">
										<div>
											<div className="flex items-center gap-2">
												<h1 className="text-lg font-semibold">{p.name}</h1>
												{p.badge && <Badge variant="outline">{p.badge}</Badge>}
											</div>
											<div className="flex gap-2">
												<p className="text-base font-semibold">{price}</p>
												{!p.isCustomPrice && (
													<p className="text-base font-normal">
														{isBilledMonthly
															? p.pricePeriodAnnual
															: p.pricePeriodMonthly}
													</p>
												)}
											</div>
										</div>
										<Button variant={p.buttonVariant ?? "strong"}>
											{p.buttonText}
										</Button>
									</div>
								</div>
							)
						})}
					</div>
				</div>

				<div>
					{categories.map((cat) => (
						<div key={cat.category}>
							<div className="border-b py-4">
								<h2 className="heading-5">{cat.category}</h2>
							</div>
							{cat.features.map((feat) => (
								<div
									key={feat.name}
									className="grid grid-cols-[1.64fr_1fr_1fr_1fr_1fr] gap-8 border-b py-4">
									<h4 className="text-sm font-medium">{feat.name}</h4>
									{plans.map((p) => {
										const val = feat.values[p.id]
										return (
											<h4 key={p.id} className="text-sm font-medium">
												{val === true ? (
													<CheckCircle className="text-success-text" />
												) : (
													val
												)}
											</h4>
										)
									})}
								</div>
							))}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
