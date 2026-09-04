"use client"

import React, { useState } from "react"
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react"

interface FaqItem {
	question: string
	answer: string
}

const faqs: FaqItem[] = [
	{
		question: "What is Verseo?",
		answer:
			"Verseo is an AI-powered writing assistant that helps you generate, rewrite, and improve content in seconds. From emails and social posts to product descriptions and marketing copy, it helps you create content faster with less effort.",
	},
	{
		question: "Who is Verseo designed for?",
		answer:
			"Verseo is built for marketers, founders, creators, and teams who want to create high-quality content quickly without getting stuck on blank pages or spending hours editing.",
	},
	{
		question: "Do I need any writing experience?",
		answer:
			"Not at all. Simply provide a rough idea, prompt, or bullet points, and Verseo structures, writes, and refines the copy for you with proven marketing frameworks.",
	},
	{
		question: "Can I customize the generated content?",
		answer:
			"Yes. You can customize tone of voice, formatting, length, target audience, and refine any specific phrase or section with 1-click rewrite actions.",
	},
	{
		question: "What types of content can I create?",
		answer:
			"You can create landing page copy, marketing emails, social media threads, blog outlines, ad copy, product descriptions, investor updates, and more.",
	},
	{
		question: "How fast can I generate content?",
		answer:
			"Most content drafts, headline variations, and full email outlines are generated in 2 to 5 seconds.",
	},
]

export function VerseoFaqSection() {
	const [openIndices, setOpenIndices] = useState<number[]>([0])

	const toggleFaq = (index: number) => {
		setOpenIndices((prev) =>
			prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
		)
	}

	return (
		<section className="py-20 md:py-28">
			<div className="mx-auto max-w-4xl px-4">
				{/* Section Header */}
				<div className="flex flex-col items-center text-center">
					<div className="border-border/70 bg-fill1 text-fg-secondary mb-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold">
						<span>[</span>
						<span className="text-foreground">faq</span>
						<span>]</span>
					</div>

					{/* Rule 13: heading-2 */}
					<h2 className="heading-2 text-foreground text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
						Everything you need to know
					</h2>

					<p className="text-fg-secondary mt-4 max-w-lg text-center text-sm leading-relaxed md:text-base">
						Got questions? Here are the most common things people ask about
						Verseo.
					</p>
				</div>

				{/* Interactive Accordion List (Rule 18: map) */}
				<div className="mt-14 space-y-3.5">
					{faqs.map((faq, idx) => {
						const isOpen = openIndices.includes(idx)
						return (
							<div
								key={faq.question}
								className="border-border/70 bg-background/90 hover:border-border overflow-hidden rounded-2xl border transition-all duration-200">
								<button
									type="button"
									onClick={() => toggleFaq(idx)}
									className="flex w-full items-center justify-between p-5 text-left transition-colors sm:p-6">
									<span className="text-foreground flex items-center gap-3 text-sm font-bold sm:text-base">
										<HelpCircle className="text-primary size-4 shrink-0" />
										<span>{faq.question}</span>
									</span>

									<div className="bg-fill2 text-fg-secondary flex size-7 shrink-0 items-center justify-center rounded-full">
										{isOpen ? (
											<ChevronUp className="text-primary size-4" />
										) : (
											<ChevronDown className="size-4" />
										)}
									</div>
								</button>

								{isOpen && (
									<div className="border-border/40 border-t px-5 pb-6 pt-3 sm:px-6">
										<p className="text-fg-secondary text-xs leading-relaxed sm:text-sm">
											{faq.answer}
										</p>
									</div>
								)}
							</div>
						)
					})}
				</div>
			</div>
		</section>
	)
}
