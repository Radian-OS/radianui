import { existsSync, mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { generateResourceImageSitemap } from "./resource-image-sitemap"

import { fetchBrandLogosManifest } from "../src/app/(resources)/resources/(brand-logos)/components/brand-logos-manifest"
const brandManifest = existsSync(
	join(
		process.cwd(),
		"src/app/(resources)/resources/(brand-logos)/brand-logos/page.tsx"
	)
)
	? await fetchBrandLogosManifest()
	: undefined
const directory = join(process.cwd(), "public/resources")
mkdirSync(directory, { recursive: true })
writeFileSync(
	join(directory, "image-sitemap.xml"),
	generateResourceImageSitemap({ brandManifest })
)
console.log(
	"Generated public/resources/image-sitemap.xml from available resource images."
)
