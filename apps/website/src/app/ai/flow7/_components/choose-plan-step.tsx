"use client"

import { useState } from "react"
import { ArrowUpRight, Check, Minus } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { Divider } from "@/registry/ui/divider"

type Plan = {
	id: string
	name: string
	subtitle: string
	price: string
	period: string
	billing: string
	features: {
		label: string
		included: boolean
		badge?: string
	}[]
	popular?: boolean
}

const plans: Plan[] = [
	{
		id: "starter",
		name: "Starter Plan",
		subtitle: "Small teams and freelancers",
		price: "$49.99",
		period: "monthly",
		billing: "billed annually",
		features: [
			{ label: "50 GB Cloud Storage", included: true },
			{ label: "2 User accounts", included: true },
			{
				label: "Standard Email Support",
				included: true,
				badge: "New",
			},
			{ label: "Self-service", included: true },
			{ label: "Unlimited Workspaces", included: false },
			{ label: "Admin Controls", included: false },
		],
	},
	{
		id: "standard",
		name: "Standard Plan",
		subtitle: "Growing startups and agencies",
		price: "$69.99",
		period: "monthly",
		billing: "billed annually",
		popular: true,
		features: [
			{ label: "200 GB Cloud Storage", included: true },
			{ label: "10 User accounts", included: true },
			{ label: "24/7 Priority Support", included: true },
			{
				label: "Dedicated Account Manager",
				included: true,
				badge: "New",
			},
			{ label: "Unlimited Workspaces", included: true },
			{ label: "Admin Controls", included: true },
		],
	},
]

export default function ChoosePlanStep({
	onNext,
}: {
	onNext: (planId: string) => void
}) {
	const [selectedPlan, setSelectedPlan] = useState("standard")

	return (
		<div className="w-full max-w-[800px]">
			<div className="flex flex-col gap-2">
				<h2 className="heading-5">Choose a plan for your team</h2>
				<p className="text-fg-secondary text-sm">
					Choose a subscription plan to access the features and tools you need.
				</p>
			</div>

			<div className="mt-8 flex flex-col gap-5 sm:flex-row">
				{plans.map((plan) => {
					const isSelected = selectedPlan === plan.id
					return (
						<div
							key={plan.id}
							onClick={() => setSelectedPlan(plan.id)}
							className={`flex flex-1 cursor-pointer flex-col gap-5 rounded-2xl border-2 p-4 transition-colors ${
								isSelected ? "border-primary" : "border-soft"
							}`}>
							<div className="flex flex-col gap-5">
								<div className="flex flex-col gap-2">
									<div className="flex items-center gap-1">
										<h3 className="heading-6">{plan.name}</h3>
										{plan.popular && (
											<span className="border-soft-alpha bg-primary-accent text-primary rounded-full border px-2 py-0.5 text-[13px] font-medium">
												Most Popular
											</span>
										)}
									</div>
									<p className="text-fg-secondary text-xs">{plan.subtitle}</p>
								</div>

								<div className="flex flex-col gap-3">
									<div className="flex items-center gap-3">
										<span className="heading-4">{plan.price}</span>
										<div className="flex flex-col gap-1 text-sm font-medium">
											<span className="text-fg-secondary">{plan.period}</span>
											<span className="text-fg-disabled">{plan.billing}</span>
										</div>
									</div>
									<Button
										type="button"
										color="primary"
										onClick={() => onNext(plan.id)}>
										Get Started
										<ArrowUpRight className="size-5" />
									</Button>
								</div>
							</div>

							<Divider />

							<div className="flex flex-col gap-3">
								<p className="text-fg text-sm font-medium">
									What&apos;s Included?
								</p>
								<div className="flex flex-col gap-2.5">
									{plan.features.map((feature) => (
										<div
											key={feature.label}
											className="flex items-center gap-2">
											{feature.included ? (
												<Check className="text-fg-secondary size-4" />
											) : (
												<Minus className="text-fg-disabled size-4" />
											)}
											<span
												className={`flex-1 text-sm ${
													feature.included
														? "text-fg-secondary"
														: "text-fg-disabled"
												}`}>
												{feature.label}
											</span>
											{feature.badge && (
												<span className="border-soft-alpha bg-primary-accent text-primary rounded-full border px-1.5 py-0.5 text-xs font-medium">
													{feature.badge}
												</span>
											)}
										</div>
									))}
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}
