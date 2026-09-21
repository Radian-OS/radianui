import React from "react"
import Image from "next/image"
import { ActionCard } from "./action-card"
import { HeroContent } from "./hero-content"

export default function Cta08Page() {
	return (
		<div className="flex min-h-[650px] w-full items-center justify-center bg-black/95 px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
			{/* Main Banner Container */}
			<div className="relative w-full max-w-6xl overflow-hidden rounded-3xl border border-zinc-800/80 shadow-2xl">
				{/* Background Scenic Landscape Image */}
				<Image
					src="https://images.shadcnspace.com/assets/backgrounds/cta-08-bg.webp"
					alt="Scenic landscape background"
					fill
					priority
					sizes="(max-width: 1280px) 100vw, 1200px"
					className="object-cover"
				/>

				{/* Subtle Dark Overlay for Contrast & Readability */}
				<div className="absolute inset-0 bg-black/25" />

				{/* Foreground Content Stack */}
				<div className="relative flex flex-col gap-10 px-6 pt-12 pb-6 sm:gap-16 lg:px-16 lg:pt-20 lg:pb-10">
					{/* Centered Hero Section */}
					<HeroContent />

					{/* Bottom Floating Action Card */}
					<ActionCard />
				</div>
			</div>
		</div>
	)
}
