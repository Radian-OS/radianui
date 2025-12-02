import React from "react"
import Image from "next/image"
import { AspectRatio } from "@/registry/ui/aspect-ratio"

export default function AspectRatioPreview() {
	return (
		<div className="w-full max-w-[500px]">
			<AspectRatio ratio={16 / 9} className="bg-fill1 max-h-150 overflow-hidden rounded-xl">
				<Image src={"/media/background-2.png"} alt="Aspect Ratio Preview" fill className="object-cover" />
			</AspectRatio>
		</div>
	)
}
