import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { generateResourceImageSitemap } from "./resource-image-sitemap"

const directory = join(process.cwd(), "public/resources")
mkdirSync(directory, { recursive: true })
writeFileSync(
	join(directory, "image-sitemap.xml"),
	generateResourceImageSitemap()
)
console.log(
	"Generated public/resources/image-sitemap.xml from available resource images."
)
