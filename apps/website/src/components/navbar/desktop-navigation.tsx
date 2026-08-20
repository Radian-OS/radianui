import React from "react"
import Link from "next/link"
import { navLinks } from "@/components/navbar/nav-links"
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
import {
	BrandLogo,
	CountryFlags,
	CreditCard,
	Emoji,
	FileFormat,
	LogoGenerator,
	UIAvatars,
	ViewTools,
} from "./nav-icons"

export const designTools = [
	{
		title: "UI Avatars",
		description: "User avatars for app and dashboard.",
		href: "/resources/avatar",
		icon: <UIAvatars />,
		release: "beta",
	},
	{
		title: "Emoji",
		description: "A complete emoji collection.",
		href: "#",
		icon: <Emoji />,
		release: "coming-soon",
	},
	{
		title: "Brand Logo",
		description: "Popular company logos.",
		href: "#",
		icon: <BrandLogo />,
		release: "coming-soon",
	},
	{
		title: "File Format Icons",
		description: "Common file type icons.",
		href: "#",
		icon: <FileFormat />,
		release: "coming-soon",
	},
	{
		title: "Country Flags",
		description: "Flags from around the world.",
		href: "#",
		icon: <CountryFlags />,
		release: "coming-soon",
	},
	{
		title: "Logo Generator",
		description: "Generate custom logos instantly.",
		href: "#",
		icon: <LogoGenerator />,
		release: "coming-soon",
	},
	{
		title: "Credit Card",
		description: "Credit card brand assets.",
		href: "#",
		icon: <CreditCard />,
		release: "coming-soon",
	},
	{
		title: "View all tools",
		description: "Browse every available tool.",
		href: "/docs/getting-started/resources",
		icon: <ViewTools />,
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
									{designTools.map((tool) => (
										<NavigationMenuLink
											key={tool.title}
											asChild
											className="flex min-h-16 flex-row gap-3 rounded-lg p-3">
											<Link href={tool.href ?? "#"} prefetch={false}>
												<div className="bg-primary-accent flex size-10 shrink-0 items-center justify-center rounded-lg">
													{tool.icon}
												</div>
												<div className="flex flex-col">
													<div className="flex items-center gap-1.5">
														<span
															className={`${tool.release === "coming-soon" ? "text-fg-tertiary" : "text-fg"} text-sm font-medium`}>
															{tool.title}
														</span>
														{tool.release && (
															<Badge
																variant="soft"
																color={
																	tool.release === "coming-soon"
																		? "neutral"
																		: "primary"
																}
																size="20">
																{tool.release === "coming-soon"
																	? "Coming Soon"
																	: "Beta"}
															</Badge>
														)}
													</div>
													<span className="text-fg-secondary text-sm font-normal">
														{tool.description}
													</span>
												</div>
											</Link>
										</NavigationMenuLink>
									))}
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
