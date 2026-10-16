import { readFile, writeFile, rename } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import { z } from "zod"

const upstreamUrl =
	"https://raw.githubusercontent.com/Radian-os/radian-resources/main/packages/brand-logos/manifest.json"
const destination = fileURLToPath(
	new URL(
		"../app/(resources)/resources/(brand-logos)/components/brand-logos-manifest.generated.json",
		import.meta.url
	)
)
const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
const schema = z
	.object({
		version: z.literal(2),
		pathTemplate: z.literal(
			"src/{theme}/{colorway}/{category}/{variant}/{brand}.svg"
		),
		format: z.literal("svg"),
		themes: z.array(z.enum(["light", "dark"])).length(2),
		colorways: z.array(z.enum(["colored", "neutral"])).length(2),
		variants: z.array(z.enum(["icon", "wordmark"])).length(2),
		categories: z
			.array(
				z
					.object({
						slug,
						label: z.string().min(1),
						brands: z.array(slug).min(1),
					})
					.passthrough()
			)
			.min(1),
	})
	.passthrough()

async function main() {
	// Optional local source supports working on both repos before publishing upstream.
	const sourcePath = process.argv[2]
	let input: unknown
	if (sourcePath) {
		input = JSON.parse(await readFile(sourcePath, "utf8"))
	} else {
		const response = await fetch(upstreamUrl, {
			signal: AbortSignal.timeout(15000),
		})
		if (!response.ok)
			throw new Error(`Manifest download failed (${response.status})`)
		input = await response.json()
	}
	const manifest = schema.parse(input)
	for (const values of [
		manifest.themes,
		manifest.colorways,
		manifest.variants,
		manifest.categories.map((category) => category.slug),
	]) {
		if (new Set(values).size !== values.length)
			throw new Error("Duplicate manifest variants or categories")
	}
	const brands = manifest.categories.flatMap((category) => category.brands)
	if (new Set(brands).size !== brands.length)
		throw new Error("Duplicate brand IDs")
	const generated = {
		...manifest,
		brandCount: brands.length,
		assetCount:
			brands.length *
			manifest.themes.length *
			manifest.colorways.length *
			manifest.variants.length,
		categories: manifest.categories.map((category) => ({
			...category,
			count: category.brands.length,
		})),
	}
	const output = `${JSON.stringify(generated, null, 2)}\n`
	if ((await readFile(destination, "utf8").catch(() => "")) !== output) {
		await writeFile(`${destination}.tmp`, output)
		await rename(`${destination}.tmp`, destination)
	}
	console.log(
		`Synced ${generated.brandCount} brands (${generated.assetCount} assets).`
	)
}

main().catch((error) => {
	console.error(
		"Brand logo manifest sync failed:",
		error instanceof Error ? error.message : error
	)
	process.exitCode = 1
})
