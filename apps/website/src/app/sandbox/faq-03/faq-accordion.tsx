"use client"

import React from "react"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/styles/default/ui/accordion"
import type { FaqItem } from "./types"

const DEFAULT_FAQ_ITEMS: FaqItem[] = [
	{
		id: "item-0",
		question: "How Do We Move A Block Into Production?",
		answer:
			"Copy the block into a route, swap the demo data for your own, and tighten the copy for your product. The markup is already responsive and reads from theme tokens, so most of the work is content, not layout.",
	},
	{
		id: "item-1",
		question: "Can We Customize The shadcn Primitives?",
		answer:
			"Yes. Each block is built using standard shadcn/ui primitives. You can freely adjust variants, animations, and Tailwind classes to match your exact brand guidelines.",
	},
	{
		id: "item-2",
		question: "How Does Theming Work Across Blocks?",
		answer:
			"All blocks use CSS variables for colors, radius, and typography tokens. Switching between light and dark modes or applying custom theme presets works out of the box.",
	},
	{
		id: "item-3",
		question: "Will A Block Fit Our Existing App Shell?",
		answer:
			"Yes, blocks are designed with responsive layouts and container queries so they adapt seamlessly into standard sidebars, stacked navigations, or standalone page templates.",
	},
	{
		id: "item-4",
		question: "What Does A Pro License Include?",
		answer:
			"A Pro license gives you full access to all current and upcoming blocks, lifetime updates, Figma design files, and priority support for your team.",
	},
	{
		id: "item-5",
		question: "How Do Block Updates Reach Our Codebase?",
		answer:
			"Since the code lives directly in your repository, you control all updates. You can compare changes via our changelog or CLI registry to pull in improvements when you choose.",
	},
	{
		id: "item-6",
		question: "Where Do We Get Implementation Help?",
		answer:
			"Join our community Discord or reach out directly to our engineering support team for guidance on component integration and best practices.",
	},
]

interface FaqAccordionProps {
	items?: FaqItem[]
}

export function FaqAccordion({ items = DEFAULT_FAQ_ITEMS }: FaqAccordionProps) {
	return (
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
					<AccordionTrigger className="text-fg hover:text-fg py-4 text-base font-semibold transition-colors">
						{item.question}
					</AccordionTrigger>
					<AccordionContent className="text-fg-secondary pb-4 text-sm leading-relaxed sm:text-base">
						{item.answer}
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	)
}
