import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"

export function getBrandLogoBuildCommands(
	directory: string,
	enabled: boolean
): string[] {
	if (!enabled) return []
	const required = [
		"src/app/(resources)/resources/(brand-logos)/brand-logos/page.tsx",
		"src/scripts/sync-brand-logos-manifest.ts",
		"src/scripts/sync-brand-logo-assets.ts",
	]
	for (const path of required) {
		if (!existsSync(join(directory, path)))
			throw new Error(`SYNC_BRAND_LOGOS=true requires ${path}`)
	}
	const { scripts } = JSON.parse(
		readFileSync(join(directory, "package.json"), "utf8")
	) as { scripts?: Record<string, string> }
	for (const command of ["sync:brand-logos", "sync:brand-logo-assets"]) {
		if (!scripts?.[command])
			throw new Error(
				`SYNC_BRAND_LOGOS=true requires package script ${command}`
			)
	}
	return ["pnpm run sync:brand-logos", "pnpm run sync:brand-logo-assets"]
}
