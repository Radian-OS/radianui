import React from "react"
import { Badge } from "@/styles/default/ui/badge"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/styles/default/ui/accordion"
import faqs from "./faq-content.json"

export function FaqSection() {
	return (
		<section className="mx-auto flex max-w-screen-xl flex-col gap-10 px-5 py-8 sm:px-6 md:py-15 lg:flex-row lg:items-start lg:gap-16">
			{/* Left Column: Heading Info */}
			<div className="flex flex-col gap-4 text-left lg:sticky lg:top-24 lg:w-2/5">
				<Badge
					variant="outline"
					className="bg-bg max-w-fit rounded-full px-3 py-1">
					<span className="text-sm font-medium capitalize">FAQ</span>
				</Badge>
				<h2 className="heading-2">Frequently asked questions</h2>
				<p className="text-fg-secondary text-base">
					Most commonly asked questions about Radian. Can't find what you're
					looking for? Check out our{" "}
					<a
						href="#"
						className="text-primary hover:text-primary/80 transition-colors">
						documentation
					</a>
					.
				</p>
			</div>

			{/* Right Column: Accordion List */}
			<div className="w-full lg:w-3/5">
				<Accordion
					type="single"
					collapsible
					variant="box"
					size="lg"
					indicator="chevron"
					className="w-full">
					{faqs.map((faq, index) => (
						<AccordionItem
							key={index}
							value={`item-${index + 1}`}
							className="border-border bg-elevation-level1 rounded-xl border px-4 sm:px-6">
							<AccordionTrigger className="text-fg text-base font-medium hover:no-underline">
								{faq.question}
							</AccordionTrigger>
							<AccordionContent className="text-fg-secondary text-base leading-relaxed">
								{faq.answer}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	)
}

export default FaqSection
