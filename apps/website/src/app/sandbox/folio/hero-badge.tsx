import React from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { FOLIO_HERO_DATA } from "./types"

export function HeroBadge() {
	return (
		<Link
			href={FOLIO_HERO_DATA.badgeHref}
			target="_blank"
			rel="noopener noreferrer"
			className="group border-border bg-card/60 text-fg-secondary hover:border-border/80 hover:text-foreground inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-medium shadow-xs backdrop-blur-xs transition-colors">
			<span>{FOLIO_HERO_DATA.badgeText}</span>
			<ChevronRight className="text-fg-secondary size-3.5 transition-transform group-hover:translate-x-0.5" />
		</Link>
	)
}
