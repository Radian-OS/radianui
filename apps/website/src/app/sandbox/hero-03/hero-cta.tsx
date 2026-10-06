import React from "react"
import Link from "next/link"
import { Button } from "@/styles/default/ui/button"
import { HERO_25_DATA } from "./types"

export function HeroCta() {
	return (
		<div className="flex items-center justify-center">
			<Button
				asChild
				variant="strong"
				color="neutral"
				size="44"
				className="rounded-full px-7 shadow-md">
				<Link
					href={HERO_25_DATA.ctaHref}
					target="_blank"
					rel="noopener noreferrer">
					<span>{HERO_25_DATA.ctaText}</span>
				</Link>
			</Button>
		</div>
	)
}
