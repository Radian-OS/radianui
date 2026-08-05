"use client"

import React, { useEffect, useRef, useState } from "react"
import { css } from "@emotion/css"
import { cn } from "@/lib/utils"

type InfiniteScrollProps = {
	duration?: number
	pauseOnHover?: boolean
	paused?: boolean
	reverse?: boolean
	vertical?: boolean
	className?: string
	children?: React.ReactNode
}

const infiniteScrollX = css`
	@keyframes infinite-scroll {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(calc(-100% - var(--gap)));
		}
	}
	animation: infinite-scroll var(--duration) linear infinite;
`

const infiniteScrollY = css`
	@keyframes infinite-scroll-vertical {
		from {
			transform: translateY(0);
		}
		to {
			transform: translateY(calc(-100% - var(--gap)));
		}
	}
	animation: infinite-scroll-vertical var(--duration) linear infinite;
`

const getClass = (isVertical: boolean) => {
	if (isVertical) return infiniteScrollY
	return infiniteScrollX
}

const InfiniteScroll = ({
	duration = 20,
	reverse = false,
	vertical = false,
	pauseOnHover = true,
	paused = false,
	className,
	children,
}: InfiniteScrollProps) => {
	const containerRef = useRef<HTMLDivElement>(null)
	const [isHovered, setIsHovered] = useState(false)

	useEffect(() => {
		const container = containerRef.current
		if (!container) return

		let animationFrameId: number
		const targetRate = (pauseOnHover && isHovered) || paused ? 0 : 1
		let frameCount = 0

		const updateRate = () => {
			const animations = container.getAnimations({ subtree: true })

			if (animations.length === 0) {
				frameCount++
				if (frameCount < 10) {
					animationFrameId = requestAnimationFrame(updateRate)
				}
				return
			}

			let allReached = true
			animations.forEach((anim) => {
				const currentRate = anim.playbackRate
				const diff = targetRate - currentRate
				if (Math.abs(diff) > 0.01) {
					anim.playbackRate = currentRate + diff * 0.08
					allReached = false
				} else {
					anim.playbackRate = targetRate
				}
			})

			if (!allReached) {
				animationFrameId = requestAnimationFrame(updateRate)
			}
		}

		animationFrameId = requestAnimationFrame(updateRate)

		return () => cancelAnimationFrame(animationFrameId)
	}, [isHovered, paused, pauseOnHover])

	return (
		<div
			ref={containerRef}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className={cn(
				"group flex overflow-hidden p-2 [--duration:20s] [--gap:1rem] [gap:var(--gap)]",
				{
					"flex-row": !vertical,
					"flex-col": vertical,
				},
				className
			)}
			style={
				{
					"--duration": `${duration}s`,
				} as React.CSSProperties
			}>
			{Array(4)
				.fill(0)
				.map((_, i) => (
					<div
						key={i}
						className={cn(
							"flex shrink-0 justify-around [gap:var(--gap)]",
							{
								"![animation-direction:reverse]": reverse,
								"flex-row": !vertical,
								"flex-col": vertical,
							},
							getClass(vertical)
						)}>
						{children}
					</div>
				))}
		</div>
	)
}

export { InfiniteScroll }
