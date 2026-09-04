import React from "react"
import { Metadata } from "next"
import { AiworkAgentsSection } from "./agents-section"
import { AiworkAutomationSection } from "./automation-section"
import { AiworkCtaBanner } from "./cta-banner"
import { AiworkFaqSection } from "./faq-section"
import { AiworkFooter } from "./footer"
import { AiworkHeroSection } from "./hero-section"
import { AiworkHowItWorksSection } from "./how-it-works-section"
import { AiworkIntegrationsSection } from "./integrations-section"
import { AiworkLogosStrip } from "./logos-strip"
import { AiworkNavbar } from "./navbar"
import { AiworkPricingSection } from "./pricing-section"
import { AiworkSolutionsSection } from "./solutions-section"
import { AiworkTestimonialsSection } from "./testimonials-section"

export const metadata: Metadata = {
	title: "AIwork — AI Agent & Automation SaaS Template",
	description:
		"AIwork is a modern SaaS website template for AI automation platforms, agencies and trucking startups.",
}

export default function AiworkPage() {
	return (
		<div className="bg-background text-foreground selection:bg-primary/20 selection:text-primary min-h-screen">
			<AiworkNavbar />
			<main>
				<AiworkHeroSection />
				<AiworkLogosStrip />
				<AiworkSolutionsSection />
				<AiworkAgentsSection />
				<AiworkAutomationSection />
				<AiworkIntegrationsSection />
				<AiworkHowItWorksSection />
				<AiworkTestimonialsSection />
				<AiworkPricingSection />
				<AiworkFaqSection />
				<AiworkCtaBanner />
			</main>
			<AiworkFooter />
		</div>
	)
}
