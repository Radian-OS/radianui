import React, { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"

type Ripple = {
	id: string
	x: number
	y: number
	size: number
}
export function FeatureCard({
	children,
	className = "",
	style,
	clickEffect = true,
}: {
	children: React.ReactNode
	className?: string
	style?: React.CSSProperties
	clickEffect?: boolean
}) {
	const cardRef = useRef<HTMLDivElement | null>(null)
	const timeoutsRef = useRef<number[]>([])
	const [ripples, setRipples] = useState<Ripple[]>([])
	useEffect(() => {
		return () => {
			timeoutsRef.current.forEach((t) => window.clearTimeout(t))
			timeoutsRef.current = []
		}
	}, [])
	const handleClick = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			if (!clickEffect) return
			const el = cardRef.current
			if (!el) return
			const rect = el.getBoundingClientRect()
			const x = e.clientX - rect.left
			const y = e.clientY - rect.top
			const maxDistance = Math.max(Math.hypot(x, y), Math.hypot(x - rect.width, y), Math.hypot(x, y - rect.height), Math.hypot(x - rect.width, y - rect.height))
			const id = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`
			const size = maxDistance * 2
			setRipples((prev) => [...prev, { id, x: x - maxDistance, y: y - maxDistance, size }])
			const t = window.setTimeout(() => {
				setRipples((prev) => prev.filter((r) => r.id !== id))
			}, 800)
			timeoutsRef.current.push(t)
		},
		[clickEffect]
	)
	return (
		<div ref={cardRef} onClick={handleClick} className={`${className} relative overflow-hidden`} style={{ ...style, position: "relative", overflow: "hidden" }}>
			{children}
			<AnimatePresence>
				{ripples.map((r) => (
					<motion.div
						key={r.id}
						className="pointer-events-none absolute z-[1000] rounded-full"
						style={{
							left: r.x,
							top: r.y,
							width: r.size,
							height: r.size,
							background:
								"radial-gradient(circle, color-mix(in oklch, var(--color-primary), transparent 60%) 0%, color-mix(in oklch, var(--color-primary), transparent 80%) 30%, transparent 70%)",
						}}
						initial={{ scale: 0, opacity: 1 }}
						animate={{ scale: 1, opacity: 0 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.8, ease: "easeOut" }}
					/>
				))}
			</AnimatePresence>
		</div>
	)
}
