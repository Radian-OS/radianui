import * as z from "zod"

export const serviceOptions = [
	"Web Development",
	"UI/UX Design",
	"Mobile App Development",
	"Branding & Identity",
	"SEO & Marketing",
] as const

export const inquiryFormSchema = z.object({
	firstName: z.string().min(1, "First name is required."),
	lastName: z.string().min(1, "Last name is required."),
	email: z.string().email("Please enter a valid email address."),
	service: z.string().min(1, "Please select a service."),
	message: z
		.string()
		.min(
			10,
			"Please share some details about your project (at least 10 characters)."
		),
	termsAccepted: z.boolean().refine((val) => val === true, {
		message: "You must acknowledge the terms and conditions to proceed.",
	}),
})

export type InquiryFormValues = z.infer<typeof inquiryFormSchema>

export interface ContactDetail {
	label: string
	value: string
	href?: string
}

export interface PartnerLogo {
	name: string
	logoUrl: string
}
