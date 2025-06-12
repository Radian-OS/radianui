import React from "react"
import { motion } from "motion/react"

type GradientTextProps = {
	fromColor?: string
	toColor?: string
	degree?: number
	duration?: number
	children: React.ReactNode
	className?: string
	style?: object
	as?: React.ElementType
}

const GradientText = ({
	children,
	className = "",
	style = {},
	degree = 90,
	fromColor = "#ff6b6b",
	toColor = "#4ecdc4",
	duration = 4,
	as: Component = "span",
}: GradientTextProps) => {
	const MotionComponent = motion.create(Component, {
		forwardMotionProps: true,
	})

	return (
		<MotionComponent
			className={className}
			style={{
				background: `linear-gradient(${degree}deg, ${fromColor}, ${toColor})`,
				backgroundSize: "200% 100%",
				backgroundClip: "text",
				WebkitBackgroundClip: "text",
				color: "transparent",
				...style,
			}}
			animate={{
				backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
			}}
			transition={{
				duration,
				repeat: Infinity,
				ease: "linear",
			}}>
			{children}
		</MotionComponent>
	)
}

export { GradientText }
