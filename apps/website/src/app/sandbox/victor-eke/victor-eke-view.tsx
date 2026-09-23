"use client"

import React from "react"
import { VictorNavbar } from "./victor-navbar"
import { HeroSection } from "./hero-section"
import { ContributionGraph } from "./contribution-graph"
import { ExperienceSection } from "./experience-section"
import { PortfolioFooter } from "./portfolio-footer"

export function VictorEkeView() {
	return (
		<div className="dark min-h-screen w-full bg-[#121212] text-neutral-100 selection:bg-emerald-500/30 selection:text-emerald-300">
			<div className="mx-auto flex w-full max-w-5xl flex-col px-4 sm:px-6 lg:px-8">
				<VictorNavbar />
				<HeroSection />
				<ContributionGraph />
				<ExperienceSection />
				<PortfolioFooter />
			</div>
		</div>
	)
}
