import { cn } from "@/lib/utils"

export function InfiniteScroll({ direction = "left", className, children }: { direction?: "left" | "right"; className?: string; children?: React.ReactNode }) {
	return (
		<div
			className={cn(
				"group flex overflow-hidden [--duration:15s] [--gap:1rem] [gap:var(--gap)] [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]",
				className
			)}>
			{Array(4)
				.fill(0)
				.map((_, i) => (
					<div key={i} className={cn("animate-infinite-scroll flex shrink-0 justify-around [gap:var(--gap)]", { "[animation-direction:reverse]": direction === "right" })}>
						{children}
					</div>
				))}
		</div>
	)
}
