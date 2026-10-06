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
			"Building our interface with Radian saved us hundreds of hours. The components are gorgeous out of the box.",
		author: "Alex Rivera",
		role: "Frontend Lead at Hyperion",
		avatarUrl:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@v1.0.2/packages/uncompressed-avatars/src/11.png",
		initials: "AR",
	},
	{
		id: "2",
		quote:
			"The attention to detail is unmatched. Radian gave our application a premium feel that our users instantly noticed.",
		author: "Sarah Chen",
		role: "Product Designer · Nova Labs",
		avatarUrl:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@v1.0.2/packages/uncompressed-avatars/src/42.png",
		initials: "SC",
	},
	{
		id: "3",
		quote:
			"We migrated our entire dashboard to Radian in record time. The developer experience is incredibly smooth and intuitive.",
		author: "Marcus Johnson",
		role: "CTO at Elevate",
		avatarUrl:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@v1.0.2/packages/uncompressed-avatars/src/108.png",
		initials: "MJ",
	},
	{
		id: "4",
		quote:
			"Our team loves the flexibility. We can customize everything while maintaining a perfectly cohesive design system.",
		author: "Elena Rodriguez",
		role: "Design Engineer · Nexus",
		avatarUrl:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@v1.0.2/packages/uncompressed-avatars/src/216.png",
		initials: "ER",
	},
]

export const BRAND_LOGOS: BrandLogo[] = [
	{
		src: "https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/neutral/development/wordmark/bitbucket.svg",
		alt: "Bitbucket",
		width: 100,
	},
	{
		src: "https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/neutral/development/wordmark/deno.svg",
		alt: "Deno",
		width: 60,
	},
	{
		src: "https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/neutral/development/wordmark/go.svg",
		alt: "Go",
		width: 50,
	},
	{
		src: "https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/neutral/development/wordmark/stackblitz.svg",
		alt: "StackBlitz",
		width: 80,
	},
	{
		src: "https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/neutral/development/wordmark/swift.svg",
		alt: "Swift",
		width: 60,
	},
	{
		src: "https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/neutral/design-creative/wordmark/blender.svg",
		alt: "Blender",
		width: 80,
	},
]
