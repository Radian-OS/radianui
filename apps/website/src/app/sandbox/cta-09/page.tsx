import React from "react"
import { CtaHeader } from "./cta-header"
import { ServiceGallery } from "./service-gallery"

export default function Cta09Page() {
	return (
		<section className="bg-bg relative w-full overflow-hidden">
			<div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-12 sm:gap-14 sm:px-6 sm:py-16 md:px-8 lg:gap-16 lg:px-16 lg:py-20">
				{/* Top Header Section */}
				<CtaHeader />

				{/* Bottom Service Gallery & Carousel */}
				<ServiceGallery />
			</div>
		</section>
	)
}
