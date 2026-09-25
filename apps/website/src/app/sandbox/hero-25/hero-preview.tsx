import React from "react"
import Image from "next/image"
import { Card } from "@/styles/default/ui/card"

export function HeroPreview() {
	return (
		<div className="relative z-0 mt-2 flex w-full justify-center pb-16 sm:pb-24 md:pb-36 lg:pb-44">
			<Card className="border-border/40 bg-card relative w-full max-w-4xl overflow-hidden rounded-2xl border p-2 shadow-2xl backdrop-blur-xs sm:p-3">
				<Image
					src="/sandbox/placeholder.svg"
					alt="Dashboard Preview"
					width={800}
					height={250}
					className="border-border/30 aspect-video h-auto w-full rounded-xl border object-cover"
					priority
				/>
			</Card>
		</div>
	)
}
