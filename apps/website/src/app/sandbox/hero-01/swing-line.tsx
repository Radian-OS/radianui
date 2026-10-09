"use client"

import React, { useCallback, useEffect, useMemo, useRef } from "react"
import { motion, useAnimationFrame } from "motion/react"
import { cn } from "@/lib/utils"
import { DEFAULT_MODELS } from "./data"
import type { ModelItem } from "./types"

interface SwingLineProps {
	items?: ModelItem[]
}

function ClipPeg() {
	return (
		<span className="bg-fg absolute top-0 left-1/2 z-10 flex size-5 -translate-x-1/2 items-center justify-center rounded-md">
			<span className="bg-bg absolute top-1 size-1.5 rounded-full" />
		</span>
	)
}

function ModelCard({ item }: { item: ModelItem }) {
	const Icon = item.icon
	return (
		<div className="relative flex flex-col items-center pt-2.5">
			<ClipPeg />
			<div
				className={cn(
					"hover:border-soft flex w-full flex-col items-center gap-4 rounded-2xl p-4 py-8 transition-shadow hover:shadow-md"
				)}>
				{/* Circular Brand Icon */}
				<span className="bg-fill2 flex size-16 items-center justify-center overflow-hidden rounded-full">
					{item.image ? (
						<img
							src={item.image}
							alt={item.label}
							className="size-8 object-contain"
						/>
					) : (
						<Icon className="size-7" />
					)}
				</span>

				{/* Label & Tag */}
				<div className="w-full text-center">
					<p className="text-fg text-base font-semibold tracking-tight">
						{item.label}
					</p>
					<p className="text-fg-secondary mt-0.5 text-xs">{item.tag}</p>
				</div>
			</div>
		</div>
	)
}

