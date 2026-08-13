"use client"

import React from "react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/registry/ui/button"
import { FaqAccordion, FaqItem } from "./faq-accordion"
import { StatCard } from "./stat-card"

const faqList: FaqItem[] = [
	{
		question: "What services does your agency provide?",
		answer:
			"We provide full-service design, branding, and development solutions tailored to help modern companies launch and scale their digital products.",
	},
	{
		question: "What happens after project completion?",
		answer:
			"After launch, we provide ongoing maintenance, optimization, and strategy support to ensure your product continues to perform at its peak.",
	},
	{
		question: "How long does a typical project take?",
		answer:
			"A typical project takes anywhere from 4 to 8 weeks depending on the scope, complexity, and specific requirements.",
	},
	{
		question: "How many revisions are included?",
		answer:
			"We work in highly collaborative cycles and include unlimited iterative revisions within the scope of each phase to ensure perfection.",
	},
	{
		question: "How does your creative process work?",
		answer:
			"Our process begins with strategic research, followed by high-fidelity design prototyping, continuous feedback, and expert development.",
	},
]

export function FaqSection() {
	return (
		<section
			id="faq-section"
			className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
			{/* Top Header */}
			<div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end lg:mb-12">
				<div>
					<span className="text-fg-secondary text-[11px] font-extrabold uppercase tracking-widest">
						FAQ
					</span>
					<h2 className="heading-2 text-fg mt-3 font-bold tracking-tight">
						Frequently asked questions.
					</h2>
				</div>
				<Button
					color="neutral"
					variant="strong"
					size="48"
					className="bg-black-inverse text-white-inverse hover:bg-fg-secondary group inline-flex items-center gap-4 rounded-full pl-6 pr-2.5 text-sm font-semibold transition-all"
					asChild>
					<Link href="#" className="hover:underline">
						<span>Start a Project</span>
						<div className="bg-orange flex size-9 items-center justify-center rounded-full text-white transition-transform duration-300 group-hover:translate-x-1">
							<ArrowRight className="size-4 stroke-[2.5]" />
						</div>
					</Link>
				</Button>
			</div>

			{/* Main Grid */}
			<div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_1.3fr] lg:gap-12">
				{/* Left Side: Custom textured Blue Stat Card */}
				<div className="bg-blue shadow-blue/10 relative flex min-h-[260px] flex-col justify-end overflow-hidden rounded-3xl p-6 shadow-lg sm:min-h-[320px] sm:p-8">
					{/* Textured background styling */}
					<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--color-primary-accent),transparent_70%)] opacity-40" />
					<div className="bg-fill1-alpha pointer-events-none absolute inset-0 opacity-10" />

					{/* Stats container */}
					<div className="relative z-10 flex flex-col gap-4 sm:flex-row">
						<StatCard value="120+" label="Brands Launched" />
						<StatCard value="94%" label="Client Retention Rate" />
					</div>
				</div>

				{/* Right Side: FAQ Accordion List */}
				<div className="flex flex-col gap-4">
					{faqList.map((item, index) => (
						<FaqAccordion
							key={index}
							question={item.question}
							answer={item.answer}
						/>
					))}
				</div>
			</div>
		</section>
	)
}
