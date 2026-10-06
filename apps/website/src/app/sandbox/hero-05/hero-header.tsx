import React from "react"
import { HERO_12_DATA } from "./types"

export function HeroHeader() {
	return (
		<div className="flex flex-col items-center gap-4 text-center">
			<h1 className="heading-1 text-fg max-w-3xl text-center">
				{HERO_12_DATA.titlePrefix} <br className="hidden sm:inline" />
				<span className="text-fg-secondary">{HERO_12_DATA.titleHighlight}</span>
			</h1>

			<p className="text-fg-secondary max-w-2xl text-center text-base sm:text-lg">
				{HERO_12_DATA.description}
			</p>
		</div>
	)
}
