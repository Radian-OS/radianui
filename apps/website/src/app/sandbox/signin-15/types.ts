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
		avatarUrl:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@v1.0.2/packages/uncompressed-avatars/src/11.png",
		initials: "AV",
	},
	{
		id: "2",
		name: "Sarah Miller",
		avatarUrl:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@v1.0.2/packages/uncompressed-avatars/src/42.png",
		initials: "SM",
	},
	{
		id: "3",
		name: "David Kim",
		avatarUrl:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@v1.0.2/packages/uncompressed-avatars/src/108.png",
		initials: "DK",
	},
]
