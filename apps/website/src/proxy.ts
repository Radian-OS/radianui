import { NextRequest, NextResponse } from "next/server"

export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl

	if (pathname.startsWith("/docs/") && pathname.endsWith(".md")) {
		const slug = pathname.slice("/docs/".length, -".md".length)
		return NextResponse.rewrite(new URL(`/api/raw-docs/${slug}`, request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ["/docs/:path*.md"],
}
