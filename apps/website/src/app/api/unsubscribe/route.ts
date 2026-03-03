import { NextRequest, NextResponse } from "next/server"
import { unsubscribe } from "@/app/actions/unsubscribe"

export async function POST(request: NextRequest) {
	try {
		const url = new URL(request.url)
		const id = url.searchParams.get("id")

		if (!id) {
			return new NextResponse("", { status: 200 })
		}

		await unsubscribe(id)

		return new NextResponse("", { status: 200 })
	} catch (error) {
		console.error("Unsubscribe error:", error)
		return new NextResponse("", { status: 500 })
	}
}

export async function GET(request: NextRequest) {
	const url = new URL(request.url)
	const id = url.searchParams.get("id")
	const baseUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || url.origin
	return NextResponse.redirect(
		new URL(`/unsubscribe?id=${encodeURIComponent(id || "")}`, baseUrl)
	)
}
