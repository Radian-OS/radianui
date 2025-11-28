import React from "react"
import Image from "next/image"
import { AspectRatio } from "@/registry/ui/aspect-ratio"

export default function AspectRatioPreview() {
	return (
		<AspectRatio ratio={16 / 9} className="bg-fill1 max-h-150 overflow-hidden rounded-xl">
			<Image src={"/media/background-2.png"} alt="Aspect Ratio Preview" fill className="object-cover" />
		</AspectRatio>
	)
}
