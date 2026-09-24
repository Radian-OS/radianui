"use client"

import React from "react"
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

const pauseOnHoverClass = css`
	&:hover > div {
		animation-play-state: paused !important;
	}
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
	return (
		<div
			className={cn(
				"group flex [gap:var(--gap)] overflow-hidden p-2 [--duration:20s] [--gap:1rem]",
				{
					"flex-row": !vertical,
					"flex-col": vertical,
					[pauseOnHoverClass]: pauseOnHover,
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
						style={paused ? { animationPlayState: "paused" } : undefined}
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
