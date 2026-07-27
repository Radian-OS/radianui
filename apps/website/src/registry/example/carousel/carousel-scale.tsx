"use client"

import * as React from "react"
import Image from "next/image"
import { AspectRatio } from "@/registry/ui/aspect-ratio"
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/registry/ui/carousel"

const BASE_TWEEN = 1

const clamp = (n: number, min: number, max: number) =>
	Math.min(Math.max(n, min), max)

export default function CarouselScale() {
	const [api, setApi] = React.useState<CarouselApi>()
	const tweenFactor = React.useRef(0)
	const slideNodes = React.useRef<HTMLElement[]>([])
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

	// cache slide nodes once
	const registerSlides = React.useCallback((embla: CarouselApi) => {
		if (!embla) return
		slideNodes.current = embla
			.slideNodes()
			.map((slide) => slide.querySelector(".scale-wrap") as HTMLElement)
	}, [])

	const setFactor = React.useCallback((embla: CarouselApi) => {
		if (!embla) return
		tweenFactor.current = BASE_TWEEN * embla.scrollSnapList().length
	}, [])

	const applyScale = React.useCallback((embla: CarouselApi) => {
		if (!embla) return

		const progress = embla.scrollProgress()
		const snaps = embla.scrollSnapList()
		const engine = embla.internalEngine()
		const tf = tweenFactor.current

		snaps.forEach((snap, snapIndex) => {
			let diff = snap - progress
			const slides = engine.slideRegistry[snapIndex]

			slides.forEach((slideIndex) => {
				// smoother looping math
				if (engine.options.loop) {
					engine.slideLooper.loopPoints.forEach((loopItem) => {
						if (slideIndex === loopItem.index) {
							const target = loopItem.target()
							if (target > 0) diff = snap + (1 - progress)
							if (target < 0) diff = snap - (1 + progress)
						}
					})
				}

				const node = slideNodes.current[slideIndex]
				if (!node) return

				const v = clamp(1 - Math.abs(diff) * tf * 0.8, 0.4, 1) // locked to avoid flicker and 0.5 is image size
				node.style.transform = `scale(${v})`
			})
		})
	}, [])

	React.useEffect(() => {
		if (!api) return

		registerSlides(api)
		setFactor(api)
		applyScale(api)

		api
			.on("reInit", registerSlides)
			.on("reInit", setFactor)
			.on("reInit", applyScale)
			.on("scroll", applyScale)
			.on("slideFocus", applyScale)

		return () => {
			api.off("reInit", registerSlides)
			api.off("reInit", setFactor)
			api.off("reInit", applyScale)
			api.off("scroll", applyScale)
			api.off("slideFocus", applyScale)
		}
	}, [api])

	return (
		<Carousel
			opts={{
				align: "center",
				loop: true,
			}}
			setApi={setApi}
			className="w-full max-w-xl">
			<CarouselContent className="-ml-2 md:-ml-4">
				{images.map((image, index) => (
					<CarouselItem key={index} className="basis-1/3 pl-2 md:pl-4">
						<AspectRatio
							ratio={1 / 1}
							className="scale-wrap duration-50 flex items-center justify-center transition-transform will-change-transform">
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
