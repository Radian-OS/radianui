import { eq } from "drizzle-orm"
import { db } from "@/db"
import { subscribers } from "@/db/schema"

export async function GET(_req: Request, { params }: { params: Promise<{ token: string }> }) {
	const { token } = await params

	try {
		const [row] = await db.select().from(subscribers).where(eq(subscribers.unsubscribeToken, token))
		if (!row) return Response.json({ message: "Token not found", status: 403 })

		await db
			.update(subscribers)
			.set({
				isSubscribed: false,
			})
			.where(eq(subscribers.unsubscribeToken, token))

		return Response.json({ message: "Unsubscribed from mailing list", status: 200 })
	} catch (err) {
		console.error(err)
		return Response.json({ message: "Error unsubscribing", status: 500 })
	}
}
