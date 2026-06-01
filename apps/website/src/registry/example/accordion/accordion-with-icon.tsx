import React from "react"
import { IconSlot } from "@/registry/icon/icon-library"
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
		icon: (
			<IconSlot
				slot="help-circle"
				size={20}
				strokeWidth={1.5}
				className="text-fg-secondary shrink-0"
				aria-hidden="true"
			/>
		),
	},
	{
		id: 2,
		trigger: "What components are available in Radian OS?",
		content:
			"Radian OS offers a variety of Ul components including Accordions, Alerts, Avatars, Badges, Banners, Buttons, Calendars, Checkboxes, Dropdowns and more.",
		icon: (
			<IconSlot
				slot="component"
				size={20}
				strokeWidth={1.5}
				className="text-fg-secondary shrink-0"
				aria-hidden="true"
			/>
		),
	},
	{
		id: 3,
		trigger: "What application components does Radian OS provide?",
		content:
			"Application components such as User Authentication, Navigation Bars, Application Settings, and many more.",
		icon: (
			<IconSlot
				slot="app-window"
				size={20}
				strokeWidth={1.5}
				className="text-fg-secondary shrink-0"
				aria-hidden="true"
			/>
		),
	},
	{
		id: 4,
		trigger: "How can I stay updated with Radian OS developments?",
		content:
			"You can subscribe to Radian OS newsletter to receive the latest information, tips, and exclusive offers.",
		icon: (
			<IconSlot
				slot="zap"
				size={20}
				strokeWidth={1.5}
				className="text-fg-secondary shrink-0"
				aria-hidden="true"
			/>
		),
	},
]

export default function AccordionWithIcon() {
	return (
		<Accordion type="single" className="w-full lg:w-[75%]" collapsible>
			{contents.map((item) => (
				<AccordionItem value={item.id.toString()} key={item.id}>
					<AccordionTrigger>
						<span className="flex items-center gap-3">
							{item.icon}
							<span>{item.trigger}</span>
						</span>
					</AccordionTrigger>
					<AccordionContent className="ps-11">{item.content}</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	)
}
