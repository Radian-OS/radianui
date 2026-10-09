import { z } from "zod"

export const signupSchema = z.object({
	email: z
		.string()
		.min(1, "Work email is required")
		.email("Please enter a valid work email"),
	password: z.string().min(8, "Password must be at least 8 characters"),
})

export type SignupFormValues = z.infer<typeof signupSchema>

export interface CompanyLogo {
	id: string
	name: string
	domain: string
}

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
		label: "Continue with Google",
		iconUrl:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/colored/technology/icon/google.svg",
	},
	{
		id: "github",
		label: "Continue with GitHub",
		iconUrl:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/light/neutral/development/icon/github.svg",
		iconDarkUrl:
			"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/neutral/development/icon/github.svg",
	},
]
