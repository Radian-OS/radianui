import React from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/registry/ui/accordion"

// const contents = [
// 	{
// 		id: 1,
// 		trigger: "What is Radian OS?",
// 		content:
// 			"Radian OS is a high-quality design and development library aimed at building systems that scale quickly. It enables rapid transition from design to product in just a few hours.",
// 	},
// 	{
// 		id: 2,
// 		trigger: "What components are available in Radian OS?",
// 		content:
// 			"Radian OS offers a variety of UI components including Accordions, Alerts, Avatars, Badges, Banners, Buttons, Calendars, Checkboxes, Dropdowns, Inputs, Modals, Pagination, Progress Bars, Radio Buttons, Sliders, Switches, Tables, Tabs, Tooltips, and more.",
// 		nested: [
// 			{
// 				id: "nested-1",
// 				trigger: "Can I add my own components?",
// 				content:
// 					"A flexible theming system built with design tokens enables easy switching between light, dark, and custom themes while also maintaining consistent component styling.",
// 			},
// 			{
// 				id: "nested-2",
// 				trigger: "How does layout scaling work?",
// 				content: "Radian OS applies responsive grid variables, adjusting columns and spacing automatically for each device mode.",
// 			},
// 		],
// 	},
// 	{
// 		id: 3,
// 		trigger: "What application components does Radian OS provide?",
// 		content: "Application components such as User Authentication, Navigation Bars, Application Settings, and many more.",
// 	},
// 	{
// 		id: 4,
// 		trigger: "How can I stay updated with Radian OS developments?",
// 		content: "You can subscribe to Radian OS newsletter to receive the latest information, tips, and exclusive offers.",
// 	},
// ]

export default function AccordionNested() {
	return (
		<Accordion type="single" variant={"table"} defaultValue="2" collapsible className="w-full lg:w-[75%]">
			<AccordionItem value="1" key="1">
				<AccordionTrigger>What is Radian OS?</AccordionTrigger>
				<AccordionContent>
					Radian OS is a high-quality design and development library aimed at building systems that scale quickly. It enables rapid transition from design to product in just a few
					hours.
				</AccordionContent>
			</AccordionItem>

			<AccordionItem value="2" key="2" className="[&_div]:p-0">
				<AccordionTrigger>What components are available in Radian OS?</AccordionTrigger>
				<AccordionContent>
					<Accordion type="multiple" variant={"open"} className="*:border-0 *:border-t">
						<AccordionItem value="nested-1" key="nested-1" className="bg-fill1">
							<AccordionTrigger className="justify-start gap-2.5 px-4 [&_svg]:-order-1">Can I add my own components?</AccordionTrigger>
							<AccordionContent className="!ps-11.5 !pb-3 !pe-4">
								A flexible theming system built with design tokens enables easy switching between light, dark, and custom themes while also maintaining consistent component
								styling.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="nested-2" key="nested-2" className="bg-fill1">
							<AccordionTrigger className="justify-start gap-2.5 px-4 [&_svg]:-order-1">How does layout scaling work?</AccordionTrigger>
							<AccordionContent className="!ps-11.5 !pb-3 !pe-4">
								Radian OS applies responsive grid variables, adjusting columns and spacing automatically for each device mode.
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</AccordionContent>
			</AccordionItem>

			<AccordionItem value="3" key="3">
				<AccordionTrigger>What application components does Radian OS provide?</AccordionTrigger>
				<AccordionContent>Application components such as User Authentication, Navigation Bars, Application Settings, and many more.</AccordionContent>
			</AccordionItem>

			<AccordionItem value="4" key="4">
				<AccordionTrigger>How can I stay updated with Radian OS developments?</AccordionTrigger>
				<AccordionContent>You can subscribe to Radian OS newsletter to receive the latest information, tips, and exclusive offers.</AccordionContent>
			</AccordionItem>
		</Accordion>
	)
}
