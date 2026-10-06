import React from "react"
import { AnimatedCtaButton } from "./animated-cta-button"
import { CtaHeader } from "./cta-header"

export default function Cta07Page() {
	return (
		<div className="bg-bg relative flex min-h-[600px] w-full items-center justify-center overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
			{/* Bottom Radial Glow */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute bottom-0 left-1/2 h-[420px] w-[800px] -translate-x-1/2 sm:w-[960px]">
				<div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_bottom,color-mix(in_srgb,var(--color-primary)_30%,transparent)_0%,color-mix(in_srgb,var(--color-primary)_12%,transparent)_45%,transparent_70%)] blur-3xl" />
			</div>

			{/* Centered Content Stack */}
			<div className="relative z-10 flex max-w-4xl flex-col items-center justify-center gap-8 text-center sm:gap-10">
				<CtaHeader />
				<AnimatedCtaButton />
			</div>
		</div>
	)
}
