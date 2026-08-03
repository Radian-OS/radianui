"use client"

import { useRef, useState } from "react"
import type { ReactNode } from "react"
import {
	Blocks,
	Braces,
	CaseLower,
	CloudCog,
	Cuboid,
	FileCode,
	GalleryVertical,
	LayoutGrid,
	Palette,
	Sparkles,
	SunMoon,
	SwatchBook,
	Users,
} from "lucide-react"
import dynamic from "next/dynamic"
import Image from "next/image"
import SvgDivider from "@/components/home/SvgDivider"
import { darkThemeVars, lightThemeVars } from "@/components/theme/theme-vars"
import { cn } from "@/lib/utils"
import { Badge, BadgeDot } from "@/registry/ui/badge"

const Card6Animation = dynamic(
	() => import("./card-6-animation").then((module) => module.Card6Animation),
	{ ssr: false }
)

const stats = [
	{ value: "604", label: "Variables & Design Tokens" },
	{ value: "1,668", label: "Components & Variants" },
	{ value: "207", label: "UI Blocks & Templates" },
	{ value: "2,564", label: "Icons & Assets" },
] as const

const featureItems = [
	{
		icon: SwatchBook,
		title: "Figma Variable System",
		description:
			"Manage consistent design tokens across color, spacing, and typography",
	},
	{
		icon: Braces,
		title: "Simplified Global CSS",
		description:
			"Streamline your styles with a minimal global CSS layer for easy customization",
	},
	{
		icon: Users,
		title: "Open Source",
		description:
			"Being open source allows for teams to access full code and build on top of it",
	},
	{
		icon: SunMoon,
		title: "Theme Modes",
		description:
			"Switch effortlessly between light and dark themes, or create custom themes",
	},
	{
		icon: LayoutGrid,
		title: "Auto Layout",
		description:
			"Create scalable and flexible designs that adapt to any screen size automatically",
	},
	{
		icon: Palette,
		title: "Color Presets",
		description:
			"Use predefined color palettes to maintain harmony & visual consistency",
	},
	{
		icon: FileCode,
		title: "Type Safe Components",
		description:
			"Eliminate code errors with strongly typed UI components for developers",
	},
	{
		icon: Cuboid,
		title: "Growing Block Library",
		description:
			"Expanding collection of ready-to-use UI blocks to speed up your workflow.",
	},
	{
		icon: CaseLower,
		title: "Responsive Typography",
		description:
			"Ensure consistent, legible text across devices with an adaptive type system",
	},
	{
		icon: GalleryVertical,
		title: "Motion Components",
		description:
			"Bring your interfaces to life with smooth, modern motion and interaction patterns",
	},
	{
		icon: Blocks,
		title: "Composable System",
		description:
			"Composable components allows you to easily tweak and adjust components",
	},
	{
		icon: CloudCog,
		title: "Minimal Dependencies",
		description:
			"Keep your stack lightweight and efficient with components built for minimal setup",
	},
] as const

const featureItemsPerPage = 4
const featurePageCount = Math.ceil(featureItems.length / featureItemsPerPage)
const featurePageVideos = [
	{
		src: "/video/variable-theme-modes.mov",
		label: "Variable system and theme modes demonstration",
	},
	{
		src: "/video/color-preset-blocks.mov",
		label: "Color presets and UI blocks demonstration",
	},
	{
		src: "/video/responsive-typography-blocks.mov",
		label: "Responsive typography and components demonstration",
	},
] as const

