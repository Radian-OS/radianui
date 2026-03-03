let worker: Worker | null = null

export function getFlickeringGridWorker() {
	if (typeof window === "undefined") return null
	if (worker) return worker

	worker = new Worker(new URL("./flickering.worker.ts", import.meta.url), {
		type: "module",
	})

	return worker
}
