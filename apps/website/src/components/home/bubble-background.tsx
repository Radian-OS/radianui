"use client"

import * as React from "react"
import { type SpringOptions, motion, useMotionValue, useSpring } from "motion/react"
import { cn } from "@/lib/utils"

type BubbleBackgroundProps = React.ComponentProps<"div"> & {
	interactive?: boolean
	transition?: SpringOptions
	colors?: {
		first: string
		second: string
		third: string
		fourth: string
		fifth: string
		sixth: string
	}
}

function BubbleBackground({
	ref,
	className,
	children,
	interactive = false,
	transition = { stiffness: 100, damping: 20 },
	colors = {
		first: "98, 61, 245",
		second: "98, 61, 245",
		third: "98, 61, 245",
		fourth: "98, 61, 245",
		fifth: "98, 61, 245",
		sixth: "140,100,255",
	},
	...props
}: BubbleBackgroundProps) {
	const containerRef = React.useRef<HTMLDivElement>(null)
	React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement)

	const mouseX = useMotionValue(0)
	const mouseY = useMotionValue(0)
	const springX = useSpring(mouseX, transition)
	const springY = useSpring(mouseY, transition)

	React.useEffect(() => {
		if (!interactive) return

		const currentContainer = containerRef.current
		if (!currentContainer) return

		const handleMouseMove = (e: MouseEvent) => {
			const rect = currentContainer.getBoundingClientRect()
			const centerX = rect.left + rect.width / 2
			const centerY = rect.top + rect.height / 2
			mouseX.set(e.clientX - centerX)
			mouseY.set(e.clientY - centerY)
		}

		currentContainer?.addEventListener("mousemove", handleMouseMove)
		return () => currentContainer?.removeEventListener("mousemove", handleMouseMove)
	}, [interactive, mouseX, mouseY])

	return (
		<div ref={containerRef} data-slot="bubble-background" className={cn("from-bg to-fill4-alpha relative size-full overflow-hidden bg-gradient-to-br", className)} {...props}>
			<style>
				{`
            :root {
              --first-color: ${colors.first};
              --second-color: ${colors.second};
              --third-color: ${colors.third};
              --fourth-color: ${colors.fourth};
              --fifth-color: ${colors.fifth};
              --sixth-color: ${colors.sixth};
            }
          `}
			</style>

			<svg xmlns="http://www.w3.org/2000/svg" className="absolute left-0 top-0 h-0 w-0">
				<defs>
					<filter id="goo">
						<feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
						<feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
						<feBlend in="SourceGraphic" in2="goo" />
					</filter>
				</defs>
			</svg>

			<div className="absolute inset-0" style={{ filter: "url(#goo) blur(40px)" }}>
				<motion.div
					className="absolute left-[10%] top-[10%] size-[80%] rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--first-color),0.8)_0%,rgba(var(--first-color),0)_50%)] mix-blend-hard-light"
					animate={{ y: [-50, 50, -50] }}
					transition={{ duration: 30, ease: "easeInOut", repeat: Infinity }}
				/>

				<motion.div
					className="absolute inset-0 flex origin-[calc(50%-400px)] items-center justify-center"
					animate={{ rotate: 360 }}
					transition={{
						duration: 20,
						ease: "linear",
						repeat: Infinity,
						repeatType: "loop",
					}}>
					<div className="left-[10%] top-[10%] size-[80%] rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--second-color),0.8)_0%,rgba(var(--second-color),0)_50%)] mix-blend-hard-light" />
				</motion.div>

				<motion.div
					className="absolute inset-0 flex origin-[calc(50%+400px)] items-center justify-center"
					animate={{ rotate: 360 }}
					transition={{ duration: 40, ease: "linear", repeat: Infinity }}>
					<div className="absolute left-[calc(50%-500px)] top-[calc(50%+200px)] size-[80%] rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--third-color),0.8)_0%,rgba(var(--third-color),0)_50%)] mix-blend-hard-light" />
				</motion.div>

				<motion.div
					className="absolute left-[10%] top-[10%] size-[80%] rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--fourth-color),0.8)_0%,rgba(var(--fourth-color),0)_50%)] opacity-70 mix-blend-hard-light"
					animate={{ x: [-50, 50, -50] }}
					transition={{ duration: 40, ease: "easeInOut", repeat: Infinity }}
				/>

				<motion.div
					className="absolute inset-0 flex origin-[calc(50%_-_800px)_calc(50%_+_200px)] items-center justify-center"
					animate={{ rotate: 360 }}
					transition={{ duration: 20, ease: "linear", repeat: Infinity }}>
					<div className="absolute left-[calc(50%-80%)] top-[calc(50%-80%)] size-[160%] rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--fifth-color),0.8)_0%,rgba(var(--fifth-color),0)_50%)] mix-blend-hard-light" />
				</motion.div>

				{interactive && (
					<motion.div
						className="absolute size-full rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--sixth-color),0.8)_0%,rgba(var(--sixth-color),0)_50%)] opacity-70 mix-blend-hard-light"
						style={{
							x: springX,
							y: springY,
						}}
					/>
				)}
			</div>

			{children}
		</div>
	)
}

export { BubbleBackground, type BubbleBackgroundProps }
