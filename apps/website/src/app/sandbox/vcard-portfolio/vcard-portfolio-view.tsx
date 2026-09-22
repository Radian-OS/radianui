"use client"

import React, { useState } from "react"
import { Card, CardContent } from "@/styles/default/ui/card"
import { AboutSection } from "./about-section"
import { ClientsSection } from "./clients-section"
import { PortfolioNavbar } from "./portfolio-navbar"
import { ProfileSidebar } from "./profile-sidebar"
import { ServicesSection } from "./services-section"
import { TestimonialsSection } from "./testimonials-section"
import type { NavTab } from "./types"

export function VcardPortfolioView() {
	const [activeTab, setActiveTab] = useState<NavTab>("about")

	return (
		<div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-8 px-4 py-8 sm:px-6 sm:py-12 lg:flex-row lg:gap-10">
			{/* Left Profile Sidebar Card */}
			<ProfileSidebar />

			{/* Right Main Content Card */}
			<Card className="border-border/80 bg-card relative flex w-full flex-1 flex-col overflow-hidden rounded-3xl border p-0 shadow-2xl">
				{/* Top Header with Tab Navbar */}
				<div className="border-border/60 flex w-full justify-end border-b">
					<PortfolioNavbar activeTab={activeTab} onSelectTab={setActiveTab} />
				</div>

				{/* Card Body */}
				<CardContent className="flex flex-col gap-10 p-6 sm:p-8">
					{activeTab === "about" && (
						<>
							<AboutSection />
							<ServicesSection />
							<TestimonialsSection />
							<ClientsSection />
						</>
					)}

					{activeTab === "resume" && (
						<div className="flex flex-col gap-4">
							<h2 className="heading-4 text-foreground">Resume</h2>
							<div className="h-1.5 w-10 rounded-full bg-amber-400" />
							<p className="text-fg-secondary pt-2 text-sm">
								Over 8 years of experience designing and shipping digital
								products for high-growth tech companies and creative agencies.
							</p>
						</div>
					)}

					{activeTab === "portfolio" && (
						<div className="flex flex-col gap-4">
							<h2 className="heading-4 text-foreground">Portfolio</h2>
							<div className="h-1.5 w-10 rounded-full bg-amber-400" />
							<p className="text-fg-secondary pt-2 text-sm">
								Featured projects spanning responsive web apps, mobile UI/UX,
								and brand identity systems.
							</p>
						</div>
					)}

					{activeTab === "blog" && (
						<div className="flex flex-col gap-4">
							<h2 className="heading-4 text-foreground">Blog</h2>
							<div className="h-1.5 w-10 rounded-full bg-amber-400" />
							<p className="text-fg-secondary pt-2 text-sm">
								Articles on modern UI design, frontend architecture, and design
								systems.
							</p>
						</div>
					)}

					{activeTab === "contact" && (
						<div className="flex flex-col gap-4">
							<h2 className="heading-4 text-foreground">Contact</h2>
							<div className="h-1.5 w-10 rounded-full bg-amber-400" />
							<p className="text-fg-secondary pt-2 text-sm">
								Have a project in mind or want to collaborate? Feel free to
								reach out anytime.
							</p>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	)
}
