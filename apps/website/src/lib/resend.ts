import { Resend } from "resend"

let resend: Resend | null = null

export class EmailConfigError extends Error {
	constructor(missingVariables: string[]) {
		super(
			`${missingVariables.join(", ")} ${
				missingVariables.length === 1 ? "is" : "are"
			} not set`
		)
		this.name = "EmailConfigError"
	}
}

export function getEmailConfig() {
	const apiKey = process.env.RESEND_API_KEY
	const fromEmail = process.env.RESEND_FROM_EMAIL
	const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL

	const missingVariables: string[] = []

	if (!apiKey) missingVariables.push("RESEND_API_KEY")
	if (!fromEmail) missingVariables.push("RESEND_FROM_EMAIL")
	if (!websiteUrl) missingVariables.push("NEXT_PUBLIC_WEBSITE_URL")

	if (missingVariables.length > 0) {
		throw new EmailConfigError(missingVariables)
	}

	return {
		apiKey: apiKey!,
		fromEmail: fromEmail!,
		websiteUrl: websiteUrl!,
	}
}

export async function getResend(apiKey = getEmailConfig().apiKey) {
	resend ??= new Resend(apiKey)

	return resend
}
