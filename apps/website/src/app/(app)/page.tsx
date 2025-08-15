import React from "react"

import Footer from "@/components/footer"
import A from "@/components/home/A"
import B from "@/components/home/B"
import EmailSection from "@/components/home/email-section"
import FundamentalSection from "@/components/home/fundamental-section"
import HeroSection from "@/components/home/hero-section"
import UiComponentsSection from "@/components/home/ui-components-section"
import { cn } from "@/lib/utils"

export default function Home() {
	return (
		<div className="w-full overflow-x-hidden">
			<div className="border-alpha max-w-310 mx-auto box-border border-l border-r">
				<div className="relative">
					<div className="relative overflow-hidden pb-20 pt-12">
						<HeroSection />
						<div className="group hidden xl:block">
							<A
								className={cn(
									"animate-float right-25 -skew-x-14 skew-y-5 duration-2500 group-hover:skew-y-4 group-hover:animation-pause absolute top-10 scale-90 group-hover:-skew-x-6 group-hover:duration-700"
								)}
							/>
							<B
								className={cn(
									"animate-float -skew-x-14 skew-y-5 duration-2500 group-hover:skew-y-4 group-hover:animation-pause absolute -right-5 top-32 scale-90 group-hover:-skew-x-6 group-hover:duration-700"
								)}
							/>
						</div>
					</div>
					{/* For gradient background */}
					<div className="from-hero-fade-gradient-from to-hero-fade-gradient-to -ml-396 bg-linear-to-b md:h-25 lg:h-50 absolute bottom-0 w-[calc(100%+999rem)]"></div>
				</div>
				<FundamentalSection />
				<UiComponentsSection />
				<EmailSection />
			</div>
			<Footer />
		</div>
	)
}
