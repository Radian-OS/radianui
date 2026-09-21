"use client"

import React from "react"
import Image from "next/image"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/styles/default/ui/accordion"
import type { FaqItem } from "./types"

export const DEFAULT_FAQ_ITEMS: FaqItem[] = [
	{
		id: "item-0",
		question: "What services do you offer?",
		answer:
			"We offer a wide range of services including web development, app development, and digital marketing.",
	},
	{
		id: "item-1",
		question: "How long does a typical project take?",
		answer:
			"The time it takes to complete a project depends on the complexity of the project and the scope of the work.",
	},
	{
		id: "item-2",
		question: "What industries do you work with?",
		answer:
			"We work with startups, e-commerce brands, tech companies, real estate, healthcare, creators, and corporate clients. If you have a business, we can design for it.",
	},
	{
		id: "item-3",
		question: "Do you offer custom designs or use templates?",
		answer:
			"Absolutely! We offer comprehensive post-launch support to ensure a seamless implementation and provide ongoing maintenance packages tailored to clients who need regular updates or technical assistance. Our commitment doesn't end at launch — we're here to help you every step of the way.",
	},
	{
		id: "item-4",
		question: "How much do your services cost?",
		answer:
			"We provide updates on a regular basis to ensure that your project is running smoothly and that you are aware of any changes or updates to the project.",
	},
	{
		id: "item-5",
		question: "Can I request revisions?",
		answer:
			"Yes, we offer post-launch support and maintenance packages to help you with ongoing updates, technical assistance, and any modifications you may need after your website or app goes live.",
	},
]

interface FaqAccordionProps {
	items?: FaqItem[]
	imageSrc?: string
	imageAlt?: string
}

export function FaqAccordion({
	items = DEFAULT_FAQ_ITEMS,
	imageSrc = "/sandbox/placeholder.svg",
	imageAlt = "FAQ Visual Showcase",
}: FaqAccordionProps) {
	return (
		<div className="border-border border-y">
			<div className="mx-auto max-w-7xl px-4 lg:px-8 xl:px-16">
				<div className="border-border border-x">
					<div className="grid grid-cols-1 lg:grid-cols-2">
						<div className="bg-muted/10 flex h-full w-full items-center justify-center overflow-hidden">
							<Image
								src={imageSrc}
								alt={imageAlt}
								width={564}
								height={536}
								className="h-full max-h-[48rem] w-full object-cover"
							/>
						</div>

						<div className="border-border flex flex-col justify-center border-t lg:border-t-0 lg:border-l">
							<Accordion
								type="single"
								collapsible
								defaultValue="item-0"
								variant="open"
								indicator="plus-minus"
								className="divide-border flex w-full flex-col divide-y">
								{items.map((item) => (
									<AccordionItem
										key={item.id}
										value={item.id}
										className="flex flex-col gap-2 px-4 py-6 sm:p-6">
										<AccordionTrigger className="text-foreground cursor-pointer p-0 text-lg font-medium hover:no-underline">
											{item.question}
										</AccordionTrigger>
										<AccordionContent className="text-fg-secondary pt-2 text-base leading-relaxed font-normal">
											{item.answer}
										</AccordionContent>
									</AccordionItem>
								))}
							</Accordion>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
