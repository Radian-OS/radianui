"use client"

import React, { useEffect, useMemo, useRef } from "react"
import { cn } from "@/lib/utils"
import { getFlickeringGridWorker } from "./flickering-singleton"

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
	fps?: number
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
	fps = 20,
}) => {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const containerRef = useRef<HTMLDivElement>(null)
	const idRef = useRef<string>(typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : Math.random().toString(36).slice(2))

	const rgbaPrefix = useMemo(() => {
		const toRGBA = (c: string) => {
			if (typeof window === "undefined") return `rgba(0, 0, 0,`
			const canvas = document.createElement("canvas")
			canvas.width = canvas.height = 1
			const ctx = canvas.getContext("2d", { alpha: true })
			if (!ctx) return "rgba(255, 0, 0,"
			ctx.fillStyle = c
			ctx.fillRect(0, 0, 1, 1)
			const [r, g, b] = Array.from(ctx.getImageData(0, 0, 1, 1).data)
			return `rgba(${r}, ${g}, ${b},`
		}
		return toRGBA(color)
	}, [color])

	useEffect(() => {
		const canvas = canvasRef.current
		const container = containerRef.current
		if (!canvas || !container) return

		const worker = getFlickeringGridWorker()

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const canOffscreen = typeof (canvas as any).transferControlToOffscreen === "function"

		// Fallback: if OffscreenCanvas isn't available, do nothing here.
		// (You can keep your original main-thread implementation as fallback if needed.)
		if (!worker || !canOffscreen) {
			// Optional: you can paste your original implementation as a fallback.
			return
		}

		const id = idRef.current
		const dpr = window.devicePixelRatio || 1

		const getSize = () => ({
			w: width ?? container.clientWidth,
			h: height ?? container.clientHeight,
		})

		const { w, h } = getSize()

		// Style size (CSS pixels)
		canvas.style.width = `${w}px`
		canvas.style.height = `${h}px`

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const offscreen = (canvas as any).transferControlToOffscreen() as OffscreenCanvas

		worker.postMessage(
			{
				type: "init",
				id,
				canvas: offscreen,
				width: w,
				height: h,
				dpr,
				squareSize,
				gridGap,
				flickerChance,
				maxOpacity,
				rgbaPrefix,
				shape,
				fps,
			},
			[offscreen]
		)

		const resizeObserver = new ResizeObserver(() => {
			const { w: newW, h: newH } = getSize()
			canvas.style.width = `${newW}px`
			canvas.style.height = `${newH}px`

			worker.postMessage({
				type: "resize",
				id,
				width: newW,
				height: newH,
				dpr: window.devicePixelRatio || 1,
			})
		})
		resizeObserver.observe(container)

		const intersectionObserver = new IntersectionObserver(
			([entry]) => {
				worker.postMessage({
					type: "visibility",
					id,
					inView: entry.isIntersecting,
				})
			},
			{ threshold: 0 }
		)
		intersectionObserver.observe(canvas)

		return () => {
			resizeObserver.disconnect()
			intersectionObserver.disconnect()
			worker.postMessage({ type: "destroy", id })
		}
	}, [width, height]) // size is handled by observer; this just re-inits if fixed props change

	// Prop updates (color, flicker settings, etc.)
	useEffect(() => {
		const worker = getFlickeringGridWorker()
		if (!worker) return
		worker.postMessage({
			type: "update",
			id: idRef.current,
			squareSize,
			gridGap,
			flickerChance,
			maxOpacity,
			rgbaPrefix,
			shape,
			fps,
		})
	}, [squareSize, gridGap, flickerChance, maxOpacity, rgbaPrefix, shape, fps])

	return (
		<div ref={containerRef} className={cn("h-full w-full bg-transparent", className)}>
			<canvas ref={canvasRef} className="pointer-events-none" style={{ backgroundColor: "transparent" }} />
		</div>
	)
}
