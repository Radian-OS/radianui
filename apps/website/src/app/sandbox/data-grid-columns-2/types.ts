export type CourseStatus = "published" | "draft" | "archived"

export type CourseCategory = "Development" | "Fundamental" | "Design" | "UI/UX"

export type UrgencyLevel = "Urgent" | "Not Urgent"

export interface Assignee {
	id: string
	name: string
	avatarUrl: string
	initials: string
}

export interface CourseItem {
	id: string
	title: string
	instructor: string
	createdAt: string
	category: CourseCategory
	urgency: UrgencyLevel
	pathCount: number
	score: number
	assigned: Assignee[]
	completion: number | null
	status: CourseStatus
	thumbnail: string
}

export const SAMPLE_ASSIGNEES: Record<string, Assignee> = {
	sofia: {
		id: "1",
		name: "Sofia Lee",
		avatarUrl: "/sandbox/placeholder.svg",
		initials: "SL",
	},
	james: {
		id: "2",
		name: "James Kim",
		avatarUrl: "/sandbox/placeholder.svg",
		initials: "JK",
	},
	priya: {
		id: "3",
		name: "Priya Agarwal",
		avatarUrl: "/sandbox/placeholder.svg",
		initials: "PA",
	},
	raihan: {
		id: "4",
		name: "Raihan Fikri",
		avatarUrl: "/sandbox/placeholder.svg",
		initials: "RF",
	},
	alex: {
		id: "5",
		name: "Alex Morgan",
		avatarUrl: "/sandbox/placeholder.svg",
		initials: "AM",
	},
	elena: {
		id: "6",
		name: "Elena Rostova",
		avatarUrl: "/sandbox/placeholder.svg",
		initials: "ER",
	},
}

