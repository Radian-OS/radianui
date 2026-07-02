import * as z from "zod"

export const requestDesignSchema = z.object({
	details: z.string().min(1, "Please tell us what you'd like to add."),
	email: z.email("Please enter a valid email address."),
})

export type RequestDesignInput = z.infer<typeof requestDesignSchema>
