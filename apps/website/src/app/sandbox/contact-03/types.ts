import * as z from "zod"

export const contactFormSchema = z.object({
	firstName: z.string().min(1, "First name is required."),
	lastName: z.string().min(1, "Last name is required."),
	email: z.string().email("Please enter a valid work email address."),
	company: z.string().min(1, "Company name is required."),
	projectType: z.string().min(1, "Please choose a project surface."),
	projectBudget: z.string().min(1, "Please provide a budget range."),
	timeline: z.string().min(1, "Please choose a target timeline."),
	projectDetails: z
		.string()
		.min(10, "Please provide more details (at least 10 characters)."),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>

export interface SelectOption {
	label: string
	value: string
}

export const projectTypes: SelectOption[] = [
	{ label: "Web Application", value: "web-app" },
	{ label: "Design System", value: "design-system" },
	{ label: "Mobile App", value: "mobile-app" },
	{ label: "Marketing Website", value: "marketing-site" },
	{ label: "Component Registry", value: "component-registry" },
]

export const timelineOptions: SelectOption[] = [
	{ label: "2 - 4 weeks", value: "2-4-weeks" },
	{ label: "1 - 2 months", value: "1-2-months" },
	{ label: "3 - 6 months", value: "3-6-months" },
	{ label: "Flexible", value: "flexible" },
]
