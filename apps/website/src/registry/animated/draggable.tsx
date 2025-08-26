"use client"

import React from "react"

import { type MotionProps, motion } from "motion/react"

type DraggableProps = {
	children?: React.ReactNode
} & Pick<
	MotionProps,
	| "drag"
	| "dragConstraints"
	| "dragControls"
	| "dragDirectionLock"
	| "dragElastic"
	| "dragTransition"
	| "dragListener"
	| "dragMomentum"
	| "dragPropagation"
	| "dragSnapToOrigin"
	| "onDrag"
	| "onDragEnd"
	| "onDragStart"
	| "onDragTransitionEnd"
	| "whileDrag"
>

function Draggable({ drag = true, children, ...props }: DraggableProps) {
	return (
		<motion.div drag={drag} {...props}>
			{children}
		</motion.div>
	)
}

export { Draggable }
