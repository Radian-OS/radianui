import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Background from "@/components/effects/background"
import ComponentsSection from "@/components/home/components-section"
import CTASection from "@/components/home/cta-section"
import FAQSection from "@/components/home/faq-section"
import FeaturesSection from "@/components/home/features-section"
import Footer from "@/components/home/footer"
import HeroActionButtons from "@/components/home/hero-action-buttons"
import HomepageLoadReveal from "@/components/home/homepage-load-reveal"
import InvertedSection from "@/components/home/inverted-section"
import BrandSection from "@/components/home/new/brand-section"
import CarouselSection from "@/components/home/new/carousel-section"
import PlaygroundSectionWrapper from "@/components/home/playground-section-wrapper"
import { RotatingWords } from "@/components/home/rotating-words"
import VideoSection from "@/components/home/video-section"
import VideoDialogPreview from "@/components/home/video/video-dialog-preview"
import { JsonLd } from "@/components/seo/json-ld"
import { getHomepageStructuredData } from "@/lib/structured-data"
import { BorderBeam } from "@/registry/animated/border-beam"
import { Badge } from "@/registry/ui/badge"
import RapidDev from "./RapidDev"

const upperHeroBeamPath =
	"M0 1H132C142.8 1 152.8 6.8 158.1 16.2L286.5 258.8C292.1 269.4 303.2 276 315.2 276H438"

const lowerHeroBeamPath =
	"M0 1H92C102.6 1 112.4 6.6 117.8 15.8L154.2 78.2C159.6 87.4 169.4 93 180 93H214"

export default function Page() {
	return (
		<>
			<JsonLd
				id="homepage-structured-data"
				data={getHomepageStructuredData()}
			/>
			<div className="min-h-screen w-full overflow-x-hidden">
				<Background>
					<div className="md:pt-30 pt-15 flex flex-col items-center justify-center gap-10">
						<HomepageLoadReveal
							className="max-w-250 flex flex-col items-center justify-center"
							delay={0.05}>
							<Link
								href="/docs/getting-started/changelog"
								className="relative h-[32px] rounded-full">
								<Badge
									color="primary"
									className="h-8 gap-1.5 rounded-full py-1 pl-1"
									size="28"
									variant="soft">
									<Badge
										color="primary"
										className="rounded-full"
										variant="strong">
										New Version
									</Badge>
									Read Changelog
									<ArrowRight className="size-3.5" />
								</Badge>
								<BorderBeam size={50} />
							</Link>
							<h1 className="heading-1 dark:from-fg dark:to-fg-secondary not-dark:text-fg mt-6 bg-clip-text text-center text-transparent dark:bg-gradient-to-b">
								Open-Source React Components and Figma Design System
							</h1>
							<p className="text-fg-secondary mt-10 w-full max-w-[640px] text-center text-lg font-normal">
								A complete production-ready React components library, UI blocks,
								and Figma UI Kit and design system for{" "}
								<RotatingWords
									words={["Designers", "Developers", "Startups", "Agencies"]}
									className="text-fg font-medium"
								/>
							</p>
						</HomepageLoadReveal>
						<HomepageLoadReveal
							className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row"
							delay={0.16}
							offset={8}
							blur={8}>
							<HeroActionButtons />
						</HomepageLoadReveal>
					</div>

					<VideoPreviewWithBeams />
				</Background>

				<BrandSection />

				<FeaturesSection
					textAutoHide={true}
					enableSpotlight={true}
					enableBorderGlow={true}
					clickEffect={true}
					spotlightRadius={573}
				/>

				<InvertedSection />

				<ComponentsSection />

				<PlaygroundSectionWrapper />

				<VideoSection />

				<FAQSection />

				<CTASection />

				<Footer />
				<RapidDev />
				<CarouselSection />
			</div>
		</>
	)
}

function VideoPreviewWithBeams() {
	return (
		<div className="-mx-4 mt-[64px] flex w-[calc(100%+2rem)] justify-center sm:mt-[90px] md:-mx-5 md:w-[calc(100%+2.5rem)]">
			<div className="max-w-368 relative w-full px-4 md:px-5">
				<HomepageLoadReveal
					className="relative z-20 flex justify-center"
					delay={0.28}
					duration={1}
					offset={18}
					blur={16}
					scale={0.99}>
					<VideoDialogPreview />
				</HomepageLoadReveal>

				<HeroBeamPath
					className="left-4 top-[-276px] h-[276px] w-[438px] md:left-5"
					path={upperHeroBeamPath}
					viewBox="0 0 438 276"
				/>
				<HeroBeamPath
					className="left-4 top-[-93px] h-[93px] w-[214px] md:left-5"
					path={lowerHeroBeamPath}
					viewBox="0 0 214 93"
					beamClassName="animate-[var(--animate-beam-flow2)] opacity-0"
				/>
				<HeroBeamPath
					className="right-4 top-[-276px] h-[276px] w-[438px] scale-x-[-1] md:right-5"
					path={upperHeroBeamPath}
					viewBox="0 0 438 276"
				/>
				<HeroBeamPath
					className="right-4 top-[-93px] h-[93px] w-[214px] scale-x-[-1] md:right-5"
					path={lowerHeroBeamPath}
					viewBox="0 0 214 93"
					beamClassName="animate-[var(--animate-beam-flow2)] opacity-0"
				/>
			</div>
		</div>
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
