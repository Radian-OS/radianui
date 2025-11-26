import * as React from "react"
import { Carousel, type CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/registry/ui/carousel"

export default function CarouselAutoplay() {
	const [api, setApi] = React.useState<CarouselApi>()

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

	// Autoplay implementation
	React.useEffect(() => {
		if (!api) return

		const intervalId = setInterval(() => {
			api.scrollNext()
		}, 2000) // 2 seconds interval

		return () => clearInterval(intervalId)
	}, [api])

	return (
		<Carousel
			opts={{
				align: "start",
				loop: true,
			}}
			setApi={setApi}
			className="w-full max-w-sm">
			<CarouselContent>
				{images.map((image, index) => (
					<CarouselItem key={index}>
						<div className="flex aspect-square items-center justify-center">
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
