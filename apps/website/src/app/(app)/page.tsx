import { Box } from "lucide-react"
import Background from "@/components/effects/background"
import ComponentsSection from "@/components/home/components-section"
import CTASection from "@/components/home/cta-section"
import FAQSection from "@/components/home/faq-section"
import FeaturesSection from "@/components/home/features-section"
import Footer from "@/components/home/footer"
import HeroActionButtons from "@/components/home/hero-action-buttons"
import InvertedSection from "@/components/home/inverted-section"
import PlaygroundSectionWrapper from "@/components/home/playground-section-wrapper"
import VideoSection from "@/components/home/video-section"
import VideoDialogPreview from "@/components/home/video/video-dialog-preview"
import { BorderBeam } from "@/registry/animated/border-beam"
import { Badge } from "@/registry/ui/badge"

export default function Page() {
	return (
		<div className="min-h-screen w-full overflow-x-hidden">
			<Background>
				<div className="md:pt-30 pt-15 flex flex-col items-center justify-center gap-12">
					<div className="max-w-250 flex flex-col items-center justify-center gap-6">
						<div className="relative h-[28px] rounded-md">
							<Badge color="primary" size="28" variant="soft">
								<Box size={16} />
								Under Development - Alpha Release
							</Badge>
							<BorderBeam size={50} />
						</div>
						<h1 className="heading-1 dark:from-fg dark:to-fg-secondary not-dark:text-fg bg-clip-text text-center text-transparent dark:bg-gradient-to-b">
							Build next gen of world class products and solutions
						</h1>
						<p className="text-fg-secondary w-full max-w-[640px] text-center text-lg font-normal">
							Radian is a high-quality, flexible and open-source, design and
							development library built using React, Radix and Tailwind.
						</p>
					</div>
					<div className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
						<HeroActionButtons />
					</div>
				</div>

				<div className="mt-15 flex w-full justify-center px-5 min-[1920px]:px-60">
					<VideoDialogPreview />
				</div>
			</Background>

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
		</div>
	)
}
