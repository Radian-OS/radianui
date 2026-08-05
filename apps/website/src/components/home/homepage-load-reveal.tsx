"use client"

import { type CSSProperties, type ReactNode, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

type HomepageLoadRevealProps = {
	children: ReactNode
	className?: string
	delay?: number
	duration?: number
	offset?: number
	blur?: number
	scale?: number
}

type HomepageLoadRevealStyle = CSSProperties & {
	"--homepage-reveal-delay": string
	"--homepage-reveal-duration": string
	"--homepage-reveal-offset": string
	"--homepage-reveal-blur": string
	"--homepage-reveal-scale": number
}

export default function HomepageLoadReveal({
	children,
	className,
	delay = 0,
	duration = 0.8,
	offset = 12,
	blur = 12,
	scale = 0.995,
}: HomepageLoadRevealProps) {
	const revealRef = useRef<HTMLDivElement>(null)

	const style: HomepageLoadRevealStyle = {
		"--homepage-reveal-delay": `${delay}s`,
		"--homepage-reveal-duration": `${duration}s`,
		"--homepage-reveal-offset": `${offset}px`,
		"--homepage-reveal-blur": `${blur}px`,
		"--homepage-reveal-scale": scale,
	}

	useEffect(() => {
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

		const animation = element.getAnimations()[0]
		if (!animation || animation.playState === "finished") {
			completeReveal()
		}

		return () => {
			element.removeEventListener("animationend", handleAnimationEnd)
		}
	}, [])

	return (
		<div
			ref={revealRef}
			className={cn("homepage-load-reveal", className)}
			style={style}>
			{children}
		</div>
	)
}
