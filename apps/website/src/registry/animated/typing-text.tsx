import React from "react"
import { Easing, Variants, motion } from "motion/react"

type EaseOption = Easing | [number, number, number, number] // Cubic bezier array must have exactly 4 numbers

type TypingTextProps = {
	texts: string[]
	duration?: number
	deleteSpeed?: number
	delay?: number
	pauseBetween?: number
	ease?: EaseOption
	showCursor?: boolean
	cursorDuration?: number
	cursorChar?: string
	loop?: boolean
	onComplete?: () => void
	as?: React.ElementType
} & React.ComponentProps<"span">

export const TypingText = ({
	texts,
	duration = 0.05,
	deleteSpeed = 0.03,
	pauseBetween = 1.5,
	ease = "linear",
	showCursor = true,
	cursorDuration = 0.8,
	cursorChar = "|",
	loop = true,
	onComplete,
	as: Component = "span",
	...props
}: TypingTextProps) => {
	const [textIndex, setTextIndex] = React.useState(0)
	const [displayedText, setDisplayedText] = React.useState("")
	const [isDeleting, setIsDeleting] = React.useState(false)
	const [isDone, setIsDone] = React.useState(false)

	React.useEffect(() => {
		if (!texts || texts.length === 0) return

		const currentText = texts[textIndex]
		let timeout: NodeJS.Timeout

		if (!isDeleting && displayedText.length < currentText.length) {
			timeout = setTimeout(() => {
				setDisplayedText(currentText.slice(0, displayedText.length + 1))
			}, duration * 1000)
		} else if (isDeleting && displayedText.length > 0) {
			timeout = setTimeout(() => {
				setDisplayedText(currentText.slice(0, displayedText.length - 1))
			}, deleteSpeed * 1000)
		} else if (!isDeleting && displayedText.length === currentText.length) {
			timeout = setTimeout(() => setIsDeleting(true), pauseBetween * 1000)
		} else if (isDeleting && displayedText.length === 0) {
			setIsDeleting(false)
			const next = textIndex + 1
			const hasMore = next < texts.length
			if (hasMore) {
				setTextIndex(next)
			} else if (loop) {
				setTextIndex(0)
			} else {
				setIsDone(true)
				onComplete?.()
			}
		}

		return () => clearTimeout(timeout)
	}, [displayedText, isDeleting, textIndex, texts, duration, deleteSpeed, pauseBetween, loop, onComplete])

	const cursorVariants: Variants = {
		visible: { opacity: 1 },
		hidden: { opacity: 0 },
	}

	const MotionComponent = motion.create(Component, {
		forwardMotionProps: true,
	})

	return (
		<MotionComponent {...props}>
			{displayedText}
			{showCursor && !isDone && (
				<motion.span
					variants={cursorVariants}
					animate="visible"
					transition={{
						duration: cursorDuration,
						repeat: Infinity,
						repeatType: "reverse",
						ease,
					}}>
					{cursorChar}
				</motion.span>
			)}
		</MotionComponent>
	)
}