export const COURSES_DATA: CourseItem[] = [
	{
		id: "course-1",
		title: "Accessibility Standards in Product Design",
		instructor: "Sofia Lee",
		createdAt: "20 Feb 2023",
		category: "Development",
		urgency: "Urgent",
		pathCount: 7,
		score: 4.0,
		assigned: [
			SAMPLE_ASSIGNEES.sofia,
			SAMPLE_ASSIGNEES.james,
			SAMPLE_ASSIGNEES.priya,
			SAMPLE_ASSIGNEES.raihan,
			SAMPLE_ASSIGNEES.alex,
		],
		completion: 55,
		status: "published",
		thumbnail: "/sandbox/placeholder.svg",
	},
	{
		id: "course-2",
		title: "Agile Methodologies for Design Teams",
		instructor: "James Kim",
		createdAt: "9 Jan 2023",
		category: "Fundamental",
		urgency: "Urgent",
		pathCount: 9,
		score: 4.6,
		assigned: [
			SAMPLE_ASSIGNEES.james,
			SAMPLE_ASSIGNEES.sofia,
			SAMPLE_ASSIGNEES.raihan,
		],
		completion: 88,
		status: "published",
		thumbnail: "/sandbox/placeholder.svg",
	},
	{
		id: "course-3",
		title: "Brand Identity Systems from Scratch",
		instructor: "Sofia Lee",
		createdAt: "22 Aug 2022",
		category: "Fundamental",
		urgency: "Not Urgent",
		pathCount: 10,
		score: 4.7,
		assigned: [SAMPLE_ASSIGNEES.sofia],
		completion: 100,
		status: "published",
		thumbnail: "/sandbox/placeholder.svg",
	},
	{
		id: "course-4",
		title: "Color Theory for Modern Product Design",
		instructor: "Priya Agarwal",
		createdAt: "18 Jun 2022",
		category: "Design",
		urgency: "Not Urgent",
		pathCount: 8,
		score: 4.3,
		assigned: [SAMPLE_ASSIGNEES.priya, SAMPLE_ASSIGNEES.sofia],
		completion: 50,
		status: "published",
		thumbnail: "/sandbox/placeholder.svg",
	},
	{
		id: "course-5",
		title: "Figma Prototyping Implementation",
		instructor: "Raihan Fikri",
		createdAt: "12 Feb 2022",
		category: "Design",
		urgency: "Not Urgent",
		pathCount: 20,
		score: 4.5,
		assigned: [SAMPLE_ASSIGNEES.raihan],
		completion: null,
		status: "published",
		thumbnail: "/sandbox/placeholder.svg",
	},
	{
		id: "course-6",
		title: "Frontend Development Fundamentals",
		instructor: "Sofia Lee",
		createdAt: "3 Mar 2023",
		category: "Development",
		urgency: "Urgent",
		pathCount: 22,
		score: 4.8,
		assigned: [
			SAMPLE_ASSIGNEES.sofia,
			SAMPLE_ASSIGNEES.james,
			SAMPLE_ASSIGNEES.alex,
			SAMPLE_ASSIGNEES.priya,
		],
		completion: 38,
		status: "published",
		thumbnail: "/sandbox/placeholder.svg",
	},
	{
		id: "course-7",
		title: "Mastering UI Design for Impactful Products",
		instructor: "Raihan Fikri",
		createdAt: "24 May 2022",
		category: "Fundamental",
		urgency: "Not Urgent",
		pathCount: 15,
		score: 4.7,
		assigned: [SAMPLE_ASSIGNEES.raihan, SAMPLE_ASSIGNEES.sofia],
		completion: 50,
		status: "published",
		thumbnail: "/sandbox/placeholder.svg",
	},
	{
		id: "course-8",
		title: "Mastering UI/UX Design for Impact",
		instructor: "Raihan Fikri",
		createdAt: "28 Oct 2022",
		category: "UI/UX",
		urgency: "Not Urgent",
		pathCount: 12,
		score: 4.9,
		assigned: [
			SAMPLE_ASSIGNEES.raihan,
			SAMPLE_ASSIGNEES.priya,
			SAMPLE_ASSIGNEES.james,
			SAMPLE_ASSIGNEES.sofia,
			SAMPLE_ASSIGNEES.alex,
			SAMPLE_ASSIGNEES.elena,
		],
		completion: 64,
		status: "published",
		thumbnail: "/sandbox/placeholder.svg",
	},
	{
		id: "course-9",
		title: "Design Tokens & Variable Systems",
		instructor: "James Kim",
		createdAt: "14 Nov 2023",
		category: "Design",
		urgency: "Not Urgent",
		pathCount: 14,
		score: 4.8,
		assigned: [
			SAMPLE_ASSIGNEES.james,
			SAMPLE_ASSIGNEES.sofia,
			SAMPLE_ASSIGNEES.priya,
		],
		completion: 72,
		status: "published",
		thumbnail: "/sandbox/placeholder.svg",
	},
	{
		id: "course-10",
		title: "Micro-interactions & Motion Principles",
		instructor: "Priya Agarwal",
		createdAt: "5 Dec 2023",
		category: "UI/UX",
		urgency: "Urgent",
		pathCount: 6,
		score: 4.2,
		assigned: [SAMPLE_ASSIGNEES.priya, SAMPLE_ASSIGNEES.raihan],
		completion: 20,
		status: "draft",
		thumbnail: "/sandbox/placeholder.svg",
	},
	{
		id: "course-11",
		title: "Advanced React Component Patterns",
		instructor: "Sofia Lee",
		createdAt: "12 Jan 2024",
		category: "Development",
		urgency: "Not Urgent",
		pathCount: 18,
		score: 4.6,
		assigned: [
			SAMPLE_ASSIGNEES.sofia,
			SAMPLE_ASSIGNEES.james,
			SAMPLE_ASSIGNEES.alex,
			SAMPLE_ASSIGNEES.elena,
		],
		completion: 15,
		status: "draft",
		thumbnail: "/sandbox/placeholder.svg",
	},
	{
		id: "course-12",
		title: "Legacy Web Layouts with Flexbox & Grid",
		instructor: "James Kim",
		createdAt: "19 Mar 2021",
		category: "Development",
		urgency: "Not Urgent",
		pathCount: 11,
		score: 4.1,
		assigned: [SAMPLE_ASSIGNEES.james],
		completion: 100,
		status: "archived",
		thumbnail: "/sandbox/placeholder.svg",
	},
]
