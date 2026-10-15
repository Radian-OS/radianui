"use client"

import React from "react"
import { HeroBackground } from "./hero-background"
import { HeroHeader } from "./hero-header"
import { HeroCta } from "./hero-cta"
import { HeroPreview } from "./hero-preview"

export function Hero25() {
	return (
		<section className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden pt-12 sm:pt-16 md:pt-20">
			{/* Background sky lighting gradient and clouds */}
			<HeroBackground />

			{/* Header title, description, and CTA button */}
			<div className="relative z-30 mx-auto flex w-full max-w-4xl flex-col items-center gap-6 px-4 text-center sm:px-6">
				<HeroHeader />
				<HeroCta />
			</div>

			{/* Attached preview card with foreground rolling tree meadow */}
			<HeroPreview />
		</section>
	)
}
