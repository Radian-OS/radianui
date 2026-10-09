"use client"

import React, { useState } from "react"
import { Play, X } from "lucide-react"
import { Button } from "@/styles/default/ui/button"
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/styles/default/ui/dialog"

interface VideoDialogProps {
	label?: string
	videoUrl?: string
}

export function VideoDialog({
	label = "Watch demo",
	videoUrl = "https://www.youtube.com/embed/ymTlzbkvvPk?controls=0",
}: VideoDialogProps) {
	const [open, setOpen] = useState(false)

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" color="neutral">
					<Play className="size-3.5 fill-current" />
					<span>{label}</span>
				</Button>
			</DialogTrigger>
			<DialogContent
				backdrop="blackOverlay"
				closeButton="hidden"
				className="border-soft gap-0 overflow-hidden rounded-2xl bg-black p-0 sm:max-w-2xl">
				<DialogTitle className="sr-only">Demo Video</DialogTitle>
				<button
					type="button"
					onClick={() => setOpen(false)}
					className="absolute top-3 right-3 z-10 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-xs transition-colors hover:bg-black/80"
					aria-label="Close dialog">
					<X className="size-4" />
				</button>
				<div className="relative aspect-video w-full bg-black">
					{open && (
						<iframe
							className="h-full w-full"
							src={`${videoUrl}${videoUrl.includes("?") ? "&" : "?"}autoplay=1`}
							title="Product demo video"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							referrerPolicy="strict-origin-when-cross-origin"
							allowFullScreen
						/>
					)}
				</div>
			</DialogContent>
		</Dialog>
	)
}
