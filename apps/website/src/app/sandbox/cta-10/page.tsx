import React from "react"
import { CtaContent } from "./cta-content"
import { DashboardPreview } from "./dashboard-preview"

export default function Cta10Page() {
	return (
		<div className="flex min-h-[700px] w-full items-center justify-center bg-black/95 px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
			{/* Main CTA Section Card */}
			<div className="relative w-full max-w-6xl overflow-hidden rounded-3xl border border-zinc-800/80 bg-[#090d16] p-6 shadow-2xl sm:p-10 lg:p-12">
				{/* Background subtle radial gradient & grid pattern */}
				<div
					aria-hidden="true"
					className="pointer-events-none absolute -top-20 -left-20 size-96 rounded-full bg-blue-600/10 blur-3xl"
				/>
				<div
					aria-hidden="true"
					className="pointer-events-none absolute -right-20 -bottom-20 size-96 rounded-full bg-blue-500/10 blur-3xl"
				/>

				{/* 2-Column Responsive Layout */}
				<div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
					{/* Left: CRM Dashboard Preview */}
					<div className="order-2 lg:order-1 lg:col-span-7">
						<DashboardPreview />
					</div>

					{/* Right: CTA Content */}
					<div className="order-1 lg:order-2 lg:col-span-5">
						<CtaContent />
					</div>
				</div>
			</div>
		</div>
	)
}
