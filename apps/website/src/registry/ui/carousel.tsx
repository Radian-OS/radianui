"use client"

import * as React from "react"
import useEmblaCarousel, {
	type UseEmblaCarouselType,
} from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { IconButton } from "@/registry/ui/button"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
	opts?: CarouselOptions
	plugins?: CarouselPlugin
	orientation?: "horizontal" | "vertical"
	setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
	carouselRef: ReturnType<typeof useEmblaCarousel>[0]
	api: ReturnType<typeof useEmblaCarousel>[1]
	scrollPrev: () => void
	scrollNext: () => void
	canScrollPrev: boolean
	canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
	const context = React.useContext(CarouselContext)

	if (!context) {
		throw new Error("useCarousel must be used within a <Carousel />")
	}

	return context
}

function Carousel({
	orientation = "horizontal",
	opts,
	setApi,
	plugins,
	className,
	children,
	...props
}: React.ComponentProps<"div"> & CarouselProps) {
	const [carouselRef, api] = useEmblaCarousel(
		{
			...opts,
			axis: orientation === "horizontal" ? "x" : "y",
		},
		plugins
	)
	const [canScrollPrev, setCanScrollPrev] = React.useState(false)
	const [canScrollNext, setCanScrollNext] = React.useState(false)

	const onSelect = React.useCallback((api: CarouselApi) => {
		if (!api) return
		setCanScrollPrev(api.canScrollPrev())
		setCanScrollNext(api.canScrollNext())
	}, [])

	const scrollPrev = React.useCallback(() => {
		api?.scrollPrev()
	}, [api])

	const scrollNext = React.useCallback(() => {
		api?.scrollNext()
	}, [api])

	const handleKeyDown = React.useCallback(
		(event: React.KeyboardEvent<HTMLDivElement>) => {
			if (event.key === "ArrowLeft") {
				event.preventDefault()
				scrollPrev()
			} else if (event.key === "ArrowRight") {
				event.preventDefault()
				scrollNext()
			}
		},
		[scrollPrev, scrollNext]
	)

	React.useEffect(() => {
		if (!api || !setApi) return
		setApi(api)
	}, [api, setApi])

	React.useEffect(() => {
		if (!api) return
		onSelect(api)
		api.on("reInit", onSelect)
		api.on("select", onSelect)

		return () => {
			api?.off("select", onSelect)
		}
	}, [api, onSelect])

	return (
		<CarouselContext.Provider
			value={{
				carouselRef,
				api: api,
				opts,
				orientation:
					orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
				scrollPrev,
				scrollNext,
				canScrollPrev,
				canScrollNext,
			}}>
			<div
				onKeyDownCapture={handleKeyDown}
				className={cn("relative", className)}
				role="region"
				aria-roledescription="carousel"
				data-slot="carousel"
				{...props}>
				{children}
			</div>
		</CarouselContext.Provider>
	)
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
	const { carouselRef, orientation } = useCarousel()

	return (
		<div
			ref={carouselRef}
			className="overflow-hidden"
			data-slot="carousel-content">
			<div
				className={cn(
					"flex",
					orientation === "horizontal"
						? "cn-carousel-content-horizontal"
						: "cn-carousel-content-vertical",
					className
				)}
				{...props}
			/>
		</div>
	)
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
	const { orientation } = useCarousel()

	return (
		<div
			role="group"
			aria-roledescription="slide"
			data-slot="carousel-item"
			className={cn(
				"min-w-0 shrink-0 grow-0 basis-full",
				orientation === "horizontal"
					? "cn-carousel-item-horizontal"
					: "cn-carousel-item-vertical",
				className
			)}
			{...props}
		/>
	)
}

function CarouselPrevious({
	className,
	variant = "outline",
	color = "neutral",
	size = "32",
	children,
	...props
}: Omit<React.ComponentProps<typeof IconButton>, "children"> & {
	children?: React.ReactNode
}) {
	const { orientation, scrollPrev, canScrollPrev } = useCarousel()

	return (
		<IconButton
			data-slot="carousel-previous"
			variant={variant}
			size={size}
			color={color}
			className={cn(
				"cn-carousel-previous absolute",
				orientation === "horizontal"
					? "-left-12 top-1/2 -translate-y-1/2"
					: "-top-12 left-1/2 -translate-x-1/2 rotate-90",
				className
			)}
			disabled={!canScrollPrev}
			onClick={scrollPrev}
			aria-label="Previous Button"
			{...props}>
			{children ?? <ChevronLeft />}
			<span className="sr-only">Previous slide</span>
		</IconButton>
	)
}

function CarouselNext({
	className,
	variant = "outline",
	color = "neutral",
	size = "32",
	children,
	...props
}: Omit<React.ComponentProps<typeof IconButton>, "children"> & {
	children?: React.ReactNode
}) {
	const { orientation, scrollNext, canScrollNext } = useCarousel()

	return (
		<IconButton
			data-slot="carousel-next"
			variant={variant}
			color={color}
			aria-label="Next Button"
			size={size}
			className={cn(
				"cn-carousel-next absolute",
				orientation === "horizontal"
					? "-right-12 top-1/2 -translate-y-1/2"
					: "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
				className
			)}
			disabled={!canScrollNext}
			onClick={scrollNext}
			{...props}>
			{children ?? <ChevronRight />}
			<span className="sr-only">Next slide</span>
		</IconButton>
	)
}

export {
	type CarouselApi,
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
}
