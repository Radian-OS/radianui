export type IntegrationCategory =
	| "developer"
	| "communication"
	| "productivity"
	| "browser"

export interface IntegrationItem {
	id: string
	name: string
	domain: string
	description: string
	category: IntegrationCategory
	enabled: boolean
	faviconDomain: string
}

export interface CategoryTab {
	id: string
	label: string
}

export const INTEGRATION_CATEGORIES: CategoryTab[] = [
	{ id: "all", label: "All integrations" },
	{ id: "developer", label: "Developer tools" },
	{ id: "communication", label: "Communication" },
	{ id: "productivity", label: "Productivity" },
	{ id: "browser", label: "Browser tools" },
]

export interface SidebarNavItem {
	id: string
	label: string
	badge?: number
}

export interface SidebarNavGroup {
	id: string
	label: string
	items: SidebarNavItem[]
}

export const SETTINGS_SIDEBAR_GROUPS: SidebarNavGroup[] = [
	{
		id: "company",
		label: "COMPANY",
		items: [
			{ id: "general", label: "General" },
			{ id: "members", label: "Members", badge: 16 },
			{ id: "teams", label: "Teams", badge: 10 },
			{ id: "custom-fields", label: "Custom fields" },
			{ id: "plans-billing", label: "Plans & billing" },
			{ id: "security", label: "Security" },
			{ id: "integrations", label: "Integrations" },
		],
	},
	{
		id: "account",
		label: "ACCOUNT",
		items: [
			{ id: "profile", label: "Profile" },
			{ id: "password", label: "Password" },
		],
	},
	{
		id: "advanced",
		label: "ADVANCED",
		items: [
			{ id: "apis", label: "APIs" },
			{ id: "danger-zone", label: "Danger zone" },
		],
	},
]

export const SAMPLE_INTEGRATIONS: IntegrationItem[] = [
	{
		id: "zapier",
		name: "Zapier",
		domain: "zapier.com",
		description: "Build custom automations and integrations with other apps.",
		category: "productivity",
		enabled: true,
		faviconDomain: "zapier.com",
	},
	{
		id: "chatgpt",
		name: "ChatGPT",
		domain: "chat.openai.com",
		description:
			"A natural language processing tool driven by AI technology that allows you to have human-like conversations.",
		category: "productivity",
		enabled: true,
		faviconDomain: "openai.com",
	},
	{
		id: "mailchimp",
		name: "Mailchimp",
		domain: "mailchimp.com",
		description:
			"Grow your business an all-in-One marketing, automation & email marketing platform.",
		category: "communication",
		enabled: false,
		faviconDomain: "mailchimp.com",
	},
	{
		id: "square",
		name: "Square",
		domain: "squareup.com",
		description:
			"Start selling right out of the box with payments processing, point-of-sale software and hardware.",
		category: "developer",
		enabled: true,
		faviconDomain: "squareup.com",
	},
	{
		id: "webflow",
		name: "Webflow",
		domain: "webflow.com",
		description:
			"Create professional, custom websites in a completely visual canvas with no code.",
		category: "developer",
		enabled: true,
		faviconDomain: "webflow.com",
	},
	{
		id: "framer",
		name: "Framer",
		domain: "framer.com",
		description:
			"Design your website on a familiar canvas. Add animations, interactions and a CMS.",
		category: "developer",
		enabled: false,
		faviconDomain: "framer.com",
	},
	{
		id: "stripe",
		name: "Stripe",
		domain: "stripe.com",
		description:
			"Stripe is a suite of APIs powering online payment processing and commerce solutions for internet businesses.",
		category: "developer",
		enabled: true,
		faviconDomain: "stripe.com",
	},
	{
		id: "asana",
		name: "Asana",
		domain: "asana.com",
		description:
			"Track, manage, and connect your projects across any team, right from your dashboard.",
		category: "productivity",
		enabled: false,
		faviconDomain: "asana.com",
	},
	{
		id: "slack",
		name: "Slack",
		domain: "slack.com",
		description:
			"Send notifications to channels and create projects from messages.",
		category: "communication",
		enabled: false,
		faviconDomain: "slack.com",
	},
]
