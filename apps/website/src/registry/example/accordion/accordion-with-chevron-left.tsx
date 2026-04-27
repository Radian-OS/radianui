import React from "react"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/styles/default/ui/accordion"

const contents = [
	{
		id: 1,
		trigger: "What is Radian OS?",
		content:
			"Radian OS is a high-quality design and development library aimed at building systems that scale quickly. It enables rapid transition from design to product in just a few hours.",
	},
	{
		id: 2,
		trigger: "What components are available in Radian OS?",
		content:
			"Radian OS offers a variety of Ul components including Accordions, Alerts, Avatars, Badges, Banners, Buttons, Calendars, Checkboxes, Dropdowns and more.",
	},
	{
		id: 3,
		trigger: "What application components does Radian OS provide?",
		content:
			"Application components such as User Authentication, Navigation Bars, Application Settings, and many more.",
	},
	{
		id: 4,
		trigger: "How can I stay updated with Radian OS developments?",
		content:
			"You can subscribe to Radian OS newsletter to receive the latest information, tips, and exclusive offers.",
	},
]

export default function AccordionWithChevronLeft() {
	return (
		<Accordion
			type="single"
			className="w-full lg:w-[75%]"
			defaultValue="3"
			collapsible>
			{contents.map((item) => (
				<AccordionItem value={item.id.toString()} key={item.id}>
					<AccordionTrigger className="justify-start gap-2.5 [&_svg]:-order-1">
						{item.trigger}
					</AccordionTrigger>
					<AccordionContent className="ps-10.5">
						{item.content}
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	)
}
