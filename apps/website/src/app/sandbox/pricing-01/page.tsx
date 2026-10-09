import React from "react"
import { PricingCards } from "./pricing-cards"
import { PricingHeader } from "./pricing-header"
import { TrustedPartners } from "./trusted-partners"

export default function Pricing05Page() {
	return (
		<section className="relative w-full overflow-hidden">
			<div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-16 sm:gap-16 sm:px-6 sm:py-20 md:px-8 lg:gap-20 lg:px-8 lg:py-24">
				{/* Top Header */}
				<PricingHeader />

				{/* 3 Pricing Cards Grid */}
				<PricingCards />

				{/* Bottom Trusted Partners */}
				<TrustedPartners />
			</div>
		</section>
	)
}
