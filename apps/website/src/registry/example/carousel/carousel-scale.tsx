import * as React from "react"
import { Carousel, type CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/registry/ui/carousel"

const TWEEN_FACTOR_BASE = 0.52

const numberWithinRange = (number: number, min: number, max: number): number => Math.min(Math.max(number, min), max)

export default function CarouselScale() {
	const [api, setApi] = React.useState<CarouselApi>()
	const tweenFactor = React.useRef(0)
	const tweenNodes = React.useRef<HTMLElement[]>([])

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

	const setTweenNodes = React.useCallback((emblaApi: CarouselApi): void => {
		if (!emblaApi) return
		tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
			return slideNode.querySelector(".embla__slide__number") as HTMLElement
		})
	}, [])

	const setTweenFactor = React.useCallback((emblaApi: CarouselApi) => {
		if (!emblaApi) return
		tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length
	}, [])

	const tweenScale = React.useCallback((emblaApi: CarouselApi) => {
		if (!emblaApi) return

		const engine = emblaApi.internalEngine()
		const scrollProgress = emblaApi.scrollProgress()

		emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
			let diffToTarget = scrollSnap - scrollProgress
			const slidesInSnap = engine.slideRegistry[snapIndex]

			slidesInSnap.forEach((slideIndex) => {
				if (engine.options.loop) {
					engine.slideLooper.loopPoints.forEach((loopItem) => {
						const target = loopItem.target()

						if (slideIndex === loopItem.index && target !== 0) {
							const sign = Math.sign(target)

							if (sign === -1) {
								diffToTarget = scrollSnap - (1 + scrollProgress)
							}
							if (sign === 1) {
								diffToTarget = scrollSnap + (1 - scrollProgress)
							}
						}
					})
				}

				const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current)
				const scale = numberWithinRange(tweenValue, 0, 1).toString()
				const tweenNode = tweenNodes.current[slideIndex]
				if (tweenNode) {
					tweenNode.style.transform = `scale(${scale})`
				}
			})
		})
	}, [])

	React.useEffect(() => {
		if (!api) return

		setTweenNodes(api)
		setTweenFactor(api)
		tweenScale(api)

		api.on("reInit", setTweenNodes).on("reInit", setTweenFactor).on("reInit", tweenScale).on("scroll", tweenScale).on("slideFocus", tweenScale)

		return () => {
			api.off("reInit", setTweenNodes)
			api.off("reInit", setTweenFactor)
			api.off("reInit", tweenScale)
			api.off("scroll", tweenScale)
			api.off("slideFocus", tweenScale)
		}
	}, [api, tweenScale, setTweenNodes, setTweenFactor])

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
						<div className="embla__slide__number flex aspect-square items-center justify-center transition-transform duration-100">
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
