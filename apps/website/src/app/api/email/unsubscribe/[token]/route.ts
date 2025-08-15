import { eq } from "drizzle-orm"

import { db } from "@/db"
import { emailSubscribers } from "@/db/schema"

export async function GET(_req: Request, { params }: { params: Promise<{ token: string }> }) {
	const { token } = await params

	try {
		const [row] = await db.select().from(emailSubscribers).where(eq(emailSubscribers.unsubscribeToken, token))
		if (!row) return Response.json({ success: false, message: "Token not found" }, { status: 403 })

		await db
			.update(emailSubscribers)
			.set({
				isSubscribed: false,
			})
			.where(eq(emailSubscribers.unsubscribeToken, token))

		return Response.json({ success: true, message: "Unsubscribed from mailing list" }, { status: 200 })
	} catch (err) {
		console.error(err)
		return Response.json({ success: false, message: "Error unsubscribing" }, { status: 500 })
	}
}
