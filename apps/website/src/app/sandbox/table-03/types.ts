export type CompanyStage =
	| "Committed"
	| "Proposal"
	| "Renewal"
	| "Evaluation"
	| "Discovery"

export type CompanyCategory =
	| "Enterprise"
	| "Design partner"
	| "Regulated"
	| "Expansion"
	| "Open source"
	| "Self-serve"

export interface CompanyOwner {
	id: string
	name: string
	avatarUrl: string
	initials: string
}

export interface CompanyItem {
	id: string
	name: string
	domain: string
	owner: CompanyOwner
	stage: CompanyStage
	arr: string
	arrValue: number
	categories: CompanyCategory[]
	health: number
	status: "active" | "at-risk"
}

export const OWNERS: Record<string, CompanyOwner> = {
	mira: {
		id: "owner-1",
		name: "Mira Stone",
		avatarUrl: "/sandbox/placeholder.svg",
		initials: "MS",
	},
	nora: {
		id: "owner-2",
		name: "Nora Vale",
		avatarUrl: "/sandbox/placeholder.svg",
		initials: "NV",
	},
	alex: {
		id: "owner-3",
		name: "Alex Johnson",
		avatarUrl: "/sandbox/placeholder.svg",
		initials: "AJ",
	},
	theo: {
		id: "owner-4",
		name: "Theo Park",
		avatarUrl: "/sandbox/placeholder.svg",
		initials: "TP",
	},
}

export const COMPANIES_DATA: CompanyItem[] = [
	{
		id: "comp-1",
		name: "OpenAI",
		domain: "openai.com",
		owner: OWNERS.mira,
		stage: "Committed",
		arr: "$1.48M",
		arrValue: 1480000,
		categories: ["Enterprise", "Design partner"],
		health: 92,
		status: "active",
	},
	{
		id: "comp-2",
		name: "Anthropic",
		domain: "anthropic.com",
		owner: OWNERS.nora,
		stage: "Proposal",
		arr: "$960K",
		arrValue: 960000,
		categories: ["Enterprise", "Regulated"],
		health: 84,
		status: "active",
	},
	{
		id: "comp-3",
		name: "Stripe",
		domain: "stripe.com",
		owner: OWNERS.mira,
		stage: "Renewal",
		arr: "$720K",
		arrValue: 720000,
		categories: ["Enterprise", "Expansion"],
		health: 76,
		status: "active",
	},
	{
		id: "comp-4",
		name: "Supabase",
		domain: "supabase.com",
		owner: OWNERS.alex,
		stage: "Evaluation",
		arr: "$288K",
		arrValue: 2880000,
		categories: ["Open source", "Expansion"],
		health: 81,
		status: "active",
	},
	{
		id: "comp-5",
		name: "Cursor",
		domain: "cursor.com",
		owner: OWNERS.nora,
		stage: "Proposal",
		arr: "$415K",
		arrValue: 415000,
		categories: ["Design partner", "Expansion"],
		health: 88,
		status: "active",
	},
	{
		id: "comp-6",
		name: "PlanetScale",
		domain: "planetscale.com",
		owner: OWNERS.theo,
		stage: "Evaluation",
		arr: "$196K",
		arrValue: 196000,
		categories: ["Enterprise"],
		health: 61,
		status: "active",
	},
	{
		id: "comp-7",
		name: "Neon",
		domain: "neon.tech",
		owner: OWNERS.alex,
		stage: "Discovery",
		arr: "$84K",
		arrValue: 84000,
		categories: ["Self-serve", "Open source"],
		health: 54,
		status: "active",
	},
	{
		id: "comp-8",
		name: "Prisma",
		domain: "prisma.io",
		owner: OWNERS.theo,
		stage: "Renewal",
		arr: "$132K",
		arrValue: 132000,
		categories: ["Open source"],
		health: 38,
		status: "at-risk",
	},
	{
		id: "comp-9",
		name: "Convex",
		domain: "convex.dev",
		owner: OWNERS.alex,
		stage: "Discovery",
		arr: "$36K",
		arrValue: 36000,
		categories: ["Self-serve"],
		health: 67,
		status: "active",
	},
	{
		id: "comp-10",
		name: "Resend",
		domain: "resend.com",
		owner: OWNERS.mira,
		stage: "Evaluation",
		arr: "$61K",
		arrValue: 61000,
		categories: ["Expansion", "Self-serve"],
		health: 79,
		status: "active",
	},
	{
		id: "comp-11",
		name: "Vercel",
		domain: "vercel.com",
		owner: OWNERS.nora,
		stage: "Committed",
		arr: "$1.12M",
		arrValue: 1120000,
		categories: ["Enterprise", "Expansion"],
		health: 94,
		status: "active",
	},
	{
		id: "comp-12",
		name: "Linear",
		domain: "linear.app",
		owner: OWNERS.theo,
		stage: "Proposal",
		arr: "$320K",
		arrValue: 320000,
		categories: ["Design partner"],
		health: 85,
		status: "active",
	},
	{
		id: "comp-13",
		name: "Raycast",
		domain: "raycast.com",
		owner: OWNERS.alex,
		stage: "Evaluation",
		arr: "$175K",
		arrValue: 175000,
		categories: ["Self-serve", "Expansion"],
		health: 73,
		status: "active",
	},
	{
		id: "comp-14",
		name: "PostHog",
		domain: "posthog.com",
		owner: OWNERS.mira,
		stage: "Discovery",
		arr: "$95K",
		arrValue: 95000,
		categories: ["Open source", "Self-serve"],
		health: 60,
		status: "active",
	},
]
