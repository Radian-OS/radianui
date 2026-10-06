export interface SocialLink {
	name: string
	url: string
	domain: string
}

export interface ExperienceItem {
	id: string
	company: string
	role: string
	period: string
	isCurrent?: boolean
	description: string
	domain: string
	initials: string
}

export interface ContributionDay {
	date: string
	count: number
	level: 0 | 1 | 2 | 3 | 4
}

export interface YearContributionData {
	year: number
	totalContributions: number
	label: string
}

export const SOCIAL_LINKS: SocialLink[] = [
	{ name: "GitHub", url: "https://github.com", domain: "github.com" },
	{ name: "X", url: "https://x.com", domain: "x.com" },
	{ name: "Linkedin", url: "https://linkedin.com", domain: "linkedin.com" },
	{ name: "Codepen", url: "https://codepen.io", domain: "codepen.io" },
	{ name: "Dribbble", url: "https://dribbble.com", domain: "dribbble.com" },
	{ name: "Instagram", url: "https://instagram.com", domain: "instagram.com" },
	{
		name: "Steam",
		url: "https://steampowered.com",
		domain: "steampowered.com",
	},
	{ name: "Unsplash", url: "https://unsplash.com", domain: "unsplash.com" },
	{ name: "Youtube", url: "https://youtube.com", domain: "youtube.com" },
	{ name: "Daily.dev", url: "https://daily.dev", domain: "daily.dev" },
	{
		name: "Producthunt",
		url: "https://producthunt.com",
		domain: "producthunt.com",
	},
	{
		name: "Stackoverflow",
		url: "https://stackoverflow.com",
		domain: "stackoverflow.com",
	},
	{ name: "Codewars", url: "https://codewars.com", domain: "codewars.com" },
	{ name: "Gitlab", url: "https://gitlab.com", domain: "gitlab.com" },
]

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
	{
		id: "optimus",
		company: "Optimus AI Lab",
		role: "Mid-level Frontend Engineer",
		period: "NOV 25, 2024 - JAN 8, 2025",
		description:
			"At Optimus, my work involves developing and maintaining dynamic user-centric applications and interfaces for top organizations and government agencies",
		domain: "optimus.ai",
		initials: "OA",
	},
	{
		id: "paydestal",
		company: "Paydestal",
		role: "Frontend Developer",
		period: "SEP 11, 2024 - PRESENT",
		isCurrent: true,
		description:
			"At Paydestal, my primary roles involve collaborating with a cross-functional team to develop new fintech products and interactive dashboards using React.js, integrating APIs to display business data and transactions analytics, as well as optimizing existing applications to improve user experience and ensure product compliance",
		domain: "paydestal.com",
		initials: "PD",
	},
	{
		id: "educative",
		company: "Educative",
		role: "Project Author",
		period: "DEC 5, 2023 - SEP 16, 2024",
		description:
			"Technical content author tasked with creating interactive real-world tutorials, focused on topics like Next.js, TypeScript, React.",
		domain: "educative.io",
		initials: "ED",
	},
	{
		id: "freecodecamp",
		company: "Freecodecamp",
		role: "Technical Writer",
		period: "AUG 25, 2022 - DEC 6, 2023",
		description:
			"Volunteer writer for freeCodeCamp, producing technical articles around topics like nextjs, react, and JavaScript.",
		domain: "freecodecamp.org",
		initials: "FC",
	},
	{
		id: "winrealty",
		company: "Winrealty",
		role: "Frontend Developer",
		period: "AUG 16, 2022 - JUL 28, 2023",
		description:
			"At Winrealty, I was tasked to manage and develop a responsive and performant frontend application that reshapes the way countless users purchase property in Nigeria.",
		domain: "winrealty.ng",
		initials: "WR",
	},
	{
		id: "agpro",
		company: "Agpro Inc",
		role: "Frontend Developer (Contract)",
		period: "OCT 11, 2022 - JAN 16, 2023",
		description:
			"At Agpro Inc, I worked closely with a team to rebrand and build the frontend infrastructure of Agpro's Angular-based service web app that allows thousands of clients across the USA monitor their barn activity.",
		domain: "agpro.com",
		initials: "AP",
	},
	{
		id: "aviyel",
		company: "Aviyel",
		role: "Technical Writer and Contributor",
		period: "SEP 22, 2021 - AUG 21, 2022",
		description:
			"My primary tasks at Aviyel included crafting technical guides and hosting coding sessions to bridge the gap with open-source content for some of the fastest-growing projects.",
		domain: "aviyel.com",
		initials: "AV",
	},
]

export const YEARS_DATA: YearContributionData[] = [
	{
		year: 2026,
		totalContributions: 1508,
		label: "1508 contributions in the last year",
	},
	{ year: 2025, totalContributions: 1842, label: "1842 contributions in 2025" },
	{ year: 2024, totalContributions: 2190, label: "2190 contributions in 2024" },
	{ year: 2023, totalContributions: 1640, label: "1640 contributions in 2023" },
	{ year: 2022, totalContributions: 1120, label: "1120 contributions in 2022" },
]

export const MONTHS = [
	"Oct",
	"Nov",
	"Dec",
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
]
