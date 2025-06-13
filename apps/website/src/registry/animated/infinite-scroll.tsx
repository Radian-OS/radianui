import React from "react"
import { cn } from "@/lib/utils"

type InfiniteScrollProps = { duration?: number; pauseOnHover?: boolean; reverse?: boolean; vertical?: boolean; className?: string; children?: React.ReactNode }

const InfiniteScroll = ({ duration = 20, reverse = false, vertical = false, pauseOnHover = true, className, children }: InfiniteScrollProps) => {
	return (
		<div
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
						className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
							"[animation-direction:reverse]": reverse,
							"animate-infinite-scroll flex-row": !vertical,
							"animate-infinite-scroll-vertical flex-col": vertical,
							"group-hover:[animation-play-state:paused]": pauseOnHover,
						})}>
						{children}
					</div>
				))}
		</div>
	)
}

export { InfiniteScroll }
