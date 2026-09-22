import { z } from "zod"

export const profileFormSchema = z.object({
	fullName: z.string().min(2, "Full name must be at least 2 characters"),
	birthDate: z.string().min(1, "Birth date is required"),
	availabilityDate: z.string().min(1, "Availability date is required"),
	company: z.string().min(1, "Company name is required"),
	specialties: z.array(z.string()).min(1, "At least one specialty is required"),
	dismissalTime: z.string().min(1, "Dismissal time is required"),
	phoneNumber: z.string().min(5, "Valid phone number is required"),
	visibility: z.enum(["team-only", "public", "private"]),
	availableToHire: z.boolean(),
})

export type ProfileFormValues = z.infer<typeof profileFormSchema>

export const DEFAULT_PROFILE_VALUES: ProfileFormValues = {
	fullName: "Noa Brooks",
	birthDate: "Sep 18, 1991",
	availabilityDate: "April 24th, 2026 - 10:30",
	company: "Harborline Systems",
	specialties: ["Product strategy", "Team workshops"],
	dismissalTime: "05:30 PM",
	phoneNumber: "+1 (312) 847-1928",
	visibility: "team-only",
	availableToHire: false,
}