export function SwingLine({ items = DEFAULT_MODELS }: SwingLineProps) {
	const r = items.length
	const i = 4 * r
	const CARD_WIDTH = 188
	const CARD_SPACING = 220
	const l = CARD_SPACING * r

	const containerRef = useRef<HTMLDivElement>(null)
	const trackRef = useRef<HTMLDivElement>(null)
	const pathRef = useRef<SVGPathElement>(null)
	const cardRefs = useRef<(HTMLDivElement | null)[]>([])

	const scrollX = useRef(0)
	const displacements = useRef(new Float32Array(i))
	const velocities = useRef(new Float32Array(i))
	const targetForces = useRef(new Float32Array(i))
	const containerWidth = useRef(1200)

	const mouseX = useRef<number | null>(null)
	const prevMouse = useRef<{ x: number; t: number } | null>(null)
	const mouseSpeed = useRef(0)
	const isReducedMotion = useRef(false)
	const isPanning = useRef(false)
	const panStartX = useRef(0)
	const autoSpeed = useRef(-30)

	useEffect(() => {
		isReducedMotion.current = window.matchMedia(
			"(prefers-reduced-motion: reduce)"
		).matches
		const el = containerRef.current
		if (!el) return
		containerWidth.current = el.getBoundingClientRect().width || 1200

		const observer = new ResizeObserver((entries) => {
			const w = entries[0]?.contentRect.width
			if (w) containerWidth.current = w
		})
		observer.observe(el)
		return () => observer.disconnect()
	}, [])

	const handlePointerMove = useCallback((e: React.PointerEvent) => {
		const rect = containerRef.current?.getBoundingClientRect()
		if (!rect) return
		const x = e.clientX - rect.left
		const now = performance.now()
		if (prevMouse.current) {
			const dt = now - prevMouse.current.t
			if (dt > 0) {
				mouseSpeed.current = Math.min(
					1.8 * (Math.abs(x - prevMouse.current.x) / dt),
					1.4
				)
			}
		}
		prevMouse.current = { x, t: now }
		mouseX.current = x
	}, [])

	const handlePointerLeave = useCallback(() => {
		mouseX.current = null
		prevMouse.current = null
		mouseSpeed.current = 0
	}, [])

	const handlePanStart = useCallback(() => {
		isPanning.current = true
		panStartX.current = scrollX.current
	}, [])

	const handlePan = useCallback(
		(_: unknown, info: { offset: { x: number } }) => {
			scrollX.current = panStartX.current + info.offset.x
		},
		[]
	)

	const handlePanEnd = useCallback(
		(_: unknown, info: { velocity: { x: number } }) => {
			isPanning.current = false
			autoSpeed.current = Math.max(Math.min(info.velocity.x, 2600), -2600)
		},
		[]
	)

	useAnimationFrame((time, delta) => {
		const dt = Math.min(delta, 32) / 1000
		const t = time / 1000
		const width = containerWidth.current
		const disp = displacements.current
		const vel = velocities.current
		const forces = targetForces.current

		if (!isReducedMotion.current) {
			if (!isPanning.current) {
				const target = mouseX.current === null ? -30 : -10.5
				autoSpeed.current += (target - autoSpeed.current) * Math.min(4 * dt, 1)
				scrollX.current += autoSpeed.current * dt
			}

			while (scrollX.current <= -l) scrollX.current += l
			while (scrollX.current > 0) scrollX.current -= l

			if (trackRef.current) {
				trackRef.current.style.transform = `translate3d(${scrollX.current}px, 0, 0)`
			}
		}

		const curMouseX = mouseX.current
		const speedMultiplier = 1 + mouseSpeed.current

		for (let idx = 0; idx < i; idx++) {
			if (curMouseX === null) {
				forces[idx] = 0
				continue
			}
			const dist = CARD_SPACING * idx + scrollX.current + 94 - curMouseX
			const gauss = Math.exp(-(dist * dist) / 61250)
			forces[idx] = 34 * gauss * speedMultiplier
		}

		for (let idx = 0; idx < i; idx++) {
			const prev = idx > 0 ? disp[idx - 1] : disp[idx]
			const next = idx < i - 1 ? disp[idx + 1] : disp[idx]
			const force =
				70 * (forces[idx] - disp[idx]) -
				9 * vel[idx] +
				42 * (prev + next - 2 * disp[idx])
			vel[idx] += force * dt
		}

		for (let idx = 0; idx < i; idx++) {
			disp[idx] += vel[idx] * dt
		}

		// Update card transforms
		for (let idx = 0; idx < i; idx++) {
			const cardEl = cardRefs.current[idx]
			if (!cardEl) continue

			const sagY =
				26 *
				Math.sin(
					Math.PI *
						Math.min(
							Math.max((CARD_SPACING * idx + scrollX.current + 94) / width, 0),
							1
						)
				)
			const cardDisp = disp[idx]
			let sway = 0
			if (!isReducedMotion.current) {
				sway = Math.sin(t * (0.5 + ((37 * idx) % 11) * (0.18 / 11)) + 0.8 * idx)
			}
			const transX = 14 * sway + 0.3 * cardDisp
			const rot =
				3.5 * Math.sin((idx % r) * 12.9898) + 5 * sway + 0.14 * cardDisp
			cardEl.style.transform = `translate(${transX.toFixed(2)}px, ${(sagY + cardDisp).toFixed(2)}px) rotate(${rot.toFixed(2)}deg)`
		}

		// Update SVG wire curve
		if (pathRef.current) {
			let pathD = ""
			for (let step = 0; step <= 56; step++) {
				const xPos = (step / 56) * width
				const sagY = 26 * Math.sin((xPos / width) * Math.PI)
				const relIdx = (xPos - scrollX.current) / CARD_SPACING - 0.5
				const floorIdx = Math.floor(relIdx)
				const frac = relIdx - floorIdx
				const c1 = ((floorIdx % i) + i) % i
				const c2 = (((floorIdx + 1) % i) + i) % i
				const yPos = 30 + sagY + (disp[c1] + (disp[c2] - disp[c1]) * frac)
				pathD += `${step === 0 ? "M" : "L"}${xPos.toFixed(1)},${yPos.toFixed(1)} `
			}
			pathRef.current.setAttribute("d", pathD.trim())
		}
	})

	const repeatedItems = useMemo(() => {
		const list: { item: ModelItem; slot: number; key: string }[] = []
		for (let cycle = 0; cycle < 4; cycle++) {
			for (let idx = 0; idx < r; idx++) {
				list.push({
					item: items[idx],
					slot: cycle * r + idx,
					key: `${cycle}-${items[idx].id}`,
				})
			}
		}
		return list
	}, [items, r])

	return (
		<motion.div
			ref={containerRef}
			onPointerMove={handlePointerMove}
			onPointerLeave={handlePointerLeave}
			onPanStart={handlePanStart}
			onPan={handlePan}
			onPanEnd={handlePanEnd}
			className="relative h-[460px] w-full cursor-grab touch-none overflow-x-hidden overflow-y-visible select-none active:cursor-grabbing sm:h-[480px]"
			aria-hidden="true">
			{/* Edge Fades */}
			<div className="from-bg pointer-events-none absolute inset-y-0 left-0 z-20 w-12 bg-gradient-to-r to-transparent sm:w-28" />
			<div className="from-bg pointer-events-none absolute inset-y-0 right-0 z-20 w-12 bg-gradient-to-l to-transparent sm:w-28" />

			{/* Dynamic Wire / Thread SVG (Behind black clips) */}
			<svg className="pointer-events-none absolute inset-x-0 top-0 z-0 h-24 w-full overflow-visible">
				<path
					ref={pathRef}
					fill="none"
					stroke="currentColor"
					strokeWidth="1.5"
					className="text-border transition-colors"
				/>
			</svg>

			{/* Sliding Items Container (In front of thread) */}
			<div
				ref={trackRef}
				className="absolute top-6 left-0 z-10 flex items-start will-change-transform"
				style={{ gap: 32 }}>
				{repeatedItems.map(({ item, slot, key }) => (
					<div
						key={key}
						ref={(el) => {
							cardRefs.current[slot] = el
						}}
						className="shrink-0"
						style={{ width: CARD_WIDTH, transformOrigin: "top center" }}>
						<ModelCard item={item} />
					</div>
				))}
			</div>
		</motion.div>
	)
}
