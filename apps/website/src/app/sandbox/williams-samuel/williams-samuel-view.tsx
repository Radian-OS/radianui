"use client"

import React from "react"
import { WilliamsNavbar } from "./williams-navbar"
import { HeroSection } from "./hero-section"
import { AboutSection } from "./about-section"
import { SkillsSection } from "./skills-section"
import { FeaturedProjectsSection } from "./featured-projects-section"
import { NoteworthyProjectsSection } from "./noteworthy-projects-section"
import { ContactCtaSection } from "./contact-cta-section"
import { WilliamsFooter } from "./williams-footer"

export function WilliamsSamuelView() {
	return (
		<div className="dark bg-bg text-fg selection:bg-success-accent selection:text-success-text min-h-screen w-full">
			<WilliamsNavbar />
			<div className="mx-auto flex w-full max-w-5xl flex-col px-4 sm:px-6 lg:px-8">
				<HeroSection />
				<AboutSection />
				<SkillsSection />
				<FeaturedProjectsSection />
				<NoteworthyProjectsSection />
				<ContactCtaSection />
				<WilliamsFooter />
			</div>
		</div>
	)
}
