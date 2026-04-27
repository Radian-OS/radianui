import * as React from "react"
import Image from "next/image"
import { AspectRatio } from "@/styles/default/ui/aspect-ratio"
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/styles/default/ui/carousel"

export default function CarouselSize() {
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

	return (
		<Carousel
			opts={{
				align: "start",
			}}
			className="w-full max-w-sm">
			<CarouselContent>
				{images.map((image, index) => (
					<CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
						<AspectRatio
							ratio={1 / 1}
							className="flex items-center justify-center">
							<Image
								src={image.src}
								alt={image.alt}
								fill
								className="rounded-2xl object-cover"
							/>
						</AspectRatio>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	)
}
