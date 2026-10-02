import { z } from "zod"

export const loginSchema = z.object({
	emailOrUsername: z.string().min(1, "Email or username is required"),
	password: z.string().min(6, "Password must be at least 6 characters"),
	rememberMe: z.boolean().default(false),
})

export type LoginFormValues = z.infer<typeof loginSchema>

export interface TestimonialItem {
	id: string
	quote: string
	author: string
	role: string
	avatarUrl: string
	initials: string
}

export interface BrandLogo {
	src: string
	alt: string
	width: number
}

export const TESTIMONIALS: TestimonialItem[] = [
	{
		id: "1",
		quote:
			"Exactly the balance of simplicity and flexibility we were looking for. It fits perfectly into our product.",
		author: "Jessica Thompson",
		role: "Engineering · Vertex Studio",
		avatarUrl: "https://images.shadcnspace.com/assets/profiles/user-2.webp",
		initials: "JT",
	},
	{
		id: "2",
		quote:
			"Beautiful components with thoughtful details. Our onboarding experience instantly felt more premium.",
		author: "Emma Wilson",
		role: "Founder of BrightFlow",
		avatarUrl: "https://images.shadcnspace.com/assets/profiles/jenny.webp",
		initials: "EW",
	},
	{
		id: "3",
		quote:
			"A perfect balance of simplicity and flexibility. It helped us launch faster without compromising quality.",
		author: "Lucas Martin",
		role: "Engineering Lead at Orbit System",
		avatarUrl: "https://images.shadcnspace.com/assets/profiles/jessica.webp",
		initials: "LM",
	},
	{
		id: "4",
		quote:
			"Authentication became one less thing to think about. Setup was fast, and the experience felt polished.",
		author: "Daniel Brooks",
		role: "Product Designer at Nova Labs",
		avatarUrl: "https://images.shadcnspace.com/assets/profiles/albert.webp",
		initials: "DB",
	},
]

export const BRAND_LOGOS: BrandLogo[] = [
	{
		src: "https://images.shadcnspace.com/assets/svgs/auth/linear.svg",
		alt: "Linear",
		width: 76,
	},
	{
		src: "https://images.shadcnspace.com/assets/svgs/auth/vercel.svg",
		alt: "Vercel",
		width: 73,
	},
	{
		src: "https://images.shadcnspace.com/assets/svgs/auth/notion.svg",
		alt: "Notion",
		width: 74,
	},
	{
		src: "https://images.shadcnspace.com/assets/svgs/auth/stripe.svg",
		alt: "Stripe",
		width: 46,
	},
	{
		src: "https://images.shadcnspace.com/assets/svgs/auth/framer.svg",
		alt: "Framer",
		width: 79,
	},
	{
		src: "https://images.shadcnspace.com/assets/svgs/auth/github.svg",
		alt: "GitHub",
		width: 75,
	},
]
