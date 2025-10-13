import { Box, Code, SearchCode } from "lucide-react"
import Background from "@/components/effects/background"
import CTASection from "@/components/home/cta-section"
import FAQSection from "@/components/home/faq-section"
import FooterSection from "@/components/home/footer-section"
import VideoSection from "@/components/home/video-section"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"

export default function Page() {
	return (
		<div className="min-h-screen w-full overflow-x-hidden">
			<Background>
				<div className="pt-30 flex flex-col items-center justify-center gap-12">
					<div className="max-w-250 flex flex-col items-center justify-center gap-6">
						<Badge size="28">
							<Box size={16} />
							Under Development - Alpha Release
						</Badge>
						<h1 className="heading-1 from-fg to-fg-secondary bg-gradient-to-b bg-clip-text text-center text-transparent">Build next gen of world class products and solutions</h1>
						<p className="text-fg-secondary text-center text-lg font-normal">
							Radian is a high-quality, flexible and open-source, design and development library built using React and Tailwind. Start your next product here
						</p>
					</div>
					<div className="flex items-center justify-center gap-4">
						<Button className="bg-elevation-negative hover:bg-elevation-negative/90" variant="outline" color="neutral">
							<SearchCode />
							Browse Components
						</Button>
						<Button className="border-primary-hover border bg-gradient-to-b from-[#6347EB] to-[#5133CF] shadow-[0px_4px_4px_rgba(24,25,27,0.16)] ring-[1.5px] ring-[#5B3FE0] hover:from-[#6A52F2] hover:to-[#5B3FE0]">
							<Code />
							Copy Terminal Command
						</Button>
					</div>
				</div>

				<div className="bg-fill2/60 mt-27 border-soft relative mx-auto aspect-[2/1] max-h-[768px] rounded-xl border px-4 backdrop-blur-2xl md:px-5">
					1
					<svg className="-left-290 not-lg:hidden absolute bottom-full z-50 max-h-[532px]" viewBox="0 0 1461 532" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M1460.19 531L1284.28 210.94C1280.06 203.268 1272 198.5 1263.24 198.5L1088.88 198.5C1080.31 198.5 1072.39 193.926 1068.1 186.5L967.928 13C963.641 5.57438 955.718 1 947.144 1H0"
							stroke="var(--color-soft)"
						/>

						{/* Animated beam segment */}
						<path
							id="beamPath"
							d="M1460.19 531L1284.28 210.94C1280.06 203.268 1272 198.5 1263.24 198.5L1088.88 198.5C1080.31 198.5 1072.39 193.926 1068.1 186.5L967.928 13C963.641 5.57438 955.718 1 947.144 1H0"
							fill="none"
							stroke="var(--color-primary)"
							strokeWidth="1"
							strokeLinecap="round"
							className="animate-[var(--animate-beam-flow)] [stroke-dasharray:50_1000] [stroke-dashoffset:0]"
							vectorEffect="non-scaling-stroke"
							pathLength="1000"
						/>
					</svg>
					<svg className="-left-305 not-lg:hidden absolute bottom-full z-50 max-h-[343px]" viewBox="0 0 1370 343" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M 1370 343 L 1284.28 210.94 C 1280.06 203.268 1272 198.5 1263.24 198.5 L 1088.88 198.5 C 1080.31 198.5 1072.39 193.926 1068.1 186.5 L 967.928 13 C 963.641 5.5744 955.718 1 947.144 1 H 0"
							stroke="var(--color-soft)"
							strokeWidth="1"
						/>
						<path
							id="beamPath"
							d="M 1370 343 L 1284.28 210.94 C 1280.06 203.268 1272 198.5 1263.24 198.5 L 1088.88 198.5 C 1080.31 198.5 1072.39 193.926 1068.1 186.5 L 967.928 13 C 963.641 5.5744 955.718 1 947.144 1 H 0"
							fill="none"
							stroke="var(--color-primary)"
							strokeWidth="1"
							strokeLinecap="round"
							className="animate-[var(--animate-beam-flow2)] opacity-0 [stroke-dasharray:50_1000] [stroke-dashoffset:0]"
							vectorEffect="non-scaling-stroke"
							pathLength="1000"
						/>
					</svg>
					<svg className="-right-290 not-lg:hidden absolute bottom-full z-50 max-h-[532px] scale-x-[-1]" viewBox="0 0 1461 532" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M1460.19 531L1284.28 210.94C1280.06 203.268 1272 198.5 1263.24 198.5L1088.88 198.5C1080.31 198.5 1072.39 193.926 1068.1 186.5L967.928 13C963.641 5.57438 955.718 1 947.144 1H0"
							stroke="var(--color-soft)"
						/>

						{/* Animated beam segment */}
						<path
							id="beamPath"
							d="M1460.19 531L1284.28 210.94C1280.06 203.268 1272 198.5 1263.24 198.5L1088.88 198.5C1080.31 198.5 1072.39 193.926 1068.1 186.5L967.928 13C963.641 5.57438 955.718 1 947.144 1H0"
							fill="none"
							stroke="var(--color-primary)"
							strokeWidth="1"
							strokeLinecap="round"
							className="animate-[var(--animate-beam-flow)] [stroke-dasharray:50_1000] [stroke-dashoffset:0]"
							vectorEffect="non-scaling-stroke"
							pathLength="1000"
						/>
					</svg>
					<svg className="-right-305 not-lg:hidden absolute bottom-full z-50 max-h-[343px] scale-x-[-1]" viewBox="0 0 1370 343" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M 1370 343 L 1284.28 210.94 C 1280.06 203.268 1272 198.5 1263.24 198.5 L 1088.88 198.5 C 1080.31 198.5 1072.39 193.926 1068.1 186.5 L 967.928 13 C 963.641 5.5744 955.718 1 947.144 1 H 0"
							stroke="var(--color-soft)"
							strokeWidth="1"
						/>
						<path
							id="beamPath"
							d="M 1370 343 L 1284.28 210.94 C 1280.06 203.268 1272 198.5 1263.24 198.5 L 1088.88 198.5 C 1080.31 198.5 1072.39 193.926 1068.1 186.5 L 967.928 13 C 963.641 5.5744 955.718 1 947.144 1 H 0"
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

			<div className="h-60" />

			<VideoSection />

			<FAQSection />

			<CTASection />

			<FooterSection />
		</div>
	)
}
