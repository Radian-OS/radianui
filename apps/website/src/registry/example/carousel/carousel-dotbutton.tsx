"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { AspectRatio } from "@/registry/ui/aspect-ratio"
import { CompactButton } from "@/registry/ui/button"
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/registry/ui/carousel"

export default function CarouselDotButton() {
	const [api, setApi] = React.useState<CarouselApi>()
	const [current, setCurrent] = React.useState(0)

	const images = [
		{
			src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80&auto=format",
			alt: "Mountain landscape",
		},
		{
			src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80&auto=format",
			alt: "Nature scenery",
		},
		{
			src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80&auto=format",
			alt: "Foggy forest",
		},
		{
			src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80&auto=format",
			alt: "Forest path",
		},
		{
			src: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&q=80&auto=format",
			alt: "Valley view",
		},
	]

	React.useEffect(() => {
		if (!api) return

		setCurrent(api.selectedScrollSnap())

		api.on("select", () => {
			setCurrent(api.selectedScrollSnap())
		})
	}, [api])

	return (
		<Carousel
			opts={{
				align: "start",
			}}
			setApi={setApi}
			className="w-full max-w-sm space-y-4">
			<CarouselContent>
				{images.map((image, index) => (
					<CarouselItem key={index}>
						<div className="p-1">
							<AspectRatio ratio={1 / 1} className="overflow-hidden rounded-lg">
								<Image
									src={image.src}
									alt={image.alt}
									fill
									className="object-cover"
								/>
							</AspectRatio>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />

			{/* Dot Buttons - All visible, color only on active */}
			<div className="flex justify-center gap-2">
				{images.map((_, index) => (
					<CompactButton
						key={index}
						color="neutral"
						onClick={() => api?.scrollTo(index)}
						className={cn(
							"h-2 w-2 cursor-pointer rounded-full transition-colors",
							current === index ? "bg-primary" : "bg-gray-300"
						)}
						aria-label={`Go to slide ${index + 1}`}>
						<span className="sr-only">Go to slide {index + 1}</span>
					</CompactButton>
				))}
			</div>
		</Carousel>
	)
}
