"use client"

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export interface FlickeringGridProps {
	squareSize?: number
	gridGap?: number
	flickerChance?: number
	color?: string
	width?: number
	height?: number
	className?: string
	maxOpacity?: number
	shape?: "circle" | "square" | "mixed"
}

export const FlickeringGrid: React.FC<FlickeringGridProps> = ({
	squareSize = 4,
	gridGap = 6,
	flickerChance = 0.3,
	color = "rgb(0, 0, 0)",
	width,
	height,
	className,
	maxOpacity = 0.3,
	shape = "square",
}) => {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const containerRef = useRef<HTMLDivElement>(null)
	const [isInView, setIsInView] = useState(false)
	const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 })

	// Convert user color → rgba(r,g,b,
	const memoizedColor = useMemo(() => {
		const toRGBA = (colorString: string) => {
			if (typeof window === "undefined") return "rgba(0, 0, 0,"
			const canvas = document.createElement("canvas")
			canvas.width = canvas.height = 1
			const ctx = canvas.getContext("2d", { alpha: true })
			if (!ctx) return "rgba(0, 0, 0,"
			ctx.fillStyle = colorString
			ctx.fillRect(0, 0, 1, 1)
			const [r, g, b] = Array.from(ctx.getImageData(0, 0, 1, 1).data)
			return `rgba(${r}, ${g}, ${b},`
		}
		return toRGBA(color)
	}, [color])

	const setupCanvas = useCallback(
		(canvas: HTMLCanvasElement, w: number, h: number) => {
			const dpr = window.devicePixelRatio || 1
			canvas.width = w * dpr
			canvas.height = h * dpr
			canvas.style.width = `${w}px`
			canvas.style.height = `${h}px`

			const cols = Math.floor(w / (squareSize + gridGap))
			const rows = Math.floor(h / (squareSize + gridGap))
			const total = cols * rows

			const squares = new Float32Array(total)
			// Pre-calculate shapes once for mixed mode
			const shapes = new Uint8Array(total)

			for (let i = 0; i < total; i++) {
				squares[i] = Math.random() * maxOpacity
				shapes[i] = shape === "mixed" ? (Math.random() < 0.5 ? 1 : 0) : shape === "circle" ? 1 : 0
			}

			return { cols, rows, squares, shapes, dpr }
		},
		[squareSize, gridGap, maxOpacity, shape]
	)

	const updateSquares = useCallback(
		(squares: Float32Array, deltaTime: number) => {
			const updateProbability = flickerChance * deltaTime

			for (let i = 0; i < squares.length; i++) {
				if (Math.random() < updateProbability) {
					squares[i] = Math.random() * maxOpacity
				}
			}
		},
		[flickerChance, maxOpacity]
	)

	const drawGrid = useCallback(
		(ctx: CanvasRenderingContext2D, w: number, h: number, cols: number, rows: number, squares: Float32Array, shapes: Uint8Array, dpr: number) => {
			ctx.clearRect(0, 0, w, h)

			const size = squareSize * dpr
			const gap = (squareSize + gridGap) * dpr
			const radius = size / 2

			// Minimize context state changes by batching by opacity
			let i = 0
			for (let col = 0; col < cols; col++) {
				const x = col * gap
				for (let row = 0; row < rows; row++) {
					const opacity = squares[i]
					const isCircle = shapes[i]
					i++

					if (opacity < 0.01) continue

					ctx.fillStyle = `${memoizedColor}${opacity})`

					const y = row * gap

					if (isCircle) {
						ctx.beginPath()
						ctx.arc(x + radius, y + radius, radius, 0, 6.283185307179586) // 2*PI as constant
						ctx.fill()
					} else {
						ctx.fillRect(x, y, size, size)
					}
				}
			}
		},
		[memoizedColor, squareSize, gridGap]
	)

	useEffect(() => {
		const canvas = canvasRef.current
		const container = containerRef.current
		if (!canvas || !container) return

		const ctx = canvas.getContext("2d", {
			alpha: false,
			desynchronized: true, // Allow GPU acceleration
		})
		if (!ctx) return

		let grid: ReturnType<typeof setupCanvas>
		let animationFrameId: number

		const updateCanvasSize = () => {
			const newW = width || container.clientWidth
			const newH = height || container.clientHeight
			setCanvasSize({ width: newW, height: newH })
			grid = setupCanvas(canvas, newW, newH)
		}

		updateCanvasSize()

		const fps = 20
		const interval = 1000 / fps
		let then = performance.now()

		const animate = (time: number) => {
			if (!isInView) {
				animationFrameId = requestAnimationFrame(animate)
				return
			}

			const delta = time - then
			if (delta >= interval) {
				then = time - (delta % interval)

				const deltaTime = delta / 1000
				updateSquares(grid.squares, deltaTime)
				drawGrid(ctx, canvas.width, canvas.height, grid.cols, grid.rows, grid.squares, grid.shapes, grid.dpr)
			}

			animationFrameId = requestAnimationFrame(animate)
		}

		const resizeObserver = new ResizeObserver(updateCanvasSize)
		resizeObserver.observe(container)

		const intersectionObserver = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), { threshold: 0 })
		intersectionObserver.observe(canvas)

		animationFrameId = requestAnimationFrame(animate)

		return () => {
			cancelAnimationFrame(animationFrameId)
			resizeObserver.disconnect()
			intersectionObserver.disconnect()
		}
	}, [setupCanvas, updateSquares, drawGrid, width, height, isInView])

	return (
		<div ref={containerRef} className={cn("h-full w-full bg-transparent", className)}>
			<canvas
				ref={canvasRef}
				className="pointer-events-none"
				style={{
					width: canvasSize.width,
					height: canvasSize.height,
					backgroundColor: "transparent",
				}}
			/>
		</div>
	)
}
