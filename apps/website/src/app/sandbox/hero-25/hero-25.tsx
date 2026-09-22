"use client"

import React from "react"
import { HeroBackground } from "./hero-background"
import { HeroHeader } from "./hero-header"
import { HeroCta } from "./hero-cta"
import { HeroPreview } from "./hero-preview"

export function Hero25() {
	return (
		<section className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden px-4 pt-16 sm:px-6 sm:pt-20 md:px-8 md:pt-24">
			<HeroBackground />

			<div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-6 text-center">
				<HeroHeader />
				<HeroCta />
				<HeroPreview />
			</div>
		</section>
	)
}
