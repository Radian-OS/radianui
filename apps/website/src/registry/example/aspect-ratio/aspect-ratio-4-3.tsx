import React from "react"
import Image from "next/image"
import { AspectRatio } from "@/styles/default/ui/aspect-ratio"

export default function AspectRatioPreview() {
	return (
		<div className="max-w-112.5 w-full">
			<AspectRatio
				ratio={4 / 3}
				className="bg-fill1 overflow-hidden rounded-xl">
				<Image
					src={"/media/background-2.jpg"}
					alt="Aspect Ratio Preview"
					fill
					className="object-cover"
				/>
			</AspectRatio>
		</div>
	)
}
