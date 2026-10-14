export interface MenuSubItem {
	title: string
	description?: string
	href: string
}

export interface MenuGroup {
	heading: string
	items: MenuSubItem[]
}

export interface SimpleLink {
	label: string
	href: string
}

export interface PlatformMenuData {
	sections: MenuGroup[]
	sidebar: {
		attioFor: SimpleLink[]
		getStarted: SimpleLink[]
	}
}

export interface ResourcesMenuData {
	support: MenuGroup
	partners: SimpleLink[]
	company: SimpleLink[]
}

export const PLATFORM_MENU_DATA: PlatformMenuData = {
	sections: [
		{
			heading: "Context",
			items: [
				{
					title: "Universal Context",
					description: "The AI context layer",
					href: "#universal-context",
				},
				{
					title: "Data Model",
					description: "Sync and structure your data",
					href: "#data-model",
				},
				{
					title: "Enrichment",
					description: "Auto-enrich every record",
					href: "#enrichment",
				},
				{
					title: "Call Intelligence",
					description: "Record and analyze meetings",
					href: "#call-intelligence",
				},
				{
					title: "Reporting & Forecasts",
					description: "Insights in real time",
					href: "#reporting-forecasts",
				},
			],
		},
		{
			heading: "Agents & automations",
			items: [
				{
					title: "Ask Attio",
					description: "Analyze and create with AI",
					href: "#ask-attio",
				},
				{
					title: "Workflows",
					description: "Orchestrate any revenue motion",
					href: "#workflows",
				},
				{
					title: "Custom Agents",
					description: "Agents ready for any task",
					href: "#custom-agents",
				},
				{
					title: "Web Agent",
					description: "Research the web on autopilot",
					href: "#web-agent",
				},
				{
					title: "Sequences",
					description: "Personalized outreach at scale",
					href: "#sequences",
				},
			],
		},
		{
			heading: "Ecosystem",
			items: [
				{
					title: "Apps",
					description: "Discover the tools you need",
					href: "#apps",
				},
				{
					title: "MCP",
					description: "Connect everywhere you work",
					href: "#mcp",
				},
				{
					title: "Developer Platform",
					description: "Extend and integrate with Attio",
					href: "#developer-platform",
				},
			],
		},
	],
	sidebar: {
		attioFor: [
			{ label: "Slack", href: "#slack" },
			{ label: "ChatGPT", href: "#chatgpt" },
			{ label: "Claude", href: "#claude" },
		],
		getStarted: [
			{ label: "Attio 101", href: "#attio-101" },
			{ label: "Startup program", href: "#startup-program" },
			{ label: "Talk to sales", href: "#talk-to-sales" },
		],
	},
}

export const RESOURCES_MENU_DATA: ResourcesMenuData = {
	support: {
		heading: "Support",
		items: [
			{
				title: "Help Center",
				description: "Learn about Attio's features",
				href: "#help-center",
			},
			{
				title: "Academy",
				description: "Essential Attio, explained",
				href: "#academy",
			},
			{
				title: "Developer Docs",
				description: "Start building on Attio",
				href: "#developer-docs",
			},
			{
				title: "Attio Community",
				description: "Connect with other Attio users",
				href: "#community",
			},
		],
	},
	partners: [
		{ label: "Technology partners", href: "#tech-partners" },
		{ label: "Expert partners", href: "#expert-partners" },
		{ label: "Creator partners", href: "#creator-partners" },
	],
	company: [
		{ label: "Changelog", href: "#changelog" },
		{ label: "Announcements", href: "#announcements" },
		{ label: "Engineering blog", href: "#blog" },
		{ label: "Careers", href: "#careers" },
	],
}

export const DIRECT_NAV_LINKS: SimpleLink[] = [
	{ label: "Developers", href: "#developers" },
	{ label: "Customers", href: "#customers" },
	{ label: "Pricing", href: "#pricing" },
]
