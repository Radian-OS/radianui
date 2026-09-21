"use client"

import React from "react"
import { FaqHeader } from "./faq-header"
import { FaqAccordion } from "./faq-accordion"
import { StatsGrid } from "./stats-grid"

export default function Faq03Page() {
	return (
		<section className="bg-background relative min-h-screen w-full py-8 md:py-16">
			<div className="overflow-hidden">
				<FaqHeader />
				<FaqAccordion />
				<StatsGrid />
			</div>
		</section>
	)
}
