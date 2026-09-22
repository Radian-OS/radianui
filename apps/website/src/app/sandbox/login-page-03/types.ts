import { z } from "zod"

export const loginSchema = z.object({
	email: z
		.string()
		.min(1, "Email address is required")
		.email("Please enter a valid email address"),
	password: z
		.string()
		.min(1, "Password is required")
		.min(8, "Password must be at least 8 characters"),
	rememberMe: z.boolean().default(false),
})

export type LoginFormValues = z.infer<typeof loginSchema>

export interface UserAvatarItem {
	id: string
	name: string
	avatarUrl: string
	initials: string
}

export const FEATURE_AVATARS: UserAvatarItem[] = [
	{
		id: "1",
		name: "Alex Vance",
		avatarUrl: "/sandbox/placeholder.svg",
		initials: "AV",
	},
	{
		id: "2",
		name: "Sarah Miller",
		avatarUrl: "/sandbox/placeholder.svg",
		initials: "SM",
	},
	{
		id: "3",
		name: "David Kim",
		avatarUrl: "/sandbox/placeholder.svg",
		initials: "DK",
	},
]
