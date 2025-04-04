"use server"

import { encodeBase32LowerCaseNoPadding } from "@oslojs/encoding"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { emailSubscribers } from "@/db/schema"

function generateUnsubscribeToken(): string {
	const bytes = new Uint8Array(20)
	crypto.getRandomValues(bytes)
	const token = encodeBase32LowerCaseNoPadding(bytes)
	return token
}

export async function subscribe(email: string) {
	if (!email) return { success: false, message: "Email is empty" }

	try {
		const [row] = await db.select().from(emailSubscribers).where(eq(emailSubscribers.email, email))
		if (row) return { success: false, message: "Email is already subscribed" }

		const unsubscribeToken = generateUnsubscribeToken()
		await db.insert(emailSubscribers).values({
			email: email,
			isSubscribed: true,
			unsubscribeToken: unsubscribeToken,
			subscribedAt: new Date(),
		})
		return { success: true, message: "Thank you for subscribing!" }
	} catch (err) {
		console.error(err)
		return { success: false, message: "Error subscribing email" }
	}
}
