"use client"

import React, { useState } from "react"
import { Tabs, TabsContent } from "@/styles/default/ui/tabs"
import { PricingCard } from "./pricing-card"
import { UNTITLED_PLANS } from "./pricing-data"
import { PricingHero } from "./pricing-hero"
import { PricingLogos } from "./pricing-logos"
import { PricingNav } from "./pricing-nav"
import type { BillingCycle } from "./pricing-types"

export function PricingSection() {
	const [cycle, setCycle] = useState<BillingCycle>("monthly")

	return (
		<section className="bg-bg min-h-screen w-full">
			{/* Top Navigation */}
			<PricingNav />

			{/* Main Content Area */}
			<main className="mx-auto max-w-7xl px-6 sm:px-8">
				<Tabs
					defaultValue="monthly"
					onValueChange={(val) => setCycle(val as BillingCycle)}
					className="w-full">
					{/* Hero Typography and Switcher */}
					<PricingHero />

					{/* Monthly Cards Grid */}
					<TabsContent value="monthly" className="mt-8">
						<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
							{UNTITLED_PLANS.map((plan) => (
								<PricingCard key={plan.id} plan={plan} billingCycle="monthly" />
							))}
						</div>
					</TabsContent>

					{/* Annual Cards Grid */}
					<TabsContent value="annual" className="mt-8">
						<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
							{UNTITLED_PLANS.map((plan) => (
								<PricingCard key={plan.id} plan={plan} billingCycle="annual" />
							))}
						</div>
					</TabsContent>
				</Tabs>
			</main>

			{/* Bottom Social Proof Logos */}
			<div className="mt-20">
				<PricingLogos />
			</div>
		</section>
	)
}
