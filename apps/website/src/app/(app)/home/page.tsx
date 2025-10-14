import { Box, Code, SearchCode } from "lucide-react"
import Background from "@/components/effects/background"
import ComponentsSection from "@/components/home/components-section"
import CTASection from "@/components/home/cta-section"
import FAQSection from "@/components/home/faq-section"
import FooterSection from "@/components/home/footer-section"
import PlaygroundSection from "@/components/home/playground-section"
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

				<div className="mt-27 relative mx-auto aspect-[2/1] max-h-[768px]">
					<div className="bg-fill2 border-soft z-50 h-full rounded-xl border px-4 md:px-5">1</div>
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
							vectorEffect="non-scaling-stroke"
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

			<ComponentsSection />

			<PlaygroundSection />

			<VideoSection />

			<FAQSection />

			<CTASection />

			<FooterSection />
		</div>
	)
}
