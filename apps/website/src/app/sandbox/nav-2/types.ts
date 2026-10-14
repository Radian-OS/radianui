import type React from "react"

export interface MegaMenuItem {
	title: string
	description: string
	href: string
	icon:
		| "analytics"
		| "automation"
		| "integrations"
		| "security"
		| "marketing"
		| "product"
}

export interface MegaMenuSection {
	heading: string
	items: MegaMenuItem[]
}

export interface CalloutCardData {
	badge: string
	title: string
	description: string
	ctaText: string
	ctaHref: string
}

export interface NavLinkItem {
	label: string
	href: string
}

export const PLATFORM_SECTION: MegaMenuSection = {
	heading: "Platform",
	items: [
		{
			title: "Analytics",
			description: "Dashboards and funnels for every team",
			href: "#analytics",
			icon: "analytics",
		},
		{
			title: "Automation",
			description: "Trigger workflows from any event",
			href: "#automation",
			icon: "automation",
		},
		{
			title: "Integrations",
			description: "Connect 200 plus tools in one click",
			href: "#integrations",
			icon: "integrations",
		},
		{
			title: "Security",
			description: "SSO, audit logs, and role based access",
			href: "#security",
			icon: "security",
		},
	],
}

export const BY_TEAM_SECTION: MegaMenuSection = {
	heading: "By team",
	items: [
		{
			title: "For marketing",
			description: "Attribute revenue to every campaign",
			href: "#marketing",
			icon: "marketing",
		},
		{
			title: "For product",
			description: "See how features are really used",
			href: "#product",
			icon: "product",
		},
	],
}

export const CALLOUT_CARD_DATA: CalloutCardData = {
	badge: "New",
	title: "Acme Assist is here",
	description:
		"Ask questions in plain language and get charts back in seconds. Now included on every plan.",
	ctaText: "See what's new",
	ctaHref: "#whats-new",
}

export const DIRECT_NAV_LINKS: NavLinkItem[] = [
	{ label: "Solutions", href: "#solutions" },
	{ label: "Pricing", href: "#pricing" },
	{ label: "Customers", href: "#customers" },
	{ label: "Docs", href: "#docs" },
]
