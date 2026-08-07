import { ArrowRight } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import Background from "@/components/effects/background"
import Footer from "@/components/home/footer"
import { JsonLd } from "@/components/seo/json-ld"
import {
	absoluteUrl,
	getAvatarResourceStructuredData,
} from "@/lib/structured-data"
import { BorderBeam } from "@/registry/animated/border-beam"
import { Avatar, AvatarImage } from "@/registry/ui/avatar"
import { Badge } from "@/registry/ui/badge"
import AvatarHeroActionButtons from "../components/AvatarHeroActionButton"
import AvatarPlayground from "../components/AvatarPlayground"
import AvatarDocs from "../docs/AvatarDocs"

const upperHeroBeamPath =
	"M0 1H132C142.8 1 152.8 6.8 158.1 16.2L286.5 258.8C292.1 269.4 303.2 276 315.2 276H438"

const lowerHeroBeamPath =
	"M0 1H92C102.6 1 112.4 6.6 117.8 15.8L154.2 78.2C159.6 87.4 169.4 93 180 93H214"

const pageUrl = absoluteUrl("/resources/avatar")
const pageTitle = "Free UI Avatar Pack for React & Figma | Radian UI"
const pageDescription =
	"Download production-ready UI avatars for React, Figma, dashboards, and design systems, with multiple styles and easy customization."
const pageImage = absoluteUrl("/og/static-og.png")

export const metadata: Metadata = {
	title: pageTitle,
	description: pageDescription,
	alternates: { canonical: pageUrl },
	openGraph: {
		type: "website",
		title: pageTitle,
		description: pageDescription,
		url: pageUrl,
		images: [{ url: pageImage, width: 1200, height: 630, alt: pageTitle }],
	},
	twitter: {
		card: "summary_large_image",
		title: pageTitle,
		description: pageDescription,
		images: [pageImage],
	},
}

export const people = [
	{
		image: "/avatar/header-1.jpg",
	},
	{
		image: "/avatar/header-2.jpg",
	},
	{
		image: "/avatar/header-3.jpg",
	},
]

export default function Page() {
	return (
		<>
			<JsonLd
				id="avatar-resource-structured-data"
				data={getAvatarResourceStructuredData()}
			/>
			<div className="min-h-screen w-full overflow-x-hidden">
				<Background topPosition="top-[700px]">
					<div className="md:pt-30 pt-15 flex flex-col items-center justify-center gap-12">
						<div className="max-w-250 flex flex-col items-center justify-center gap-6">
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
										100+ Faces
									</Badge>
									Curated UI Avatar Pack
									<ArrowRight className="size-3.5" />
								</Badge>
								<BorderBeam size={50} />
							</Link>
							<div className="flex items-center -space-x-2">
								{people.map((person) => (
									<Avatar
										size={`${person.image === "/avatar/header-2.jpg" ? "80" : "48"}`}
										key={person.image}>
										<AvatarImage
											className={`${person.image === "/avatar/header-2.jpg" ? "z-10" : ""}`}
											src={person.image}
										/>
									</Avatar>
								))}
							</div>
							<div className="md:w-163 flex w-full flex-col items-center justify-center gap-4">
								<h1 className="heading-3 text-center">
									Beautiful, Production-Ready UI Avatars 👩🏼‍💼
								</h1>
								<p className="text-fg-secondary text-center text-base font-normal">
									Get instant access to a diverse, high-quality collection of
									user interface avatars optimized for Figma, React, and modern
									web design systems.
								</p>
							</div>
						</div>
						<div className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
							<AvatarHeroActionButtons />
						</div>
					</div>
					<VideoPreviewWithBeams />
				</Background>
				<AvatarDocs />
				<Footer />
			</div>
		</>
	)
}

function VideoPreviewWithBeams() {
	return (
		<div className="bg-bg border-soft -mx-4 mt-[100px] flex w-[calc(100%+2rem)] justify-center border-t md:-mx-5 md:w-[calc(100%+2.5rem)]">
			<div className="max-w-368 relative w-full px-4 md:px-5">
				<div className="relative z-20 flex justify-center py-10">
					<AvatarPlayground />
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
