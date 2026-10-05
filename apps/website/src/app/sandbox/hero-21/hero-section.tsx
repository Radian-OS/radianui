"use client"

import React from "react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "motion/react"
import { HeroNavbar } from "./hero-navbar"
import { LogoMarquee } from "./logo-marquee"
import { ReviewBadge } from "./review-badge"
import { ShowcaseGrid } from "./showcase-grid"

const headingContainer = {
	hidden: { opacity: 1 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.02,
			delayChildren: 0.05,
		},
	},
}

const charVariants = {
	hidden: { opacity: 0, y: 10 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.4 },
	},
}

const contentFadeUp = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.65,
			ease: [0.16, 1, 0.3, 1],
			delay: 0.3,
		},
	},
}

export function HeroSection() {
	return (
		<div className="bg-bg text-fg relative min-h-screen w-full overflow-x-clip">
			{/* Sticky Pill Floating Navbar */}
			<HeroNavbar />

			{/* Main Hero Section */}
			<section className="bg-bg w-full overflow-hidden">
				<div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-5 sm:px-16 md:gap-14 md:py-12">
					<div className="flex flex-col items-center gap-4 text-center sm:gap-6 md:gap-8">
						{/* Top Reviews Badge */}
						<motion.div
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, ease: "easeOut" }}>
							<ReviewBadge />
						</motion.div>

						{/* Hero Heading: 60px (text-6xl) Medium Weight (font-medium) with Character-by-Character Stagger Animation */}
						<div className="mx-auto max-w-3xl text-center">
							<motion.h1
								variants={headingContainer}
								initial="hidden"
								animate="visible"
								className="mx-auto max-w-3xl text-center text-3xl leading-[1.1] font-medium tracking-tight text-[#030712] md:text-5xl lg:text-6xl dark:text-white">
								{"Turning Great Ideas Into Strong Brand Identities"
									.split("")
									.map((char, index) => (
										<motion.span key={index} variants={charVariants}>
											{char}
										</motion.span>
									))}
							</motion.h1>
						</div>

						{/* Hero Subtitle (#4B5563 exact color match) */}
						<motion.p
							variants={contentFadeUp}
							initial="hidden"
							animate="visible"
							className="max-w-xl text-center text-base leading-relaxed text-[#4B5563] md:text-lg dark:text-[#9CA3AF]">
							A strategic brand experience crafted to shape bold ideas into
							powerful, recognizable identities that grow with your business.
						</motion.p>

						{/* CTA Buttons with Expanding Bubble Hover & Arrow Rotation */}
						<motion.div
							variants={contentFadeUp}
							initial="hidden"
							animate="visible"
							className="flex flex-wrap items-center justify-center gap-3 pt-2 sm:pt-0">
							<Link href="#get-started">
								<button
									type="button"
									className="btn-hero-primary group inline-flex h-12 cursor-pointer items-center justify-center rounded-full border border-orange-400 bg-orange-400 px-6 text-sm font-medium text-white shadow-none">
									{/* Expanding circle background fill */}
									<span className="btn-bubble bg-white dark:bg-[#030712]" />
									{/* Button label & rotating arrow */}
									<span className="btn-label relative z-10 flex items-center gap-2">
										Start a Project — It&apos;s Free
										<ArrowRight className="btn-arrow size-4" />
									</span>
								</button>
							</Link>

							<Link href="#learn-more">
								<button
									type="button"
									className="btn-hero-secondary group inline-flex h-12 cursor-pointer items-center justify-center rounded-full border border-[#e4e4e7] bg-white px-6 text-sm font-medium text-[#030712] shadow-xs dark:border-[#27272a] dark:bg-[#030712] dark:text-white">
									{/* Expanding circle background fill */}
									<span className="btn-bubble bg-gray-950/40 dark:bg-gray-200" />
									{/* Button label */}
									<span className="btn-label relative z-10">Learn More</span>
								</button>
							</Link>
						</motion.div>
					</div>

					{/* 3-Column Showcase Cards Grid */}
					<motion.div
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, delay: 0.35 }}
						className="w-full">
						<ShowcaseGrid />
					</motion.div>
				</div>
			</section>

			{/* Brands Section with Animated Infinite Marquee */}
			<section className="bg-bg w-full">
				<LogoMarquee />
			</section>
		</div>
	)
}
