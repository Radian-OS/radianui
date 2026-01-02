type RAFCallback = (time: number) => void

const subscribers = new Set<RAFCallback>()
let rafId: number | null = null

function tick(time: number) {
	subscribers.forEach((cb) => cb(time))
	rafId = requestAnimationFrame(tick)
}

export function subscribeRAF(cb: RAFCallback) {
	subscribers.add(cb)
	if (!rafId) rafId = requestAnimationFrame(tick)

	return () => {
		subscribers.delete(cb)
		if (subscribers.size === 0 && rafId) {
			cancelAnimationFrame(rafId)
			rafId = null
		}
	}
}
