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
