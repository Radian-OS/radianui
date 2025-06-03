import { motion } from "motion/react"

export function Draggable({ children }: { children?: React.ReactNode }) {
	return <motion.div drag>{children}</motion.div>
}
