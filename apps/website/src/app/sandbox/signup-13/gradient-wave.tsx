"use client"

import { useRef } from "react"
import { useAnimationFrame } from "motion/react"

export function GradientWave() {
	const orb1Ref = useRef<HTMLDivElement>(null)

	useAnimationFrame((time) => {
		const t = time / 1000

		if (orb1Ref.current) {
			const x = Math.sin(t * 0.45) * 65 + Math.cos(t * 0.22) * 20
			const y = Math.cos(t * 0.4) * 45 + Math.sin(t * 0.25) * 15
			const scale = 1 + Math.sin(t * 0.35) * 0.06
			orb1Ref.current.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`
		}
	})

	return (
		<div
			aria-hidden="true"
			className="pointer-events-none absolute inset-0 hidden overflow-hidden select-none lg:block">
			{/* Single Primary Color Blob spilling from left */}
			<div
				ref={orb1Ref}
				className="absolute top-1/2 left-0 h-[800px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-[100%] blur-[100px] will-change-transform lg:h-[1400px] lg:w-[500px] lg:blur-[120px]"
				style={{
					background:
						"radial-gradient(ellipse at center, color-mix(in oklab, var(--color-primary) 50%, transparent), color-mix(in oklab, var(--color-primary) 20%, transparent) 50%, transparent 80%)",
				}}
			/>

			{/* Fine subtle texture overlay */}
			<div
				className="absolute inset-0 opacity-[0.04] mix-blend-overlay dark:opacity-[0.03]"
				style={{
					backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`,
				}}
			/>
		</div>
	)
}
