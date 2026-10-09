"use client"

import React, { useCallback, useEffect, useId, useRef, useState } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export interface AnimatedGridPatternProps extends React.ComponentPropsWithoutRef<"svg"> {
	width?: number
	height?: number
	x?: number
	y?: number
	strokeDasharray?: number
	numSquares?: number
	maxOpacity?: number
	duration?: number
	repeatDelay?: number
	className?: string
}

function pseudoRandom(seed: number): number {
	const val = 43758.5453 * Math.sin(12.9898 * seed)
	return val - Math.floor(val)
}

interface Bounds {
	colMin: number
	colMax: number
	rowMin: number
	rowMax: number
}

interface Square {
	id: number
	pos: [number, number]
	delay: number
	duration: number
}

function computePerimeterCells(
	cols: number,
	rows: number,
	formBounds: Bounds,
	imageBounds: Bounds,
	maxDistance = 3
): [number, number][] {
	const cells: [number, number][] = []

	for (let c = 0; c < cols; c++) {
		for (let r = 0; r < rows; r++) {
			// ONLY INCLUDE: anything inside the form area
			if (
				c >= formBounds.colMin &&
				c <= formBounds.colMax &&
				r >= formBounds.rowMin &&
				r <= formBounds.rowMax
			) {
				cells.push([c, r])
			}
		}
	}

	return cells
}

function buildInitialSquares(
	count: number,
	w: number,
	h: number,
	width: number,
	height: number,
	duration: number
): Square[] {
	const cols = Math.max(1, Math.floor(w / width))
	const rows = Math.max(1, Math.floor(h / height))

	// Sensible default bounds for centered split layout
	const formBounds: Bounds = {
		colMin: Math.floor(cols * 0.22),
		colMax: Math.floor(cols * 0.46),
		rowMin: Math.floor(rows * 0.2),
		rowMax: Math.floor(rows * 0.8),
	}
	const imageBounds: Bounds = {
		colMin: Math.floor(cols * 0.54),
		colMax: Math.floor(cols * 0.78),
		rowMin: Math.floor(rows * 0.16),
		rowMax: Math.floor(rows * 0.84),
	}

	const perimeterCells = computePerimeterCells(
		cols,
		rows,
		formBounds,
		imageBounds,
		3
	)

	return Array.from({ length: count }, (_, i) => {
		const cellIndex =
			perimeterCells.length > 0
				? Math.floor(pseudoRandom(i * 19 + 7) * perimeterCells.length)
				: 0
		const pos =
			perimeterCells.length > 0
				? perimeterCells[cellIndex]
				: ([0, 0] as [number, number])

		return {
			id: i,
			pos,
			delay: (i % 8) * 0.4,
			duration: duration + ((i % 5) - 2) * 0.35,
		}
	})
}

