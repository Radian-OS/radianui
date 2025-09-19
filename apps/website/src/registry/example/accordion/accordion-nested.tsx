import React from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/registry/ui/accordion"

const contents = [
	{
		id: 1,
		trigger: "What is Radian OS?",
		content:
			"Radian OS is a high-quality design and development library aimed at building systems that scale quickly. It enables rapid transition from design to product in just a few hours.",
		nested: null,
	},
	{
		id: 2,
		trigger: "What components are available in Radian OS?",
		content:
			"Radian OS offers a variety of UI components including Accordions, Alerts, Avatars, Badges, Banners, Buttons, Calendars, Checkboxes, Dropdowns, Inputs, Modals, Pagination, Progress Bars, Radio Buttons, Sliders, Switches, Tables, Tabs, Tooltips, and more.",
		nested: [
			{
				id: "nested-1",
				trigger: "What UI components are most popular?",
				content: "The most popular components include Button, Input, Dialog, and Table as they form the foundation of most applications.",
			},
			{
				id: "nested-2",
				trigger: "Are these components customizable?",
				content: "Yes! All Radian OS components are fully customizable with extensive theming options and CSS variables.",
			},
		],
	},
	{
		id: 3,
		trigger: "What application components does Radian OS provide?",
		content:
			"Radian OS includes application components such as User Authentication, Navigation Bars, Application Settings, Onboarding flows, Profile sections, and more, facilitating the development of comprehensive web applications.",
		nested: [
			{
				id: "nested-3",
				trigger: "How does authentication work?",
				content: "Radian OS provides pre-built authentication flows with support for various providers and custom implementations.",
			},
			{
				id: "nested-4",
				trigger: "Can I customize the navigation components?",
				content: "Absolutely! Navigation components are designed to be flexible and can be adapted to any design system or brand requirements.",
			},
		],
	},
	{
		id: 4,
		trigger: "How can I stay updated with Radian OS developments?",
		content: "You can subscribe to Radian OS updates to receive the latest information, tips, and exclusive offers directly from the development team.",
		nested: null,
	},
]

export default function AccordionNested() {
	return (
		<Accordion type="single" collapsible className="w-full lg:w-[75%]">
			{contents.map((item) => (
				<AccordionItem value={item.id.toString()} key={item.id}>
					<AccordionTrigger>{item.trigger}</AccordionTrigger>
					<AccordionContent>
						{item.content}
						{item.nested && (
							<Accordion type="single" collapsible className="mt-4">
								{item.nested.map((nestedItem) => (
									<AccordionItem value={nestedItem.id} key={nestedItem.id}>
										<AccordionTrigger>{nestedItem.trigger}</AccordionTrigger>
										<AccordionContent>{nestedItem.content}</AccordionContent>
									</AccordionItem>
								))}
							</Accordion>
						)}
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	)
}
