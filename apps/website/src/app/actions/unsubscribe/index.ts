"use server"

import { EmailConfigError, getResend } from "@/lib/resend"

export async function unsubscribe(id: string) {
	try {
		const resend = await getResend()

		await resend.contacts.update({
			id,
			unsubscribed: true,
		})

		return { message: "Unsubscribed successfully", status: 200 }
	} catch (error) {
		console.error("Unsubscribe error:", error)
		if (error instanceof EmailConfigError) {
			return {
				message: "Email unsubscribes are not configured yet",
				status: 503,
			}
		}
		return { message: "Failed to unsubscribe", status: 500 }
	}
}
