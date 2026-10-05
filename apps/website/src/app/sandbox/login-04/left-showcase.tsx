"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"

export function LeftShowcase() {
	return (
		<div className="dark hidden shrink-0 overflow-hidden select-none lg:flex lg:w-lg">
			<div className="relative flex size-full flex-col items-center justify-center bg-black p-12 text-center text-white lg:p-16">
				{/* Center Content Box */}
				<div className="z-10 flex max-w-sm flex-col items-center gap-6">
					<Link
						href="#"
						className="flex shrink-0 items-center justify-center transition-transform hover:scale-105"
						aria-label="Home">
						<Image
							src="https://images.shadcnspace.com/assets/logo/logo-icon-white.svg"
							alt="Shadcn Space Logo"
							width={48}
							height={48}
							className="size-12"
							priority
						/>
					</Link>
					<h2 className="max-w-sm text-center text-[30px] leading-9 font-medium text-white">
						Welcome Back to Your Creative Space
					</h2>
				</div>

				{/* Ambient Dark Wave Video */}
				<div className="absolute inset-0 z-0 size-full overflow-hidden">
					<video
						className="size-full object-cover"
						autoPlay
						loop
						muted
						playsInline
						poster="/sandbox/placeholder.svg">
						<source
							src="https://images.shadcnspace.com/assets/video/wave-video-loop.mp4"
							type="video/mp4"
						/>
					</video>
					{/* Subtle overlay gradient to ensure text readability */}
					<div className="absolute inset-0 bg-black/20" />
				</div>
			</div>
		</div>
	)
}
