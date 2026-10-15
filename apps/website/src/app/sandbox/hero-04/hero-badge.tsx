import React from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Badge } from "@/styles/default/ui/badge"
import { cn } from "@/lib/utils"
import { FOLIO_HERO_DATA } from "./types"

interface HeroBadgeProps {
	text?: string
	href?: string
	className?: string
}

export function HeroBadge({
	text = FOLIO_HERO_DATA.badgeText,
	href = FOLIO_HERO_DATA.badgeHref,
	className,
}: HeroBadgeProps) {
	return (
		<Badge
			asChild
			variant="outline"
			color="neutral"
			className={cn("group gap-1.5 rounded-full px-4", className)}>
			<Link href={href} target="_blank" rel="noopener noreferrer">
				<span className="text-fg-secondary">{text}</span>
				<ChevronRight className="text-fg-secondary size-3.5 transition-transform group-hover:translate-x-0.5" />
			</Link>
		</Badge>
	)
}
