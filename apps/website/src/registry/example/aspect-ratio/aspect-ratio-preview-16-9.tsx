import React from "react"
import Image from "next/image"
import { AspectRatio } from "@/registry/ui/aspect-ratio"

export default function AspectRatioPreview() {
	return (
		<div className="w-full max-w-150">
			<AspectRatio
				ratio={16 / 9}
				className="bg-fill1 overflow-hidden rounded-xl">
				<Image
					src={"/media/background-2.jpg"}
					alt="Aspect Ratio Preview"
					fill
					priority
					className="object-cover"
				/>
			</AspectRatio>
		</div>
	)
}
