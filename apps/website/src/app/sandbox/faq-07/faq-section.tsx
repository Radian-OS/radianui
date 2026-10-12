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
		<section className="mx-auto flex max-w-screen-xl flex-col gap-10 px-5 py-8 sm:px-6 md:gap-12 md:py-15">
			<div className="mx-auto flex max-w-screen-md flex-col items-center gap-4 text-center">
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

			<div className="mx-auto w-full max-w-3xl">
				<div className="border-border bg-elevation-level1 overflow-hidden rounded-xl border">
					<Accordion
						type="single"
						collapsible
						variant="table"
						size="lg"
						indicator="chevron"
						className="w-full">
						{faqs.map((faq, index) => (
							<AccordionItem
								key={index}
								value={`item-${index + 1}`}
								className="border-border border-b px-4 last:border-b-0 sm:px-6">
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
			</div>
		</section>
	)
}

export default FaqSection
