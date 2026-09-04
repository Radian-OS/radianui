import React from "react"
import type { Metadata } from "next"
import { VerseoClientLogos } from "./client-logos"
import { VerseoCtaSection } from "./cta-section"
import { VerseoExamplesSection } from "./examples-section"
import { VerseoFaqSection } from "./faq-section"
import { VerseoFeaturesSection } from "./features-section"
import { VerseoFooter } from "./footer"
import { VerseoHeroSection } from "./hero-section"
import { VerseoHowItWorksSection } from "./how-it-works-section"
import { VerseoNavbar } from "./navbar"
import { VerseoPricingSection } from "./pricing-section"
import { VerseoProblemDifferenceSection } from "./problem-difference-section"
import { VerseoResultsSection } from "./results-section"
import { VerseoTestimonialsSection } from "./testimonials-section"
import { VerseoUseCasesSection } from "./use-cases-section"

export const metadata: Metadata = {
	title: "Verseo — AI Content Automation Template | Radian Sandbox",
	description:
		"Verseo helps teams, founders, and marketers generate high-quality content in seconds — without overthinking every word.",
}

export default function VerseoPage() {
	return (
		<div className="bg-background text-foreground selection:bg-primary/20 selection:text-primary min-h-screen">
			<VerseoNavbar />
			<main>
				<VerseoHeroSection />
				<VerseoClientLogos />
				<VerseoProblemDifferenceSection />
				<VerseoFeaturesSection />
				<VerseoUseCasesSection />
				<VerseoHowItWorksSection />
				<VerseoResultsSection />
				<VerseoExamplesSection />
				<VerseoTestimonialsSection />
				<VerseoPricingSection />
				<VerseoFaqSection />
				<VerseoCtaSection />
			</main>
			<VerseoFooter />
		</div>
	)
}
