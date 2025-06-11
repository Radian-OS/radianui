import React from "react"
import { cn } from "@/lib/utils"

export function InfiniteScroll({ reverse = false, className, children }: { reverse?: boolean; className?: string; children?: React.ReactNode }) {
	return (
		<div
			className={cn(
				"group flex w-full overflow-hidden p-2 [--duration:20s] [--gap:1rem] [gap:var(--gap)] [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]",
				className
			)}>
			{Array(2)
				.fill(0)
				.map((_, i) => (
					<div
						key={i}
						className={cn("animate-infinite-scroll flex shrink-0 justify-around [gap:var(--gap)] group-hover:[animation-play-state:paused]", {
							"[animation-direction:reverse]": reverse,
						})}>
						{children}
					</div>
				))}
		</div>
	)
}
