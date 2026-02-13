"use client"

import React, { useEffect, useRef, useState } from "react"
import { AspectRatio } from "@/registry/ui/aspect-ratio"
import { Dialog, DialogBody, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/registry/ui/dialog"

export default function VideoDialogPreview() {
	const backgroundVideoRef = useRef<HTMLVideoElement>(null)
	const [hasInteracted, setHasInteracted] = useState(false)

	useEffect(() => {
		const video = backgroundVideoRef.current
		if (!video) return

		const attemptPlay = async () => {
			try {
				video.muted = true
				video.playsInline = true
				video.defaultMuted = true

				await video.load() // Force reload
				await video.play()
				console.log("Playing!")
			} catch (e) {
				console.error("Play failed:", e)
			}
		}

		// Try to play after a delay
		const timer = setTimeout(attemptPlay, 150)

		return () => clearTimeout(timer)
	}, [])

	// Trigger play on any user interaction
	const handleInteraction = () => {
		if (!hasInteracted && backgroundVideoRef.current) {
			setHasInteracted(true)
			const video = backgroundVideoRef.current
			video.muted = true
			video.play().catch(console.error)
		}
	}

	return (
		<Dialog
			onOpenChange={(open) => {
				if (backgroundVideoRef.current) {
					if (open) {
						backgroundVideoRef.current.pause()
					} else {
						backgroundVideoRef.current.muted = true
						backgroundVideoRef.current.play().catch((error) => {
							console.log("Autoplay failed:", error)
						})
					}
				}
			}}>
			<DialogTrigger asChild>
				<div
					className="border-soft bg-bg z-20 w-full max-w-[1440px] cursor-pointer rounded-2xl p-0 sm:border sm:p-3"
					onMouseEnter={handleInteraction}
					onTouchStart={handleInteraction}
					onClick={handleInteraction}>
					<AspectRatio ratio={16 / 9} className="bg-bg border-soft overflow-hidden rounded-2xl border">
						<video
							ref={backgroundVideoRef}
							loop
							muted
							playsInline
							preload="auto"
							webkit-playsinline="true"
							x5-playsinline="true"
							className="h-full w-full rounded-2xl object-cover">
							<source src="/video/Radian-OS.mp4" type="video/mp4" />
						</video>
					</AspectRatio>
				</div>
			</DialogTrigger>

			<DialogContent backdrop="overlay" className="mx-auto max-w-[1440px] overflow-hidden p-0">
				<DialogHeader className="hidden">
					<DialogTitle></DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>

				<DialogBody className="p-0">
					<div className="relative h-0 w-full pb-[56.25%]">
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
