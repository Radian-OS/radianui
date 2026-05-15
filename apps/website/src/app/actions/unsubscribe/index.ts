"use server"

import { getResend } from "@/lib/resend"

export async function unsubscribe(id: string) {
	try {
		const resend = getResend()

		await resend.contacts.update({
			id,
			unsubscribed: true,
		})

		return { message: "Unsubscribed successfully", status: 200 }
	} catch (error) {
		console.error("Unsubscribe error:", error)
		return { message: "Failed to unsubscribe", status: 500 }
	}
}
