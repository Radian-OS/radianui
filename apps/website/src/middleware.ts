import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	// Intercept any /docs/...path.md request and serve raw markdown
	if (pathname.startsWith("/docs/") && pathname.endsWith(".md")) {
		const slug = pathname.slice("/docs/".length, -".md".length)
		return NextResponse.rewrite(new URL(`/api/raw-docs/${slug}`, request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ["/docs/:path+"],
}
