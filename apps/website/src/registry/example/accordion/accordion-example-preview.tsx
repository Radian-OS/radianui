import React from "react"
import { Boxes, ComponentIcon, LucideShieldQuestion, TowerControlIcon } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/registry/ui/accordion"
import { CodeArea } from "@/registry/ui/code"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const contents = [
	{
		id: 1,
		trigger: "What is Radian OS?",
		content:
			"Radian OS is a high-quality design and development library aimed at building systems that scale quickly. It enables rapid transition from design to product in just a few hours.",
		icon: LucideShieldQuestion,
	},
	{
		id: 2,
		trigger: "What components are available in Radian OS?",
		content:
			"Radian OS offers a variety of UI components including Accordions, Alerts, Avatars, Badges, Banners, Buttons, Calendars, Checkboxes, Dropdowns, Inputs, Modals, Pagination, Progress Bars, Radio Buttons, Sliders, Switches, Tables, Tabs, Tooltips, and more.",
		icon: Boxes,
	},
	{
		id: 3,
		trigger: "What application components does Radian OS provide?",
		content:
			"Radian OS includes application component such as User Authentication, Navigation Bars, Application Settings, Onboarding flows, Profile sections, and more, facilitating the development of comprehensive web applications.",
		icon: TowerControlIcon,
	},
	{
		id: 4,
		trigger: "How can I stay updated with Radian OS developments?",
		content: "You can subscribe to Radian OS updates to receive the latest information, tips, and exclusive offers directly from the development team.",
		icon: ComponentIcon,
	},
]

function AccordionWithIconExample() {
	return (
		<Tabs defaultValue="preview" className="mb-6">
			<div className="flex items-center justify-between">
				<TabsList>
					<TabsTrigger value="preview">Preview</TabsTrigger>
					<TabsTrigger value="code">Code</TabsTrigger>
				</TabsList>
			</div>
			{/* Preview Tab */}
			<TabsContent value="preview">
				<div className="h-105 flex items-center justify-center overflow-auto rounded-xl border px-10">
					<Accordion variant="open" defaultValue={"2"}>
						{contents.map((item) => (
							<AccordionItem value={item.id.toString()} key={item.id}>
								<AccordionTrigger>
									<span className="flex items-center gap-3">
										<item.icon size={20} className="text-text-secondary shrink-0" aria-hidden="true" />
										<span>{item.trigger}</span>
									</span>
								</AccordionTrigger>
								<AccordionContent className="ps-8">{item.content}</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</TabsContent>
			{/* Code Tab */}
			<TabsContent value="code">
				<CodeArea
					language="tsx"
					showLineNumbers
					className="h-105"
					code={`const contents = [
	{
		id: 1,
		trigger: "What is Radian OS?",
		content:
			"Radian OS is a high-quality design and development library aimed at building systems that scale quickly. It enables rapid transition from design to product in just a few hours.",
		icon: LucideShieldQuestion,
	},
	{
		id: 2,
		trigger: "What components are available in Radian OS?",
		content:
			"Radian OS offers a variety of UI components including Accordions, Alerts, Avatars, Badges, Banners, Buttons, Calendars, Checkboxes, Dropdowns, Inputs, Modals, Pagination, Progress Bars, Radio Buttons, Sliders, Switches, Tables, Tabs, Tooltips, and more.",
		icon: Boxes,
	},
	{
		id: 3,
		trigger: "What application components does Radian OS provide?",
		content:
			"Radian OS includes application components such as User Authentication, Navigation Bars, Application Settings, Onboarding flows, Profile sections, and more, facilitating the development of comprehensive web applications.",
		icon: TowerControlIcon,
	},
	{
		id: 4,
		trigger: "How can I stay updated with Radian OS developments?",
		content:
			"You can subscribe to Radian OS updates to receive the latest information, tips, and exclusive offers directly from the development team.",
		icon: ComponentIcon,
    }
]
    
export function AccordionWithIcon() {
    return (
		<Accordion variant="open">
			{contents.map((item) => (
				<AccordionItem value={item.id.toString()} key={item.id}>
					<AccordionTrigger>
						<span className="flex items-center gap-3">
							<item.icon size={20} className="text-text-secondary shrink-0" aria-hidden="true" />
							<span>{item.trigger}</span>
						</span>
					</AccordionTrigger>
					<AccordionContent className="ps-8">{item.content}</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	)
}`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export function AccordionWithIcon() {
	return (
		<Accordion variant="open">
			{contents.map((item) => (
				<AccordionItem value={item.id.toString()} key={item.id}>
					<AccordionTrigger>
						<span className="flex items-center gap-3">
							<item.icon size={20} className="text-text-secondary shrink-0" aria-hidden="true" />
							<span>{item.trigger}</span>
						</span>
					</AccordionTrigger>
					<AccordionContent className="ps-8">{item.content}</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	)
}

export default AccordionWithIconExample
