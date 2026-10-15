import React from "react"
import Image from "next/image"
import { Card } from "@/styles/default/ui/card"

export function HeroPreview() {
	return (
		<div className="relative mt-8 flex w-full flex-col items-center justify-end overflow-hidden sm:mt-10 md:mt-12">
			{/* Dashboard Preview Card — In the back (z-10) */}
			<div className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-4 sm:px-6 sm:pb-6 md:pb-8">
				<Card className="border-border/40 bg-card relative w-full overflow-hidden rounded-2xl border p-2 shadow-2xl backdrop-blur-xs sm:p-3">
					<Image
						src="/sandbox/placeholder.svg"
						alt="Dashboard Preview"
						width={1080}
						height={600}
						className="border-border/30 aspect-video h-auto w-full rounded-xl border object-cover"
						priority
					/>
				</Card>
			</div>

			{/* Foreground Rolling Meadow with Tree — In the front (z-20), always attached */}
			<div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 w-full overflow-hidden leading-none">
				<Image
					src="https://images.shadcnspace.com/assets/hero-img/bottom-tree-img.webp"
					alt="Rolling meadow with tree"
					width={1440}
					height={240}
					className="h-auto min-h-[140px] w-full object-cover sm:min-h-[180px] md:min-h-0"
					unoptimized
					priority
				/>
			</div>
		</div>
	)
}
