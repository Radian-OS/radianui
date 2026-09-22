import { z } from "zod"
import type { UseFormReturn } from "react-hook-form"

export const longFormSchema = z.object({
	username: z
		.string()
		.min(2, { message: "Username must be at least 2 characters." }),
	email: z.string().email({ message: "Please enter a valid email address." }),
	firstName: z.string().min(1, { message: "First name is required." }),
	lastName: z.string().min(1, { message: "Last name is required." }),
	phone: z.string().min(7, { message: "Please enter a valid phone number." }),
	street: z.string().min(1, { message: "Street address is required." }),
	city: z.string().min(1, { message: "City is required." }),
	state: z.string().min(1, { message: "State is required." }),
	zipCode: z.string().min(3, { message: "ZIP code is required." }),
})

export type LongFormValues = z.infer<typeof longFormSchema>

export type LongFormReturn = UseFormReturn<LongFormValues>

export const DEFAULT_LONG_FORM_VALUES: LongFormValues = {
	username: "",
	email: "",
	firstName: "",
	lastName: "",
	phone: "",
	street: "",
	city: "",
	state: "",
	zipCode: "",
}
