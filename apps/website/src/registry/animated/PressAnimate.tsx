import { motion } from "motion/react"

export function PressAnimate({ scale = 0.9, stiffness = 500, damping = 20, children }: { scale?: number; damping?: number; stiffness?: number; children?: React.ReactNode }) {
	return (
		<motion.div whileTap={{ scale }} transition={{ type: "spring", stiffness, damping }}>
			{children}
		</motion.div>
	)
}
