import type { LucideIcon } from "lucide-react"
import * as z from "zod"

export const serviceOptions = [
	"Web Design",
	"Development",
	"Marketing",
	"Branding",
] as const

export const budgetOptions = [
	"$1K - $5K",
	"$5K - $10K",
	"$10K - $25K",
	"$25K+",
] as const

export const quoteFormSchema = z.object({
	service: z.string().min(1, "Please select a required service."),
	budget: z.string().min(1, "Please select an estimated budget range."),
	fullName: z.string().min(1, "Full name is required."),
	email: z.string().email("Please enter a valid email address."),
	projectDetails: z
		.string()
		.min(10, "Please describe your project details (at least 10 characters)."),
	attachmentName: z.string().optional(),
})

export type QuoteFormValues = z.infer<typeof quoteFormSchema>

export interface FeatureItem {
	icon: LucideIcon
	title: string
	description: string
}
