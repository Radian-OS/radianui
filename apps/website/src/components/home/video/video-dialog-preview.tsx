"use client"

import { useEffect, useRef, useState } from "react"
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
	const triggerRef = useRef<HTMLButtonElement>(null)
	const isDialogOpenRef = useRef(false)
	const [shouldLoadPreviewVideo, setShouldLoadPreviewVideo] = useState(false)

	useEffect(() => {
		const trigger = triggerRef.current

		if (!trigger || shouldLoadPreviewVideo) return

		if (!("IntersectionObserver" in window)) {
			setShouldLoadPreviewVideo(true)
			return
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setShouldLoadPreviewVideo(true)
					observer.disconnect()
				}
			},
			{ rootMargin: "400px" }
		)

		observer.observe(trigger)

		return () => observer.disconnect()
	}, [shouldLoadPreviewVideo])

	useEffect(() => {
		const video = backgroundVideoRef.current

		if (!video || !shouldLoadPreviewVideo) return

		video.load()

		if (!isDialogOpenRef.current) {
			void video.play().catch(() => {})
		}
	}, [shouldLoadPreviewVideo])

	return (
		<Dialog
			onOpenChange={(open) => {
				isDialogOpenRef.current = open

				const video = backgroundVideoRef.current

				if (video) {
					if (open) video.pause()
					else if (shouldLoadPreviewVideo) void video.play().catch(() => {})
				}
			}}>
			{/* Trigger */}
			<DialogTrigger asChild>
				<button
					ref={triggerRef}
					type="button"
					aria-label="Play Radian OS demo"
					className="border-soft bg-bg/60 z-20 max-h-[840px] w-full max-w-[1400px] cursor-pointer appearance-none rounded-2xl border-0 p-0 text-left backdrop-blur-[45px] sm:border sm:p-3">
					<AspectRatio
						ratio={16 / 9}
						className="bg-bg border-soft max-h-[840px] overflow-hidden rounded-2xl border">
						<video
							ref={backgroundVideoRef}
							loop
							muted
							autoPlay
							playsInline
							preload={shouldLoadPreviewVideo ? "metadata" : "none"}
							poster="/video/Radian-OS-poster.jpg"
							disablePictureInPicture
							className="h-full w-full rounded-2xl object-cover">
							{shouldLoadPreviewVideo ? (
								<>
									<source src="/video/Radian-OS-WEBM.webm" type="video/webm" />
									<source src="/video/Radian-OS-MP4.mp4" type="video/mp4" />
								</>
							) : null}
						</video>
					</AspectRatio>
				</button>
			</DialogTrigger>

			{/* Dialog Content */}
			<DialogContent className="mx-auto max-h-[90dvh] w-[calc(100vw-1rem)] max-w-[calc(100vw-1rem)] overflow-hidden p-0 sm:w-[90vw] sm:max-w-[90vw]">
				<DialogHeader className="sr-only">
					<DialogTitle>Radian OS demo</DialogTitle>
					<DialogDescription>Watch the Radian OS demo video.</DialogDescription>
				</DialogHeader>

				<DialogBody className="p-0">
					<div className="relative aspect-video w-full">
						<iframe
							className="absolute inset-0 h-full w-full rounded-lg"
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
