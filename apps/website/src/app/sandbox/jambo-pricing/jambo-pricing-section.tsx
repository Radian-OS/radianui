"use client"

import React from "react"
import { LogoStrip } from "./logo-strip"
import { FeatureItem, PricingCard } from "./pricing-card"
import { Rating } from "./rating"

const basicFeatures: FeatureItem[] = [
	{
		title: "Feedback",
		subtext: "Collect, organize, and prioritize user feedback.",
	},
	{
		title: "Insights",
		subtext: "Collect, organize, and prioritize user feedback.",
	},
	{
		title: "Free 2-years of updates",
		subtext: "Collect, organize, and prioritize user feedback.",
	},
]

const premiumFeatures: FeatureItem[] = [
	{
		title: "Feedback",
		highlightTitleText: "+ Voting System",
		subtext: "Collect, organize, and prioritize user feedback.",
	},
	{
		title: "Feedback",
		subtext: "Collect, organize, and prioritize user feedback.",
	},
	{
		title: "Public Leaderboard",
		subtext: "Collect, organize, and prioritize user feedback.",
	},
	{
		title: "Public Roadmap",
		subtext: "Collect, organize, and prioritize user feedback.",
	},
	{
		title: "Hyper-regular updates",
		subtext: "Collect, organize, and prioritize user feedback.",
	},
]

export function JamboPricingSection() {
	return (
		<section
			id="jambo-pricing-section"
			className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
			{/* Top Header */}
			<div className="mb-12 flex flex-col items-center text-center sm:mb-16">
				<span className="text-fg-secondary text-[11px] font-extrabold uppercase tracking-widest">
					Pricing Plan
				</span>
				<h2 className="heading-2 text-fg mt-4 max-w-2xl font-bold leading-tight tracking-tight">
					Simply choose the pricing plan that{" "}
					<span className="text-orange-text">fits you best.</span>
				</h2>
			</div>

			{/* Pricing Cards Grid */}
			<div className="mx-auto mb-16 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
				<PricingCard
					name="Jambo"
					subtitle="Best for personal and basic needs."
					price="$8"
					periodText="one-time payment"
					features={basicFeatures}
					isFeatured={false}
				/>
				<PricingCard
					name="Jambo"
					subtitle="Best for power user and team agencies."
					price="$12"
					periodText="per user/mo, billed annually"
					features={premiumFeatures}
					isFeatured={true}
				/>
			</div>

			{/* Divider */}
			<div className="bg-border mx-auto mb-16 h-px max-w-4xl" />

			{/* Rating and Logos footer */}
			<div className="flex flex-col items-center gap-12">
				<Rating />
				<LogoStrip />
			</div>
		</section>
	)
}
