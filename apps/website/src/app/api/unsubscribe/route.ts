import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
	try {
		const url = new URL(request.url)
		const email = url.searchParams.get("email")

		if (!email) {
			return NextResponse.json({ error: "Email required" }, { status: 400 })
		}

		await resend.contacts.update({
			email: email,
			unsubscribed: true,
		})

		return NextResponse.json({ message: "Unsubscribed successfully" }, { status: 200 })
	} catch (error) {
		console.error("Unsubscribe error:", error)
		return NextResponse.json({ error: "Failed to unsubscribe" }, { status: 500 })
	}
}

export async function GET(request: NextRequest) {
	const url = new URL(request.url)
	const email = url.searchParams.get("email")

	return new NextResponse(
		`
		<!DOCTYPE html>
		<html>
			<body>
				<h1>Unsubscribe</h1>
				<p>Click below to unsubscribe ${email}</p>
				<form method="POST">
					<button type="submit">Unsubscribe</button>
				</form>
			</body>
		</html>
	`,
		{
			headers: { "Content-Type": "text/html" },
		}
	)
}
