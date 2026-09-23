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
	titleWidth?: string
	description: ReactNode
	actions: ReactNode
	heroAside?: ReactNode
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
	titleWidth,
	description,
	actions,
	heroAside,
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
						heroAside
							? "mx-auto flex w-full max-w-360 flex-col gap-12 py-15 lg:flex-row lg:items-center lg:justify-between lg:gap-20 lg:px-[60px] lg:py-[80px]"
							: "flex flex-col items-center justify-center gap-12 pt-15 md:pt-30",
						headerClassName
					)}>
					<div
						className={cn(
							"flex flex-col",
							heroAside
								? "w-full min-w-0 flex-1 items-start gap-9 lg:max-w-[500px] lg:flex-none"
								: "max-w-250 items-center justify-center gap-6"
						)}>
						<Link
							href={badge.href ?? "/docs/getting-started/resources"}
							className={cn(
								"relative rounded-full",
								heroAside ? "h-6" : "h-8"
							)}>
							<Badge
								color="primary"
								className={cn(
									"rounded-full",
									heroAside
										? "gap-1 py-0.5 pl-0.5 text-[11px]"
										: "h-8 gap-1.5 py-1 pl-1"
								)}
								size={heroAside ? "24" : "28"}
								variant="soft">
								<Badge
									color="primary"
									className="rounded-full"
									size={heroAside ? "20" : undefined}
									variant="strong">
									{badge.count}
								</Badge>
								{badge.label}
								{!heroAside && <ArrowRight className="size-3.5" />}
							</Badge>
							<BorderBeam size={heroAside ? 20 : 50} />
						</Link>

						{heroVisual}

						<div
							className={cn(
								"flex w-full flex-col gap-4",
								heroAside
									? "items-start justify-start"
									: "items-center justify-center md:w-163",
								titleWidth
							)}>
							<h1
								className={cn(
									"heading-3",
									heroAside ? "text-left" : "text-center"
								)}>
								{title}
							</h1>
							<p
								className={cn(
									"text-fg-secondary text-base font-normal",
									heroAside ? "text-left" : "text-center"
								)}>
								{description}
							</p>
						</div>

						{heroAside && (
							<div className="flex w-full flex-col items-start gap-3 sm:flex-row">
								{actions}
							</div>
						)}
					</div>

					{heroAside ? (
						<div className="w-full min-w-0 lg:mr-[100px] lg:max-w-[450px] lg:flex-none">
							{heroAside}
						</div>
					) : (
						<div className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
							{actions}
						</div>
					)}
				</header>

				<ResourceShowcase
					label={showcaseLabel}
					className={showcaseClassName}
					hideUpperLeftBeam={Boolean(heroAside)}
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
	hideUpperLeftBeam = false,
	contentClassName,
}: {
	label: string
	children: ReactNode
	className?: string
	hideUpperLeftBeam?: boolean
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
						"relative z-20 flex justify-center pb-10",
						contentClassName
					)}>
					{children}
				</div>

				{!hideUpperLeftBeam && (
					<HeroBeamPath
						className="top-[-276px] left-4 h-[276px] w-[438px] md:left-5"
						path={upperHeroBeamPath}
						viewBox="0 0 438 276"
					/>
				)}
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
