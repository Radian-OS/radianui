import React from "react"
import { HERO_25_DATA } from "./types"

export function HeroHeader() {
	return (
		<div className="flex flex-col items-center gap-4 text-center">
			<h1 className="heading-1 text-foreground max-w-3xl text-center">
				{HERO_25_DATA.title}
			</h1>

			<p className="text-fg-secondary max-w-md text-center text-base sm:text-lg">
				{HERO_25_DATA.description}
			</p>
		</div>
	)
}
