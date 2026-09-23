"use client"

import React from "react"
import { HelpCircle } from "lucide-react"
import { FaqAccordion } from "./faq-accordion"
import { SupportCard } from "./support-card"

export default function Faq5Page() {
	return (
		<section className="bg-bg relative min-h-screen w-full px-4 py-16 sm:px-6 md:py-24 lg:px-8">
			<div className="mx-auto max-w-7xl">
				<div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
					<div className="flex flex-col gap-8 lg:col-span-7">
						<div className="space-y-4">
							<div className="border-border bg-fill2/50 text-fg inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-medium">
								<HelpCircle className="text-primary size-3.5" />
								<span>FAQ</span>
							</div>
							<div className="space-y-3">
								<h2 className="heading-1 text-fg">Everything Before Launch</h2>
								<p className="text-fg-secondary text-base sm:text-lg">
									What teams ask when adopting ReUI blocks in production.
								</p>
							</div>
						</div>

						<FaqAccordion />
					</div>

					<div className="lg:sticky lg:top-8 lg:col-span-5">
						<SupportCard />
					</div>
				</div>
			</div>
		</section>
	)
}
