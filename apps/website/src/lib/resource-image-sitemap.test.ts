import assert from "node:assert/strict"
import { test } from "node:test"
import { resources } from "@/config/resource-previews"
import { AVATARS } from "@/constants/avatar-playground-utils"
import { generateResourceImageSitemap } from "./resource-image-sitemap"

test("new resource previews and avatar images are discovered without a sitemap edit", () => {
	const avatarCount = AVATARS.length
	const resourceCount = resources.length
	try {
		AVATARS.push("https://example.com/new-avatar.png")
		resources.push({
			title: "New resource",
			description: "A newly registered resource",
			link: "new-resource",
			lightUrl: "/new-light.svg?one=1&two=2",
			darkUrl: "/new-dark.svg",
		})
		const xml = generateResourceImageSitemap()
		assert.ok(xml.includes("https://example.com/new-avatar.png"))
		assert.ok(xml.includes("/resources/new-resource</loc>"))
		assert.ok(xml.includes("/new-light.svg?one=1&amp;two=2</image:loc>"))
		assert.ok(xml.includes("/new-dark.svg</image:loc>"))
	} finally {
		AVATARS.length = avatarCount
		resources.length = resourceCount
	}
})

test("large collections retain every image without exceeding 1,000 images per URL entry", () => {
	const count = AVATARS.length
	try {
		for (let index = 0; index < 1001; index++)
			AVATARS.push(`https://example.com/avatar-${index}.png`)
		const xml = generateResourceImageSitemap()
		assert.ok(xml.includes("https://example.com/avatar-1000.png"))
		for (const entry of xml.matchAll(/<url>(.*?)<\/url>/g)) {
			assert.ok((entry[1].match(/<image:image>/g) ?? []).length <= 1000)
		}
	} finally {
		AVATARS.length = count
	}
})

test("Radian UI has all eight logo variants on its own sitemap URL", () => {
	const xml = generateResourceImageSitemap()
	const entry = [...xml.matchAll(/<url>(.*?)<\/url>/g)].find(([_, body]) =>
		body.includes("/resources/brand-logos/radianui</loc>")
	)
	assert.ok(entry)
	assert.equal((entry[1].match(/<image:image>/g) ?? []).length, 8)
	assert.ok(entry[1].includes("/dark/neutral/frameworks/wordmark/radianui.svg"))
})
