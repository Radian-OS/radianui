import React from "react"
import Image from "next/image"
import { Card } from "@/styles/default/ui/card"

export function HeroPreview() {
	return (
		<div className="relative mt-4 flex w-full items-center justify-center">
			{/* Ambient background glow */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -top-12 h-64 w-3/4 rounded-full bg-blue-500/20 blur-3xl"
			/>

			{/* Blue gradient showcase container */}
			<Card className="relative w-full max-w-6xl overflow-hidden rounded-3xl border border-blue-500/30 bg-gradient-to-b from-blue-600 via-blue-600/90 to-blue-800/80 p-3 shadow-2xl shadow-blue-500/20 sm:p-5 md:p-6">
				<Image
					src="/sandbox/placeholder.svg"
					alt="Dashboard Preview"
					width={1200}
					height={675}
					className="h-auto w-full rounded-2xl border border-white/10 object-cover shadow-2xl"
					priority
				/>
			</Card>
		</div>
	)
}
