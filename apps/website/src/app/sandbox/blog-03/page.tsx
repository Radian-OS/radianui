import React from "react"
import type { Metadata } from "next"
import { ArticlesSection } from "./articles-section"
import { FeaturedCard } from "./featured-card"
import { Footer } from "./footer"
import { HeroSection } from "./hero-section"
import { Navbar } from "./navbar"
import { NewsletterSection } from "./newsletter-section"

export const metadata: Metadata = {
	title: "Zentra — Insights & Trends Shaping the Future of Finance",
	description:
		"Stay informed with the most recent updates on business finance, market trends, smart money moves, and company case studies from Zentra.",
}

export default function ZentraPage() {
	return (
		<div className="bg-bg text-fg min-h-screen">
			{/* Top Header Navbar */}
			<Navbar />

			{/* Main Content Area */}
			<main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<HeroSection />
				<FeaturedCard />
				<ArticlesSection />
				<NewsletterSection />
			</main>

			{/* Global Footer */}
			<Footer />
		</div>
	)
}
