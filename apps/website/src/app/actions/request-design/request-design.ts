"use server"

import * as z from "zod"
import { getResend } from "@/lib/resend"
import {
	type RequestDesignInput,
	requestDesignSchema,
} from "@/lib/validations/request-design"

export async function submitDesignRequest(data: RequestDesignInput) {
	const parsed = requestDesignSchema.safeParse(data)
	if (!parsed.success) {
		return {
			success: false,
			message: "Invalid form data.",
			errors: z.treeifyError(parsed.error),
		}
	}

	const { details, email } = parsed.data

	try {
		const resend = await getResend()
		await resend.emails.send({
			from: process.env.RESEND_FROM_EMAIL || "hello@radianos.com",
			to: "dev@radianos.com",
			subject: "New Design Request",
			html: `<p><strong>Requested by:</strong> ${email}</p>
				   <p><strong>Details:</strong><br/>${details.replace(/\n/g, "<br/>")}</p>`,
		})

		return {
			success: true,
			message: "Thanks for your request! We'll look into it.",
		}
	} catch (error) {
		console.error("Error in submitDesignRequest:", error)
		return {
			success: false,
			message: "An error occurred while submitting your request.",
		}
	}
}
