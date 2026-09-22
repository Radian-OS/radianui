"use client"

import React from "react"
import { AboutSection } from "./about-section"
import { CertificationsSection } from "./certifications-section"
import { ExperienceSection } from "./experience-section"
import { FeaturedProjectsSection } from "./featured-projects-section"
import { HeroProfile } from "./hero-profile"
import { PersonalProjectsSection } from "./personal-projects-section"
import { PortfolioFooter } from "./portfolio-footer"
import { PortfolioHeader } from "./portfolio-header"
import { SocialCards } from "./social-cards"
import { WorkTogetherCard } from "./work-together-card"

export function KishorPortfolioView() {
	return (
		<div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-10">
			<PortfolioHeader />
			<HeroProfile />
			<SocialCards />
			<PersonalProjectsSection />
			<AboutSection />
			<FeaturedProjectsSection />
			<ExperienceSection />
			<CertificationsSection />
			<WorkTogetherCard />
			<PortfolioFooter />
		</div>
	)
}
