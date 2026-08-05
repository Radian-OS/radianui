import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Background from "@/components/effects/background"
import RapidDev from "@/components/home/RapidDev"
import DiagonalDivider from "@/components/home/SvgDivider"
import Component from "@/components/home/component-section"
import CTASection from "@/components/home/cta-section"
import FAQSection from "@/components/home/faq-section"
import Footer from "@/components/home/footer"
import HeroActionButtons from "@/components/home/hero-action-buttons"
import HomepageLoadReveal from "@/components/home/homepage-load-reveal"
import BrandSection from "@/components/home/new/brand-section"
import CarouselSection from "@/components/home/new/carousel-section"
import PlaygroundSectionWrapper from "@/components/home/playground-section-wrapper"
import { RotatingWords } from "@/components/home/rotating-words"
import UIBlocksSection from "@/components/home/ui-blocks-section"
import VideoDialogPreview from "@/components/home/video/video-dialog-preview"
import { JsonLd } from "@/components/seo/json-ld"
import { getHomepageStructuredData } from "@/lib/structured-data"
import { BorderBeam } from "@/registry/animated/border-beam"
import { Badge } from "@/registry/ui/badge"

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
			<main className="min-h-screen w-full overflow-x-hidden">
				<section aria-labelledby="home-page-title">
					<HomepageLoadReveal delay={0.05} duration={1} offset={14} blur={12}>
						<Background>
							<div className="md:pt-30 pt-15 relative z-30 flex flex-col items-center justify-center gap-5 md:gap-10">
								<div className="max-w-250 flex flex-col items-center justify-center">
									<Link
										href="/docs/getting-started/changelog"
										className="relative h-[32px] rounded-full focus:outline-none">
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
									<h1
										id="home-page-title"
										className="heading-1 dark:from-fg dark:to-fg-secondary not-dark:text-fg mt-6 bg-clip-text text-center text-transparent dark:bg-gradient-to-b">
										Open-Source React Components and Figma Design System
									</h1>
									<p className="text-fg-secondary mt-5 w-full max-w-[640px] text-center text-base font-normal md:mt-10 md:text-lg">
										A complete production-ready React components library, UI
										blocks, and Figma UI Kit and design system for{" "}
										<RotatingWords
											interval={4000}
											words={[
												"Designers",
												"Developers",
												"Startups",
												"Agencies",
											]}
											className="text-fg text-base font-medium md:text-lg"
										/>
									</p>
								</div>
								<div className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
									<HeroActionButtons />
								</div>
							</div>

							<VideoPreviewWithBeams />
						</Background>
					</HomepageLoadReveal>
				</section>

				<BrandSection />
				<RapidDev />
				<Component />

				<CarouselSection />

				<PlaygroundSectionWrapper renderBeforeMount />

				<div className="max-w-360 mx-auto w-full" aria-hidden="true">
					<div className="border-soft w-full overflow-clip border-b border-t lg:border-l lg:border-r">
						<DiagonalDivider />
					</div>
				</div>

				<UIBlocksSection />

				<div className="max-w-360 mx-auto w-full" aria-hidden="true">
					<div className="border-soft w-full overflow-clip border-b border-t lg:border-l lg:border-r">
						<DiagonalDivider />
					</div>
				</div>
				<FAQSection />

				<CTASection />
			</main>

			<Footer />
		</>
	)
}

function VideoPreviewWithBeams() {
	return (
		<figure
			aria-labelledby="home-demo-caption"
			className="relative -mx-4 mt-[40px] flex w-[calc(100%+2rem)] justify-center md:-mx-5 md:w-[calc(100%+2.5rem)] lg:mt-[80px]">
			<figcaption id="home-demo-caption" className="sr-only">
				Interactive preview of the Radian OS component library and design
				system.
			</figcaption>
			<div className="bg-primary/45 dark:bg-primary/60 z-25 absolute left-1/2 top-1/2 mx-auto hidden aspect-video w-[90%] max-w-[1300px] -translate-x-1/2 -translate-y-1/2 rounded-full rounded-b-none blur-[50px] md:blur-[100px] lg:w-[85%] lg:blur-[130px] 2xl:w-[70%] dark:block"></div>
			<div className="max-w-368 z-35 relative w-full px-4 md:px-5">
				<div className="relative z-20 flex justify-center">
					<VideoDialogPreview />
				</div>

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
		</figure>
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
