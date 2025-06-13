"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, MotionProps, motion } from "motion/react"
import { cn } from "@/lib/utils"

interface ChangingTextProps {
	texts: string[]
	duration?: number
	motionProps?: MotionProps
	className?: string
	direction?: "up" | "down" | "left" | "right"
}

const ChangingText = ({ texts, duration = 2500, motionProps, direction = "down", className }: ChangingTextProps) => {
	const [index, setIndex] = useState(0)

	let axis: "x" | "y"

	if (direction === "up" || direction === "down") {
		axis = "y"
	} else {
		axis = "x"
	}

	const offset = direction === "down" || direction === "right" ? -50 : 50

	const defaultMotionProps = {
		initial: { opacity: 0, [axis]: offset },
		animate: { opacity: 1, [axis]: 0 },
		exit: { opacity: 0, [axis]: -offset },
		transition: { duration: 0.25, ease: "easeOut" },
	}

	useEffect(() => {
		const interval = setInterval(() => {
			setIndex((prevIndex) => (prevIndex + 1) % texts.length)
		}, duration)

		// Clean up interval on unmount
		return () => clearInterval(interval)
	}, [texts, duration])

	const combinedMotionProps = motionProps || defaultMotionProps

	return (
		<div className="overflow-hidden py-2">
			<AnimatePresence mode="wait">
				<motion.h1 key={texts[index]} className={cn(className)} {...combinedMotionProps}>
					{texts[index]}
				</motion.h1>
			</AnimatePresence>
		</div>
	)
}

export { ChangingText }
