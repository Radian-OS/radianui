import { z } from "zod"

export const signUpSchema = z.object({
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	email: z
		.string()
		.min(1, "Email address is required")
		.email("Please enter a valid email address"),
	password: z.string().min(8, "Password must be at least 8 characters"),
})

export type SignUpFormValues = z.infer<typeof signUpSchema>
