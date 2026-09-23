"use client"

import React from "react"
import Image from "next/image"
import { SocialLinksList } from "./social-links-list"

export function HeroSection() {
	return (
		<section className="relative flex flex-col justify-between gap-10 py-12 lg:flex-row lg:items-center lg:py-16">
			{/* Left Column: Heading, Bio, Social Badges */}
			<div className="flex max-w-2xl flex-col gap-6">
				<h1 className="heading-1 text-white">
					Software developer, technical writer &amp; open-source maintainer
				</h1>
				<p className="max-w-xl text-base leading-relaxed text-neutral-400 sm:text-lg">
					I&apos;m Victor Eke, an experienced software developer passionate
					about learning and building open-source software that is beneficial to
					developers and the world at large.
				</p>
				<SocialLinksList />
			</div>

			{/* Right Column: Hero Graphic using Placeholder Image */}
			<div className="flex items-center justify-center lg:w-5/12">
				<div className="relative flex w-full items-center justify-center overflow-hidden rounded-2xl border border-white/5 bg-neutral-900/40 p-6 shadow-2xl backdrop-blur-sm">
					<Image
						src="/sandbox/placeholder.svg"
						alt="Isometric 3D wireframe illustration"
						width={420}
						height={320}
						className="w-full max-w-sm rounded-lg object-contain opacity-60 transition duration-300 hover:opacity-80"
						priority
					/>
				</div>
			</div>
		</section>
	)
}
