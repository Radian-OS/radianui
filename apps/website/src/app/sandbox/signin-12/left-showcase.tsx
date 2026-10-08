"use client"

import React, { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Skeleton } from "@/styles/default/ui/skeleton"

export function LeftShowcase() {
	const [isVideoLoaded, setIsVideoLoaded] = useState(false)
	const videoRef = useRef<HTMLVideoElement>(null)

	useEffect(() => {
		if (videoRef.current && videoRef.current.readyState >= 3) {
			setIsVideoLoaded(true)
		}
	}, [])

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
					<h2 className="heading-4 max-w-sm text-center text-white">
						Welcome Back to Radian
					</h2>
				</div>

				{/* Ambient Dark Wave Video */}
				<div className="absolute inset-0 z-0 size-full overflow-hidden">
					{!isVideoLoaded && (
						<Skeleton className="absolute inset-0 z-0 size-full rounded-none" />
					)}
					<video
						ref={videoRef}
						className={`size-full object-cover transition-opacity duration-1000 ${
							isVideoLoaded ? "opacity-100" : "opacity-0"
						}`}
						autoPlay
						loop
						muted
						playsInline
						onLoadedData={() => setIsVideoLoaded(true)}
						onCanPlay={() => setIsVideoLoaded(true)}>
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
