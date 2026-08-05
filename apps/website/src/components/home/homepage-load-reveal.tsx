"use client"

import {
	type CSSProperties,
	type ReactNode,
	useEffect,
	useRef,
	useState,
} from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

type HomepageLoadRevealProps = {
	children: ReactNode
	className?: string
	delay?: number
	duration?: number
	blur?: number
}

type HomepageLoadRevealStyle = CSSProperties & {
	"--homepage-reveal-delay": string
	"--homepage-reveal-duration": string
	"--homepage-reveal-blur": string
}

export default function HomepageLoadReveal({
	children,
	className,
	delay = 0,
	duration = 0.8,
	blur = 12,
}: HomepageLoadRevealProps) {
	const revealRef = useRef<HTMLDivElement>(null)
	const [isRevealReady, setIsRevealReady] = useState(false)
	const { resolvedTheme } = useTheme()

	const style: HomepageLoadRevealStyle = {
		"--homepage-reveal-delay": `${delay}s`,
		"--homepage-reveal-duration": `${duration}s`,
		"--homepage-reveal-blur": `${blur}px`,
	}

	useEffect(() => {
		if (!resolvedTheme || isRevealReady) return

		const frame = window.requestAnimationFrame(() => {
			setIsRevealReady(true)
		})

		return () => window.cancelAnimationFrame(frame)
	}, [isRevealReady, resolvedTheme])

	useEffect(() => {
		if (!isRevealReady) return

		const element = revealRef.current
		if (!element) return

		const completeReveal = () => {
			element.dataset.revealComplete = "true"
		}

		const handleAnimationEnd = (event: AnimationEvent) => {
			if (
				event.target === element &&
				event.animationName === "homepage-load-reveal"
			) {
				completeReveal()
			}
		}

		element.addEventListener("animationend", handleAnimationEnd)

		const frame = window.requestAnimationFrame(() => {
			const animation = element.getAnimations()[0]
			if (!animation || animation.playState === "finished") {
				completeReveal()
			}
		})

		return () => {
			window.cancelAnimationFrame(frame)
			element.removeEventListener("animationend", handleAnimationEnd)
		}
	}, [isRevealReady])

	return (
		<div
			ref={revealRef}
			data-reveal-ready={isRevealReady ? "true" : undefined}
			className={cn("homepage-load-reveal", className)}
			style={style}>
			{children}
		</div>
	)
}
