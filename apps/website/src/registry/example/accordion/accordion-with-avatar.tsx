import React from "react"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/registry/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import { Badge } from "@/registry/ui/badge"

type BadgeColor =
	| "success"
	| "warning"
	| "error"
	| "primary"
	| "info"
	| "neutral"
	| null
	| undefined

const contents: {
	id: number
	trigger: string
	content: string
	avatar: string
	name: string
	badge: { label: string; color: BadgeColor }
}[] = [
	{
		id: 1,
		trigger: "Willow Rodriguez",
		content:
			"Willow manages file ownership and ensures all documents are properly organized and accessible to the right team members.",
		avatar: "/media/female-5.jpg",
		name: "Willow Rodriguez",
		badge: { label: "File Owner", color: "neutral" },
	},
	{
		id: 2,
		trigger: "Jasper Moreau",
		content:
			"Jasper is responsible for managing the infrastructure, network security, and data integrity of the platform.",
		avatar: "/media/male-3.jpg",
		name: "Jasper Moreau",
		badge: { label: "Admin", color: "error" },
	},
	{
		id: 3,
		trigger: "Luna Ramirez",
		content:
			"Luna has view-only access to the platform and can browse all shared resources without making any modifications.",
		avatar: "/media/female-2.jpg",
		name: "Luna Ramirez",
		badge: { label: "Viewer", color: "neutral" },
	},
	{
		id: 4,
		trigger: "River Dubois",
		content:
			"River can create, edit, and update content across the platform but does not have administrative privileges.",
		avatar: "/media/female-7.jpg",
		name: "River Dubois",
		badge: { label: "Editor", color: "neutral" },
	},
	{
		id: 5,
		trigger: "Skyler Costa",
		content:
			"Skyler collaborates on content editing and works closely with the team to maintain up-to-date platform resources.",
		avatar: "/media/female-8.jpg",
		name: "Skyler Costa",
		badge: { label: "Editor", color: "neutral" },
	},
]

export default function AccordionWithAvatarAndBadge() {
	return (
		<Accordion
			type="single"
			className="w-full lg:w-[75%]"
			defaultValue="2"
			collapsible>
			{contents.map((item) => (
				<AccordionItem value={item.id.toString()} key={item.id}>
					<AccordionTrigger>
						<div className="flex items-center gap-2.5">
							<Avatar size="24" rounded="square" className="shrink-0">
								<AvatarImage src={item.avatar} />
								<AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
							</Avatar>
							<span>{item.trigger}</span>
							<Badge size="20" variant="soft" color={item.badge.color}>
								{item.badge.label}
							</Badge>
						</div>
					</AccordionTrigger>
					<AccordionContent className="ps-13.5">
						{item.content}
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	)
}
