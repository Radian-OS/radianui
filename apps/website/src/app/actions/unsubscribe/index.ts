"use server"

import { resend } from "@/lib/resend"

export async function unsubscribe(id: string) {
	try {
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
