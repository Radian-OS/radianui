"use client"

import React from "react"
import Image from "next/image"

export function AiworkDashboardMockup() {
	return (
		<div className="border-border/80 bg-fill1/40 relative mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border p-2 shadow-2xl backdrop-blur-sm sm:p-3">
			<div className="border-border/60 bg-background relative aspect-[3720/2790] w-full overflow-hidden rounded-xl border shadow-inner">
				<Image
					src="https://framerusercontent.com/images/vFLahD4B0lzbZNL7j32nBF9k5E.png"
					alt="AIwork Dashboard Mockup"
					fill
					sizes="(min-width: 1280px) 1024px, 100vw"
					className="object-contain"
					priority
				/>
			</div>
		</div>
	)
}
