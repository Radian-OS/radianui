import React from "react"
import type { Metadata } from "next"
import { HeroSection } from "./hero-section"
import { LogoStrip } from "./logo-strip"
import { Navbar } from "./navbar"

export const metadata: Metadata = {
	title: "Hero 16 — Modern AI Business Hero Section",
	description:
		"Transforming business with intelligent AI. Seamlessly integrate powerful insights into your workflow.",
}

export default function Hero16Page() {
	return (
		<main className="bg-bg text-fg min-h-screen w-full">
			{/* Navbar with canonical Tabs & Buttons */}
			<Navbar />

			{/* Main Hero Section with AI 3D Ribbon & Content */}
			<HeroSection />

			{/* Bottom Logo Strip */}
			<LogoStrip />
		</main>
	)
}
