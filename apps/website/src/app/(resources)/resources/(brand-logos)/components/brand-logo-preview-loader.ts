type PreviewImage = {
	src: string
	onload: (() => void) | null
	onerror: (() => void) | null
}

// Limit CDN pressure while allowing every logo to load without scrolling.
export function createPreviewLoader({
	concurrency = 6,
	timeoutMs = 20000,
	createImage = () => new Image() as PreviewImage,
} = {}) {
	const loaded = new Set<string>()
	const queue: Array<() => void> = []
	let active = 0
	const drain = () => {
		while (active < concurrency && queue.length) queue.shift()!()
	}

	return {
		has: (url: string) => loaded.has(url),
		forget: (url: string) => loaded.delete(url),
		load(url: string, signal: AbortSignal): Promise<void> {
			if (signal.aborted) return Promise.reject(new Error("Aborted"))
			if (loaded.has(url)) return Promise.resolve()
			return new Promise((resolve, reject) => {
				let image: PreviewImage | undefined
				let timer: ReturnType<typeof setTimeout> | undefined
				let settled = false
				const finish = (error?: Error) => {
					if (settled) return
					settled = true
					signal.removeEventListener("abort", abort)
					clearTimeout(timer)
					if (image) {
						image.onload = image.onerror = null
						if (error) image.src = ""
						active--
					} else {
						const index = queue.indexOf(start)
						if (index !== -1) queue.splice(index, 1)
					}
					if (error) reject(error)
					else {
						loaded.add(url)
						resolve()
					}
					drain()
				}
				const abort = () => finish(new Error("Aborted"))
				const start = () => {
					active++
					image = createImage()
					image.onload = () => finish()
					image.onerror = () => finish(new Error("Could not load logo"))
					timer = setTimeout(
						() => finish(new Error("Logo request timed out")),
						timeoutMs
					)
					image.src = url
				}
				signal.addEventListener("abort", abort, { once: true })
				queue.push(start)
				drain()
			})
		},
	}
}

export const brandLogoPreviewLoader = createPreviewLoader()