export default function CarouselSection() {
	const [current, setCurrent] = useState(0)
	const swipeStart = useRef<{
		pointerId: number
		x: number
		y: number
	} | null>(null)
	const handleSwipeStart = (event: React.PointerEvent<HTMLDivElement>) => {
		if (!event.isPrimary) return

		swipeStart.current = {
			pointerId: event.pointerId,
			x: event.clientX,
			y: event.clientY,
		}
	}

	const handleSwipeEnd = (event: React.PointerEvent<HTMLDivElement>) => {
		const start = swipeStart.current
		swipeStart.current = null

		if (!start || start.pointerId !== event.pointerId) return

		const distanceX = event.clientX - start.x
		const distanceY = event.clientY - start.y
		const isTap = Math.abs(distanceX) <= 12 && Math.abs(distanceY) <= 12

		if (isTap) {
			setCurrent((page) => (page + 1) % featurePageCount)
			return
		}

		if (
			Math.abs(distanceX) < 48 ||
			Math.abs(distanceX) <= Math.abs(distanceY)
		) {
			return
		}

		setCurrent(
			(page) =>
				(page + (distanceX < 0 ? 1 : -1) + featurePageCount) % featurePageCount
		)
	}

	return (
		<section
			aria-label="Radian design system capabilities"
			className="bg-bg text-fg dark relative z-20 w-full"
			style={darkThemeVars}>
			<div className="border-soft max-w-360 mx-auto flex w-full flex-col border-x">
				<SectionHeader
					headingId="design-at-scale-title"
					centered
					badge={
						<Badge color="violet-blue" size="28" variant="soft">
							<BadgeDot className="text-violet-blue-text" />
							Design at Scale
						</Badge>
					}
					title="More than just a component library."
					description="A complete collection of design foundations, blocks, and assets built to work together."
				/>

				<dl className="border-soft flex w-full flex-wrap border-y">
					{stats.map((stat, index) => (
						<div
							key={stat.label}
							className={cn(
								"border-soft px-2.75 flex w-1/2 flex-col items-center justify-center gap-3 py-8 text-center lg:w-1/4 lg:px-4",
								index < 2 && "border-b lg:border-b-0",
								index % 2 === 0 && "border-r",
								index === 1 && "lg:border-r"
							)}>
							<dt className="text-fg-secondary order-2 text-sm sm:text-base">
								{stat.label}
							</dt>
							<dd className="heading-4 order-1">{stat.value}</dd>
						</div>
					))}
				</dl>

				<div className="flex w-full flex-col">
					<div className="w-full" data-nosnippet aria-hidden="true">
						<Card6Animation />
					</div>
					<SvgDivider className="border-soft hidden w-full border-y sm:block" />
					<SvgDivider
						className="border-soft block w-full border-y sm:hidden"
						height={32}
						viewBox="0 0 1440 32"
					/>
				</div>
			</div>

			<div className="border-soft max-w-360 mx-auto flex w-full flex-col border-x pb-20">
				<SectionHeader
					headingId="product-teams-title"
					badge={
						<Badge size="28" color="violet-blue" variant="soft">
							<Sparkles />
							Extended Build Experience
						</Badge>
					}
					title="Built for modern product teams"
					description="Extend your experience with more features to help you build better apps and products"
				/>

				<div
					className="lg:h-160 relative flex aspect-[2640/1948] h-auto w-full touch-pan-y justify-center overflow-hidden lg:aspect-auto"
					onPointerCancelCapture={() => {
						swipeStart.current = null
					}}
					onPointerDownCapture={handleSwipeStart}
					onPointerUpCapture={handleSwipeEnd}>
					<div className="lg:h-160 lg:w-320 xl:w-330 relative aspect-[2640/1948] h-auto w-full shrink-0 overflow-hidden md:rounded-xl lg:aspect-auto">
						<Image
							src="/carousel-home.png"
							fill
							sizes="(min-width: 1280px) 1320px, (min-width: 1024px) 1280px, 768px"
							alt="Radian design system interface examples"
							className="object-cover"
						/>
					</div>
					<ShowcaseFrame
						current={current}
						pageCount={featurePageCount}
						onPageChange={setCurrent}
					/>
				</div>

				<div className="lg:px-15 px-5 pt-10 sm:px-10 lg:pt-20">
					<div
						aria-live="polite"
						aria-label={`Product feature highlights, page ${current + 1} of ${featurePageCount}`}
						className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
						{featureItems.map(({ icon: Icon, title, description }, index) => (
							<article
								key={title}
								className={cn(
									"flex min-w-0 items-start gap-6 sm:flex-col sm:gap-8",
									Math.floor(index / featureItemsPerPage) !== current &&
										"hidden"
								)}>
								<Icon className="text-fg-tertiary size-6 shrink-0" />
								<div className="flex min-w-0 flex-col gap-2 sm:gap-3">
									<h3 className="font-medium">{title}</h3>
									<p className="text-fg-secondary line-clamp-2 min-h-10 text-sm leading-5">
										{description}
									</p>
								</div>
							</article>
						))}
					</div>
				</div>
			</div>

			<div className="border-soft max-w-360 mx-auto w-full border-x">
				<SvgDivider className="border-soft hidden w-full border-y sm:block" />
				<SvgDivider
					className="border-soft block w-full border-y sm:hidden"
					height={32}
					viewBox="0 0 1440 32"
				/>
			</div>
		</section>
	)
}

