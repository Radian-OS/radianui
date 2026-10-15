import { generateResourceImageSitemap } from "@/lib/resource-image-sitemap"

// Built from available resource pages, public files, and published CDN catalogs.
export const dynamic = "force-static"

export function GET() {
	return new Response(generateResourceImageSitemap(), {
		headers: { "Content-Type": "application/xml; charset=utf-8" },
	})
}
