import { NextRequest, NextResponse } from "next/server"
import { subscribe } from "@/app/actions/subscribe"

export async function POST(request: NextRequest) {
	try {
		const body = await request.json().catch(() => null)
		const email = typeof body?.email === "string" ? body.email.trim() : ""

		if (!email) {
			return NextResponse.json(
				{ message: "Email is required", status: 400 },
				{ status: 400 }
			)
		}

		const result = await subscribe(email)

		return NextResponse.json(result, { status: result.status })
	} catch (error) {
		console.error("Subscribe error:", error)
		return NextResponse.json(
			{
				message: "Something went wrong. Please try again later.",
				status: 500,
			},
			{ status: 500 }
		)
	}
}
