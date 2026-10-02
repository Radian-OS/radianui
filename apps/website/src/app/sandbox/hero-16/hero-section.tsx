"use client"

import React from "react"
import { HeroContent } from "./hero-content"

export function HeroSection() {
	return (
		<section className="border-border bg-bg relative w-full border-y">
			<div className="mx-auto max-w-7xl px-4 lg:px-8 xl:px-16">
				<div className="border-border relative isolate overflow-hidden border-x px-4 py-12 sm:px-6 sm:py-16 md:py-24 lg:px-10">
					{/* Background Atmospheric AI Ribbon Video (Light & Dark) */}
					<video
						className="pointer-events-none absolute top-0 left-0 z-0 h-full w-full object-cover opacity-60 sm:-right-36 sm:left-auto sm:opacity-100 dark:hidden"
						autoPlay
						loop
						muted
						playsInline
						aria-label="3D AI Ribbon Animation">
						<source
							src="https://images.shadcnspace.com/assets/video/hero-16-vid-white.mp4"
							type="video/mp4"
						/>
					</video>

					<video
						className="pointer-events-none absolute top-0 left-0 z-0 hidden h-full w-full object-cover opacity-60 sm:-right-36 sm:left-auto sm:opacity-100 dark:block"
						autoPlay
						loop
						muted
						playsInline
						aria-label="3D AI Ribbon Dark Animation">
						<source
							src="https://images.shadcnspace.com/assets/video/hero-16-vid.mp4"
							type="video/mp4"
						/>
					</video>

					{/* Left-Aligned Hero Content */}
					<div className="relative z-10">
						<HeroContent />
					</div>
				</div>
			</div>
		</section>
	)
}
