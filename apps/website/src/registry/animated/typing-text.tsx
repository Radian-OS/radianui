import React from "react"
import { Variants, motion } from "motion/react"

type EaseOption = "anticipate" | "linear" | "easeIn" | "easeOut" | "easeInOut" | "circIn" | "circOut" | "circInOut" | "backIn" | "backOut" | "backInOut" | number[]

const TypingText = ({
	text,
	duration = 0.05,
	ease = "linear",
	delay = 0,
	showCursor = true,
	cursorDuration = 0.8,
	cursorChar = "|",
	onComplete,
	ref,
	as: Component = "span",
	...props
}: {
	text: string
	duration?: number
	ease?: EaseOption
	delay?: number
	showCursor?: boolean
	cursorDuration?: number
	cursorChar?: string
	onComplete?: () => void
	as?: React.ElementType
	ref?: React.Ref<HTMLElement>
} & React.ComponentProps<"span">) => {
	const [displayedText, setDisplayedText] = React.useState("")
	const [isTypingComplete, setIsTypingComplete] = React.useState(false)

	React.useEffect(() => {
		if (!text) return

		// const totalDuration = (text.length * duration + delay) * 1000
		let currentIndex = 0

		const typeTimer = setTimeout(() => {
			const typingInterval = setInterval(() => {
				if (currentIndex < text.length) {
					setDisplayedText(text.slice(0, currentIndex + 1))
					currentIndex++
				} else {
					clearInterval(typingInterval)
					setIsTypingComplete(true)
					onComplete?.()
				}
			}, duration * 1000)

			return () => clearInterval(typingInterval)
		}, delay * 1000)

		return () => clearTimeout(typeTimer)
	}, [text, duration, delay, onComplete])

	const cursorVariants: Variants = {
		visible: { opacity: 1 },
		hidden: { opacity: 0 },
	}

	const MotionComponent = motion.create(Component, {
		forwardMotionProps: true,
	})

	return (
		<MotionComponent ref={ref} {...props}>
			{displayedText}
			{showCursor && (
				<motion.span
					variants={cursorVariants}
					animate={isTypingComplete ? "hidden" : "visible"}
					transition={{
						duration: cursorDuration,
						repeat: isTypingComplete ? 0 : Infinity,
						repeatType: "reverse",
						ease,
					}}>
					{cursorChar}
				</motion.span>
			)}
		</MotionComponent>
	)
}

export { TypingText }
