import React from "react"
import Link from "next/link"
import { WebsiteLogo } from "@/components/navbar/website-logo"
import { cn } from "@/lib/utils"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/registry/ui/accordion"
import { Badge } from "@/registry/ui/badge"
import {
	EmojiCollectionIcon,
	FigmaIcon,
	GithubIcon,
	PopularBrandLogosIcon,
	UIAvatarIcon,
	UICountryFlagsIcon,
	XIcon,
	YoutubeIcon,
} from "./footer-icons"

interface LinkItem {
	href: string
	name: string
	badge?: React.ReactNode
	target?: string
	isBlueLink?: boolean
	icon?: React.ReactNode
	release?: "beta" | "coming-soon"
}

interface Link {
	title: string
	linkItems: LinkItem[]
}

const LINKS: Link[] = [
	{
		title: "Documentation",
		linkItems: [
			{
				href: "/docs/getting-started/introduction",
				name: "Introduction",
			},
			{
				href: "/docs/getting-started/installation",
				name: "Installation",
			},
			{
				href: "/docs/getting-started/changelog",
				name: "Changelog",
			},
			{
				href: "/docs/fundamentals/colors",
				name: "Colors",
			},
			{
				href: "/docs/components/accordion",
				name: "Components",
			},
			{
				href: "/docs/getting-started/introduction",
				name: "Open Documentation",
				isBlueLink: true,
			},
		],
	},
	{
		title: "Resources",
		linkItems: [
			{
				href: "/resources/avatar",
				name: "UI Avatars",
				icon: <UIAvatarIcon />,
			},
			{
				href: "#",
				name: "Popular Brand Logos",
				icon: <PopularBrandLogosIcon />,
				release: "coming-soon",
			},
			{
				href: "/resources/flags",
				name: "UI Country Flags",
				icon: <UICountryFlagsIcon />,
				release: "beta",
			},
			{
				href: "#",
				name: "Credit Card Icons",
				icon: <UICountryFlagsIcon />,
				release: "coming-soon",
			},
			{
				href: "#",
				name: "Emoji Collection",
				icon: <EmojiCollectionIcon />,
				release: "coming-soon",
			},
			{
				href: "/docs/getting-started/resources",
				name: "Explore Resources",
				isBlueLink: true,
			},
		],
	},
	{
		title: "Explore UI Blocks",
		linkItems: [
			{
				href: "https://blocks.radianui.com/blocks/authentication/sign-in",
				name: "Sign In Blocks",
				target: "_blank",
			},
			{
				href: "https://blocks.radianui.com/blocks/authentication/sign-up",
				name: "Sign Up Blocks",
				target: "_blank",
			},
			{
				href: "https://blocks.radianui.com/blocks/authentication/verification",
				name: "Account Verification",
				target: "_blank",
			},
			{
				href: "https://blocks.radianui.com/blocks/webapp/sidebar",
				name: "Sidebar Blocks",
				target: "_blank",
			},
			{
				href: "https://blocks.radianui.com/blocks/webapp/onboarding",
				name: "Account Onboarding",
				target: "_blank",
			},
			{
				href: "https://blocks.radianui.com",
				name: "Explore More Blocks",
				target: "_blank",
				isBlueLink: true,
			},
		],
	},
	{
		title: "Community",
		linkItems: [
			{
				href: "https://github.com/Radian-os/radianui",
				name: "Github",
				target: "_blank",
				icon: <GithubIcon />,
			},
			{
				href: "/docs/getting-started/figma",
				name: "Figma",
				target: "_blank",
				icon: <FigmaIcon />,
			},
			{
				href: "https://x.com/radian_os",
				name: "X (Twitter)",
				target: "_blank",
				icon: <XIcon />,
			},
			{
				href: "https://www.youtube.com/@radianui",
				name: "Youtube",
				target: "_blank",
				icon: <YoutubeIcon />,
			},
		],
	},
]

export default function FooterNavigation() {
	return (
		<>
			{/* For tablet and mobile */}
			<div className="flex flex-col gap-5 px-5 pt-10 pb-5 xl:hidden">
				<WebsiteLogo />
				<div>
					<Accordion type="single" variant="open" collapsible>
						{LINKS.map((item) => (
							<AccordionItem key={item.title} value={item.title}>
								<AccordionTrigger>{item.title}</AccordionTrigger>
								<AccordionContent>
									<div className="flex flex-col">
										{item.linkItems.map((linkItem) => (
											<Link
												key={linkItem.name}
												href={linkItem.href}
												className={cn(
													"flex items-center gap-2 py-2.5",
													linkItem.release === "coming-soon" &&
														"text-fg-tertiary"
												)}
												target={linkItem.target ?? "_self"}
												rel={
													linkItem.target === "_blank"
														? "noopener noreferrer"
														: undefined
												}>
												{linkItem.name}
												{linkItem.release ? (
													<ReleaseBadge release={linkItem.release} />
												) : null}
												{linkItem.badge}
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
			<div className="mx-auto flex max-w-360 justify-between px-7.5 py-15 not-xl:hidden">
				<div className="flex-1">
					<WebsiteLogo />
				</div>
				<div className="flex gap-7.5">
					{LINKS.map((item) => (
						<div className="flex w-55 flex-col gap-4" key={item.title}>
							<p className="text-fg text-sm font-medium">{item.title}</p>
							<div className="flex flex-col gap-3">
								{item.linkItems.map((linkItem) => (
									<span key={linkItem.name} className="flex items-center gap-2">
										<Link
											href={linkItem.href}
											scroll={linkItem.href !== "#"}
											className={cn(
												"text-fg flex items-center gap-2 text-sm font-normal",
												{
													"text-primary-text font-medium": linkItem.isBlueLink,
													"text-fg-tertiary":
														linkItem.release === "coming-soon",
												}
											)}
											target={linkItem.target ?? "_self"}
											rel={
												linkItem.target === "_blank"
													? "noopener noreferrer"
													: undefined
											}>
											{linkItem.icon && linkItem.icon}
											{linkItem.name}
											{linkItem.release ? (
												<ReleaseBadge release={linkItem.release} />
											) : null}
											{linkItem.badge}
										</Link>
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

function ReleaseBadge({
	release,
}: {
	release: NonNullable<LinkItem["release"]>
}) {
	return (
		<Badge
			color={release === "beta" ? "primary" : "neutral"}
			size="20"
			variant="soft">
			{release === "beta" ? "Beta" : "Soon"}
		</Badge>
	)
}
