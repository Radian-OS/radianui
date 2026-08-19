"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { AspectRatio } from "@/registry/ui/aspect-ratio"
import {
	Dialog,
	DialogBody,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/registry/ui/dialog"

export default function VideoDialogPreview() {
	const backgroundVideoRef = useRef<HTMLVideoElement>(null)
	const isDialogOpenRef = useRef(false)

	useEffect(() => {
		const video = backgroundVideoRef.current
		if (!video) return

		// Setting both properties covers browsers that do not reliably preserve the
		// muted state from server-rendered markup before evaluating autoplay.
		video.defaultMuted = true
		video.muted = true

		const playPreview = () => {
			if (!isDialogOpenRef.current) void video.play().catch(() => {})
		}
		const resumeWhenVisible = () => {
			if (document.visibilityState === "visible") playPreview()
		}

		playPreview()
		video.addEventListener("loadeddata", playPreview)
		document.addEventListener("visibilitychange", resumeWhenVisible)

		return () => {
			video.removeEventListener("loadeddata", playPreview)
			document.removeEventListener("visibilitychange", resumeWhenVisible)
		}
	}, [])

	return (
		<Dialog
			onOpenChange={(open) => {
				isDialogOpenRef.current = open
				const video = backgroundVideoRef.current

				if (video) {
					if (open) video.pause()
					else void video.play().catch(() => {})
				}
			}}>
			{/* Trigger */}
			<DialogTrigger asChild>
				<button
					type="button"
					aria-label="Play Radian UI demo"
					className="border-soft bg-bg/60 z-20 max-h-[840px] w-full max-w-[1400px] cursor-pointer appearance-none rounded-2xl border p-3 text-left backdrop-blur-[45px]">
					<AspectRatio
						ratio={16 / 9}
						className="bg-bg border-soft relative max-h-[840px] overflow-hidden rounded-2xl border">
						<Image
							src="/video/Radian-OS-poster.jpg"
							alt="Radian UI component library preview"
							fill
							preload
							fetchPriority="high"
							sizes="(max-width: 768px) calc(100vw - 60px), (max-width: 1440px) calc(100vw - 64px), 1376px"
							className="object-cover"
						/>
						<video
							ref={backgroundVideoRef}
							loop
							muted
							autoPlay
							playsInline
							preload="auto"
							poster="/video/Radian-OS-poster.jpg"
							disablePictureInPicture
							className="absolute inset-0 h-full w-full rounded-2xl object-cover">
							<source
								src="https://cdn.radianui.com/website/videos/Radian-OS-MP4.mp4"
								type="video/mp4"
							/>
						</video>
					</AspectRatio>
				</button>
			</DialogTrigger>

			{/* Dialog Content */}
			<DialogContent className="mx-auto max-h-[90dvh] w-[calc(100vw-1rem)] max-w-[calc(100vw-1rem)] overflow-hidden p-0 sm:w-[90vw] sm:max-w-[90vw]">
				<DialogHeader className="sr-only">
					<DialogTitle>Radian UI demo</DialogTitle>
					<DialogDescription>Watch the Radian UI demo video.</DialogDescription>
				</DialogHeader>

				<DialogBody className="p-0">
					<div className="relative aspect-video w-full">
						<iframe
							className="absolute inset-0 h-full w-full rounded-lg"
							referrerPolicy="strict-origin-when-cross-origin"
							src="https://www.youtube.com/embed/XeYZ6IauaMc?si=mzZLOA22F9MOSAyP"
							title="Radian UI Demo"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
						/>
					</div>
				</DialogBody>
			</DialogContent>
		</Dialog>
	)
}
