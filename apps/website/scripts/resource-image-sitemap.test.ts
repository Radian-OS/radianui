import assert from "node:assert/strict"
import { test } from "node:test"
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { AVATARS } from "@/constants/avatar-playground-utils"
import { generateResourceImageSitemap } from "./resource-image-sitemap"

function fixture() {
	const root = mkdtempSync(join(tmpdir(), "resource-sitemap-"))
	const options = {
		publicDirectory: join(root, "public"),
		appDirectory: join(root, "app"),
	}
	function file(path: string, body = "fixture") {
		mkdirSync(join(root, path, ".."), { recursive: true })
		writeFileSync(join(root, path), body)
	}
	file("app/resources/avatar/page.tsx")
	file("app/resources/flags/page.tsx")
	return {
		options,
		file,
		cleanup: () => rmSync(root, { recursive: true, force: true }),
	}
}

test("production without brand-logo routes or generated assets still produces a sitemap", () => {
	const f = fixture()
	try {
		f.file("public/media/assets-page/avatars-light.png")
		const xml = generateResourceImageSitemap(f.options)
		assert.ok(xml.includes("/resources/avatar</loc>"))
		assert.ok(xml.includes("/resources/flags</loc>"))
		assert.ok(!xml.includes("brand-logos"))
		assert.ok(!xml.includes("avatars-dark.png"))
	} finally {
		f.cleanup()
	}
})

test("only existing public images are included and new images are discovered automatically", () => {
	const f = fixture()
	try {
		f.file("public/flags/cover/light.png")
		let xml = generateResourceImageSitemap(f.options)
		assert.ok(xml.includes("/flags/cover/light.png"))
		assert.ok(!xml.includes("/flags/cover/dark.png"))
		f.file("public/flags/cover/dark.png")
		f.file("public/flags/notes.txt")
		xml = generateResourceImageSitemap(f.options)
		assert.ok(xml.includes("/flags/cover/dark.png"))
		assert.ok(!xml.includes("notes.txt"))
	} finally {
		f.cleanup()
	}
})

test("unused brand-logo public files do not create URLs for undeployed pages", () => {
	const f = fixture()
	try {
		f.file("public/brand-logos/cover/light.png")
		assert.ok(!generateResourceImageSitemap(f.options).includes("brand-logos"))
	} finally {
		f.cleanup()
	}
})

test("brand-logo pages list CDN images without a generated local mirror", () => {
	const f = fixture()
	try {
		f.file("app/(resources)/resources/(brand-logos)/brand-logos/page.tsx")
		f.file(
			"app/(resources)/resources/(brand-logos)/brand-logos/[brand]/page.tsx"
		)
		const xml = generateResourceImageSitemap({
			...f.options,
			brandManifest: {
				categories: [{ slug: "frameworks", brands: ["radianui"] }],
			},
		})
		assert.ok(xml.includes("/resources/brand-logos/radianui</loc>"))
		assert.ok(
			xml.includes(
				"https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/light/colored/frameworks/icon/radianui.svg"
			)
		)
		assert.ok(!xml.includes("_brand-assets"))
	} finally {
		f.cleanup()
	}
})

test("large collections retain every image without exceeding 1,000 images per entry", () => {
	const f = fixture()
	const count = AVATARS.length
	try {
		for (let index = 0; index < 1001; index++)
			AVATARS.push(`https://example.com/avatar-${index}.png`)
		const xml = generateResourceImageSitemap(f.options)
		assert.ok(xml.includes("https://example.com/avatar-1000.png"))
		for (const entry of xml.matchAll(/<url>(.*?)<\/url>/g))
			assert.ok((entry[1].match(/<image:image>/g) ?? []).length <= 1000)
	} finally {
		AVATARS.length = count
		f.cleanup()
	}
})
