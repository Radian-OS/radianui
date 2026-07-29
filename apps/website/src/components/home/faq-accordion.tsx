"use client"

import { CodeXml, MessageCircleQuestion, PenTool } from "lucide-react"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/styles/default/ui/accordion"

export interface FAQItem {
	title: string
	content: string
	category: "general" | "design" | "development"
}

export const FAQ_CATEGORIES = [
	{ label: "General", value: "general" as const, icon: MessageCircleQuestion },
	{ label: "Design", value: "design" as const, icon: PenTool },
	{ label: "Development", value: "development" as const, icon: CodeXml },
]

export const CONTENT: FAQItem[] = [
	// General
	{
		title: "What is RadianOS?",
		content:
			"RadianOS is an UI component library for building modern, responsive user interfaces.",
		category: "general",
	},
	{
		title: "Is RadianOS open-source?",
		content:
			"Yes, RadianOS is open source, allowing anyone to view, modify, and contribute to its code.",
		category: "general",
	},
	{
		title: "How can I contribute?",
		content:
			"You can contribute to RadianOS by forking the repository, making your changes, and submitting a pull request. Review the contribution guidelines before starting.",
		category: "general",
	},
	{
		title: "Is it production-ready?",
		content:
			"RadianOS is stable for most use cases but still under active development. Evaluate it in your environment before production deployment.",
		category: "general",
	},
	{
		title: "Does it comply with current security standards?",
		content:
			"RadianOS follows modern security best practices and is regularly updated to address any vulnerabilities.",
		category: "general",
	},
	{
		title: "What license does RadianOS use?",
		content:
			"RadianOS is released under a permissive open-source license, making it safe to use in personal and commercial projects.",
		category: "general",
	},
	{
		title: "Is RadianOS free to use?",
		content:
			"Yes, RadianOS is completely free to use, with no hidden costs or premium tiers required to access its components.",
		category: "general",
	},
	{
		title: "Where can I get support or ask questions?",
		content:
			"You can reach out through the project's GitHub discussions or issue tracker for support, questions, and feature requests.",
		category: "general",
	},

	// Design
	{
		title: "Does RadianOS support theming and dark mode?",
		content:
			"Yes, RadianOS supports theming and includes built-in dark mode options.",
		category: "design",
	},
	{
		title: "Can I customize the design tokens?",
		content:
			"Yes, RadianOS exposes design tokens for colors, spacing, and typography so you can tailor the look and feel to your brand.",
		category: "design",
	},
	{
		title: "Does RadianOS follow a consistent design system?",
		content:
			"RadianOS is built around a cohesive design system, ensuring visual and behavioral consistency across all components.",
		category: "design",
	},
	{
		title: "Is RadianOS accessible?",
		content:
			"Yes, components are designed with accessibility in mind, following WAI-ARIA guidelines for keyboard navigation and screen readers.",
		category: "design",
	},
	{
		title: "Can I create custom themes?",
		content:
			"You can create fully custom themes by overriding the default tokens and styles to match your product's identity.",
		category: "design",
	},
	{
		title: "Does RadianOS support responsive design out of the box?",
		content:
			"Yes, components are responsive by default and adapt gracefully across breakpoints and screen sizes.",
		category: "design",
	},
	{
		title: "What design principles guide RadianOS components?",
		content:
			"RadianOS emphasizes clarity, consistency, and simplicity, aiming to reduce visual noise while keeping interfaces intuitive.",
		category: "design",
	},
	{
		title: "Can I adjust spacing, radius, and typography scales?",
		content:
			"Yes, spacing, border radius, and typography scales are all configurable to fit different product styles.",
		category: "design",
	},

	// Development
	{
		title: "Can I use it with React or Next.js?",
		content:
			"Yes, RadianOS is compatible with React and Next.js for building modern web interfaces.",
		category: "development",
	},
	{
		title: "Has it been tested across all target devices?",
		content:
			"RadianOS components are tested across major browsers and devices to ensure consistent behavior and responsiveness.",
		category: "development",
	},
	{
		title: "Is RadianOS written in TypeScript?",
		content:
			"Yes, RadianOS is built entirely in TypeScript, giving you type safety and better editor autocompletion out of the box.",
		category: "development",
	},
	{
		title: "How do I install RadianOS in my project?",
		content:
			"You can install RadianOS via your package manager of choice, such as npm, pnpm, or yarn, and start importing components right away.",
		category: "development",
	},
	{
		title: "Does RadianOS support tree-shaking?",
		content:
			"Yes, RadianOS is optimized for tree-shaking, so your final bundle only includes the components you actually use.",
		category: "development",
	},
	{
		title: "Can I use RadianOS with a CLI or code generator?",
		content:
			"RadianOS offers CLI tooling to scaffold and add components directly into your project with minimal setup.",
		category: "development",
	},
	{
		title: "Is RadianOS compatible with Tailwind CSS?",
		content:
			"Yes, RadianOS is built to work seamlessly alongside Tailwind CSS, so you can style and extend components with utility classes.",
		category: "development",
	},
	{
		title: "How do I report bugs or request features?",
		content:
			"Bugs and feature requests can be submitted through the project's GitHub issue tracker, where maintainers review and triage them.",
		category: "development",
	},
]

export default function FAQAccordion({
	activeCategory,
}: {
	activeCategory: string
}) {
	const filteredContent = CONTENT.filter(
		(item) => item.category === activeCategory
	)

	// Show all items if no items match the category (fallback)
	const displayContent = filteredContent.length > 0 ? filteredContent : CONTENT

	return (
		<Accordion
			type="single"
			className="w-full"
			collapsible
			variant="open"
			indicator="plus-minus">
			{displayContent.map(({ title, content }) => (
				<AccordionItem key={title} value={title}>
					<AccordionTrigger className="gap-2 p-5">
						<span className="text-sm">{title}</span>
					</AccordionTrigger>
					<AccordionContent className="px-5 text-sm">
						{content}
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	)
}
