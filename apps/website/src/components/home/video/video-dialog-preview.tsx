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
					className="border-soft bg-bg z-20 w-full max-w-[1440px] cursor-pointer appearance-none rounded-2xl border-0 p-0 text-left sm:border sm:p-3">
					<AspectRatio
						ratio={16 / 9}
						className="bg-bg border-soft overflow-hidden rounded-2xl border">
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
			<DialogContent className="mx-auto max-w-[1440px] overflow-hidden p-0">
				<DialogHeader className="sr-only">
					<DialogTitle>Radian OS demo</DialogTitle>
					<DialogDescription>Watch the Radian OS demo video.</DialogDescription>
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
