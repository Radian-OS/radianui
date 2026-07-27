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
				href: "/docs/resources/ui-avatars",
				name: "UI Avatars",
				icon: <UIAvatarIcon />,
			},
			{
				href: "/docs/resources/popular-brand-logos",
				name: "Popular Brand Logos",
				icon: <PopularBrandLogosIcon />,
			},
			{
				href: "/docs/resources/ui-country-flags",
				name: "UI Country Flags",
				icon: <UICountryFlagsIcon />,
			},
			{
				href: "/docs/resources/credit-card-icons",
				name: "Credit Card Icons",
				icon: <UICountryFlagsIcon />,
			},
			{
				href: "/docs/resources/emoji-collection",
				name: "Emoji Collection",
				icon: <EmojiCollectionIcon />,
			},
			{
				href: "/docs/getting-started/changelog",
				name: "Explore Resources",
				isBlueLink: true,
			},
		],
	},
	{
		title: "Explore UI Blocks",
		linkItems: [
			{
				href: "https://blocks.radianos.com/blocks/authentication/sign-in",
				name: "Sign In Blocks",
				target: "_blank",
			},
			{
				href: "https://blocks.radianos.com/blocks/authentication/sign-up",
				name: "Sign Up Blocks",
				target: "_blank",
			},
			{
				href: "https://blocks.radianos.com/blocks/authentication/verification",
				name: "Account Verification",
				target: "_blank",
			},
			{
				href: "https://blocks.radianos.com/blocks/webapp/sidebar",
				name: "Sidebar Blocks",
				target: "_blank",
			},
			{
				href: "https://blocks.radianos.com/blocks/webapp/onboarding",
				name: "Account Onboarding",
				target: "_blank",
			},
			{
				href: "https://blocks.radianos.com",
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
				href: "https://github.com/Radian-os/radianos",
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
				href: "https://www.youtube.com/@RadianOS",
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
			<div className="flex flex-col gap-5 px-5 pb-5 pt-10 xl:hidden">
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
												className="py-2.5"
												target={linkItem.target ?? "_self"}
												rel={
													linkItem.target === "_blank"
														? "noopener noreferrer"
														: undefined
												}>
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
			<div className="not-xl:hidden max-w-360 px-7.5 py-15 mx-auto flex justify-between">
				<div className="flex-1">
					<WebsiteLogo />
				</div>
				<div className="gap-7.5 flex">
					{LINKS.map((item) => (
						<div className="w-55 flex flex-col gap-4" key={item.title}>
							<p className="text-fg text-sm font-medium">{item.title}</p>
							<div className="flex flex-col gap-3">
								{item.linkItems.map((linkItem) => (
									<span key={linkItem.name} className="flex items-center gap-2">
										<Link
											href={linkItem.href}
											className={cn(
												"text-fg flex items-center gap-2 text-sm font-normal",
												{ "text-primary-text font-medium": linkItem.isBlueLink }
											)}
											target={linkItem.target ?? "_self"}
											rel={
												linkItem.target === "_blank"
													? "noopener noreferrer"
													: undefined
											}>
											{linkItem.icon && linkItem.icon}
											{linkItem.name}
										</Link>
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
