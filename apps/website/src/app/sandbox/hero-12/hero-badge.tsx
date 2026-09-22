import React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { HERO_12_DATA } from "./types"

export function HeroBadge() {
	return (
		<Link
			href={HERO_12_DATA.badgeHref}
			target="_blank"
			rel="noopener noreferrer"
			className="border-border bg-card/80 text-fg-secondary hover:text-foreground inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-medium shadow-xs transition-colors">
			<span className="size-2 animate-pulse rounded-full bg-emerald-500" />
			<span>{HERO_12_DATA.badgeText}</span>
			<ArrowRight className="text-fg-secondary size-3.5 transition-transform group-hover:translate-x-0.5" />
		</Link>
	)
}
