import { z } from "zod"

export const BRAND_LOGOS_MANIFEST_URL =
	"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/manifest.json"
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
				z.object({
					slug,
					label: z.string().min(1),
					brands: z.array(slug).min(1),
				})
			)
			.min(1),
	})
	.superRefine((manifest, ctx) => {
		for (const values of [
			manifest.themes,
			manifest.colorways,
			manifest.variants,
			manifest.categories.map((category) => category.slug),
			manifest.categories.flatMap((category) => category.brands),
		]) {
			if (new Set(values).size !== values.length)
				ctx.addIssue({ code: "custom", message: "Duplicate manifest entries" })
		}
	})
export function parseBrandLogosManifest(input: unknown) {
	const manifest = schema.parse(input)
	return {
		categories: manifest.categories.map((category) => ({
			...category,
			count: category.brands.length,
		})),
	}
}
export async function fetchBrandLogosManifest() {
	const response = await fetch(BRAND_LOGOS_MANIFEST_URL, {
		next: { revalidate: 3600 },
		signal: AbortSignal.timeout(15000),
	})
	if (!response.ok)
		throw new Error(`Brand logo manifest download failed (${response.status})`)
	return parseBrandLogosManifest(await response.json())
}
