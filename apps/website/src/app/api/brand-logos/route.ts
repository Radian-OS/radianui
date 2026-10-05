import { NextResponse, type NextRequest } from "next/server"

const CDN_BASE =
	"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos"

// In-memory server-side cache for fetched SVGs to avoid repeated upstream requests
const serverSvgCache = new Map<string, string>()

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams
	const token = searchParams.get("token")
	const rawPath = searchParams.get("path")

	let assetPath = ""
	if (token) {
		try {
			// Decode base64 token (avoids ad blockers that match tracker brand names in URLs)
			assetPath = Buffer.from(token, "base64").toString("utf-8")
		} catch {
			return new NextResponse("Invalid token", { status: 400 })
		}
	} else if (rawPath) {
		assetPath = rawPath
	} else {
		return new NextResponse("Missing path or token", { status: 400 })
	}

	// Security validation: only allow .svg under src/ with no directory traversal
	if (
		!assetPath.startsWith("src/") ||
		!assetPath.endsWith(".svg") ||
		assetPath.includes("..")
	) {
		return new NextResponse("Forbidden path", { status: 403 })
	}

	const cached = serverSvgCache.get(assetPath)
	if (cached) {
		return new NextResponse(cached, {
			headers: {
				"Content-Type": "image/svg+xml; charset=utf-8",
				"Cache-Control":
					"public, max-age=604800, s-maxage=604800, stale-while-revalidate=86400",
			},
		})
	}

	try {
		const upstreamUrl = `${CDN_BASE}/${assetPath}`
		const response = await fetch(upstreamUrl, {
			headers: {
				"User-Agent": "RadianUI-BrandLogoProxy/1.0",
			},
		})

		if (!response.ok) {
			return new NextResponse("Asset not found upstream", {
				status: response.status,
			})
		}

		const svgContent = await response.text()
		serverSvgCache.set(assetPath, svgContent)

		return new NextResponse(svgContent, {
			headers: {
				"Content-Type": "image/svg+xml; charset=utf-8",
				"Cache-Control":
					"public, max-age=604800, s-maxage=604800, stale-while-revalidate=86400",
			},
		})
	} catch {
		return new NextResponse("Failed to fetch asset", { status: 502 })
	}
}
