import * as React from "react"
import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/registry/ui/carousel"

export default function CarouselOrientation() {
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
		<div className="flex h-[500px] items-center justify-center">
			<Carousel
				opts={{
					align: "start",
				}}
				orientation="vertical"
				className="w-full max-w-xs">
				<CarouselContent className="-mt-1 h-[360px]">
					{images.map((image, index) => (
						<CarouselItem key={index} className="basis-1/2 pb-1">
							<div>
								<div className="flex h-full items-center justify-center overflow-hidden rounded-lg">
									<Image src={image.src} alt={image.alt} width={300} height={150} className="h-[150px] w-full object-cover" />
								</div>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</div>
	)
}
