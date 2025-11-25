import * as React from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/registry/ui/carousel"

export default function CarouselSpace() {
	const images = [
		{
			src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
			alt: "Mountain landscape",
		},
		{
			src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
			alt: "Nature scenery",
		},
		{
			src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
			alt: "Foggy forest",
		},
		{
			src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
			alt: "Forest path",
		},
		{
			src: "https://images.unsplash.com/photo-1426604966848-d7adac402bff",
			alt: "Valley view",
		},
	]
	return (
		<Carousel
			opts={{
				align: "start",
			}}
			className="w-full max-w-sm">
			<CarouselContent className="-ml-3">
				{images.map((image, index) => (
					<CarouselItem key={index} className="pl-3 md:basis-1/2 lg:basis-1/3">
						<div className="flex aspect-square items-center justify-center p-2">
							<img src={image.src} alt={image.alt} className="h-full w-full rounded-2xl object-cover" />
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	)
}
