"use client"

import * as React from "react"
import Image from "next/image"
import { ScrollArea, ScrollBar } from "@/registry/ui/scroll-area"

const images = [
	{
		src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
		alt: "Mountain valley with river",
	},
	{
		src: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
		alt: "Forest with stream",
	},
	{
		src: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
		alt: "Red rock canyon",
	},
	{
		src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
		alt: "Green hills landscape",
	},
	{
		src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
		alt: "Snowy mountain peaks",
	},
]

export default function ScrollAreaHorizontalList() {
	return (
		<ScrollArea className="w-165 border-soft bg-bg overflow-hidden rounded-xl border p-4 [&_[data-slot=scroll-area-viewport]]:rounded-none">
			<div className="flex gap-5">
				{images.map((image, index) => (
					<div
						key={index}
						className="h-39.5 w-70 relative shrink-0 overflow-hidden rounded-lg">
						<Image
							src={image.src}
							alt={image.alt}
							fill
							className="object-cover"
						/>
					</div>
				))}
			</div>
			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	)
}
