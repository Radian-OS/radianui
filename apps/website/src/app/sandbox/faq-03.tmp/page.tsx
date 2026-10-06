import React from "react"
import Link from "next/link"
import { FaqAccordion } from "./faq-accordion"
import { FaqHeader } from "./faq-header"

export default function Faq4Page() {
	return (
		<div className="bg-bg flex min-h-[800px] w-full items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
			{/* Centered Content Container */}
			<div className="flex w-full max-w-3xl flex-col items-center gap-10 sm:gap-12">
				{/* Section Header */}
				<FaqHeader />

				{/* Accordion list */}
				<FaqAccordion />

				{/* Bottom note with non-underlined link */}
				<p className="text-fg-secondary text-center text-sm">
					Still have a question?{" "}
					<Link
						href="#contact"
						className="text-fg hover:text-fg-secondary font-medium transition-colors">
						Talk to the team &rarr;
					</Link>
				</p>
			</div>
		</div>
	)
}
