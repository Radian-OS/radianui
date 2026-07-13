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
		trigger: "What is a placeholder avatar?",
		content:
			"A placeholder avatar is a fallback visual shown when a user has no profile image, typically their initials, a generic person icon, or a color-generated graphic based on their name.",
	},
	{
		id: 2,
		trigger: "Why are SVG avatars popular?",
		content:
			"SVG avatars scale to any size without losing quality, have small file sizes, and can be styled or recolored with CSS, making them ideal for initials-based or icon-based fallbacks.",
	},
	{
		id: 3,
		trigger:
			"What is the standard fallback logic if a user profile image fails to load?",
		content:
			"A common fallback sequence is to display the user's profile image first, then their initials if the image fails to load, and finally a generic placeholder icon if no identifying information is available.",
	},
	{
		id: 4,
		trigger: "What avatar size should I use?",
		content:
			"Avatar size depends on context: smaller sizes (24-32px) work well in tables and comments, medium sizes (40-48px) suit navigation bars and lists, and larger sizes (64px+) are best for profile pages and detailed views.",
	},
	{
		id: 5,
		trigger: "Where should status badges be positioned on an avatar?",
		content:
			"Status badges are typically placed at the bottom-right corner of the avatar, slightly overlapping the edge, so they remain visible without obscuring the user's image or initials.",
	},
	{
		id: 6,
		trigger: "How do I make avatars accessible?",
		content:
			"Provide descriptive alt text for profile images, ensure sufficient color contrast for initials and status indicators, and avoid conveying status through color alone, pair it with a label or icon.",
	},
	{
		id: 7,
		trigger: "Should images within an avatar component use lazy-loading?",
		content:
			"Yes, lazy-loading avatar images improves performance in lists and grids with many avatars, though images above the fold or in critical UI like navigation bars should load eagerly.",
	},
]

const AvatarFaq = () => {
	return (
		<div className="w-200 mx-auto flex flex-col gap-6">
			<div className="flex flex-col gap-16">
				<div className="flex flex-col gap-4">
					<p className="text-primary-text text-center text-sm font-medium">
						FAQ
					</p>
					<h4 className="heading-4 text-center">Frequently Asked Questions</h4>
				</div>
				<div className="flex gap-1">
					<Accordion
						type="single"
						indicator={"plus-minus"}
						className="w-full"
						collapsible>
						{contents.map((item) => (
							<AccordionItem value={item.id.toString()} key={item.id}>
								<AccordionTrigger className="data-[state=closed]:bg-fill1 data-[state=open]:bg-bg">
									{item.trigger}
								</AccordionTrigger>
								<AccordionContent className="group-data-[state=closed]:bg-fill1 group-data-[state=open]:bg-bg">
									{item.content}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</div>
		</div>
	)
}

export default AvatarFaq
