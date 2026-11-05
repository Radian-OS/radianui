import assert from "node:assert/strict"
import test from "node:test"
import { createPreviewLoader } from "./brand-logo-preview-loader"

function setup(concurrency = 2, timeoutMs = 1000) {
	const images: Array<{
		src: string
		onload: (() => void) | null
		onerror: (() => void) | null
	}> = []
	const loader = createPreviewLoader({
		concurrency,
		timeoutMs,
		createImage: () => {
			const image = { src: "", onload: null, onerror: null }
			images.push(image)
			return image
		},
	})
	return { images, loader }
}

test("bounds concurrent requests and eventually loads every queued logo", async () => {
	const { images, loader } = setup()
	const promises = Array.from({ length: 30 }, (_, i) =>
		loader.load(`logo-${i}`, new AbortController().signal)
	)
	assert.equal(images.length, 2)
	for (let i = 0; i < 30; i++) {
		assert.equal(images[i].src, `logo-${i}`)
		images[i].onload!()
		assert.equal(images.length, Math.min(i + 3, 30))
	}
	await Promise.all(promises)
	await loader.load("logo-0", new AbortController().signal)
	assert.equal(images.length, 30, "successful URLs are reused")
})

test("filter changes cancel active and queued requests and free the queue", async () => {
	const { images, loader } = setup(1)
	const active = new AbortController()
	const queued = new AbortController()
	const first = loader.load("old-active", active.signal)
	const second = loader.load("old-queued", queued.signal)
	const firstRejected = assert.rejects(first, /Aborted/)
	const secondRejected = assert.rejects(second, /Aborted/)
	queued.abort()
	active.abort()
	await Promise.all([firstRejected, secondRejected])
	assert.equal(images.length, 1)
	assert.equal(images[0].src, "")
	const next = loader.load("new-filter", new AbortController().signal)
	images[1].onload!()
	await next
})

test("failures do not poison the cache or prevent queued logos loading", async () => {
	const { images, loader } = setup(1)
	const first = loader.load("failed", new AbortController().signal)
	const rejected = assert.rejects(first, /Could not load/)
	const second = loader.load("next", new AbortController().signal)
	images[0].onerror!()
	images[1].onload!()
	await Promise.all([rejected, second])
	assert.equal(loader.has("failed"), false)
	const retry = loader.load("failed", new AbortController().signal)
	images[2].onload!()
	await retry
	assert.equal(loader.has("failed"), true)
})

test("stalled requests time out and release their slot", async () => {
	const { images, loader } = setup(1, 5)
	await assert.rejects(
		loader.load("stalled", new AbortController().signal),
		/timed out/
	)
	assert.equal(images[0].src, "")
	const next = loader.load("next", new AbortController().signal)
	images[1].onload!()
	await next
})
