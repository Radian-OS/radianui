import React from "react"
import { AnimatePresence, motion, useMotionValue } from "motion/react"
import { cn } from "@/lib/utils"

const Pointer = ({ children }: { children?: React.ReactNode }) => {
	const divRef = React.useRef<HTMLDivElement>(null)

	const x = useMotionValue(0)
	const y = useMotionValue(0)

	const [insideParent, setInsideParent] = React.useState<boolean>(false)

	React.useEffect(() => {
		if (typeof window !== "undefined" && divRef.current) {
			const parent = divRef.current.parentElement

			if (parent) {
				parent.style.cursor = "none"

				const handleMouseMove = (e: MouseEvent) => {
					x.set(e.clientX)
					y.set(e.clientY)
				}

				const handleMouseEnter = () => {
					setInsideParent(true)
				}

				const handleMouseLeave = () => {
					setInsideParent(false)
				}

				parent.addEventListener("mouseenter", handleMouseEnter)
				parent.addEventListener("mouseleave", handleMouseLeave)
				parent.addEventListener("mousemove", handleMouseMove)

				return () => {
					parent.style.cursor = ""
					parent.removeEventListener("mouseenter", handleMouseEnter)
					parent.removeEventListener("mouseleave", handleMouseLeave)
					parent.removeEventListener("mousemove", handleMouseMove)
				}
			}
		}
	}, [x, y])

	return (
		<React.Fragment>
			{/* Div used to reference the parent */}
			<div ref={divRef} />
			<AnimatePresence>
				{insideParent && (
					<motion.div
						initial={{ scale: 0, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0, opacity: 0 }}
						className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-1/2"
						style={{ top: y, left: x }}>
						{children ?? (
							<svg
								stroke="currentColor"
								fill="currentColor"
								strokeWidth="1"
								viewBox="0 0 16 16"
								height="24"
								width="24"
								xmlns="http://www.w3.org/2000/svg"
								className={cn("rotate-[-70deg] stroke-white text-black")}>
								<path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
							</svg>
						)}
					</motion.div>
				)}
			</AnimatePresence>
		</React.Fragment>
	)
}

export { Pointer }
