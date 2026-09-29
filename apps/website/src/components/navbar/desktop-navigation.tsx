import React from "react"
import Link from "next/link"
import { navLinks } from "@/components/navbar/nav-links"
import { RESOURCE_ITEMS } from "@/config/navigation-config"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/registry/ui/navigation-menu"
import { ViewTools } from "./nav-icons"
import { ResourceIcon } from "./resource-icons"

export const designTools = [
	...RESOURCE_ITEMS.map((resource) => ({
		...resource,
		icon: resource.resourceIcon ? (
			<ResourceIcon name={resource.resourceIcon} />
		) : null,
	})),
	{
		title: "View all tools",
		description: "Browse every available tool.",
		url: "/docs/getting-started/resources",
		icon: <ViewTools />,
		isComingSoon: true,
		disabled: true,
	},
]

export const additionalLinks = [
	{ title: "Introduction", href: "/docs/getting-started/introduction" },
	{ title: "Installation", href: "/docs/getting-started/installation" },
	{ title: "Blog", href: "/blog" },
	{ title: "Change Log", href: "/docs/getting-started/changelog" },
]

export function DesktopNavigation() {
	return (
		<section className="hidden flex-1 items-center xl:flex">
			<NavigationMenu viewport={false}>
				<NavigationMenuList className="text-fg1 flex items-center gap-1 text-sm font-medium">
					{navLinks.map((item) => (
						<NavigationMenuItem key={item.name}>
							<Button variant={"ghost"} color={"neutral"} asChild>
								<Link
									href={item.link}
									prefetch={false}
									target={item.isExternal ? "_blank" : "_self"}>
									{item.name}
								</Link>
							</Button>
						</NavigationMenuItem>
					))}
					<NavigationMenuItem>
						<NavigationMenuTrigger className="bg-transparent">
							Resources
						</NavigationMenuTrigger>
						<NavigationMenuContent className="flex flex-row p-0">
							<div className="border-soft flex w-[700px] flex-col gap-1 border-r p-3">
								<span className="text-fg-tertiary p-2 text-xs font-medium uppercase">
									Design Tools
								</span>
								<div className="grid grid-cols-2 gap-2">
									{designTools.map((tool) => {
										const content = (
											<>
												<div className="bg-primary-accent flex size-10 shrink-0 items-center justify-center rounded-lg">
													{tool.icon}
												</div>
												<div className="flex flex-col">
													<div className="flex items-center gap-1.5">
														<span
															className={`${tool.isComingSoon ? "text-fg-tertiary" : "text-fg"} text-sm font-medium`}>
															{tool.title}
														</span>
														{tool.isComingSoon ? (
															<Badge variant="soft" color="neutral" size="20">
																Coming Soon
															</Badge>
														) : null}
													</div>
													<span className="text-fg-secondary text-sm font-normal">
														{tool.description}
													</span>
												</div>
											</>
										)

										return tool.disabled ? (
											<NavigationMenuLink
												key={tool.title}
												asChild
												className="flex min-h-16 cursor-not-allowed flex-row gap-3 rounded-lg p-3 hover:bg-transparent focus:bg-transparent">
												<div aria-disabled="true">{content}</div>
											</NavigationMenuLink>
										) : (
											<NavigationMenuLink
												key={tool.title}
												asChild
												className="flex min-h-16 flex-row gap-3 rounded-lg p-3">
												<Link href={tool.url} prefetch={false}>
													{content}
												</Link>
											</NavigationMenuLink>
										)
									})}
								</div>
							</div>
							<div className="bg-fill1-alpha flex flex-col gap-1.5 p-3">
								<span className="text-fg-tertiary p-2 text-xs font-medium uppercase">
									Additional Links
								</span>
								<div className="flex flex-col gap-1">
									{additionalLinks.map((link) => (
										<NavigationMenuLink
											key={link.title}
											asChild
											className="min-w-60 rounded-md px-2 py-1.5 text-sm font-normal">
											<Link href={link.href} prefetch={false}>
												{link.title}
											</Link>
										</NavigationMenuLink>
									))}
								</div>
							</div>
						</NavigationMenuContent>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</section>
	)
}
