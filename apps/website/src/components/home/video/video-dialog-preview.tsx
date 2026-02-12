"use client"

import React, { useEffect, useRef } from "react"
import { AspectRatio } from "@/registry/ui/aspect-ratio"
import { Dialog, DialogBody, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/registry/ui/dialog"

export default function VideoDialogPreview() {
	const backgroundVideoRef = useRef<HTMLVideoElement>(null)

	useEffect(() => {
		const video = backgroundVideoRef.current
		if (!video) return

		// Log video state
		console.log("Video ready state:", video.readyState)
		console.log("Video paused:", video.paused)

		video.addEventListener("loadedmetadata", () => {
			console.log("Metadata loaded")
			video
				.play()
				.then(() => console.log("Playing!"))
				.catch((e) => console.error("Play failed:", e.message))
		})

		video.addEventListener("error", (e) => {
			console.error("Video error:", e)
		})
	}, [])
	return (
		<Dialog
			onOpenChange={(open) => {
				if (backgroundVideoRef.current) {
					if (open) {
						backgroundVideoRef.current.pause()
					} else {
						// Explicitly play with error handling for Safari
						backgroundVideoRef.current.play().catch((error) => {
							console.log("Autoplay failed:", error)
						})
					}
				}
			}}>
			{/* Trigger */}
			<DialogTrigger asChild>
				<div className="border-soft bg-bg z-20 w-full max-w-[1440px] cursor-pointer rounded-2xl p-0 sm:border sm:p-3">
					<AspectRatio ratio={16 / 9} className="bg-bg border-soft overflow-hidden rounded-2xl border">
						<video ref={backgroundVideoRef} autoPlay loop muted playsInline className="h-full w-full rounded-2xl object-cover">
							<source src="/video/Radian-OS.mp4" type="video/mp4" />
						</video>
					</AspectRatio>
				</div>
			</DialogTrigger>

			{/* Dialog Content */}
			<DialogContent backdrop="overlay" className="mx-auto max-w-[1440px] overflow-hidden p-0">
				<DialogHeader className="hidden">
					<DialogTitle></DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>

				<DialogBody className="p-0">
					<div className="relative h-0 w-full pb-[56.25%]">
						{/* 16:9 */}
						<iframe
							className="absolute left-0 top-0 h-full w-full rounded-lg"
							referrerPolicy="strict-origin-when-cross-origin"
							src="https://www.youtube.com/embed/XeYZ6IauaMc?si=mzZLOA22F9MOSAyP"
							title="Radian OS Demo"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
						/>
					</div>
				</DialogBody>
			</DialogContent>
		</Dialog>
	)
}
