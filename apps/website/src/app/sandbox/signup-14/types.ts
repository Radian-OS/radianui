import { z } from "zod"

export const signupSchema = z.object({
	email: z
		.string()
		.min(1, "Email address is required")
		.email("Please enter a valid email address"),
	password: z
		.string()
		.min(1, "Password is required")
		.min(8, "Password must be at least 8 characters"),
})

export type SignupFormValues = z.infer<typeof signupSchema>

export const loginSchema = signupSchema
export type LoginFormValues = SignupFormValues

export interface UserAvatarItem {
	id: string
	name: string
	avatarUrl: string
	initials: string
}

export const FEATURE_AVATARS: UserAvatarItem[] = [
	{
		id: "1",
		name: "Olivia Sparks",
		avatarUrl: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png",
		initials: "OS",
	},
	{
		id: "2",
		name: "Howard Lloyd",
		avatarUrl: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-6.png",
		initials: "HL",
	},
	{
		id: "3",
		name: "Hallie Richards",
		avatarUrl: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png",
		initials: "HR",
	},
]
