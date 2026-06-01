import React from "react"
import { AppWindow, CircleHelp, Component, Zap } from "lucide-react"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/registry/ui/accordion"

const contents = [
	{
		id: 1,
		trigger: "What is Radian OS?",
		content:
			"Radian OS is a high-quality design and development library aimed at building systems that scale quickly. It enables rapid transition from design to product in just a few hours.",
		icon: CircleHelp,
	},
	{
		id: 2,
		trigger: "What components are available in Radian OS?",
		content:
			"Radian OS offers a variety of Ul components including Accordions, Alerts, Avatars, Badges, Banners, Buttons, Calendars, Checkboxes, Dropdowns and more.",
		icon: Component,
	},
	{
		id: 3,
		trigger: "What application components does Radian OS provide?",
		content:
			"Application components such as User Authentication, Navigation Bars, Application Settings, and many more.",
		icon: AppWindow,
	},
	{
		id: 4,
		trigger: "How can I stay updated with Radian OS developments?",
		content:
			"You can subscribe to Radian OS newsletter to receive the latest information, tips, and exclusive offers.",
		icon: Zap,
	},
]

export default function AccordionWithIcon() {
	return (
		<Accordion type="single" className="w-full lg:w-[75%]" collapsible>
			{contents.map((item) => (
				<AccordionItem value={item.id.toString()} key={item.id}>
					<AccordionTrigger>
						<span className="flex items-center gap-3">
							<item.icon
								size={20}
								strokeWidth={1.5}
								className="text-fg-secondary shrink-0"
								aria-hidden="true"
							/>
							<span>{item.trigger}</span>
						</span>
					</AccordionTrigger>
					<AccordionContent className="ps-11">{item.content}</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	)
}