function SectionHeader({
	headingId,
	badge,
	title,
	description,
	centered = false,
}: {
	headingId: string
	badge: ReactNode
	title: string
	description: string
	centered?: boolean
}) {
	const headingClassName =
		"heading-3 text-[24px] font-medium leading-[36px] md:text-[36px] md:leading-[44px] lg:text-[40px] lg:leading-[52px]"

	return (
		<div
			className={cn(
				"lg:px-15 lg:py-30 flex w-full flex-col gap-4 px-5 py-16 sm:gap-6 sm:px-10",
				centered && "items-center"
			)}>
			{badge}
			<div className="w-full max-w-[950px]">
				<h2
					id={headingId}
					className={cn(headingClassName, centered && "text-center")}>
					{title}{" "}
					<span className={cn(headingClassName, "text-fg-secondary")}>
						{description}
					</span>
				</h2>
			</div>
		</div>
	)
}

function ShowcaseFrame({
	current,
	pageCount,
	onPageChange,
}: {
	current: number
	pageCount: number
	onPageChange: (index: number) => void
}) {
	const video = featurePageVideos[current] ?? featurePageVideos[0]

	return (
		<>
			<div
				className="bg-fill1/30 max-w-240 absolute bottom-0 left-1/2 aspect-video h-auto w-[calc(100%_-_24px)] -translate-x-1/2 overflow-hidden rounded-t-xl backdrop-blur-xl sm:w-[78%] lg:aspect-auto lg:h-[80%]"
				style={lightThemeVars}>
				<div className="absolute inset-x-2 bottom-0 top-2">
					<div
						className="bg-bg h-full w-full overflow-hidden rounded-t-lg"
						style={darkThemeVars}>
						<video
							key={video.src}
							autoPlay
							loop
							muted
							playsInline
							preload="metadata"
							aria-label={video.label}
							className="pointer-events-none h-full w-full object-contain lg:object-cover">
							<source src={video.src} />
						</video>
					</div>
					<CarouselDots
						current={current}
						pageCount={pageCount}
						onPageChange={onPageChange}
						className="bottom-4 left-1/2 -translate-x-1/2 lg:hidden"
					/>
				</div>
			</div>

			<CarouselDots
				current={current}
				pageCount={pageCount}
				onPageChange={onPageChange}
				className="bottom-4 right-4 hidden lg:flex min-[1320px]:right-[calc((100%_-_1320px)/2_+_16px)]"
			/>
		</>
	)
}

function CarouselDots({
	current,
	pageCount,
	onPageChange,
	className,
}: {
	current: number
	pageCount: number
	onPageChange: (index: number) => void
	className?: string
}) {
	return (
		<div
			className={cn(
				"bg-fg/30 absolute z-10 flex gap-1.5 rounded-full p-1.5 backdrop-blur-md",
				className
			)}>
			{Array.from({ length: pageCount }, (_, index) => (
				<button
					key={index}
					type="button"
					onClick={() => onPageChange(index)}
					aria-label={`Show feature group ${index + 1}`}
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
