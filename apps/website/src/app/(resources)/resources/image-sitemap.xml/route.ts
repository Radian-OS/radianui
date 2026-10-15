import { generateResourceImageSitemap } from "@/lib/resource-image-sitemap"

// Rebuilt from the resource catalogs on deployment, and available during development.
export const dynamic = "force-static"

export function GET() {
	return new Response(generateResourceImageSitemap(), {
		headers: { "Content-Type": "application/xml; charset=utf-8" },
	})
}
