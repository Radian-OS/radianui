import React from "react"
import Image from "next/image"

export function HeroBackground() {
	return (
		<>
			{/* Sky lighting gradient */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(59,130,246,0.12)_0%,rgba(252,211,77,0.06)_100%)]"
			/>

			{/* Background clouds */}
			<Image
				src="https://images.shadcnspace.com/assets/hero-img/left-cloud.png"
				alt="Cloud"
				width={477}
				height={318}
				className="pointer-events-none absolute top-12 left-0 -z-10 h-auto w-auto opacity-70"
				unoptimized
			/>
			<Image
				src="https://images.shadcnspace.com/assets/hero-img/right-cloud.png"
				alt="Cloud"
				width={477}
				height={318}
				className="pointer-events-none absolute top-4 right-0 -z-10 h-auto w-auto opacity-70"
				unoptimized
			/>

			{/* Foreground rolling green hill and tree */}
			<div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 w-full overflow-hidden leading-none">
				<Image
					src="https://images.shadcnspace.com/assets/hero-img/bottom-tree-img.webp"
					alt="Rolling meadow with tree"
					width={1440}
					height={240}
					className="h-auto w-full object-cover"
					unoptimized
				/>
			</div>
		</>
	)
}
