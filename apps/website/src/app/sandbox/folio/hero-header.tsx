import React from "react"
import { FOLIO_HERO_DATA } from "./types"

export function HeroHeader() {
	return (
		<div className="flex flex-col items-center gap-5 text-center">
			<h1 className="heading-1 text-foreground max-w-4xl text-center font-serif">
				{FOLIO_HERO_DATA.titleLine1} <br className="hidden sm:inline" />
				{FOLIO_HERO_DATA.titleLine2}
			</h1>

			<p className="text-fg-secondary max-w-2xl text-center text-base sm:text-lg">
				{FOLIO_HERO_DATA.description}
			</p>
		</div>
	)
}
