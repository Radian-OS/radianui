"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, MotionProps, motion } from "motion/react"
import { cn } from "@/lib/utils"

interface ChangingTextProps {
	texts: string[]
	duration?: number
	motionProps?: MotionProps
	className?: string
}

const ChangingText = ({
	texts,
	duration = 2500,
	motionProps = {
		initial: { opacity: 0, y: -50 },
		animate: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: 50 },
		transition: { duration: 0.25, ease: "easeOut" },
	},
	className,
}: ChangingTextProps) => {
	const [index, setIndex] = useState(0)

	useEffect(() => {
		const interval = setInterval(() => {
			setIndex((prevIndex) => (prevIndex + 1) % texts.length)
		}, duration)

		// Clean up interval on unmount
		return () => clearInterval(interval)
	}, [texts, duration])

	return (
		<div className="overflow-hidden py-2">
			<AnimatePresence mode="wait">
				<motion.h1 key={texts[index]} className={cn(className)} {...motionProps}>
					{texts[index]}
				</motion.h1>
			</AnimatePresence>
		</div>
	)
}

export { ChangingText }