export function AnimatedGridPattern({
	width = 40,
	height = 40,
	x = -1,
	y = -1,
	strokeDasharray = 0,
	numSquares = 28,
	className,
	maxOpacity = 0.05,
	duration = 4.5,
	repeatDelay = 0.6,
	...props
}: AnimatedGridPatternProps) {
	const id = useId()
	const containerRef = useRef<HTMLDivElement | null>(null)
	const [dimensions, setDimensions] = useState({ width: 1440, height: 900 })
	const perimeterCellsRef = useRef<[number, number][]>([])
	const [squares, setSquares] = useState<Square[]>(() =>
		buildInitialSquares(numSquares, 1440, 900, width, height, duration)
	)

	const measureAndGenerate = useCallback(
		(w: number, h: number) => {
			const cols = Math.max(1, Math.floor(w / width))
			const rows = Math.max(1, Math.floor(h / height))

			const formEl = document.querySelector("[data-auth-form]")
			const imageEl = document.querySelector("[data-auth-image]")
			const containerEl = containerRef.current

			let formBounds: Bounds = {
				colMin: Math.floor(cols * 0.22),
				colMax: Math.floor(cols * 0.46),
				rowMin: Math.floor(rows * 0.2),
				rowMax: Math.floor(rows * 0.8),
			}
			let imageBounds: Bounds = {
				colMin: Math.floor(cols * 0.54),
				colMax: Math.floor(cols * 0.78),
				rowMin: Math.floor(rows * 0.16),
				rowMax: Math.floor(rows * 0.84),
			}

			if (formEl && imageEl && containerEl) {
				const cRect = containerEl.getBoundingClientRect()
				const fRect = formEl.getBoundingClientRect()
				const iRect = imageEl.getBoundingClientRect()

				formBounds = {
					colMin: Math.floor((fRect.left - cRect.left) / width),
					colMax: Math.ceil((fRect.right - cRect.left) / width),
					rowMin: Math.floor((fRect.top - cRect.top) / height),
					rowMax: Math.ceil((fRect.bottom - cRect.top) / height),
				}

				imageBounds = {
					colMin: Math.floor((iRect.left - cRect.left) / width),
					colMax: Math.ceil((iRect.right - cRect.left) / width),
					rowMin: Math.floor((iRect.top - cRect.top) / height),
					rowMax: Math.ceil((iRect.bottom - cRect.top) / height),
				}
			}

			const perimeterCells = computePerimeterCells(
				cols,
				rows,
				formBounds,
				imageBounds,
				3
			)

			perimeterCellsRef.current = perimeterCells
			if (perimeterCells.length === 0) return

			const newSquares: Square[] = []
			for (let i = 0; i < numSquares; i++) {
				const pickIndex = Math.floor(Math.random() * perimeterCells.length)
				newSquares.push({
					id: Math.random(),
					pos: perimeterCells[pickIndex],
					delay: (i % 8) * 0.4,
					duration: duration + ((i % 5) - 2) * 0.35,
				})
			}

			setSquares(newSquares)
		},
		[duration, height, numSquares, width]
	)

	// Measure and position immediately on mount
	useEffect(() => {
		const w = typeof window !== "undefined" ? window.innerWidth : 1440
		const h = typeof window !== "undefined" ? window.innerHeight : 900
		setDimensions({ width: w, height: h })
		measureAndGenerate(w, h)
	}, [measureAndGenerate])

	// Observe window resizing
	useEffect(() => {
		const element = containerRef.current
		if (!element) return

		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const nextWidth = entry.contentRect.width
				const nextHeight = entry.contentRect.height
				if (nextWidth > 0 && nextHeight > 0) {
					setDimensions((prev) => {
						if (prev.width === nextWidth && prev.height === nextHeight)
							return prev
						return { width: nextWidth, height: nextHeight }
					})
					measureAndGenerate(nextWidth, nextHeight)
				}
			}
		})

		resizeObserver.observe(element)
		return () => resizeObserver.disconnect()
	}, [measureAndGenerate])

	return (
		<div ref={containerRef} className="absolute inset-0 h-full w-full">
			<svg
				aria-hidden="true"
				className={cn(
					"stroke-fg/5 text-fg pointer-events-none absolute inset-0 h-full w-full fill-none",
					className
				)}
				{...props}>
				<defs>
					<pattern
						id={id}
						width={width}
						height={height}
						patternUnits="userSpaceOnUse"
						x={x}
						y={y}>
						<path
							d={`M.5 ${height}V.5H${width}`}
							fill="none"
							strokeDasharray={strokeDasharray}
						/>
					</pattern>
				</defs>
				<rect width="100%" height="100%" fill={`url(#${id})`} />
				<svg x={x} y={y} className="overflow-visible">
					{squares.map(
						({
							pos: [squareX, squareY],
							id: squareId,
							delay,
							duration: sqDuration,
						}) => (
							<motion.rect
								key={squareId}
								initial={{ opacity: 0 }}
								animate={{
									opacity: [0, maxOpacity, 0],
								}}
								transition={{
									duration: sqDuration,
									delay,
									ease: "easeInOut",
								}}
								onAnimationComplete={() => {
									setSquares((prev) =>
										prev.map((sq) => {
											if (sq.id === squareId) {
												const cells = perimeterCellsRef.current
												const newPos =
													cells.length > 0
														? cells[Math.floor(Math.random() * cells.length)]
														: sq.pos
												return {
													...sq,
													id: Math.random(),
													pos: newPos,
													delay: repeatDelay,
												}
											}
											return sq
										})
									)
								}}
								width={width - 1}
								height={height - 1}
								x={squareX * width + 1}
								y={squareY * height + 1}
								fill="currentColor"
								strokeWidth="0"
							/>
						)
					)}
				</svg>
			</svg>
		</div>
	)
}

export function AnimatedGridBackground({
	cellSize = 40,
}: {
	cellSize?: number
}) {
	return (
		<div
			aria-hidden="true"
			className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none">
			<AnimatedGridPattern
				width={cellSize}
				height={cellSize}
				numSquares={1}
				maxOpacity={0.05}
				duration={4.5}
				repeatDelay={0.6}
				className="inset-x-[-10%] inset-y-[-8%] h-[116%] w-[120%] [mask-image:radial-gradient(72%_64%_at_50%_48%,black,rgba(0,0,0,0.72),transparent)]"
			/>
		</div>
	)
}
