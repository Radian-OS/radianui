"use client"

import React, { useRef } from "react"
import { AnimatePresence, UseInViewOptions, Variants, motion, useInView } from "motion/react"

type EaseOption =
	| "anticipate"
	| "linear"
	| "easeIn"
	| "easeOut"
	| "easeInOut"
	| "easeIn"
	| "easeOut"
	| "easeInOut"
	| "circIn"
	| "circOut"
	| "circInOut"
	| "backIn"
	| "backOut"
	| "backInOut"
	| number[]

export type FadeDirection = "left" | "right" | "up" | "down"

type FadeProps = {
	ease?: EaseOption
	duration?: number
	offset?: number
	blur?: string
	direction?: FadeDirection
	delay?: number
	variants?: Variants
	children?: React.ReactNode
	inView?: boolean
	inViewMargin?: UseInViewOptions["margin"]
	isVisible?: boolean
}

const Fade = ({
	direction = "up",
	offset = 10,
	inView = false,
	inViewMargin = "-50px",
	duration = 0.6,
	ease = "easeOut",
	delay = 0,
	blur = "0px",
	isVisible = true,
	variants,
	children,
}: FadeProps) => {
	const ref = useRef(null)
	const inViewResult = useInView(ref, { once: true, margin: inViewMargin })

	const shouldShow = inView ? inViewResult && isVisible : isVisible

	const getOffset = (direction: FadeDirection) => {
		switch (direction) {
			case "up":
				return { y: offset }
			case "down":
				return { y: -offset }
			case "left":
				return { x: offset }
			case "right":
				return { x: -offset }
		}
	}

	const defaultVariants: Variants = {
		hidden: { opacity: 0, ...getOffset(direction), filter: `blur(${blur})` },
		visible: {
			opacity: 1,
			x: 0,
			y: 0,
			filter: `blur(0px)`,
			transition: {
				duration,
				delay,
				ease,
			},
		},
	}

	const combinedVariants = variants || defaultVariants

	return (
		<AnimatePresence mode="wait">
			<motion.div ref={ref} initial="hidden" animate={shouldShow ? "visible" : "hidden"} exit="hidden" variants={combinedVariants}>
				{children}
			</motion.div>
		</AnimatePresence>
	)
}

export { Fade }
