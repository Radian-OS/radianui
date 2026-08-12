"use client"

import Link from "next/link"
import { Button } from "@/registry/ui/button"
import { LogoMarquee } from "./logo-marquee"

export function LogoSection() {
	return (
		<section
			id="logo-section"
			className="w-full px-4 py-10 sm:px-6 sm:py-16 lg:px-10">
			<div className="mx-auto max-w-[1320px] overflow-hidden rounded-2xl bg-white shadow-[0_2px_20px_rgba(0,0,0,0.04)] sm:rounded-3xl">
				<div className="flex flex-col items-center lg:flex-row lg:items-stretch">
					{/* Left column: Text content */}
					<div className="flex shrink-0 flex-col justify-center px-8 py-12 sm:px-12 lg:w-[42%] lg:px-16 lg:py-20">
						<p className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-[#1c1917] sm:text-sm">
							Logo Section
						</p>

						<h2 className="heading-3 mb-8 text-[#1c1917] lg:mb-10">
							Partnership with over 50+ worldwide companies.
						</h2>

						<div>
							<Button
								color="neutral"
								variant="strong"
								size="48"
								className="rounded-full bg-[#1c1917] px-8 text-white hover:bg-[#292524]"
								asChild>
								<Link href="#" className="hover:underline">
									Read Testimonials
								</Link>
							</Button>
						</div>
					</div>

					{/* Right column: Scrolling logo marquee */}
					<div className="relative overflow-hidden py-6 lg:w-[58%] lg:py-0">
						<LogoMarquee />
					</div>
				</div>
			</div>
		</section>
	)
}
