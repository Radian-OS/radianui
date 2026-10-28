import { execSync } from "node:child_process"
import { readdirSync, readFileSync, rmSync } from "node:fs"
import { join } from "node:path"

const directory = join(process.cwd(), "public")

// Remove stale shards, including ones left by a previous branch or larger build.
for (const file of readdirSync(directory)) {
	if (/^sitemap(?:-\d+)?\.xml$/.test(file) || file === "robots.txt")
		rmSync(join(directory, file))
}

execSync("pnpm exec next-sitemap --config next-sitemap.config.cjs", {
	stdio: "inherit",
})

// next-sitemap logs some failures without returning a failing exit code.
// Reading fresh outputs makes those failures stop the deployment.
const index = readFileSync(join(directory, "sitemap.xml"), "utf8")
if (!index.includes("<sitemapindex") || !index.includes("<loc>"))
	throw new Error("The generated sitemap index is empty or invalid")
const shards = readdirSync(directory).filter((file) =>
	/^sitemap-\d+\.xml$/.test(file)
)
if (!shards.length) throw new Error("No page sitemaps were generated")
for (const file of shards) {
	const xml = readFileSync(join(directory, file), "utf8")
	if (!xml.includes("<urlset") || !xml.includes("<loc>"))
		throw new Error(`The generated page sitemap is empty or invalid: ${file}`)
}
const robots = readFileSync(join(directory, "robots.txt"), "utf8")
if (
	!robots.includes("/sitemap.xml") ||
	!robots.includes("/resources/image-sitemap.xml")
)
	throw new Error("robots.txt must reference both sitemaps")
