import React from "react"
import Link from "next/link"
import { Button } from "@/styles/default/ui/button"
import { HERO_12_DATA } from "./types"

export function HeroCta() {
	return (
		<div className="flex flex-wrap items-center justify-center gap-3">
			<Button asChild variant="strong" color="neutral" size="40">
				<Link
					href={HERO_12_DATA.primaryCtaHref}
					target="_blank"
					rel="noopener noreferrer">
					<span>{HERO_12_DATA.primaryCtaText}</span>
				</Link>
			</Button>

			<Button asChild variant="outline" color="neutral" size="40">
				<Link
					href={HERO_12_DATA.secondaryCtaHref}
					target="_blank"
					rel="noopener noreferrer">
					<span>{HERO_12_DATA.secondaryCtaText}</span>
				</Link>
			</Button>
		</div>
	)
}
