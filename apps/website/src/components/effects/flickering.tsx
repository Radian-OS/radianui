"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { subscribeRAF } from "./raf-scheduler"

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

interface GridState {
	ctx: CanvasRenderingContext2D
	cols: number
	rows: number
	squares: Float32Array
	shapes: Uint8Array
	step: number
}

export const FlickeringGrid: React.FC<FlickeringGridProps> = ({
	squareSize = 4,
	gridGap = 6,
	flickerChance = 0.3,
	color = "rgb(0,0,0)",
	width,
	height,
	className,
	maxOpacity = 0.3,
	shape = "square",
}) => {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const containerRef = useRef<HTMLDivElement>(null)
	const gridRef = useRef<GridState | null>(null)
	const lastTimeRef = useRef(0)

	const [isInView, setIsInView] = useState(false)
	const [rgbaBase, setRgbaBase] = useState("rgba(0,0,0,")

	/* ---------- SSR-safe color parsing ---------- */
	useEffect(() => {
		const canvas = document.createElement("canvas")
		canvas.width = canvas.height = 1
		const ctx = canvas.getContext("2d")
		if (!ctx) return

		ctx.fillStyle = color
		ctx.fillRect(0, 0, 1, 1)
		const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data
		setRgbaBase(`rgba(${r},${g},${b},`)
	}, [color])

	/* ---------- Canvas + grid setup ---------- */
	const setupGrid = useCallback(() => {
		const canvas = canvasRef.current
		const container = containerRef.current
		if (!canvas || !container) return

		const w = width ?? container.clientWidth
		const h = height ?? container.clientHeight
		const dpr = window.devicePixelRatio || 1

		canvas.width = w * dpr
		canvas.height = h * dpr
		canvas.style.width = `${w}px`
		canvas.style.height = `${h}px`

		const ctx = canvas.getContext("2d")
		if (!ctx) return

		ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

		const step = squareSize + gridGap
		const cols = Math.floor(w / step)
		const rows = Math.floor(h / step)

		const squares = new Float32Array(cols * rows)
		const shapes = new Uint8Array(cols * rows)

		for (let i = 0; i < squares.length; i++) {
			squares[i] = Math.random() * maxOpacity
			shapes[i] = shape === "mixed" ? (Math.random() < 0.5 ? 1 : 0) : shape === "circle" ? 1 : 0
		}

		gridRef.current = { ctx, cols, rows, squares, shapes, step }
	}, [squareSize, gridGap, maxOpacity, shape, width, height])

	/* ---------- Animation ---------- */
	const animate = useCallback(
		(time: number) => {
			if (!isInView || !gridRef.current) return

			const delta = (time - lastTimeRef.current) / 1000
			if (delta < 0.05) return
			lastTimeRef.current = time

			const { ctx, cols, rows, squares, shapes, step } = gridRef.current

			const updates = Math.floor(squares.length * flickerChance * delta)
			for (let i = 0; i < updates; i++) {
				const idx = (Math.random() * squares.length) | 0
				squares[idx] = Math.random() * maxOpacity
			}

			ctx.clearRect(0, 0, cols * step, rows * step)

			for (let i = 0; i < cols; i++) {
				for (let j = 0; j < rows; j++) {
					const idx = i * rows + j
					const o = squares[idx]
					if (o < 0.01) continue

					ctx.fillStyle = `${rgbaBase}${o})`
					const x = i * step
					const y = j * step

					if (shapes[idx]) {
						ctx.beginPath()
						ctx.arc(x + squareSize / 2, y + squareSize / 2, squareSize / 2, 0, Math.PI * 2)
						ctx.fill()
					} else {
						ctx.fillRect(x, y, squareSize, squareSize)
					}
				}
			}
		},
		[isInView, flickerChance, maxOpacity, rgbaBase, squareSize]
	)

	/* ---------- Observers ---------- */
	useEffect(() => {
		setupGrid()

		const resizeObserver = new ResizeObserver(() => {
			setupGrid()
		})

		if (containerRef.current) {
			resizeObserver.observe(containerRef.current)
		}

		const intersectionObserver = new IntersectionObserver(([entry]) => {
			setIsInView(entry.isIntersecting)
		})

		if (canvasRef.current) {
			intersectionObserver.observe(canvasRef.current)
		}

		return () => {
			resizeObserver.disconnect()
			intersectionObserver.disconnect()
		}
	}, [setupGrid])

	/* ---------- Shared RAF ---------- */
	useEffect(() => {
		if (!isInView) return
		return subscribeRAF(animate)
	}, [isInView, animate])

	return (
		<div ref={containerRef} className={cn("h-full w-full", className)}>
			<canvas ref={canvasRef} className="pointer-events-none" />
		</div>
	)
}
