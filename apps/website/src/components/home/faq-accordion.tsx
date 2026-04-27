"use client"

import {
	BookOpenText,
	Braces,
	Handshake,
	LucideIcon,
	Moon,
	Orbit,
	ShieldCheck,
} from "lucide-react"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/styles/default/ui/accordion"

export interface FAQItem {
	title: string
	content: string
	icon: LucideIcon
}

export const CONTENT: FAQItem[] = [
	{
		title: "What is RadianOS?",
		content:
			"RadianOS is an UI component library for building modern, responsive user interfaces.",
		icon: Orbit,
	},
	{
		title: "Is RadianOS open-source?",
		content:
			"Yes, RadianOS is open source, allowing anyone to view, modify, and contribute to its code.",
		icon: BookOpenText,
	},
	{
		title: "Can I use it with React or Next.js?",
		content:
			"Yes, RadianOS is compatible with React and Next.js for building modern web interfaces.",
		icon: Braces,
	},
	{
		title: "Does RadianOS support theming and dark mode?",
		content:
			"Yes, RadianOS supports theming and includes built-in dark mode options.",
		icon: Moon,
	},
	{
		title: "How can I contribute?",
		content:
			"You can contribute to RadianOS by forking the repository, making your changes, and submitting a pull request. Review the contribution guidelines before starting.",
		icon: Handshake,
	},
	{
		title: "Is it production ready?",
		content:
			"RadianOS is stable for most use cases but still under active development. Evaluate it in your environment before production deployment.",
		icon: ShieldCheck,
	},
]

export default function FAQAccordion() {
	return (
		<Accordion
			size="lg"
			type="single"
			className="w-full"
			collapsible
			variant="open">
			{CONTENT.map(({ title, content, icon: Icon }) => (
				<AccordionItem key={title} value={title}>
					<AccordionTrigger className="gap-2">
						<div className="flex items-center gap-3">
							<Icon
								size={24}
								strokeWidth={1.5}
								className="text-fg-secondary shrink-0"
								aria-hidden="true"
							/>
							<span>{title}</span>
						</div>
					</AccordionTrigger>
					<AccordionContent>{content}</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	)
}
