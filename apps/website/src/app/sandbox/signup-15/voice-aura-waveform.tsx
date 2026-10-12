"use client"

import React, { useRef, useEffect } from "react"
import { useAnimationFrame } from "motion/react"

interface VoiceAuraWaveformProps {
	className?: string
}

export function VoiceAuraWaveform({ className = "" }: VoiceAuraWaveformProps) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null)
	const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
		x: 0,
		y: 0,
		active: false,
	})

	// Setup responsive canvas resolution with devicePixelRatio
	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return

		const updateSize = () => {
			const rect = canvas.getBoundingClientRect()
			const dpr = Math.min(window.devicePixelRatio || 1, 2)
			canvas.width = rect.width * dpr
			canvas.height = rect.height * dpr
		}

		updateSize()
		window.addEventListener("resize", updateSize)
		return () => window.removeEventListener("resize", updateSize)
	}, [])

	// 60FPS motion/react driven animation loop
	useAnimationFrame((time) => {
		const canvas = canvasRef.current
		if (!canvas) return
		const ctx = canvas.getContext("2d")
		if (!ctx) return

		const dpr = Math.min(window.devicePixelRatio || 1, 2)
		const width = canvas.width / dpr
		const height = canvas.height / dpr

		ctx.save()
		ctx.scale(dpr, dpr)
		ctx.clearRect(0, 0, width, height)

		const t = time / 1000 // seconds

		// Center of the acoustic halftone aura (matches card position)
		const auraCenterX = width * 0.6
		const auraCenterY = height * 0.5
		const maxAuraRadius = Math.min(width, height) * 0.65

		// 1. Render Left Audio Equalizer Waveform Bars (Halftone Grid)
		const barSpacing = 7.5
		const leftWaveEndX = width * 0.42
		const waveCenterY = height * 0.5

		// Multi-frequency harmonic synthesizer for live equalizer wave height
		for (let x = 0; x < leftWaveEndX; x += barSpacing) {
			const normX = x / leftWaveEndX

			// Multi-octave wave equation
			const w1 = Math.sin(normX * Math.PI * 3.5 - t * 3.2) * 28
			const w2 = Math.sin(normX * Math.PI * 7.0 + t * 4.5) * 14
			const w3 = Math.cos(normX * Math.PI * 2.0 - t * 1.8) * 18
			const baseHeight = 22 + (1 - normX * 0.4) * 35

			// Wave envelope amplitude
			const envelope = Math.sin(normX * Math.PI) * 1.2 + 0.4
			const barHalfHeight = Math.max(8, (baseHeight + w1 + w2 + w3) * envelope)

			// Draw column of halftone dots for this audio frequency bar
			for (
				let y = waveCenterY - barHalfHeight;
				y <= waveCenterY + barHalfHeight;
				y += barSpacing
			) {
				const distFromCenter = Math.abs(y - waveCenterY)
				const relY = distFromCenter / barHalfHeight

				// Dots are largest in core of waveform, tapering smoothly at edges
				const dotRadius = Math.max(0.6, (1 - relY * 0.75) * 3.2)

				// Proximity to mouse interaction
				let mouseBoost = 0
				if (mouseRef.current.active) {
					const dx = x - mouseRef.current.x
					const dy = y - mouseRef.current.y
					const mDist = Math.hypot(dx, dy)
					if (mDist < 120) {
						mouseBoost = (1 - mDist / 120) * 1.5
					}
				}

				const finalR = dotRadius + mouseBoost

				ctx.beginPath()
				ctx.arc(x, y, finalR, 0, Math.PI * 2)
				ctx.fillStyle = `rgba(18, 20, 26, ${Math.min(1, 0.92 - relY * 0.25)})`
				ctx.fill()
			}
		}

		// 2. Render Radiating Concentric Halftone Acoustic Aura
		const gridStep = 8.5
		const startX = Math.max(0, auraCenterX - maxAuraRadius)
		const endX = Math.min(width, auraCenterX + maxAuraRadius)
		const startY = Math.max(0, auraCenterY - maxAuraRadius)
		const endY = Math.min(height, auraCenterY + maxAuraRadius)

		for (let x = startX; x <= endX; x += gridStep) {
			for (let y = startY; y <= endY; y += gridStep) {
				const dx = x - auraCenterX
				const dy = y - auraCenterY
				const dist = Math.hypot(dx, dy)

				if (dist > maxAuraRadius) continue

				// Normalized distance
				const normDist = dist / maxAuraRadius

				// Radial wave propagation equation (waves ripple outwards from center)
				const ripple = Math.sin(dist * 0.045 - t * 3.0) * 0.5 + 0.5
				const ripple2 = Math.cos(dist * 0.08 + t * 2.2) * 0.25

				// Density falloff from center (concentrated near core, fading outwards)
				const coreFalloff = Math.pow(Math.max(0, 1 - normDist), 1.6)

				// Combined dot radius
				let dotR = coreFalloff * 4.4 * (0.65 + 0.35 * ripple + ripple2)

				// Subtle mouse ripple warping
				if (mouseRef.current.active) {
					const mdx = x - mouseRef.current.x
					const mdy = y - mouseRef.current.y
					const mDist = Math.hypot(mdx, mdy)
					if (mDist < 140) {
						dotR += (1 - mDist / 140) * 1.8
					}
				}

				// Only draw visible dots
				if (dotR > 0.45) {
					ctx.beginPath()
					ctx.arc(x, y, dotR, 0, Math.PI * 2)
					ctx.fillStyle = `rgba(18, 20, 26, ${Math.min(0.95, coreFalloff * 1.2 + 0.15)})`
					ctx.fill()
				}
			}
		}

		// 3. Subtle Acoustic Energy Glow at the center core
		const coreGlow = ctx.createRadialGradient(
			auraCenterX * 0.9,
			auraCenterY,
			0,
			auraCenterX * 0.9,
			auraCenterY,
			maxAuraRadius * 0.4
		)
		const pulseAlpha = 0.04 + Math.sin(t * 3.0) * 0.02
		coreGlow.addColorStop(0, `rgba(59, 130, 246, ${pulseAlpha})`)
		coreGlow.addColorStop(1, "rgba(59, 130, 246, 0)")
		ctx.fillStyle = coreGlow
		ctx.beginPath()
		ctx.arc(auraCenterX * 0.9, auraCenterY, maxAuraRadius * 0.4, 0, Math.PI * 2)
		ctx.fill()

		ctx.restore()
	})

	return (
		<canvas
			ref={canvasRef}
			onMouseMove={(e) => {
				const rect = e.currentTarget.getBoundingClientRect()
				mouseRef.current = {
					x: e.clientX - rect.left,
					y: e.clientY - rect.top,
					active: true,
				}
			}}
			onMouseLeave={() => {
				mouseRef.current.active = false
			}}
			className={`h-full w-full select-none ${className}`}
		/>
	)
}
