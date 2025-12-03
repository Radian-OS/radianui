import React from "react"
import Image from "next/image"
import { AspectRatio } from "@/registry/ui/aspect-ratio"

export default function AspectRatioPreview() {
	return (
		<div className="w-full max-w-[420px]">
			<AspectRatio ratio={16 / 9} className="bg-fill1 rounded-xl">
				<Image src={"/media/background-2.png"} alt="Aspect Ratio Preview" fill className="rounded-xl object-cover" />
			</AspectRatio>
		</div>
	)
}
