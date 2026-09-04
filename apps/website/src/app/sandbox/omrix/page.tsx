import React from "react"
import type { Metadata } from "next"
import { OmrixHeroSection } from "./hero-section"
import { OmrixLogosStrip } from "./logos-strip"
import { OmrixNavbar } from "./navbar"

export const metadata: Metadata = {
	title: "Omrix — AI SaaS Landing Page Framer Template",
	description:
		"Omrix is a premium template for AI SaaS and automation products. Build smarter workflows, ship faster, and scale further.",
}

export default function OmrixPage() {
	return (
		<div className="bg-background text-foreground selection:bg-primary/20 selection:text-primary min-h-screen">
			<OmrixNavbar />
			<main>
				<OmrixHeroSection />
				<OmrixLogosStrip />
			</main>
		</div>
	)
}
