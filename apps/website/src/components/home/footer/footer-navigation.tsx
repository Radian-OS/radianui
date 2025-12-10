import React from "react"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { WebsiteLogo } from "@/components/navbar/website-logo"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/registry/ui/accordion"
import { Badge } from "@/registry/ui/badge"

const LINKS = [
	{
		title: "Documentation",
		linkItems: [
			{
				href: "/docs/getting-started/introduction",
				name: "Getting Started",
			},
			{
				href: "/docs/fundamentals/colors",
				name: "Fundamentals",
			},
			{
				href: "/docs/components/accordion",
				name: "Base Components",
			},
			{
				href: process.env.NEXT_PUBLIC_BLOCKS_URL!,
				name: "Explore Blocks",
				badge: <ArrowUpRight className="text-fg-secondary size-5" />,
			},
		],
	},
	{
		title: "Resources",
		linkItems: [
			{
				href: "/docs/getting-started/changelog",
				name: "Change Logs",
				badge: (
					<Badge variant="soft" size="20">
						New
					</Badge>
				),
			},
			{
				href: "/blog",
				name: "Release Notes",
			},
			{
				href: "/blog",
				name: "Blog Articles",
			},
			{
				href: "#",
				name: "Radian Figma",
				badge: (
					<Badge variant="soft" size="20">
						New
					</Badge>
				),
			},
		],
	},
	{
		title: "Community",
		linkItems: [
			{
				href: "https://github.com/Radian-os/radianos",
				name: "Github",
			},
			{
				href: "#",
				name: "Figma",
			},
			{
				href: "#",
				name: "X (Twitter)",
			},
		],
	},
]

export default function FooterNavigation() {
	return (
		<>
			{/* For tablet and mobile */}
			<div className="flex flex-col gap-5 px-5 pb-5 pt-10 xl:hidden">
				<WebsiteLogo />
				<div>
					<Accordion size="lg" type="single" variant="open" collapsible>
						{LINKS.map((item) => (
							<AccordionItem key={item.title} value={item.title}>
								<AccordionTrigger>{item.title}</AccordionTrigger>
								<AccordionContent>
									<div className="flex flex-col">
										{item.linkItems.map((linkItem) => (
											<Link key={linkItem.name} href={linkItem.href} className="py-2.5">
												{linkItem.name}
											</Link>
										))}
									</div>
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</div>

			{/* For desktop (larger than 1280px) */}
			<div className="not-xl:hidden max-w-360 px-30 py-15 mx-auto flex justify-between">
				<WebsiteLogo />
				<div className="flex gap-20">
					{LINKS.map((item) => (
						<div className="flex flex-col gap-5" key={item.title}>
							<p className="text-fg-tertiary text-sm font-medium uppercase">{item.title}</p>
							<div className="flex flex-col gap-4">
								{item.linkItems.map((linkItem) => (
									<span key={linkItem.name} className="flex items-center gap-2">
										<Link href={linkItem.href}>{linkItem.name}</Link>
										{linkItem.badge && linkItem.badge}
									</span>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	)
}
