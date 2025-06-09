import React from "react"
import { Variants, motion } from "motion/react"

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

export function FadeDown({
	yOffset = -10,
	duration = 0.6,
	ease = "easeInOut",
	delay = 0,
	children,
	ref,
	as: Component = "div",
}: {
	ease?: EaseOption
	duration?: number
	yOffset?: number
	delay?: number
	as?: React.ElementType
	children?: React.ReactNode
	ref?: React.Ref<HTMLDivElement>
}) {
	const fadeDownVariants: Variants = {
		hidden: { opacity: 0, y: yOffset },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration, ease, delay },
		},
	}

	const MotionComponent = motion.create(Component, {
		forwardMotionProps: true,
	})

	return (
		<MotionComponent ref={ref} initial="hidden" animate="visible" variants={fadeDownVariants}>
			{children}
		</MotionComponent>
	)
}
