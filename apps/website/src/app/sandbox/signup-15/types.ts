import { z } from "zod"

export const signupSchema = z.object({
	emailOrUsername: z.string().min(1, "Email or username is required"),
	password: z
		.string()
		.min(1, "Password is required")
		.min(6, "Password must be at least 6 characters"),
})

export type SignupFormValues = z.infer<typeof signupSchema>

// Backwards-compatible aliases
export const loginSchema = signupSchema
export type LoginFormValues = SignupFormValues

export interface SocialProvider {
	id: string
	label: string
	iconUrl: string
	iconDarkUrl?: string
	invertInDark?: boolean
}

export const SOCIAL_PROVIDERS: SocialProvider[] = [
	{
		id: "google",
		label: "Google",
		iconUrl:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/colored/technology/icon/google.svg",
	},
	{
		id: "apple",
		label: "Apple",
		iconUrl:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/light/neutral/technology/icon/apple.svg",
		iconDarkUrl:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/neutral/technology/icon/apple.svg",
	},
]
