import * as React from "react"
import Image from "next/image"
import { AspectRatio } from "@/registry/ui/aspect-ratio"
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/registry/ui/carousel"

export default function CarouselLoop() {
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
				loop: true,
			}}
			className="w-full max-w-sm">
			<CarouselContent>
				{images.map((image, index) => (
					<CarouselItem key={index} className="basis-1/2">
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
			<div className="mt-4 flex justify-center gap-2 sm:mt-0 sm:block">
				<CarouselPrevious className="static translate-y-0 sm:absolute sm:-translate-y-1/2" />
				<CarouselNext className="static translate-y-0 sm:absolute sm:-translate-y-1/2" />
			</div>
		</Carousel>
	)
}
