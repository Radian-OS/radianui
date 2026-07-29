"use client"

import { useEffect, useState } from "react"
import {
	LayoutGrid,
	MonitorSmartphone,
	Sparkles,
	SunMoon,
	SwatchBook,
} from "lucide-react"
import Image from "next/image"
import { darkThemeVars, lightThemeVars } from "@/components/theme/theme-vars"
import { cn } from "@/lib/utils"
import { Badge, BadgeDot } from "@/registry/ui/badge"
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
} from "@/registry/ui/carousel"

const stats = [
	{ value: "2000+", label: "Variables & Design Tokens" },
	{ value: "4500+", label: "Components & Variants" },
	{ value: "100+", label: "UI Blocks & Templates" },
	{ value: "2,000+", label: "Icons & Assets" },
] as const

const featureItems = [
	{
		icon: SwatchBook,
		title: "Figma variable system",
		description:
			"Organized variable collections to edit colors, spacing, radius & typography.",
	},
	{
		icon: LayoutGrid,
		title: "Auto Layout",
		description:
			"Fully Built using Auto layout, from small components to UI Blocks.",
	},
	{
		icon: SunMoon,
		title: "Theme Modes",
		description:
			"Easily switch multiple color themes, with full light/dark mode support.",
	},
	{
		icon: MonitorSmartphone,
		title: "Responsive by Default",
		description:
			"Different frame designs ensuring they look great on any screen size.",
	},
] as const

