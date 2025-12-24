import React from "react"
import Image from "next/image"
import { AspectRatio } from "@/registry/ui/aspect-ratio"

export default function AspectRatioPreview() {
	return (
		<div className="max-w-84.5 w-full">
			<AspectRatio ratio={1 / 1} className="bg-fill1 overflow-hidden rounded-xl">
				<Image src={"/media/background-2.jpg"} alt="Aspect Ratio Preview" fill className="object-cover" />
			</AspectRatio>
		</div>
	)
}
