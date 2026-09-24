import React from "react"
import Link from "next/link"
import { Button } from "@/styles/default/ui/button"
import { FOLIO_HERO_DATA } from "./types"

export function HeroCta() {
	return (
		<div className="flex flex-col items-center gap-3">
			<div className="flex flex-wrap items-center justify-center gap-3">
				<Button asChild variant="strong" color="neutral" size="40">
					<Link
						href={FOLIO_HERO_DATA.primaryCtaHref}
						target="_blank"
						rel="noopener noreferrer">
						<span>{FOLIO_HERO_DATA.primaryCtaText}</span>
					</Link>
				</Button>

				<Button asChild variant="outline" color="neutral" size="40">
					<Link
						href={FOLIO_HERO_DATA.secondaryCtaHref}
						target="_blank"
						rel="noopener noreferrer">
						<span>{FOLIO_HERO_DATA.secondaryCtaText}</span>
					</Link>
				</Button>
			</div>

			<p className="text-fg-secondary text-xs">
				<span>{FOLIO_HERO_DATA.creditPrefix} </span>
				<Link
					href={FOLIO_HERO_DATA.creditLinkHref}
					target="_blank"
					rel="noopener noreferrer"
					className="text-fg hover:text-fg-secondary transition-colors">
					{FOLIO_HERO_DATA.creditLinkText}
				</Link>
			</p>
		</div>
	)
}
