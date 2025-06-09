// import React from "react"
// import { motion } from "motion/react"

// type EaseOption = "anticipate" | "linear" | "easeIn" | "easeOut" | "easeInOut" | "circIn" | "circOut" | "circInOut" | "backIn" | "backOut" | "backInOut" | number[]

// export function ScaleOnHover({
// 	// scale = 1.05,
// 	// duration = 0.3,
// 	// ease = "easeInOut",
// 	children,
// 	ref,
// 	as: Component = "div",
// }: {
// 	scale?: number
// 	duration?: number
// 	ease?: EaseOption
// 	as?: React.ElementType
// 	children?: React.ReactNode
// 	ref?: React.Ref<HTMLDivElement>
// }) {
// 	const hoverVariants: Variants = {
// 		initial: { scale: 1 },
// 		hover: {
// 			scale,
// 			transition: { duration, ease },
// 		},
// 	}

// 	const MotionComponent = motion.create(Component, {
// 		forwardMotionProps: true,
// 	})

// 	return (
// 		// <MotionComponent
// 		// 	ref={ref}

// 		// 	>
// 		// 	{children}
// 		// </MotionComponent>
// 		<MotionComponent ref={ref} whileHover={{ scale: 1.1 }}>
// 			{children}
// 		</MotionComponent>
// 	)
// }
