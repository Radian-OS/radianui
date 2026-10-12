"use client"

import React from "react"
import { VoiceAuraWaveform } from "./voice-aura-waveform"
import { ImpressionsCard } from "./impressions-card"

export function LoginDashboardCard() {
	return (
		<div className="relative flex h-full min-h-[640px] items-center overflow-hidden bg-[#F4F4F6]">
			{/* Live Animated Soundwave & Halftone Aura (motion/react Canvas) */}
			<div className="absolute inset-0 z-0">
				<VoiceAuraWaveform />
			</div>

			{/* Impressions UI Card (Moved to the right with 25% cut off past right edge) */}
			<div className="absolute top-1/2 right-0 z-10 w-[480px] translate-x-1/4 -translate-y-1/2 sm:w-[540px] lg:w-[580px]">
				<ImpressionsCard />
			</div>
		</div>
	)
}
