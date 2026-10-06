"use client"

import React from "react"
import { HeroBadge } from "./hero-badge"
import { HeroHeader } from "./hero-header"
import { HeroCta } from "./hero-cta"
import { HeroLogos } from "./hero-logos"
import { HeroPreview } from "./hero-preview"

export function Hero12() {
	return (
		<section className="relative flex w-full flex-col items-center px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20">
			<div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 sm:gap-8">
				<HeroBadge />
				<HeroHeader />
				<HeroCta />
				<HeroLogos />
				<HeroPreview />
			</div>
		</section>
	)
}
