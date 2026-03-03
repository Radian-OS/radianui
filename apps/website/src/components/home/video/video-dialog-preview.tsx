"use client"

import React, { useRef } from "react"
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

	return (
		<Dialog
			onOpenChange={(open) => {
				if (backgroundVideoRef.current) {
					if (open)
						backgroundVideoRef.current.pause() // pause background video
					else backgroundVideoRef.current.play() // resume when dialog closes
				}
			}}>
			{/* Trigger */}
			<DialogTrigger asChild>
				<div className="border-soft bg-bg z-20 w-full max-w-[1440px] cursor-pointer rounded-2xl p-0 sm:border sm:p-3">
					<AspectRatio
						ratio={16 / 9}
						className="bg-bg border-soft overflow-hidden rounded-2xl border">
						<video
							ref={backgroundVideoRef}
							loop
							muted
							autoPlay
							playsInline
							preload="auto"
							poster="/video/Radian-OS-poster.jpg"
							disablePictureInPicture
							className="h-full w-full rounded-2xl object-cover">
							<source src="/video/Radian-OS-WEBM.webm" type="video/webm" />
							<source src="/video/Radian-OS-MP4.mp4" type="video/mp4" />
						</video>
					</AspectRatio>
				</div>
			</DialogTrigger>

			{/* Dialog Content */}
			<DialogContent
				backdrop="overlay"
				className="mx-auto max-w-[1440px] overflow-hidden p-0">
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
