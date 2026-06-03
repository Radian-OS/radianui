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
		trigger: "Email Campaign",
		content: [
			"Define your target audience and segment your email list.",
			"Craft compelling subject lines to improve open rates.",
			"Design responsive email templates for all devices.",
			"Track open rates, click-through rates, and conversions.",
		],
	},
	{
		id: 2,
		trigger: "Social Media Ads",
		content: [
			"Choose platform matching your audience.",
			"Set a daily budget and campaign duration.",
			"Upload creative assets and write ad copy.",
			"Monitor click-through rates and adjust.",
		],
	},
	{
		id: 3,
		trigger: "Content Marketing",
		content: [
			"Identify topics that resonate with your target audience.",
			"Create high-quality blog posts, videos, or infographics.",
			"Distribute content across relevant channels.",
			"Measure engagement and refine your content strategy.",
		],
	},
	{
		id: 4,
		trigger: "Customer Research",
		content: [
			"Define research goals and key questions to answer.",
			"Choose methods such as surveys, interviews, or analytics.",
			"Collect and organize data from your target users.",
			"Analyze findings and apply insights to your strategy.",
		],
	},
]

export default function AccordionDottedLine() {
	return (
		<Accordion
			type="single"
			variant="open"
			indicator="plus-minus"
			className="w-full lg:w-[75%]"
			defaultValue="2"
			collapsible>
			{contents.map((item) => (
				<AccordionItem
					className="border-dashed"
					value={item.id.toString()}
					key={item.id}>
					<AccordionTrigger className="[&_svg]:border-soft justify-start gap-2.5 [&_svg]:-order-1 [&_svg]:rounded-md [&_svg]:border [&_svg]:p-0.5">
						{item.trigger}
					</AccordionTrigger>
					<AccordionContent className="ps-10.5">
						<ol className="flex flex-col gap-3 py-1">
							{item.content.map((step, index) => (
								<li key={index} className="flex items-center gap-3">
									<span className="bg-fill1-alpha text-fg-secondary flex size-6 shrink-0 items-center justify-center rounded-full text-sm font-normal">
										{index + 1}
									</span>
									<span className="text-fg-secondary text-sm">{step}</span>
								</li>
							))}
						</ol>
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	)
}
