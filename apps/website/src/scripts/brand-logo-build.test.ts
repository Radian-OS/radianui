import assert from "node:assert/strict"
import { test } from "node:test"
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs"
import { join } from "node:path"
import { tmpdir } from "node:os"
import { getBrandLogoBuildCommands } from "./brand-logo-build"

test("explicit opt-out builds do not depend on the brand-logo feature or network sync", () => {
	assert.deepEqual(
		getBrandLogoBuildCommands("/missing-brand-logo-feature", false),
		[]
	)
})

test("explicit sync rejects incomplete deployments and runs both sync steps when complete", () => {
	const root = mkdtempSync(join(tmpdir(), "brand-logo-build-"))
	try {
		assert.throws(() => getBrandLogoBuildCommands(root, true), /requires/)
		for (const path of [
			"src/app/(resources)/resources/(brand-logos)/brand-logos/page.tsx",
			"src/scripts/sync-brand-logos-manifest.ts",
			"src/scripts/sync-brand-logo-assets.ts",
		]) {
			mkdirSync(join(root, path, ".."), { recursive: true })
			writeFileSync(join(root, path), "")
		}
		writeFileSync(join(root, "package.json"), JSON.stringify({ scripts: {} }))
		assert.throws(
			() => getBrandLogoBuildCommands(root, true),
			/requires package script/
		)
		writeFileSync(
			join(root, "package.json"),
			JSON.stringify({
				scripts: {
					"sync:brand-logos": "tsx src/scripts/sync-brand-logos-manifest.ts",
					"sync:brand-logo-assets": "tsx src/scripts/sync-brand-logo-assets.ts",
				},
			})
		)
		assert.deepEqual(getBrandLogoBuildCommands(root, true), [
			"pnpm run sync:brand-logos",
			"pnpm run sync:brand-logo-assets",
		])
	} finally {
		rmSync(root, { recursive: true, force: true })
	}
})
