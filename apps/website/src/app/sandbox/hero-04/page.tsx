import React from "react"
import type { Metadata } from "next"
import { AnnouncementBanner } from "./announcement-banner"
import { HeroSection } from "./hero-section"
import { LogoStrip } from "./logo-strip"
import { Navbar } from "./navbar"

export const metadata: Metadata = {
	title: "Hero 04 — Radian OS Component Sandbox",
	description:
		"Track your finances with live analytics in one place. Monitor income, forecast trends, and categorize expenses across every account — all in real time.",
}

export default function Hero04Page() {
	return (
		<div className="bg-bg text-fg selection:bg-primary/20 selection:text-primary min-h-screen">
			<AnnouncementBanner />
			<Navbar />
			<main>
				<HeroSection />
				<LogoStrip />
			</main>
		</div>
	)
}
