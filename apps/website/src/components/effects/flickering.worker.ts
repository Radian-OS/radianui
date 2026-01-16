/* eslint-disable no-restricted-globals */

type Shape = "circle" | "square" | "mixed"

type InitMsg = {
	type: "init"
	id: string
	canvas: OffscreenCanvas
	width: number
	height: number
	dpr: number
	squareSize: number
	gridGap: number
	flickerChance: number
	maxOpacity: number
	rgbaPrefix: string // e.g. "rgba(0, 0, 0,"
	shape: Shape
	fps: number
}

type ResizeMsg = {
	type: "resize"
	id: string
	width: number
	height: number
	dpr: number
}

type VisibilityMsg = { type: "visibility"; id: string; inView: boolean }

type UpdateMsg = {
	type: "update"
	id: string
	squareSize?: number
	gridGap?: number
	flickerChance?: number
	maxOpacity?: number
	rgbaPrefix?: string
	shape?: Shape
	fps?: number
}

type DestroyMsg = { type: "destroy"; id: string }

type Msg = InitMsg | ResizeMsg | VisibilityMsg | UpdateMsg | DestroyMsg

type GridState = {
	canvas: OffscreenCanvas
	ctx: OffscreenCanvasRenderingContext2D
	width: number
	height: number
	dpr: number

	squareSize: number
	gridGap: number
	flickerChance: number
	maxOpacity: number
	rgbaPrefix: string
	shape: Shape
	fps: number

	cols: number
	rows: number
	squares: Float32Array
	mixedMask?: Uint8Array // 1 = circle, 0 = square (only for "mixed")

	inView: boolean
	lastTime: number
}

const grids = new Map<string, GridState>()

function computeGridArrays(g: GridState) {
	const step = g.squareSize + g.gridGap
	g.cols = Math.floor(g.width / step)
	g.rows = Math.floor(g.height / step)

	const n = g.cols * g.rows
	g.squares = new Float32Array(n)
	for (let i = 0; i < n; i++) g.squares[i] = Math.random() * g.maxOpacity

	if (g.shape === "mixed") {
		g.mixedMask = new Uint8Array(n)
		for (let i = 0; i < n; i++) g.mixedMask[i] = Math.random() < 0.5 ? 1 : 0
	} else {
		g.mixedMask = undefined
	}
}

function resizeCanvas(g: GridState) {
	const pxW = Math.max(1, Math.floor(g.width * g.dpr))
	const pxH = Math.max(1, Math.floor(g.height * g.dpr))
	g.canvas.width = pxW
	g.canvas.height = pxH
	computeGridArrays(g)
}

function updateSquares(g: GridState, deltaSeconds: number) {
	// same behavior as your original: chance is scaled by delta
	const p = g.flickerChance * deltaSeconds
	const squares = g.squares
	for (let i = 0; i < squares.length; i++) {
		if (Math.random() < p) squares[i] = Math.random() * g.maxOpacity
	}
}

function drawGrid(g: GridState) {
	const ctx = g.ctx
	const dpr = g.dpr
	const size = g.squareSize * dpr
	const step = (g.squareSize + g.gridGap) * dpr

	ctx.clearRect(0, 0, g.canvas.width, g.canvas.height)

	const rows = g.rows
	const cols = g.cols
	const squares = g.squares
	const rgbaPrefix = g.rgbaPrefix

	const isCircleFixed = g.shape === "circle"
	const isSquareFixed = g.shape === "square"
	const mixedMask = g.mixedMask

	for (let i = 0; i < cols; i++) {
		const x = i * step
		for (let j = 0; j < rows; j++) {
			const idx = i * rows + j
			const opacity = squares[idx]
			if (opacity <= 0) continue

			ctx.fillStyle = `${rgbaPrefix}${opacity})`

			const y = j * step

			const isCircle = isCircleFixed ? true : isSquareFixed ? false : mixedMask ? mixedMask[idx] === 1 : false

			if (isCircle) {
				const cx = x + size / 2
				const cy = y + size / 2
				const r = size / 2
				ctx.beginPath()
				ctx.arc(cx, cy, r, 0, Math.PI * 2)
				ctx.fill()
			} else {
				ctx.fillRect(x, y, size, size)
			}
		}
	}
}

let timer: number | null = null

function ensureLoopRunning() {
	if (timer != null) return

	timer = self.setInterval(() => {
		const now = performance.now()

		for (const g of grids.values()) {
			if (!g.inView) continue

			const frameMs = 1000 / g.fps
			if (g.lastTime === 0) g.lastTime = now

			if (now - g.lastTime >= frameMs) {
				const deltaSeconds = (now - g.lastTime) / 1000
				g.lastTime = now
				updateSquares(g, deltaSeconds)
				drawGrid(g)
			}
		}

		// stop loop if nothing is visible
		let anyVisible = false
		for (const g of grids.values()) {
			if (g.inView) {
				anyVisible = true
				break
			}
		}
		if (!anyVisible && timer != null) {
			clearInterval(timer)
			timer = null
		}
	}, 10)
}

self.onmessage = (ev: MessageEvent<Msg>) => {
	const msg = ev.data

	if (msg.type === "init") {
		const ctx = msg.canvas.getContext("2d", { alpha: true })
		if (!ctx) return

		const g: GridState = {
			canvas: msg.canvas,
			ctx,
			width: msg.width,
			height: msg.height,
			dpr: msg.dpr,

			squareSize: msg.squareSize,
			gridGap: msg.gridGap,
			flickerChance: msg.flickerChance,
			maxOpacity: msg.maxOpacity,
			rgbaPrefix: msg.rgbaPrefix,
			shape: msg.shape,
			fps: msg.fps,

			cols: 0,
			rows: 0,
			squares: new Float32Array(0),

			inView: false,
			lastTime: 0,
		}

		grids.set(msg.id, g)
		resizeCanvas(g)
		ensureLoopRunning()
		return
	}

	const g = grids.get(msg.id)
	if (!g) return

	if (msg.type === "resize") {
		g.width = msg.width
		g.height = msg.height
		g.dpr = msg.dpr
		g.lastTime = 0
		resizeCanvas(g)
		return
	}

	if (msg.type === "visibility") {
		g.inView = msg.inView
		if (msg.inView) {
			g.lastTime = 0
			ensureLoopRunning()
		}
		return
	}

	if (msg.type === "update") {
		if (typeof msg.squareSize === "number") g.squareSize = msg.squareSize
		if (typeof msg.gridGap === "number") g.gridGap = msg.gridGap
		if (typeof msg.flickerChance === "number") g.flickerChance = msg.flickerChance
		if (typeof msg.maxOpacity === "number") g.maxOpacity = msg.maxOpacity
		if (typeof msg.rgbaPrefix === "string") g.rgbaPrefix = msg.rgbaPrefix
		if (typeof msg.shape === "string") g.shape = msg.shape
		if (typeof msg.fps === "number") g.fps = msg.fps

		// changes can affect grid layout / arrays
		g.lastTime = 0
		resizeCanvas(g)
		ensureLoopRunning()
		return
	}

	if (msg.type === "destroy") {
		grids.delete(msg.id)
		return
	}
}
