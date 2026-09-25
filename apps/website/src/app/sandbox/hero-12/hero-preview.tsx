import React from "react"
import Image from "next/image"
import { Card } from "@/styles/default/ui/card"

export function HeroPreview() {
	return (
		<div className="relative mt-4 flex w-full items-center justify-center">
			{/* Ambient background glow */}
			<div
				aria-hidden="true"
				className="bg-primary/20 pointer-events-none absolute -top-12 h-64 w-3/4 rounded-full blur-3xl"
			/>

			{/* Gradient showcase container */}
			<Card className="border-primary-border/30 shadow-primary/20 from-primary via-primary/90 to-primary/80 relative w-full max-w-6xl overflow-hidden rounded-3xl border bg-gradient-to-b p-3 shadow-2xl sm:p-5 md:p-6">
				<Image
					src="/sandbox/placeholder.svg"
					alt="Dashboard Preview"
					width={1200}
					height={300}
					className="h-auto w-full rounded-2xl border border-white/10 object-cover shadow-2xl"
					priority
				/>
			</Card>
		</div>
	)
}
