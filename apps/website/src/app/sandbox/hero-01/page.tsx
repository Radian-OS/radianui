import React from "react"
import type { Metadata } from "next"
import { HeroSection } from "./hero-section"
import { Navbar } from "./navbar"

export const metadata: Metadata = {
	title: "Hero 37 — Interactive Swing Line Hero Preview",
	description:
		"Choose your favorite AI models. We have them on the same line. Interactive swing line hero section built with Radian UI.",
}

export default function Hero37Page() {
	return (
		<main className="min-h-screen w-full">
			<Navbar />
			<HeroSection />
		</main>
	)
}
