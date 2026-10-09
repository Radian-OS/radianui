"use client"

import React from "react"
import Link from "next/link"
import { TestimonialsCarousel } from "./testimonials-carousel"
import { TrustedBrands } from "./trusted-brands"

export function LeftPanel() {
	return (
		<div className="dark relative hidden w-full shrink-0 flex-col justify-between overflow-hidden bg-black px-0 py-8 text-white sm:py-10 lg:flex lg:min-h-screen lg:w-[45%] lg:py-12 xl:w-[43%]">
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

			{/* Primary Color Tint Overlay */}
			<div
				aria-hidden="true"
				className="bg-primary/80 pointer-events-none absolute inset-0 mix-blend-color"
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
				<div className="w-full overflow-hidden px-0">
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
