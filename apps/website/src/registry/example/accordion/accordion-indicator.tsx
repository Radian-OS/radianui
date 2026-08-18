import React from "react"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/registry/ui/accordion"

const contents = [
	{
		id: 1,
		trigger: "What is Radian UI?",
		content:
			"Radian UI is a high-quality design and development library aimed at building systems that scale quickly. It enables rapid transition from design to product in just a few hours.",
	},
	{
		id: 2,
		trigger: "What components are available in Radian UI?",
		content:
			"Radian UI offers a variety of UI components including Accordions, Alerts, Avatars, Badges, Banners, Buttons, Calendars, Checkboxes, Dropdowns, Inputs, Modals, Pagination, Progress Bars, Radio Buttons, Sliders, Switches, Tables, Tabs, Tooltips, and more.",
	},
	{
		id: 3,
		trigger: "What application components does Radian UI provide?",
		content:
			"Radian UI includes application components such as User Authentication, Navigation Bars, Application Settings, Onboarding flows, Profile sections, and more, facilitating the development of comprehensive web applications.",
	},
	{
		id: 4,
		trigger: "How can I stay updated with Radian UI developments?",
		content:
			"You can subscribe to Radian UI updates to receive the latest information, tips, and exclusive offers directly from the development team.",
	},
]

export default function AccordionIndicator() {
	return (
		<Accordion
			type="single"
			indicator={"plus-minus"}
			className="w-full lg:w-[75%]"
			collapsible>
			{contents.map((item) => (
				<AccordionItem value={item.id.toString()} key={item.id}>
					<AccordionTrigger>{item.trigger}</AccordionTrigger>
					<AccordionContent>{item.content}</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	)
}
