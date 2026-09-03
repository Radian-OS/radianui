import type { ReactNode } from "react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Background from "@/components/effects/background"
import Footer from "@/components/home/footer"
import { cn } from "@/lib/utils"
import { BorderBeam } from "@/registry/animated/border-beam"
import { Badge } from "@/registry/ui/badge"

const upperHeroBeamPath =
	"M0 1H132C142.8 1 152.8 6.8 158.1 16.2L286.5 258.8C292.1 269.4 303.2 276 315.2 276H438"

const lowerHeroBeamPath =
	"M0 1H92C102.6 1 112.4 6.6 117.8 15.8L154.2 78.2C159.6 87.4 169.4 93 180 93H214"

interface ResourcePageProps {
	badge: {
		count: string
		label: string
		href?: string
	}
	heroVisual: ReactNode
	title: ReactNode
	description: ReactNode
	actions: ReactNode
	showcaseLabel: string
	showcase: ReactNode
	documentation: ReactNode
	headerClassName?: string
	showcaseClassName?: string
	showcaseContentClassName?: string
}

export function ResourcePage({
	badge,
	heroVisual,
	title,
	description,
	actions,
	showcaseLabel,
	showcase,
	documentation,
	headerClassName,
	showcaseClassName,
	showcaseContentClassName,
}: ResourcePageProps) {
	return (
		<div className="min-h-screen w-full">
			<Background>
				<header
					className={cn(
						"flex flex-col items-center justify-center gap-12 pt-15 md:pt-30",
						headerClassName
					)}>
					<div className="flex max-w-250 flex-col items-center justify-center gap-6">
						<Link
							href={badge.href ?? "/docs/getting-started/resources"}
							className="relative h-8 rounded-full">
							<Badge
								color="primary"
								className="h-8 gap-1.5 rounded-full py-1 pl-1"
								size="28"
								variant="soft">
								<Badge
									color="primary"
									className="rounded-full"
									variant="strong">
									{badge.count}
								</Badge>
								{badge.label}
								<ArrowRight className="size-3.5" />
							</Badge>
							<BorderBeam size={50} />
						</Link>

						{heroVisual}

						<div className="flex w-full flex-col items-center justify-center gap-4 md:w-163">
							<h1 className="heading-3 text-center">{title}</h1>
							<p className="text-fg-secondary text-center text-base font-normal">
								{description}
							</p>
						</div>
					</div>

					<div className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
						{actions}
					</div>
				</header>

				<ResourceShowcase
					label={showcaseLabel}
					className={showcaseClassName}
					contentClassName={showcaseContentClassName}>
					{showcase}
				</ResourceShowcase>
			</Background>

			{documentation}
			<Footer />
		</div>
	)
}

function ResourceShowcase({
	label,
	children,
	className,
	contentClassName,
}: {
	label: string
	children: ReactNode
	className?: string
	contentClassName?: string
}) {
	return (
		<section
			aria-labelledby="resource-showcase-heading"
			className={cn(
				"bg-bg border-soft -mx-4 mt-[100px] flex w-[calc(100%+2rem)] justify-center border-t md:-mx-5 md:w-[calc(100%+2.5rem)]",
				className
			)}>
			<div className="relative w-full max-w-368 px-4 md:px-5">
				<h2 id="resource-showcase-heading" className="sr-only">
					{label}
				</h2>
				<div
					className={cn(
						"relative z-20 flex justify-center py-10",
						contentClassName
					)}>
					{children}
				</div>

				<HeroBeamPath
					className="top-[-276px] left-4 h-[276px] w-[438px] md:left-5"
					path={upperHeroBeamPath}
					viewBox="0 0 438 276"
				/>
				<HeroBeamPath
					className="top-[-93px] left-4 h-[93px] w-[214px] md:left-5"
					path={lowerHeroBeamPath}
					viewBox="0 0 214 93"
					beamClassName="animate-[var(--animate-beam-flow2)] opacity-0"
				/>
				<HeroBeamPath
					className="top-[-276px] right-4 h-[276px] w-[438px] scale-x-[-1] md:right-5"
					path={upperHeroBeamPath}
					viewBox="0 0 438 276"
				/>
				<HeroBeamPath
					className="top-[-93px] right-4 h-[93px] w-[214px] scale-x-[-1] md:right-5"
					path={lowerHeroBeamPath}
					viewBox="0 0 214 93"
					beamClassName="animate-[var(--animate-beam-flow2)] opacity-0"
				/>
			</div>
		</section>
	)
}

function HeroBeamPath({
	className,
	path,
	viewBox,
	beamClassName = "animate-[var(--animate-beam-flow)]",
}: {
	className: string
	path: string
	viewBox: string
	beamClassName?: string
}) {
	return (
		<svg
			className={`pointer-events-none absolute -z-10 hidden overflow-visible lg:block ${className}`}
			viewBox={viewBox}
			fill="none"
			preserveAspectRatio="none"
			aria-hidden="true">
			<path
				d={path}
				stroke="var(--color-soft)"
				strokeWidth="1"
				vectorEffect="non-scaling-stroke"
			/>
			<path
				d={path}
				stroke="var(--color-primary)"
				strokeWidth="1"
				strokeLinecap="round"
				vectorEffect="non-scaling-stroke"
				pathLength="1000"
				className={`${beamClassName} [stroke-dasharray:50_1000] [stroke-dashoffset:0]`}
			/>
		</svg>
	)
}
