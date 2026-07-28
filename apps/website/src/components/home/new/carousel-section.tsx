import {
	LayoutGrid,
	MonitorSmartphone,
	Sparkles,
	SunMoon,
	SwatchBook,
} from "lucide-react"
import Image from "next/image"
import { darkThemeVars } from "@/components/theme/theme-vars"
import { cn } from "@/lib/utils"
import { InfiniteScroll } from "@/registry/animated/infinite-scroll"
import { Badge, BadgeDot } from "@/registry/ui/badge"

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
					<h3 className="heading-3 max-w-212.5 text-center max-sm:text-2xl max-sm:leading-9">
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
								"border-soft flex w-1/2 flex-col items-center justify-center gap-3 px-4 py-8 text-center lg:w-1/4",
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
					<h3 className="heading-3 max-w-225">
						Built for modern product teams{" "}
						<span className="text-fg-tertiary">
							Extend your experience with more features to help you build better
							apps and products
						</span>
					</h3>
				</div>

				<div className="h-100 lg:h-160 flex w-full justify-center overflow-hidden">
					<div className="h-100 w-192 lg:h-160 lg:w-320 xl:w-330 relative shrink-0 overflow-hidden md:rounded-xl">
						<Image
							src="/carousel-home.png"
							fill
							sizes="(min-width: 1280px) 1320px, (min-width: 1024px) 1280px, 768px"
							alt="Radian design system interface examples"
							className="object-cover"
						/>
					</div>
				</div>

				<div className="lg:px-15 px-5 sm:px-8">
					<InfiniteScroll duration={24} className="w-full p-0 [--gap:20px]">
						{featureItems.map(({ icon: Icon, title, description }) => (
							<div
								key={title}
								className="w-90 flex shrink-0 flex-col gap-8 pr-8">
								<Icon className="text-fg-tertiary size-6" />
								<div className="flex flex-col gap-3">
									<h4 className="font-medium">{title}</h4>
									<p className="text-fg-secondary">{description}</p>
								</div>
							</div>
						))}
					</InfiniteScroll>
				</div>
			</div>

			<div className="border-soft max-w-360 mx-auto w-full border-x">
				<StripedDivider patternId="carousel-divider-secondary" />
			</div>
		</section>
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
						stroke="var(--color-fill1-alpha)"
						strokeWidth="1"
					/>
				</pattern>
			</defs>
		</svg>
	)
}
