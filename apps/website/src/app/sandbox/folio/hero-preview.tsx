import React from "react"
import Image from "next/image"
import { Card } from "@/styles/default/ui/card"

export function HeroPreview() {
	return (
		<div className="relative mt-6 flex w-full items-center justify-center">
			{/* Ambient atmospheric backdrop lighting */}
			<div
				aria-hidden="true"
				className="from-warning/10 via-success/10 to-primary/10 pointer-events-none absolute -top-16 h-72 w-4/5 rounded-full bg-gradient-to-r blur-3xl"
			/>

			{/* Dashboard Frame Container holding placeholder image */}
			<Card className="border-border/50 bg-card/70 relative w-full max-w-5xl overflow-hidden rounded-2xl border p-2.5 shadow-2xl backdrop-blur-xs sm:p-4">
				<Image
					src="/sandbox/placeholder.svg"
					alt="Folio Dashboard Preview"
					width={1200}
					height={675}
					className="border-border/30 h-auto w-full rounded-xl border object-cover shadow-lg"
					priority
				/>
			</Card>
		</div>
	)
}
