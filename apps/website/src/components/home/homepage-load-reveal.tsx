import type { CSSProperties, ReactNode } from "react"
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
	const style: HomepageLoadRevealStyle = {
		"--homepage-reveal-delay": `${delay}s`,
		"--homepage-reveal-duration": `${duration}s`,
		"--homepage-reveal-offset": `${offset}px`,
		"--homepage-reveal-blur": `${blur}px`,
		"--homepage-reveal-scale": scale,
	}

	return (
		<div className={cn("homepage-load-reveal", className)} style={style}>
			{children}
		</div>
	)
}
