"use client"

import React from "react"
import { Card } from "@/styles/default/ui/card"
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
		question: "How Do Teams Move a Block Into Production?",
		answer:
			"Copy the block into a route, swap the demo records for your data, and tighten the copy to match the surface. Layout, spacing, and focus states are already reviewed across breakpoints, so the first commit is usually content, not structure.",
	},
	{
		id: "item-1",
		question: "Can We Customize the Underlying shadcn Primitives?",
		answer:
			"Yes. Each block is built using standard shadcn/ui primitives. You can freely adjust variants, animations, and Tailwind classes to match your exact brand guidelines.",
	},
	{
		id: "item-2",
		question: "How Does Theming Work With Our Design Tokens?",
		answer:
			"All blocks use CSS variables for colors, radius, and typography tokens. Switching between light and dark modes or applying custom theme presets works out of the box.",
	},
	{
		id: "item-3",
		question: "What Does a Pro License Include?",
		answer:
			"A Pro license gives you full access to all current and upcoming blocks, lifetime updates, Figma design files, and priority support for your team.",
	},
	{
		id: "item-4",
		question: "Will Updates Overwrite Our Customizations?",
		answer:
			"No. Since code is added directly to your repository, you retain full control over all files. Updates from the CLI or registry are opt-in and diffable.",
	},
	{
		id: "item-5",
		question: "Where Do We Go for Implementation Help?",
		answer:
			"Join our community Discord or reach out directly to our engineering support team for guidance on component integration and best practices.",
	},
]

interface FaqAccordionProps {
	items?: FaqItem[]
}

export function FaqAccordion({ items = DEFAULT_FAQ_ITEMS }: FaqAccordionProps) {
	return (
		<Card className="border-border/80 bg-background/95 rounded-2xl border p-6 shadow-sm sm:p-8">
			<Accordion
				type="single"
				collapsible
				defaultValue="item-0"
				variant="open"
				size="lg"
				indicator="chevron"
				className="divide-border/60 w-full divide-y">
				{items.map((item) => (
					<AccordionItem
						key={item.id}
						value={item.id}
						className="border-border/60 py-1">
						<AccordionTrigger className="text-foreground hover:text-foreground py-4 text-base font-semibold transition-colors">
							{item.question}
						</AccordionTrigger>
						<AccordionContent className="text-fg-secondary pb-4 text-sm leading-relaxed sm:text-base">
							{item.answer}
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</Card>
	)
}
