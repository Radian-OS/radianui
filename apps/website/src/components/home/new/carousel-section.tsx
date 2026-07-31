"use client"

import { useEffect, useState } from "react"
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
import Image from "next/image"
import SvgDivider from "@/components/home/SvgDivider"
import { darkThemeVars, lightThemeVars } from "@/components/theme/theme-vars"
import { cn } from "@/lib/utils"
import { Badge, BadgeDot } from "@/registry/ui/badge"
import { Card6Animation } from "./card-6-animation"

const stats = [
	{ value: "2000+", label: "Variables & Design Tokens" },
	{ value: "4500+", label: "Components & Variants" },
	{ value: "100+", label: "UI Blocks & Templates" },
	{ value: "2,000+", label: "Icons & Assets" },
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

export default function CarouselSection() {
	const [current, setCurrent] = useState(0)
	const visibleFeatureItems = featureItems.slice(
		current * featureItemsPerPage,
		(current + 1) * featureItemsPerPage
	)

	useEffect(() => {
		const interval = window.setInterval(() => {
			setCurrent((page) => (page + 1) % featurePageCount)
		}, 6000)

		return () => window.clearInterval(interval)
	}, [])

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

				<div className="flex w-full flex-col">
					<Card6Animation />
					<SvgDivider
						height={50}
						viewBox="0 0 1440 50"
						preserveAspectRatio="none"
						className="border-soft block h-[50px] w-full border-y"
					/>
				</div>
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
					<ShowcaseFrame
						current={current}
						pageCount={featurePageCount}
						onPageChange={setCurrent}
					/>
				</div>

				<div className="lg:px-15 px-5 sm:px-8">
					<div
						aria-live="polite"
						aria-label={`Product feature highlights, page ${current + 1} of ${featurePageCount}`}
						className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
						{visibleFeatureItems.map(({ icon: Icon, title, description }) => (
							<article
								key={title}
								className="flex min-w-0 flex-col gap-6 sm:gap-8">
								<Icon className="text-fg-tertiary size-6" />
								<div className="flex min-w-0 flex-col gap-3">
									<h4 className="font-medium">{title}</h4>
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
				<SvgDivider
					height={50}
					viewBox="0 0 1440 50"
					preserveAspectRatio="none"
					className="border-soft block h-[50px] w-full border-y"
				/>
			</div>
		</section>
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
