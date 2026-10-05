"use client"

import React from "react"
import Link from "next/link"
import { TestimonialsCarousel } from "./testimonials-carousel"
import { TrustedBrands } from "./trusted-brands"

export function LeftPanel() {
	return (
		<div className="dark relative flex w-full shrink-0 flex-col justify-between overflow-hidden bg-[#080c16] px-0 py-8 text-white sm:py-10 lg:min-h-screen lg:w-[45%] lg:py-12 xl:w-[43%]">
			{/* Background Video from reference */}
			<video
				className="pointer-events-none absolute inset-0 size-full scale-125 object-cover opacity-60 mix-blend-screen"
				autoPlay
				loop
				muted
				playsInline>
				<source
					src="https://images.shadcnspace.com/assets/video/auth-07.mp4"
					type="video/mp4"
				/>
			</video>

			{/* Ambient Gradient Overlays matching reference lighting */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -top-20 -left-20 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle_at_top_left,rgba(251,146,60,0.65)_0%,rgba(234,88,12,0.45)_30%,rgba(194,65,12,0.2)_55%,transparent_75%)] mix-blend-screen blur-2xl"
			/>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute -right-16 -bottom-24 h-[550px] w-[550px] rounded-full bg-[radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.35)_0%,rgba(59,130,246,0.18)_40%,transparent_70%)] mix-blend-screen blur-3xl"
			/>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"
			/>

			{/* Top Branding - moved further right and slightly lower, sharing common alignment line */}
			<div className="relative z-10 pt-4 pl-10 sm:pt-6 sm:pl-16 lg:pt-8 lg:pl-20 xl:pl-28 2xl:pl-32">
				<Link href="#" className="flex w-fit items-center gap-2">
					<img src="/logo.svg" alt="Radian" className="size-8 shrink-0" />
					<h1 className="heading-6">Radian</h1>
				</Link>
			</div>

			{/* Center Section: Heading, Subtitle, Testimonials & Brands */}
			<div className="relative z-10 my-auto flex w-full flex-col gap-8 py-6 lg:gap-10">
				{/* Headline and Subtitle */}
				<div className="flex max-w-[480px] flex-col gap-3.5 pr-6 pl-10 sm:pr-8 sm:pl-16 lg:pl-20 xl:pl-28 2xl:pl-32">
					<h2 className="heading-4">Build faster. Design better.</h2>
					<p className="text-fg text-sm leading-relaxed sm:text-base">
						Join thousands of creators using Radian to ship beautiful products
						in record time. Your next big idea starts here.
					</p>
				</div>

				{/* Testimonial Cards Moving Marquee - edge to edge touching both ends */}
				<div className="hidden w-full overflow-hidden px-0 lg:block">
					<TestimonialsCarousel />
				</div>

				{/* Bottom Brands - centered on all screens */}
				<div className="hidden w-full justify-center px-6 sm:px-8 lg:flex">
					<div className="w-full max-w-[420px]">
						<TrustedBrands />
					</div>
				</div>
			</div>

			{/* Bottom spacer for vertical balance */}
			<div className="hidden h-6 lg:block" />
		</div>
	)
}
