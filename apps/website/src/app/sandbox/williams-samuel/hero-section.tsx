"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/styles/default/ui/button"

export function HeroSection() {
	return (
		<section className="flex flex-col items-center justify-between gap-12 py-16 sm:py-24 lg:flex-row">
			{/* Left Column: Eyebrow, Heading, Bio, CTA */}
			<div className="flex max-w-xl flex-col items-start gap-6">
				<span className="text-success font-mono text-xs font-bold tracking-widest uppercase">
					HI THERE 👋 , I&apos;M
				</span>

				<h1 className="heading-1 text-fg">Williams Samuel</h1>

				<p className="text-fg-secondary max-w-lg text-base leading-relaxed sm:text-lg">
					A Lagos, Nigeria based self-taught Frontend Developer who specializes
					in building exceptional digital experience.
				</p>

				<Button
					asChild
					color="neutral"
					variant="outline"
					size="40"
					className="border-success-border text-success hover:bg-success-accent hover:text-success-hover rounded-md border px-6 font-mono text-xs font-semibold tracking-widest uppercase transition-colors sm:text-sm">
					<Link href="#contact">HIRE ME</Link>
				</Button>
			</div>

			{/* Right Column: 3D Workstation Illustration */}
			<div className="flex w-full items-center justify-center lg:w-1/2">
				<div className="border-border bg-card relative flex w-full max-w-md items-center justify-center rounded-2xl border p-8 shadow-2xl backdrop-blur-sm">
					<Image
						src="/sandbox/placeholder.svg"
						alt="3D Workstation Illustration"
						width={480}
						height={380}
						className="w-full object-contain opacity-75 transition-opacity duration-300 hover:opacity-90"
						priority
					/>
				</div>
			</div>
		</section>
	)
}
