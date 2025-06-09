import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export function InfiniteScroll({ direction = "left", className, children }: { direction?: "left" | "right"; className?: string; children?: React.ReactNode }) {
	return (
		<div className={cn("group flex overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]", className)}>
			<motion.div
				animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
				transition={{
					duration: 20,
					repeat: Infinity,
					ease: "linear",
					repeatType: "loop",
				}}
				className="flex shrink-0">
				<div className="flex shrink-0 justify-around">{children}</div>
				<div className="flex shrink-0 justify-around">{children}</div>
			</motion.div>
		</div>
	)
}
