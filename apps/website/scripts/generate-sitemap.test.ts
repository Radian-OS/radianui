import assert from "node:assert/strict"
import { spawnSync } from "node:child_process"
import {
	mkdtempSync,
	mkdirSync,
	readFileSync,
	writeFileSync,
	existsSync,
	rmSync,
} from "node:fs"
import { tmpdir } from "node:os"
import { delimiter, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { test } from "node:test"

const website = fileURLToPath(new URL("../", import.meta.url))
const script = fileURLToPath(new URL("./generate-sitemap.ts", import.meta.url))

function fixture() {
	const root = mkdtempSync(join(tmpdir(), "page-sitemap-"))
	writeFileSync(
		join(root, "package.json"),
		JSON.stringify({ name: "sitemap-fixture", private: true })
	)
	mkdirSync(join(root, "public"))
	mkdirSync(join(root, "public/resources"))
	writeFileSync(
		join(root, "public/resources/image-sitemap.xml"),
		"<urlset></urlset>"
	)
	mkdirSync(join(root, ".next"))
	writeFileSync(
		join(root, "next-sitemap.config.cjs"),
		`module.exports = { ...require(${JSON.stringify(join(website, "next-sitemap.config.cjs"))}), siteUrl: 'https://example.com' }`
	)
	const run = () =>
		spawnSync(
			process.execPath,
			["--import", import.meta.resolve("tsx"), script],
			{
				cwd: root,
				encoding: "utf8",
				env: {
					...process.env,
					PATH: `${resolve(website, "node_modules/.bin")}${delimiter}${process.env.PATH}`,
				},
			}
		)
	return {
		root,
		run,
		cleanup: () => rmSync(root, { recursive: true, force: true }),
	}
}

test("page sitemap discovers built routes and removes stale branch outputs", () => {
	const f = fixture()
	try {
		writeFileSync(
			join(f.root, ".next/build-manifest.json"),
			JSON.stringify({ pages: { "/": [], "/_error": [] } })
		)
		const routes = [
			"/blog/designing-with-ai",
			"/resources/flags/nepal",
			"/api/private",
			"/view/button",
		]
		const manifest = join(f.root, ".next/prerender-manifest.json")
		writeFileSync(
			manifest,
			JSON.stringify({
				routes: Object.fromEntries(routes.map((route) => [route, {}])),
				notFoundRoutes: [],
			})
		)
		writeFileSync(join(f.root, "public/sitemap-99.xml"), "stale dev output")
		let result = f.run()
		assert.equal(result.status, 0, result.stdout + result.stderr)
		let xml = readFileSync(join(f.root, "public/sitemap-0.xml"), "utf8")
		assert.ok(xml.includes("https://example.com/blog/designing-with-ai</loc>"))
		assert.ok(xml.includes("/resources/flags/nepal</loc>"))
		assert.ok(!xml.includes("/api/private"))
		assert.ok(!xml.includes("/view/button"))
		assert.ok(!xml.includes("why-we-migrated-from-eslint-to-oxlint"))
		assert.ok(!xml.includes("brand-logos"))
		assert.ok(!existsSync(join(f.root, "public/sitemap-99.xml")))
		const robots = readFileSync(join(f.root, "public/robots.txt"), "utf8")
		assert.ok(robots.includes("/sitemap.xml"))
		assert.ok(robots.includes("/resources/image-sitemap.xml"))
		// On-demand resource details are not present in Next's prerender manifest.
		writeFileSync(
			join(f.root, "public/resources/image-sitemap.xml"),
			"<urlset><url><loc>https://example.com/resources/brand-logos/react</loc></url><url><loc>https://example.com/resources/flags/nepal</loc></url></urlset>"
		)
		routes.push("/blog/why-we-migrated-from-eslint-to-oxlint")
		writeFileSync(
			manifest,
			JSON.stringify({
				routes: Object.fromEntries(routes.map((route) => [route, {}])),
				notFoundRoutes: [],
			})
		)
		result = f.run()
		assert.equal(result.status, 0, result.stdout + result.stderr)
		xml = readFileSync(join(f.root, "public/sitemap-0.xml"), "utf8")
		assert.ok(xml.includes("/blog/why-we-migrated-from-eslint-to-oxlint</loc>"))
		assert.ok(xml.includes("/resources/brand-logos/react</loc>"))
		assert.equal(xml.split("/resources/flags/nepal</loc>").length - 1, 1)
	} finally {
		f.cleanup()
	}
})

test("missing build manifests fail generation even when stale sitemap files exist", () => {
	const f = fixture()
	try {
		writeFileSync(join(f.root, "public/sitemap.xml"), "stale sitemap")
		writeFileSync(join(f.root, "public/sitemap-0.xml"), "stale pages")
		writeFileSync(join(f.root, "public/robots.txt"), "stale robots")
		assert.notEqual(f.run().status, 0)
		assert.ok(!existsSync(join(f.root, "public/sitemap.xml")))
	} finally {
		f.cleanup()
	}
})
