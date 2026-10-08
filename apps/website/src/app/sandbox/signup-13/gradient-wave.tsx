"use client"

import { useRef } from "react"
import { useAnimationFrame } from "motion/react"

export function GradientWave() {
	const orb1Ref = useRef<HTMLDivElement>(null)
	const orb2Ref = useRef<HTMLDivElement>(null)
	const orb3Ref = useRef<HTMLDivElement>(null)
	const orb4Ref = useRef<HTMLDivElement>(null)

	useAnimationFrame((time) => {
		const t = time / 1000

		// Orb 1: Upper-right Electric Blue
		if (orb1Ref.current) {
			const x = Math.sin(t * 0.45) * 65 + Math.cos(t * 0.22) * 20
			const y = Math.cos(t * 0.4) * 45 + Math.sin(t * 0.25) * 15
			const scale = 1 + Math.sin(t * 0.35) * 0.06
			orb1Ref.current.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`
		}

		// Orb 2: Center-left Soft Purple / Violet
		if (orb2Ref.current) {
			const x = Math.cos(t * 0.42) * 75 + Math.sin(t * 0.25) * 20
			const y = Math.sin(t * 0.46) * 55 + Math.cos(t * 0.3) * 18
			const scale = 1 + Math.cos(t * 0.32) * 0.06
			orb2Ref.current.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`
		}

		// Orb 3: Lower-right Soft Royal Blue
		if (orb3Ref.current) {
			const x = Math.sin(t * 0.38 + 1.4) * 60
			const y = Math.cos(t * 0.4 + 1.1) * 45
			const scale = 1 + Math.sin(t * 0.38 + 0.6) * 0.05
			orb3Ref.current.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`
		}

		// Orb 4: Upper-center Soft Sky Blue accent
		if (orb4Ref.current) {
			const x = Math.cos(t * 0.48 + 2.0) * 55
			const y = Math.sin(t * 0.42 + 2.2) * 40
			const scale = 1 + Math.cos(t * 0.3 + 1.2) * 0.05
			orb4Ref.current.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`
		}
	})

	return (
		<div
			aria-hidden="true"
			className="pointer-events-none absolute inset-0 overflow-hidden select-none">
			{/* Blob 1: Luminous Electric Blue aura (upper right) */}
			<div
				ref={orb1Ref}
				className="absolute -top-[20%] -right-[10%] h-[1000px] w-[1000px] rounded-full blur-[140px] will-change-transform sm:-right-[5%] sm:h-[1300px] sm:w-[1300px] sm:blur-[180px]"
				style={{
					background:
						"radial-gradient(circle at 45% 45%, color-mix(in oklab, var(--color-primary) 10%, transparent), color-mix(in oklab, var(--color-primary) 4%, transparent) 70%, transparent 95%)",
				}}
			/>

			{/* Blob 2: Radiant Violet / Purple aura (mid-left & center) */}
			<div
				ref={orb2Ref}
				className="absolute top-[10%] -left-[10%] h-[1100px] w-[1100px] rounded-full blur-[150px] will-change-transform sm:-left-[5%] sm:h-[1400px] sm:w-[1400px] sm:blur-[200px]"
				style={{
					background:
						"radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--color-primary) 9%, transparent), color-mix(in oklab, var(--color-primary) 3%, transparent) 75%, transparent 100%)",
				}}
			/>

			{/* Blob 3: Soft Royal Blue aura (lower right & bottom) */}
			<div
				ref={orb3Ref}
				className="absolute top-[40%] -right-[10%] h-[1000px] w-[1000px] rounded-full blur-[140px] will-change-transform sm:-right-[5%] sm:h-[1300px] sm:w-[1300px] sm:blur-[180px]"
				style={{
					background:
						"radial-gradient(circle at 45% 45%, color-mix(in oklab, var(--color-primary) 8%, transparent), color-mix(in oklab, var(--color-primary) 3%, transparent) 70%, transparent 95%)",
				}}
			/>

			{/* Blob 4: Delicate Sky Blue accent (upper center & top-left) */}
			<div
				ref={orb4Ref}
				className="absolute -top-[15%] -left-[10%] h-[950px] w-[950px] rounded-full blur-[130px] will-change-transform sm:left-[10%] sm:h-[1200px] sm:w-[1200px] sm:blur-[170px]"
				style={{
					background:
						"radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--color-primary) 7%, transparent), color-mix(in oklab, var(--color-primary) 2%, transparent) 75%, transparent 95%)",
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
