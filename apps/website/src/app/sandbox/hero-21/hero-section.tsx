"use client"

import React from "react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/styles/default/ui/button"
import { HeroNavbar } from "./hero-navbar"
import { LogoMarquee } from "./logo-marquee"
import { ReviewBadge } from "./review-badge"
import { ShowcaseGrid } from "./showcase-grid"

export function HeroSection() {
	return (
		<div className="bg-background text-foreground relative min-h-screen w-full overflow-hidden">
			{/* Pill Floating Navbar */}
			<HeroNavbar />

			{/* Main Hero Body */}
			<main className="mx-auto flex max-w-7xl flex-col items-center px-4 pb-12 pt-8 sm:px-8 sm:pt-12 md:pt-16 lg:px-16">
				{/* Top Reviews Avatar Cluster */}
				<div className="mb-6 flex justify-center sm:mb-8">
					<ReviewBadge />
				</div>

				{/* Hero Heading */}
				<div className="mx-auto mb-6 max-w-4xl text-center">
					<h1 className="heading-1 text-foreground text-center font-medium tracking-tight">
						Turning Great Ideas Into Strong Brand Identities
					</h1>
				</div>

				{/* Hero Subtitle */}
				<p className="text-fg-secondary mx-auto mb-8 max-w-xl text-center text-sm leading-relaxed sm:text-base md:mb-10 md:text-lg">
					A strategic brand experience crafted to shape bold ideas into
					powerful, recognizable identities that grow with your business.
				</p>

				{/* Call to Action Buttons */}
				<div className="sm:mb-18 mb-14 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
					<Button
						color="primary"
						variant="strong"
						size="44"
						className="group rounded-full px-6 text-sm font-semibold shadow-md sm:px-8"
						asChild>
						<Link href="#" className="flex items-center gap-2 hover:underline">
							<span>Start a Project — It&apos;s Free</span>
							<ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
						</Link>
					</Button>

					<Button
						color="neutral"
						variant="outline"
						size="44"
						className="rounded-full px-6 text-sm font-medium sm:px-8"
						asChild>
						<Link href="#" className="hover:underline">
							<span>Learn More</span>
						</Link>
					</Button>
				</div>

				{/* 3-Column Bento Showcase */}
				<div className="w-full">
					<ShowcaseGrid />
				</div>

				{/* Bottom Brands / Logo Strip */}
				<div className="mt-8 w-full sm:mt-12">
					<LogoMarquee />
				</div>
			</main>
		</div>
	)
}
