import React, { useRef } from "react"
import { UseInViewOptions, Variants, motion, useInView } from "motion/react"

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

export type FadeInDirection = "left" | "right" | "up" | "down"

type FadeInProps = {
	ease?: EaseOption
	duration?: number
	offset?: number
	direction?: FadeInDirection
	delay?: number
	as?: React.ElementType
	children?: React.ReactNode
	inView?: boolean
	inViewMargin?: UseInViewOptions["margin"]
}

const FadeIn = ({
	direction = "up",
	offset = 10,
	inView = false,
	inViewMargin = "-50px",
	duration = 0.6,
	ease = "easeInOut",
	delay = 0,
	children,
	as: Component = "div",
}: FadeInProps) => {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, margin: inViewMargin })

	const showElement = !inView || isInView

	const getOffset = (direction: FadeInDirection) => {
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

	const fadeDownVariants: Variants = {
		hidden: { opacity: 0, ...getOffset(direction) },
		visible: {
			opacity: 1,
			x: 0,
			y: 0,
			transition: { duration, ease, delay },
		},
	}

	const MotionComponent = motion.create(Component, {
		forwardMotionProps: true,
	})

	return (
		<MotionComponent ref={ref} initial="hidden" animate={showElement ? "visible" : "hidden"} exit="hidden" variants={fadeDownVariants}>
			{children}
		</MotionComponent>
	)
}

export { FadeIn }
