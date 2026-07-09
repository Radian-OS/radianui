import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Background from "@/components/effects/background"
import Footer from "@/components/home/footer"
import { BorderBeam } from "@/registry/animated/border-beam"
import { Badge } from "@/registry/ui/badge"
import AvatarHeroActionButtons from "../components/AvatarHeroActionButton"

const upperHeroBeamPath =
	"M0 1H132C142.8 1 152.8 6.8 158.1 16.2L286.5 258.8C292.1 269.4 303.2 276 315.2 276H438"

const lowerHeroBeamPath =
	"M0 1H92C102.6 1 112.4 6.6 117.8 15.8L154.2 78.2C159.6 87.4 169.4 93 180 93H214"

export default function Page() {
	return (
		<div className="min-h-screen w-full overflow-x-hidden">
			<Background>
				<div className="md:pt-30 pt-15 flex flex-col items-center justify-center gap-12">
					<div className="max-w-250 flex flex-col items-center justify-center gap-6">
						<Link
							href="/docs/getting-started/changelog"
							className="relative h-[32px] rounded-full">
							<Badge
								color="primary"
								className="h-8 rounded-full p-2"
								size="28"
								variant="soft">
								<Badge
									color="primary"
									className="rounded-full"
									variant="strong">
									100+ Faces
								</Badge>
								Curated UI Avatar Pack
								<ArrowRight className="size-3.5" />
							</Badge>
							<BorderBeam size={50} />
						</Link>
						<h1 className="heading-1 dark:from-fg dark:to-fg-secondary not-dark:text-fg bg-clip-text text-center text-transparent dark:bg-gradient-to-b">
							Beautiful, Production-Ready UI Avatars{" "}
							<span className="text-fg bg-none [-webkit-text-fill-color:initial]">
								👩🏼‍💼
							</span>
						</h1>
						<p className="text-fg-secondary w-full max-w-[640px] text-center text-lg font-normal">
							Get instant access to a diverse, high-quality collection of user
							interface avatars optimized for Figma, React, and modern web
							design systems.
						</p>
					</div>
					<div className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
						<AvatarHeroActionButtons />
					</div>
				</div>
				<VideoPreviewWithBeams />
			</Background>

			<Footer />
		</div>
	)
}

function VideoPreviewWithBeams() {
	return (
		<div className="bg-bg border-soft h-200 -mx-4 mt-[100px] flex w-[calc(100%+2rem)] justify-center border-t md:-mx-5 md:w-[calc(100%+2.5rem)]">
			<div className="max-w-368 relative w-full px-4 md:px-5">
				<div className="relative z-20 flex justify-center">
					{/* <VideoDialogPreview /> */}
					Avatar Preview
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
