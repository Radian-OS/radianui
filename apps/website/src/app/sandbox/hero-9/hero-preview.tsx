import React from "react"
import Image from "next/image"

export function HeroPreview() {
	return (
		<div className="relative flex w-full items-center justify-center overflow-hidden bg-gradient-to-b from-cyan-500/25 via-teal-500/10 to-transparent p-4 sm:p-8 md:p-12">
			{/* Subtle background glow effect */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-x-1/4 -top-20 h-48 rounded-full bg-cyan-400/20 blur-3xl"
			/>

			{/* Console Dashboard Container holding placeholder image */}
			<div className="border-border/50 bg-card/80 relative w-full max-w-5xl rounded-xl border p-2 shadow-2xl backdrop-blur-xs sm:p-3">
				<Image
					src="/sandbox/placeholder.svg"
					alt="Dashboard Preview"
					width={1200}
					height={675}
					className="border-border/40 h-auto w-full rounded-lg border object-cover shadow-inner"
					priority
				/>
			</div>
		</div>
	)
}
