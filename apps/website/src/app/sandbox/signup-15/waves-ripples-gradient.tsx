"use client"

import React, { useRef, useEffect } from "react"
import { useAnimationFrame } from "motion/react"

interface WavesRipplesGradientProps {
	className?: string
}

/**
 * Dark Obsidian Liquid Silver Moving Gradient
 * Deep, moody, ultra-dark metallic canvas with sleek moving chrome reflections,
 * liquid mercury crests, and sharp specular highlights on pitch black.
 */
export function WavesRipplesGradient({
	className = "",
}: WavesRipplesGradientProps) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null)

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

	// 60FPS Dark Liquid Silver Motion Loop
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

		// Pitch dark obsidian base
		ctx.fillStyle = "#020305"
		ctx.fillRect(0, 0, width, height)

		const t = time / 1000 // elapsed seconds

		// 1. Moving Liquid Chrome Specular Pools (Restrained, High-Contrast Glows on Pure Dark)
		const pools = [
			{
				// Upper-right floating silver reflection
				x: width * (0.68 + Math.sin(t * 0.85) * 0.18),
				y: height * (0.26 + Math.cos(t * 1.05) * 0.14),
				radius: Math.min(width, height) * (0.55 + Math.sin(t * 1.2) * 0.06),
				stops: [
					{ pos: 0, color: "rgba(255, 255, 255, 0.28)" },
					{ pos: 0.2, color: "rgba(226, 232, 240, 0.16)" },
					{ pos: 0.45, color: "rgba(100, 116, 139, 0.06)" },
					{ pos: 0.75, color: "rgba(2, 3, 5, 0)" },
				],
			},
			{
				// Center-left sweeping platinum accent
				x: width * (0.32 + Math.cos(t * 0.75) * 0.2),
				y: height * (0.5 + Math.sin(t * 0.95) * 0.15),
				radius: Math.min(width, height) * (0.6 + Math.cos(t * 1.1) * 0.08),
				stops: [
					{ pos: 0, color: "rgba(255, 255, 255, 0.3)" },
					{ pos: 0.22, color: "rgba(203, 213, 225, 0.15)" },
					{ pos: 0.5, color: "rgba(51, 65, 85, 0.05)" },
					{ pos: 0.8, color: "rgba(2, 3, 5, 0)" },
				],
			},
			{
				// Lower-right titanium sheen pool
				x: width * (0.72 + Math.sin(t * 1.1 + 2) * 0.16),
				y: height * (0.8 + Math.cos(t * 0.65 + 1) * 0.12),
				radius: Math.min(width, height) * (0.65 + Math.sin(t * 0.85) * 0.08),
				stops: [
					{ pos: 0, color: "rgba(226, 232, 240, 0.22)" },
					{ pos: 0.25, color: "rgba(148, 163, 184, 0.1)" },
					{ pos: 0.55, color: "rgba(30, 41, 59, 0.04)" },
					{ pos: 0.85, color: "rgba(2, 3, 5, 0)" },
				],
			},
			{
				// Top-left subtle chrome shimmer
				x: width * (0.18 + Math.sin(t * 1.25 + 4) * 0.12),
				y: height * (0.16 + Math.cos(t * 1.35 + 2) * 0.1),
				radius: Math.min(width, height) * 0.45,
				stops: [
					{ pos: 0, color: "rgba(255, 255, 255, 0.25)" },
					{ pos: 0.28, color: "rgba(203, 213, 225, 0.1)" },
					{ pos: 0.6, color: "rgba(2, 3, 5, 0)" },
				],
			},
		]

		pools.forEach((pool) => {
			const grad = ctx.createRadialGradient(
				pool.x,
				pool.y,
				0,
				pool.x,
				pool.y,
				pool.radius
			)
			pool.stops.forEach((s) => grad.addColorStop(s.pos, s.color))
			ctx.fillStyle = grad
			ctx.beginPath()
			ctx.arc(pool.x, pool.y, pool.radius, 0, Math.PI * 2)
			ctx.fill()
		})

		// 2. Moving Dark Liquid Metal Waves & Silver Specular Glints
		const waveCount = 4
		for (let w = 0; w < waveCount; w++) {
			const speed = 0.95 + w * 0.3
			const wavePhase = t * speed + w * 1.8
			const baseY = height * (0.24 + w * 0.22)
			const amplitude = 28 + w * 12

			ctx.beginPath()
			ctx.moveTo(0, height)
			ctx.lineTo(0, baseY)

			const step = 10
			for (let x = 0; x <= width + step; x += step) {
				const wave1 = Math.sin(x * 0.007 + wavePhase) * amplitude
				const wave2 = Math.cos(x * 0.014 - wavePhase * 0.8) * (amplitude * 0.4)
				const wave3 = Math.sin((x + baseY) * 0.003 + wavePhase * 0.5) * 10
				const y = baseY + wave1 + wave2 + wave3
				ctx.lineTo(x, y)
			}

			ctx.lineTo(width, height)
			ctx.closePath()

			// Dark obsidian chrome body gradient
			const waveGrad = ctx.createLinearGradient(
				0,
				baseY - amplitude,
				width,
				baseY + amplitude * 2.5
			)
			waveGrad.addColorStop(0, "rgba(255, 255, 255, 0.07)")
			waveGrad.addColorStop(0.25, "rgba(148, 163, 184, 0.04)")
			waveGrad.addColorStop(0.6, "rgba(15, 23, 42, 0.35)")
			waveGrad.addColorStop(1, "rgba(2, 3, 5, 0.75)")

			ctx.fillStyle = waveGrad
			ctx.fill()

			// Fine Specular Liquid Silver Ridge (Bright gleam cutting through deep dark)
			ctx.beginPath()
			for (let x = 0; x <= width + step; x += step) {
				const wave1 = Math.sin(x * 0.007 + wavePhase) * amplitude
				const wave2 = Math.cos(x * 0.014 - wavePhase * 0.8) * (amplitude * 0.4)
				const wave3 = Math.sin((x + baseY) * 0.003 + wavePhase * 0.5) * 10
				const y = baseY + wave1 + wave2 + wave3

				if (x === 0) ctx.moveTo(x, y)
				else ctx.lineTo(x, y)
			}

			const lineGrad = ctx.createLinearGradient(0, 0, width, 0)
			const lineOffset = (t * 0.4 + w * 0.25) % 1
			lineGrad.addColorStop(0, "rgba(148, 163, 184, 0.04)")
			lineGrad.addColorStop(
				Math.max(0, lineOffset - 0.18),
				"rgba(203, 213, 225, 0.25)"
			)
			lineGrad.addColorStop(lineOffset, "rgba(255, 255, 255, 0.85)")
			lineGrad.addColorStop(
				Math.min(1, lineOffset + 0.18),
				"rgba(203, 213, 225, 0.25)"
			)
			lineGrad.addColorStop(1, "rgba(100, 116, 139, 0.04)")

			ctx.lineWidth = 1.3
			ctx.strokeStyle = lineGrad
			ctx.shadowColor = "rgba(255, 255, 255, 0.5)"
			ctx.shadowBlur = 6
			ctx.stroke()
			ctx.shadowBlur = 0
		}

		// 3. Sweeping Anisotropic Specular Chrome Sheen Beam
		const beamX = (((t * 0.25) % 2) - 0.5) * width * 1.6
		const beamGrad = ctx.createLinearGradient(
			beamX - 100,
			0,
			beamX + 100,
			height
		)
		beamGrad.addColorStop(0, "rgba(255, 255, 255, 0)")
		beamGrad.addColorStop(0.5, "rgba(255, 255, 255, 0.08)")
		beamGrad.addColorStop(1, "rgba(255, 255, 255, 0)")

		ctx.fillStyle = beamGrad
		ctx.fillRect(0, 0, width, height)

		ctx.restore()
	})

	return (
		<div
			className={`pointer-events-none relative h-full w-full overflow-hidden bg-[#020305] ${className}`}
			aria-hidden="true">
			{/* High-Performance 60FPS Moving Dark Silver Metallic Canvas */}
			<canvas ref={canvasRef} className="absolute inset-0 size-full" />

			{/* Deep Obsidian Radial Vignette — Strong shadow perimeter */}
			<div
				className="absolute inset-0"
				style={{
					background:
						"radial-gradient(circle at 65% 45%, transparent 15%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.95) 100%)",
				}}
			/>

			{/* Subtle Brushed Metal Tactile Noise */}
			<div
				className="pointer-events-none absolute inset-0 opacity-[0.025] mix-blend-overlay"
				style={{
					backgroundImage: `radial-gradient(rgba(255,255,255,0.7) 1px, transparent 0)`,
					backgroundSize: "24px 24px",
				}}
			/>
		</div>
	)
}
