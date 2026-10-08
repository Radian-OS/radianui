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

export const COMPANY_LOGOS: CompanyLogo[] = [
	{ id: "stripe", name: "Stripe", domain: "stripe.com" },
	{ id: "openai", name: "OpenAI", domain: "openai.com" },
	{ id: "anthropic", name: "Anthropic", domain: "anthropic.com" },
	{ id: "slack", name: "Slack", domain: "slack.com" },
	{ id: "mintlify", name: "Mintlify", domain: "mintlify.com" },
	{ id: "resend", name: "Resend", domain: "resend.com" },
]

export interface SocialProvider {
	id: string
	label: string
	iconUrl: string
	invertInDark?: boolean
}

export const SOCIAL_PROVIDERS: SocialProvider[] = [
	{
		id: "google",
		label: "Continue with Google",
		iconUrl: "https://authjs.dev/img/providers/google.svg",
	},
	{
		id: "github",
		label: "Continue with GitHub",
		iconUrl: "https://authjs.dev/img/providers/github.svg",
		invertInDark: true,
	},
]
