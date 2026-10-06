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
						<img src="/logo.svg" alt="Radian Logo" className="size-12" />
					</Link>
					<h2 className="max-w-sm text-center text-[30px] leading-9 font-medium text-white">
						Welcome Back to Radian
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
							src="https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/blocks/src/video/login-04.mp4"
							type="video/mp4"
						/>
					</video>
					{/* Primary Color Blend Overlay */}
					<div className="bg-primary absolute inset-0 mix-blend-color" />
				</div>
			</div>
		</div>
	)
}
