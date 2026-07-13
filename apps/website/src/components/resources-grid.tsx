"use client"

import Link from "next/link"
import { Badge } from "@/registry/ui/badge"

interface ResourceItem {
	title: string
	description: string
	comingSoon?: boolean
	lightUrl: string
	darkUrl: string
	link?: string
}

const resources: ResourceItem[] = [
	{
		title: "UI Avatars",
		description:
			"Create and personalize user pictures for your interface designs.",
		comingSoon: false,
		lightUrl: "/media/assets-page/avatars-light.png",
		darkUrl: "/media/assets-page/avatars-dark.png",
		link: "avatar",
	},
	{
		title: "Popular Brand Logos",
		description: "100+ well-known company logos for your projects.",
		comingSoon: true,
		lightUrl: "/media/assets-page/popular-brands-light.png",
		darkUrl: "/media/assets-page/popular-brands-dark.png",
	},
	{
		title: "Country Flags",
		description:
			"Over 250 flags from different nations in rectangular and circular shapes.",
		comingSoon: true,
		lightUrl: "/media/assets-page/flags-light.png",
		darkUrl: "/media/assets-page/flags-dark.png",
	},
	{
		title: "Credit Cards",
		description:
			"Top credit card logos offered in light and dark color schemes.",
		comingSoon: true,
		lightUrl: "/media/assets-page/credit-cards-light.png",
		darkUrl: "/media/assets-page/credit-cards-dark.png",
	},
	{
		title: "Emojis",
		description:
			"A vast collection of over 500+ emojis in multiple clear file formats.",
		comingSoon: true,
		lightUrl: "/media/assets-page/emojis-light.png",
		darkUrl: "/media/assets-page/emojis-dark.png",
	},
	{
		title: "File Format Icons",
		description:
			"More than 20 common file type icons, each with three design options.",
		comingSoon: true,
		lightUrl: "/media/assets-page/files-light.png",
		darkUrl: "/media/assets-page/files-dark.png",
	},
	{
		title: "Logo Generator",
		description:
			"Design your own logo using customizable simple shapes and colors.",
		comingSoon: true,
		lightUrl: "/media/assets-page/logos-light.png",
		darkUrl: "/media/assets-page/logos-dark.png",
	},
	{
		title: "Realistic Credit Card",
		description:
			"A realistic credit card design featuring a sleek, modern aesthetic.",
		comingSoon: true,
		lightUrl: "/media/assets-page/union-pay-light.png",
		darkUrl: "/media/assets-page/union-pay-dark.png",
	},
]

export function ResourcesGrid() {
	return (
		<div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
			{resources.map((resource, index) => (
				<Link href={`/resources/${resource.link}`} key={index}>
					<div className="bg-bg border-soft flex cursor-pointer flex-col gap-2 rounded-xl border p-2 hover:shadow-sm">
						<div className="border-soft h-52 w-full overflow-clip rounded-lg border">
							<img
								alt={resource.title}
								src={resource.lightUrl}
								className="h-full w-full scale-[1.02] object-cover dark:hidden"
							/>
							<img
								alt={resource.title}
								src={resource.darkUrl}
								className="hidden h-full w-full scale-[1.02] object-cover dark:block"
							/>
						</div>
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
				</Link>
			))}
		</div>
	)
}
