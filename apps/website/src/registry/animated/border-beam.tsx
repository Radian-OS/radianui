"use client"

import { type MotionStyle, type Transition, motion } from "motion/react"
import { cn } from "@/lib/utils"

/* Based on Border Beam component from MagicUI - MIT License */

interface BorderBeamProps {
	size?: number
	duration?: number
	delay?: number
	fromColor?: string
	toColor?: string
	/**
	 * The motion transition of the border beam.
	 */
	transition?: Transition
	className?: string
	style?: React.CSSProperties
	reverse?: boolean
	/**
	 * The initial offset position (0-100).
	 */
	initialOffset?: number
}

const BorderBeam = ({
	className,
	size = 50,
	delay = 0,
	duration = 6,
	fromColor = "#ffaa40",
	toColor = "#9c40ff",
	transition,
	style,
	reverse = false,
	initialOffset = 0,
}: BorderBeamProps) => {
	return (
		<div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]">
			<motion.div
				className={cn("absolute aspect-square", "bg-gradient-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent", className)}
				style={
					{
						width: size,
						offsetPath: `rect(0 auto auto 0 round ${size}px)`,
						"--color-from": fromColor,
						"--color-to": toColor,
						...style,
					} as MotionStyle
				}
				initial={{ offsetDistance: `${initialOffset}%` }}
				animate={{
					offsetDistance: reverse ? [`${100 - initialOffset}%`, `${-initialOffset}%`] : [`${initialOffset}%`, `${100 + initialOffset}%`],
				}}
				transition={{
					repeat: Infinity,
					ease: "linear",
					duration,
					delay: -delay,
					...transition,
				}}
			/>
		</div>
	)
}

export { BorderBeam }
