export interface PersonalProject {
	id: string
	title: string
	date: string
	badgeLetter?: string
	badgeIcon?: "text" | "wallet" | "game"
	badgeColorClass: string
	url: string
}

export interface FeaturedProject {
	id: string
	title: string
	date: string
	tag: string
	imageUrl: string
}

export interface ExperienceItem {
	id: string
	company: string
	role: string
	typePeriod: string
	isCurrent?: boolean
	bullets: string[]
	skills: string[]
}

export interface CertificationItem {
	id: string
	title: string
	issuer: string
	date: string
	iconType: "college" | "google"
}

export const PERSONAL_PROJECTS: PersonalProject[] = [
	{
		id: "anepali",
		title: "aNepali.com - Nepali Font Library",
		date: "May, 2024",
		badgeLetter: "अ",
		badgeColorClass: "bg-error-accent text-error-text border-error-border",
		url: "https://anepali.com",
	},
	{
		id: "figma-plugin",
		title: "Text Styles Creator - Figma Plugin",
		date: "June, 2023",
		badgeLetter: "T",
		badgeColorClass: "bg-info-accent text-info-text border-info-border",
		url: "https://figma.com",
	},
	{
		id: "blank-tracker",
		title: "Blank - Minimalist Expense Tracker",
		date: "June, 2025",
		badgeIcon: "wallet",
		badgeColorClass:
			"bg-primary-accent text-primary-text border-primary-border",
		url: "#",
	},
	{
		id: "alfie-jump",
		title: "Alfie Jump - Casual Platformer Game",
		date: "July, 2022",
		badgeIcon: "game",
		badgeColorClass:
			"bg-success-accent text-success-text border-success-border",
		url: "#",
	},
]

export const FEATURED_PROJECTS: FeaturedProject[] = [
	{
		id: "pod-redesign",
		title: "Redefining Pod: Bringing Clarity to an Overbuilt Product",
		date: "16.05.2025",
		tag: "PRODUCT REDESIGN",
		imageUrl: "/sandbox/placeholder.svg",
	},
	{
		id: "kdmi-brand",
		title:
			"Kathmandu Digital Marketing Institute got their brand identity designed",
		date: "20.03.2023",
		tag: "BRAND IDENTITY",
		imageUrl: "/sandbox/placeholder.svg",
	},
	{
		id: "gruponar-portal",
		title:
			"GrupoNar implemented a transaction tracking feature in their website",
		date: "15.05.2023",
		tag: "CLIENT PORTAL",
		imageUrl: "/sandbox/placeholder.svg",
	},
	{
		id: "nathm-redesign",
		title: "NATHM got their college website redesigned",
		date: "10.02.2023",
		tag: "WEBSITE REDESIGN",
		imageUrl: "/sandbox/placeholder.svg",
	},
]

export const EXPERIENCES: ExperienceItem[] = [
	{
		id: "launchpad",
		company: "Launchpad",
		role: "Product Designer",
		typePeriod: "Contract | 07.2018 — ∞",
		isCurrent: true,
		bullets: [
			"Led UI/UX and brand identity work for clients including Beever Consulting Engineers, Arena, Indian Legal Tech, Bala Lights and Decors, Jotaks, Coffee Express, and BRS Renovation",
			"Partner with founders to turn ambiguous requirements into shippable deliverables across web, mobile, and operations tooling",
		],
		skills: [
			"Product Design",
			"Brand Identity",
			"Client Workshops",
			"UX Strategy",
			"Design Systems",
			"Product Leadership",
		],
	},
	{
		id: "bottle",
		company: "Bottle",
		role: "Product Designer",
		typePeriod: "Full-time | 07.2024 — 09.2025",
		bullets: [
			"Helped unblock long-stuck projects by prioritizing tasks and improving stakeholder communication",
			"Built and led the design team while coordinating with stakeholders and development teams",
			"Led POD MVP deployment by redesigning the entire RMS system, tablet app for waiters, and customer-facing device, while coordinating with managers, developers, and CEO to align on MVP decisions",
			"Established better workflows and introduced teams to new infrastructure that improved productivity and efficiency",
		],
		skills: [
			"Product Design",
			"Project Management",
			"Cross-functional Leadership",
			"Process Improvement",
			"MVP Development",
			"Stakeholder Coordination",
			"Design Systems",
			"User Research",
		],
	},
	{
		id: "personal-projects",
		company: "Personal Projects",
		role: "Independent Builder",
		typePeriod: "Self-employed | 08.2019 — ∞",
		isCurrent: true,
		bullets: [
			"Built and launched aNepali.com font directory solving real gap in Nepali typography ecosystem with over 2,000 active users",
			"Developed, published, and maintained Blank expense tracker Android app with 70+ active users, continuously iterating based on user feedback",
			"Created and published Text Styles Creator Figma plugin with over 20,000 users, addressing common designer workflow needs",
			"Built and published Alfie Jump casual Android platformer game with offline functionality",
		],
		skills: [
			"Product Development",
			"Android Development",
			"Figma Plugin Development",
			"Game Development",
			"Brand Identity",
			"UI/UX Design",
			"Independent Projects",
		],
	},
	{
		id: "transtech",
		company: "Transtech Media",
		role: "Graphic Designer",
		typePeriod: "Full-time | 03.2019 — 07.2019",
		bullets: [
			"Delivered graphic design, mockups, and logo design projects",
			"Collaborated with development teams on visual asset creation",
		],
		skills: [
			"Graphic Design",
			"Logo Design",
			"Mockups",
			"Visual Assets",
			"Team Collaboration",
		],
	},
]

export const CERTIFICATIONS: CertificationItem[] = [
	{
		id: "csit",
		title: "BSc. Computer Science & Information Technology",
		issuer: "@ St. Xavier's College",
		date: "01.01.2019",
		iconType: "college",
	},
	{
		id: "google-ux",
		title: "Fundamentals of UX Design",
		issuer: "@ Google",
		date: "01.01.2019",
		iconType: "google",
	},
]
