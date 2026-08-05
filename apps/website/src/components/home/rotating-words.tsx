"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

interface RotatingWordsProps {
	words: readonly string[]
	className?: string
	interval?: number
}

export function RotatingWords({
	words,
	className,
	interval = 2000,
}: RotatingWordsProps) {
	const [activeIndex, setActiveIndex] = useState(0)
	const shouldReduceMotion = useReducedMotion()

	useEffect(() => {
		if (shouldReduceMotion || words.length < 2) return

		const timer = window.setInterval(() => {
			setActiveIndex((currentIndex) => (currentIndex + 1) % words.length)
		}, interval)

		return () => window.clearInterval(timer)
	}, [interval, shouldReduceMotion, words.length])

	if (words.length === 0) return null

	const visibleIndex = shouldReduceMotion ? 0 : activeIndex
	const activeWord = words[visibleIndex]

	return (
		<span
			className={cn(
				"relative inline-grid h-[1lh] overflow-hidden align-bottom leading-[inherit]",
				className
			)}>
			<span className="sr-only">{words[0]}</span>
			{words.map((word, index) => (
				<span
					aria-hidden="true"
					key={`word-size-${index}`}
					className="invisible col-start-1 row-start-1 inline-flex h-[1lh] items-center whitespace-nowrap leading-[inherit]">
					{word}
				</span>
			))}
			<AnimatePresence initial={false} mode="sync">
				<motion.span
					aria-hidden="true"
					key={`${visibleIndex}-${activeWord}`}
					className="col-start-1 row-start-1 inline-flex h-[1lh] items-center whitespace-nowrap leading-[inherit]"
					initial={shouldReduceMotion ? false : { opacity: 0, y: "100%" }}
					animate={{ opacity: 1, y: 0 }}
					exit={shouldReduceMotion ? undefined : { opacity: 0, y: "-50%" }}
					transition={{
						type: "spring",
						stiffness: 240,
						damping: 24,
						mass: 0.65,
					}}>
					{activeWord}
				</motion.span>
			</AnimatePresence>
		</span>
	)
}