export default function CarouselSection() {
	const [api, setApi] = useState<CarouselApi>()
	const [current, setCurrent] = useState(0)
	const [snapCount, setSnapCount] = useState<number>(featureItems.length)

	useEffect(() => {
		if (!api) return

		const updateCurrentSlide = () => {
			setCurrent(api.selectedScrollSnap())
			setSnapCount(api.scrollSnapList().length)
		}

		updateCurrentSlide()
		api.on("select", updateCurrentSlide)
		api.on("reInit", updateCurrentSlide)

		return () => {
			api.off("select", updateCurrentSlide)
			api.off("reInit", updateCurrentSlide)
		}
	}, [api])

	return (
		<section
			className="bg-bg text-fg dark relative z-20 w-full"
			style={darkThemeVars}>
			<div className="border-soft max-w-360 lg:pt-30 mx-auto flex w-full flex-col gap-12 border-x pt-12 sm:gap-16 sm:pt-14 lg:gap-20">
				<div className="flex w-full flex-col items-center justify-center gap-8 px-5 sm:px-8 lg:px-0">
					<Badge color="violet-blue" size="28" variant="soft">
						<BadgeDot className="text-violet-blue-text" />
						Design at Scale
					</Badge>
					<h3 className="heading-3 max-w-212.5 text-center font-medium max-sm:text-2xl max-sm:leading-9">
						More than just a component library.{" "}
						<span className="text-fg-secondary">
							A complete collection of design foundations, blocks, and assets
							built to work together.
						</span>
					</h3>
				</div>

				<div className="border-soft flex w-full flex-wrap border-y">
					{stats.map((stat, index) => (
						<div
							key={stat.label}
							className={cn(
								"border-soft px-2.75 flex w-1/2 flex-col items-center justify-center gap-3 py-8 text-center lg:w-1/4 lg:px-4",
								index < 2 && "border-b lg:border-b-0",
								index % 2 === 0 && "border-r",
								index === 1 && "lg:border-r"
							)}>
							<h4 className="heading-4">{stat.value}</h4>
							<span className="text-fg-secondary text-sm sm:text-base">
								{stat.label}
							</span>
						</div>
					))}
				</div>

				<div>
					Animation Section (No Fixed Height Now, will adjust according to
					animation)
				</div>
				<StripedDivider patternId="carousel-divider-primary" />
			</div>

			<div className="border-soft max-w-360 pt-30 mx-auto flex w-full flex-col gap-10 border-x pb-20 lg:gap-20">
				<div className="lg:px-15 flex flex-col gap-6 px-5 pb-5 sm:px-8">
					<Badge size="28" color="violet-blue" variant="soft">
						<Sparkles />
						Extended Build Experience
					</Badge>
					<h3 className="heading-3 max-w-225 font-medium">
						Built for modern product teams{" "}
						<span className="text-fg-tertiary">
							Extend your experience with more features to help you build better
							apps and products
						</span>
					</h3>
				</div>

				<div className="h-100 lg:h-160 relative flex w-full justify-center overflow-hidden">
					<div className="h-100 w-192 lg:h-160 lg:w-320 xl:w-330 relative shrink-0 overflow-hidden md:rounded-xl">
						<Image
							src="/carousel-home.png"
							fill
							sizes="(min-width: 1280px) 1320px, (min-width: 1024px) 1280px, 768px"
							alt="Radian design system interface examples"
							className="object-cover"
						/>
					</div>
					<ShowcaseFrame api={api} current={current} snapCount={snapCount} />
				</div>

				<div className="lg:px-15 px-5 sm:px-8">
					<Carousel
						opts={{
							align: "start",
							loop: true,
							slidesToScroll: 1,
							breakpoints: {
								"(min-width: 640px)": { slidesToScroll: 2 },
							},
						}}
						setApi={setApi}
						aria-label="Product feature highlights"
						className="w-full">
						<CarouselContent className="ml-0">
							{featureItems.map(({ icon: Icon, title, description }) => (
								<CarouselItem
									key={title}
									className="basis-full pl-0 sm:basis-1/2">
									<div className="flex h-full flex-col gap-8 pr-8">
										<Icon className="text-fg-tertiary size-6" />
										<div className="flex flex-col gap-3">
											<h4 className="font-medium">{title}</h4>
											<p className="text-fg-secondary">{description}</p>
										</div>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
					</Carousel>
				</div>
			</div>

			<div className="border-soft max-w-360 mx-auto w-full border-x">
				<StripedDivider patternId="carousel-divider-secondary" />
			</div>
		</section>
	)
}

function ShowcaseFrame({
	api,
	current,
	snapCount,
}: {
	api: CarouselApi | undefined
	current: number
	snapCount: number
}) {
	return (
		<>
			<div
				className="bg-fill1/30 max-w-240 absolute bottom-0 left-1/2 h-[92%] w-[calc(100%_-_24px)] -translate-x-1/2 overflow-hidden rounded-t-xl backdrop-blur-xl sm:h-[78%] sm:w-[78%] lg:h-[80%]"
				style={lightThemeVars}>
				<div className="absolute inset-x-2 bottom-0 top-2">
					<div
						className="bg-bg h-full w-full rounded-t-lg"
						style={darkThemeVars}
					/>
					<CarouselDots
						api={api}
						current={current}
						snapCount={snapCount}
						className="bottom-4 left-1/2 -translate-x-1/2 sm:hidden"
					/>
				</div>
			</div>

			<CarouselDots
				api={api}
				current={current}
				snapCount={snapCount}
				className="bottom-4 right-4 hidden sm:flex min-[1320px]:right-[calc((100%_-_1320px)/2_+_16px)]"
			/>
		</>
	)
}

function CarouselDots({
	api,
	current,
	snapCount,
	className,
}: {
	api: CarouselApi | undefined
	current: number
	snapCount: number
	className?: string
}) {
	return (
		<div
			className={cn(
				"bg-fg/30 absolute z-10 flex gap-1.5 rounded-full p-1.5 backdrop-blur-md",
				className
			)}>
			{Array.from({ length: snapCount }, (_, index) => (
				<button
					key={index}
					type="button"
					onClick={() => api?.scrollTo(index)}
					aria-label={`Go to slide ${index + 1}`}
					aria-current={current === index ? "true" : undefined}
					className={cn(
						"size-2 cursor-pointer rounded-full transition-colors",
						current === index ? "bg-fg" : "bg-fg-disabled"
					)}
				/>
			))}
		</div>
	)
}

function StripedDivider({ patternId }: { patternId: string }) {
	return (
		<svg
			aria-hidden="true"
			className="border-soft block h-[50px] w-full max-w-full overflow-hidden border-y"
			width="100%"
			height="50"
			preserveAspectRatio="none"
			xmlns="http://www.w3.org/2000/svg">
			<rect width="100%" height="100%" fill={`url(#${patternId})`} />
			<defs>
				<pattern
					id={patternId}
					width="9"
					height="9"
					patternUnits="userSpaceOnUse"
					patternTransform="rotate(35)">
					<line
						x1="0"
						y1="0"
						x2="0"
						y2="9"
						className="stroke-fill1-alpha"
						strokeWidth="1"
					/>
				</pattern>
			</defs>
		</svg>
	)
}
