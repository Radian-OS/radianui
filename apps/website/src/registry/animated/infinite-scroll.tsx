import React from "react"
import { css } from "@emotion/css"
import { cn } from "@/lib/utils"

type InfiniteScrollProps = { duration?: number; pauseOnHover?: boolean; reverse?: boolean; vertical?: boolean; className?: string; children?: React.ReactNode }

const infiniteScrollCSS = css`
	@keyframes infinite-scroll {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(calc(-100% - var(--gap)));
		}
	}
	@keyframes infinite-scroll-vertical {
		from {
			transform: translateY(0);
		}
		to {
			transform: translateY(calc(-100% - var(--gap)));
		}
	}

	.animate-infinite-scroll {
		animation: infinite-scroll var(--duration) linear infinite;
	}

	.animate-infinite-scroll-vertical {
		animation: infinite-scroll-vertical var(--duration) linear infinite;
	}
`

const InfiniteScroll = ({ duration = 20, reverse = false, vertical = false, pauseOnHover = true, className, children }: InfiniteScrollProps) => {
	return (
		<div
			className={cn(
				"group flex overflow-hidden p-2 [--duration:20s] [--gap:1rem] [gap:var(--gap)]",
				{
					"flex-row": !vertical,
					"flex-col": vertical,
				},
				infiniteScrollCSS,
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
						className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
							"![animation-direction:reverse]": reverse,
							"animate-infinite-scroll flex-row": !vertical,
							"animate-infinite-scroll-vertical flex-col": vertical,
							"group-hover:![animation-play-state:paused]": pauseOnHover,
						})}>
						{children}
					</div>
				))}
		</div>
	)
}

export { InfiniteScroll }
