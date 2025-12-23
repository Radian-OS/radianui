import { Box } from "lucide-react"
import Link from "next/link"
import Background from "@/components/effects/background"
import ComponentsSection from "@/components/home/components-section"
import CTASection from "@/components/home/cta-section"
import FAQSection from "@/components/home/faq-section"
import FeaturesSection from "@/components/home/features-section"
import Footer from "@/components/home/footer"
// import FooterSection from "@/components/home/footer-section"
import HomeInteractive from "@/components/home/home-interactive"
import InvertedSection from "@/components/home/inverted-section"
import PlaygroundSectionWrapper from "@/components/home/playground-section-wrapper"
import VideoSection from "@/components/home/video-section"
import { BorderBeam } from "@/registry/animated/border-beam"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"

export default function Page() {
	return (
		<div className="min-h-screen w-full overflow-x-hidden">
			<Background>
				<div className="md:pt-30 pt-15 flex flex-col items-center justify-center gap-12">
					<div className="max-w-250 flex flex-col items-center justify-center gap-6">
						<div className="relative h-[28px] rounded-md">
							<Badge size="28" variant="soft">
								<Box size={16} />
								Under Development - Alpha Release
							</Badge>
							<BorderBeam size={50} />
						</div>
						<h1 className="heading-1 dark:from-fg dark:to-fg-secondary not-dark:text-fg bg-clip-text text-center text-transparent dark:bg-gradient-to-b">
							Build next gen of world class products and solutions
						</h1>
						<p className="text-fg-secondary w-full max-w-[640px] text-center text-lg font-normal">
							Radian is a high-quality, flexible and open-source, design and development library built using React, Radix and Tailwind.
						</p>
					</div>
					<div className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
						<Button variant="glossy" className="w-full sm:w-fit" size="40">
							Copy Terminal Command
						</Button>
						<Button
							asChild
							size="40"
							className="bg-elevation-level1/20 dark:hover:bg-fill2/40 hover:bg-fill2/40 w-full backdrop-blur-md sm:w-fit"
							variant="outline"
							color="neutral">
							<Link href="/docs/components/accordion" className="w-full sm:w-fit">
								Browse Components
							</Link>
						</Button>
					</div>
				</div>

				<div className="mt-15 relative mx-auto h-[860px] max-w-[1400px]">
					<HomeInteractive />

					{/* Upper left line */}
					<svg className="not-lg:hidden full -left-290 absolute bottom-[70%] -z-10 max-h-[756px]" viewBox="0 0 1552 756" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M 1552 756 L 1284.28 210.94 C 1280.06 203.268 1272 198.5 1263.24 198.5 L 1088.88 198.5 C 1080.31 198.5 1072.39 193.926 1068.1 186.5 L 967.928 13 C 963.641 5.5744 955.718 1 947.144 1 H 0"
							stroke="var(--color-soft)"
						/>

						<path
							id="beamPath"
							d="M 1552 756 L 1284.28 210.94 C 1280.06 203.268 1272 198.5 1263.24 198.5 L 1088.88 198.5 C 1080.31 198.5 1072.39 193.926 1068.1 186.5 L 967.928 13 C 963.641 5.5744 955.718 1 947.144 1 H 0"
							fill="none"
							stroke="var(--color-primary)"
							strokeWidth="1"
							strokeLinecap="round"
							className="animate-[var(--animate-beam-flow)] [stroke-dasharray:50_1000] [stroke-dashoffset:0]"
							pathLength="1000"
						/>
					</svg>

					{/* Lower left line */}
					<svg className="not-lg:hidden -left-290 absolute bottom-[75%] -z-10" width="1331" height="402" viewBox="0 0 1331 402" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M1329.73 401L1193.99 159.301C1190.79 153.591 1184.75 150.057 1178.2 150.057L1019.5 150.057C1013.03 150.057 1007.05 146.604 1003.81 141L928.21 10.0566C924.974 4.45235 918.995 1 912.523 1H-4"
							stroke="var(--color-soft)"
							strokeWidth="1"
						/>
						<path
							id="beamPath"
							d="M1329.73 401L1193.99 159.301C1190.79 153.591 1184.75 150.057 1178.2 150.057L1019.5 150.057C1013.03 150.057 1007.05 146.604 1003.81 141L928.21 10.0566C924.974 4.45235 918.995 1 912.523 1H-4"
							fill="none"
							stroke="var(--color-primary)"
							strokeWidth="1"
							strokeLinecap="round"
							className="animate-[var(--animate-beam-flow2)] opacity-0 [stroke-dasharray:50_1000] [stroke-dashoffset:0]"
							vectorEffect="non-scaling-stroke"
							pathLength="1000"
						/>
					</svg>

					{/* Upper right line */}
					<svg
						className="not-lg:hidden full -right-290 absolute bottom-[70%] -z-10 max-h-[756px] scale-x-[-1]"
						viewBox="0 0 1552 756"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M 1552 756 L 1284.28 210.94 C 1280.06 203.268 1272 198.5 1263.24 198.5 L 1088.88 198.5 C 1080.31 198.5 1072.39 193.926 1068.1 186.5 L 967.928 13 C 963.641 5.5744 955.718 1 947.144 1 H 0"
							stroke="var(--color-soft)"
						/>

						<path
							id="beamPath"
							d="M 1552 756 L 1284.28 210.94 C 1280.06 203.268 1272 198.5 1263.24 198.5 L 1088.88 198.5 C 1080.31 198.5 1072.39 193.926 1068.1 186.5 L 967.928 13 C 963.641 5.5744 955.718 1 947.144 1 H 0"
							fill="none"
							stroke="var(--color-primary)"
							strokeWidth="1"
							strokeLinecap="round"
							className="animate-[var(--animate-beam-flow)] [stroke-dasharray:50_1000] [stroke-dashoffset:0]"
							vectorEffect="non-scaling-stroke"
							pathLength="1000"
						/>
					</svg>

					{/* Lower right line */}
					<svg
						className="not-lg:hidden -right-290 absolute bottom-[75%] -z-10 scale-x-[-1]"
						width="1331"
						height="402"
						viewBox="0 0 1331 402"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="M1329.73 401L1193.99 159.301C1190.79 153.591 1184.75 150.057 1178.2 150.057L1019.5 150.057C1013.03 150.057 1007.05 146.604 1003.81 141L928.21 10.0566C924.974 4.45235 918.995 1 912.523 1H-4"
							stroke="var(--color-soft)"
							strokeWidth="1"
						/>
						<path
							id="beamPath"
							d="M1329.73 401L1193.99 159.301C1190.79 153.591 1184.75 150.057 1178.2 150.057L1019.5 150.057C1013.03 150.057 1007.05 146.604 1003.81 141L928.21 10.0566C924.974 4.45235 918.995 1 912.523 1H-4"
							fill="none"
							stroke="var(--color-primary)"
							strokeWidth="1"
							strokeLinecap="round"
							className="animate-[var(--animate-beam-flow2)] opacity-0 [stroke-dasharray:50_1000] [stroke-dashoffset:0]"
							vectorEffect="non-scaling-stroke"
							pathLength="1000"
						/>
					</svg>
				</div>
			</Background>

			<FeaturesSection textAutoHide={true} enableSpotlight={true} enableBorderGlow={true} enableTilt={false} enableMagnetism={false} clickEffect={true} spotlightRadius={573} />

			<InvertedSection />

			<ComponentsSection />

			<PlaygroundSectionWrapper />

			<VideoSection />

			<FAQSection />

			<CTASection />

			{/* <FooterSection /> */}

			<Footer />
		</div>
	)
}
