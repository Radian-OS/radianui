import React from "react"
import { Metadata } from "next"
import { Merriweather } from "next/font/google"
import { AgentlabAnnouncementBar } from "./announcement-bar"
import { AgentlabCtaBanner } from "./cta-banner"
import { AgentlabFaqSection } from "./faq-section"
import { AgentlabFooter } from "./footer"
import { AgentlabHeroSection } from "./hero-section"
import { AgentlabIndustrySection } from "./industry-section"
import { AgentlabLogoMarquee } from "./logo-marquee"
import { AgentlabMultiModelSection } from "./multi-model-section"
import { AgentlabNavbar } from "./navbar"
import { AgentlabProblemSection } from "./problem-section"
import { AgentlabRoiSection } from "./roi-section"
import { AgentlabSecuritySection } from "./security-section"
import { AgentlabSolutionSection } from "./solution-section"
import { AgentlabTestimonialsSection } from "./testimonials-section"

const merriweather = Merriweather({
	weight: ["300", "400", "700"],
	subsets: ["latin"],
	variable: "--font-merriweather",
	display: "swap",
})

export const metadata: Metadata = {
	title: "AgentLab — AI Workflow & Automation Platform",
	description:
		"Automate workflows, deploy AI agents, and scale your operations with AgentLab's secure, enterprise-ready platform.",
}

export default function AgentlabPage() {
	return (
		<div
			className={`${merriweather.variable} bg-bg text-fg selection:bg-primary/20 selection:text-primary min-h-screen font-sans antialiased`}>
			<AgentlabAnnouncementBar />
			<AgentlabNavbar />
			<main>
				<AgentlabHeroSection />
				<AgentlabLogoMarquee />
				<AgentlabProblemSection />
				<AgentlabSolutionSection />
				<AgentlabRoiSection />
				<AgentlabMultiModelSection />
				<AgentlabIndustrySection />
				<AgentlabTestimonialsSection />
				<AgentlabSecuritySection />
				<AgentlabFaqSection />
				<AgentlabCtaBanner />
			</main>
			<AgentlabFooter />
		</div>
	)
}
