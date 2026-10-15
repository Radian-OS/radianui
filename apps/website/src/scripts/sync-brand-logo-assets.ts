import { createHash } from "node:crypto"
import { mkdir, readFile, writeFile, access, rename } from "node:fs/promises"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import manifest from "../app/(resources)/resources/(brand-logos)/components/brand-logos-manifest.generated.json"

const root = fileURLToPath(new URL("../../", import.meta.url))
const versionFile = join(
	root,
	"src/app/(resources)/resources/(brand-logos)/components/brand-logo-assets-version.generated.json"
)
const ensure = process.argv[2] === "--ensure"
const localManifest = ensure ? undefined : process.argv[2]
const paths = manifest.categories.flatMap((category) =>
	category.brands.flatMap((brand) =>
		manifest.themes.flatMap((theme) =>
			manifest.colorways.flatMap((colorway) =>
				manifest.variants.map(
					(variant) =>
						`src/${theme}/${colorway}/${category.slug}/${variant}/${brand}.svg`
				)
			)
		)
	)
)

async function main() {
	if (ensure) {
		const existing = JSON.parse(
			await readFile(versionFile, "utf8").catch(() => "{}")
		) as { revision?: string }
		if (existing.revision && /^[a-f0-9]{20,40}$/.test(existing.revision)) {
			const ready = await Promise.all(
				paths.map((path) =>
					access(
						join(
							root,
							"public/_brand-assets",
							existing.revision!,
							`${Buffer.from(path).toString("base64url")}.svg`
						)
					).then(
						() => true,
						() => false
					)
				)
			)
			if (ready.every(Boolean)) {
				console.log("Local brand logo assets are ready.")
				return
			}
		}
	}
	let revision: string
	let localFiles: Map<string, string> | undefined
	if (localManifest) {
		localFiles = new Map()
		const hash = createHash("sha256")
		for (const path of paths) {
			const svg = await readFile(join(dirname(localManifest), path), "utf8")
			localFiles.set(path, svg)
			hash.update(path).update(svg)
		}
		revision = hash.digest("hex").slice(0, 20)
	} else {
		const response = await fetch(
			"https://api.github.com/repos/Radian-os/radian-resources/commits/main",
			{
				signal: AbortSignal.timeout(15000),
				headers: { Accept: "application/vnd.github+json" },
			}
		)
		if (!response.ok)
			throw new Error(`Could not resolve asset revision (${response.status})`)
		const commit = (await response.json()) as { sha: string }
		if (!/^[a-f0-9]{40}$/.test(commit.sha))
			throw new Error("Invalid upstream revision")
		revision = commit.sha
		// Fail rather than silently pairing an older manifest with a newer asset catalog.
		const upstream = await fetch(
			`https://raw.githubusercontent.com/Radian-os/radian-resources/${revision}/packages/brand-logos/manifest.json`,
			{ signal: AbortSignal.timeout(15000) }
		)
		if (!upstream.ok) throw new Error("Could not verify pinned manifest")
		const catalog = (await upstream.json()) as typeof manifest
		if (
			JSON.stringify(
				catalog.categories.map(({ slug, brands }) => ({ slug, brands }))
			) !==
			JSON.stringify(
				manifest.categories.map(({ slug, brands }) => ({ slug, brands }))
			)
		)
			throw new Error("Upstream catalog changed; run sync:brand-logos again")
	}
	const directory = join(root, "public/_brand-assets", revision)
	await mkdir(directory, { recursive: true })
	let next = 0
	await Promise.all(
		Array.from({ length: 12 }, async () => {
			while (next < paths.length) {
				const path = paths[next++]
				const destination = join(
					directory,
					`${Buffer.from(path).toString("base64url")}.svg`
				)
				if (
					await access(destination).then(
						() => true,
						() => false
					)
				)
					continue
				let svg = localFiles?.get(path)
				if (!svg) {
					const response = await fetch(
						`https://raw.githubusercontent.com/Radian-os/radian-resources/${revision}/packages/brand-logos/${path}`,
						{ signal: AbortSignal.timeout(20000) }
					)
					if (!response.ok)
						throw new Error(`Could not download ${path} (${response.status})`)
					svg = await response.text()
				}
				if (!/<svg\b/i.test(svg)) throw new Error(`Invalid SVG: ${path}`)
				await writeFile(`${destination}.tmp`, svg)
				await rename(`${destination}.tmp`, destination)
			}
		})
	)
	await writeFile(versionFile, `${JSON.stringify({ revision }, null, 2)}\n`)
	console.log(`Prepared ${paths.length} local SVG assets (${revision}).`)
}

main().catch((error) => {
	console.error(error)
	process.exitCode = 1
})
