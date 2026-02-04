"use client"

import React, { useRef } from "react"
import { AspectRatio } from "@/registry/ui/aspect-ratio"
import { Dialog, DialogBody, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/registry/ui/dialog"

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
					<AspectRatio ratio={16 / 9} className="bg-bg border-soft overflow-hidden rounded-2xl border">
						<video ref={backgroundVideoRef} className="h-full w-full rounded-2xl object-cover" src="/video/Radian-OS.mp4" autoPlay loop muted playsInline />
					</AspectRatio>
				</div>
			</DialogTrigger>

			{/* Dialog Content */}
			<DialogContent backdrop="overlay" className="mx-2 w-full max-w-3xl">
				<DialogHeader>
					<DialogTitle>Radian OS Demo Video</DialogTitle>
					<DialogDescription>Watch the full demo on YouTube</DialogDescription>
				</DialogHeader>

				<DialogBody className="p-0">
					<div className="relative h-0 w-full pb-[56.25%]">
						{/* 16:9 */}
						<iframe
							className="absolute left-0 top-0 h-full w-full rounded-lg"
							src="https://www.youtube.com/embed/hFLP4i7Q0eM?si=Rmh6vjK2QUBpv4AD&autoplay=1&mute=1&rel=0&modestbranding=1"
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
