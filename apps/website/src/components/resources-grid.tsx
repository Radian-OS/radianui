"use client"

import { Badge } from "@/registry/ui/badge"

interface ResourceItem {
	title: string
	description: string
	comingSoon?: boolean
}

const resources: ResourceItem[] = [
	{
		title: "UI Avatars",
		description:
			"Create and personalize user pictures for your interface designs.",
		comingSoon: false,
	},
	{
		title: "Popular Brand Logos",
		description: "100+ well-known company logos for your projects.",
		comingSoon: true,
	},
	{
		title: "Country Flags",
		description:
			"Over 250 flags from different nations in rectangular and circular shapes.",
		comingSoon: true,
	},
	{
		title: "Credit Cards",
		description:
			"Top credit card logos offered in light and dark color schemes.",
		comingSoon: true,
	},
	{
		title: "Emojis",
		description:
			"A vast collection of over 500+ emojis in multiple clear file formats.",
		comingSoon: true,
	},
	{
		title: "File Format Icons",
		description:
			"More than 20 common file type icons, each with three design options.",
		comingSoon: true,
	},
	{
		title: "Logo Generator",
		description:
			"Design your own logo using customizable simple shapes and colors.",
		comingSoon: true,
	},
	{
		title: "Realistic Credit Card",
		description:
			"A realistic credit card design featuring a sleek, modern aesthetic.",
		comingSoon: true,
	},
]

export function ResourcesGrid() {
	return (
		<div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
			{resources.map((resource, index) => (
				<div
					key={index}
					className="bg-bg border-soft flex cursor-pointer flex-col gap-2 rounded-xl border p-2 hover:shadow-sm">
					<div className="bg-fill2 h-48 w-full rounded-lg"></div>
					<div className="flex flex-col gap-1 p-2">
						<div className="flex items-center gap-2">
							<span className="text-fg text-sm font-medium">
								{resource.title}
							</span>
							{resource.comingSoon && (
								<Badge variant="soft" color="amber" size="20">
									Coming Soon
								</Badge>
							)}
						</div>
						<p className="text-fg-secondary text-sm font-normal">
							{resource.description}
						</p>
					</div>
				</div>
			))}
		</div>
	)
}
