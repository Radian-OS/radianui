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
		title: "What is Radian UI?",
		content:
			"Radian UI is an open-source, beautifully designed collection of React components. It is built on top of Radix UI primitives and styled with Tailwind CSS. Instead of installing it as a rigid dependency, you use our CLI to copy the component source code directly into your project so you have full ownership and control.",
		category: "general",
	},
	{
		title: "Is Radian UI distributed as an npm package?",
		content:
			"No. You do not install Radian UI as a dependency (npm install radianui). Instead, you use the CLI (npx radianui init) to pull the raw React and Tailwind code directly into your codebase. It is 100% open-source (MIT License) and completely free for both personal and commercial projects.",
		category: "general",
	},
	{
		title: "Does Radian UI support the Next.js App Router?",
		content:
			"Yes. Radian UI components are fully compatible with Next.js, including the App Router. Components that require client-side interactivity (like Accordions or Dialogs) include the 'use client' directive by default, allowing you to seamlessly integrate them with your server components.",
		category: "general",
	},
	{
		title: "Does Radian UI support Tailwind CSS dark mode?",
		content:
			"Yes. Every component is designed out-of-the-box to support Tailwind's dark mode utilizing CSS variables. You can easily theme your entire application by updating a few core tokens in your global CSS file.",
		category: "general",
	},
	{
		title: "How can I contribute to the open-source repository?",
		content:
			"We welcome community contributions! You can fork the radianui repository on GitHub, make your changes, and submit a pull request. If you have feature requests, bug reports, or need support, feel free to join our GitHub Discussions or open an issue.",
		category: "general",
	},
	{
		title: "Can I use Radian UI components in production?",
		content:
			"Yes. Because Radian UI uses a copy-and-paste architecture, you own the code. The underlying interactive elements are powered by Radix UI, which is thoroughly tested, WAI-ARIA accessible, and currently used in massive enterprise production environments.",
		category: "general",
	},

	// Design
	{
		title: "Does Radian UI support theming and dark mode?",
		content:
			"Yes, Radian UI supports theming and includes built-in dark mode options.",
		category: "design",
	},
	{
		title: "Can I customize the design tokens?",
		content:
			"Yes, Radian UI exposes design tokens for colors, spacing, and typography so you can tailor the look and feel to your brand.",
		category: "design",
	},
	{
		title: "Does Radian UI follow a consistent design system?",
		content:
			"Radian UI is built around a cohesive design system, ensuring visual and behavioral consistency across all components.",
		category: "design",
	},
	{
		title: "Is Radian UI accessible?",
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
		title: "Does Radian UI support responsive design out of the box?",
		content:
			"Yes, components are responsive by default and adapt gracefully across breakpoints and screen sizes.",
		category: "design",
	},
	{
		title: "What design principles guide Radian UI components?",
		content:
			"Radian UI emphasizes clarity, consistency, and simplicity, aiming to reduce visual noise while keeping interfaces intuitive.",
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
			"Yes, Radian UI is compatible with React and Next.js for building modern web interfaces.",
		category: "development",
	},
	{
		title: "Has it been tested across all target devices?",
		content:
			"Radian UI components are tested across major browsers and devices to ensure consistent behavior and responsiveness.",
		category: "development",
	},
	{
		title: "Is Radian UI written in TypeScript?",
		content:
			"Yes, Radian UI is built entirely in TypeScript, giving you type safety and better editor autocompletion out of the box.",
		category: "development",
	},
	{
		title: "How do I install Radian UI in my project?",
		content:
			"You can install Radian UI via your package manager of choice, such as npm, pnpm, or yarn, and start importing components right away.",
		category: "development",
	},
	{
		title: "Does Radian UI support tree-shaking?",
		content:
			"Yes, Radian UI is optimized for tree-shaking, so your final bundle only includes the components you actually use.",
		category: "development",
	},
	{
		title: "Can I use Radian UI with a CLI or code generator?",
		content:
			"Radian UI offers CLI tooling to scaffold and add components directly into your project with minimal setup.",
		category: "development",
	},
	{
		title: "Is Radian UI compatible with Tailwind CSS?",
		content:
			"Yes, Radian UI is built to work seamlessly alongside Tailwind CSS, so you can style and extend components with utility classes.",
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
						<span className="text-base">{title}</span>
					</AccordionTrigger>
					<AccordionContent className="px-5 text-base">
						{content}
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	)
}
