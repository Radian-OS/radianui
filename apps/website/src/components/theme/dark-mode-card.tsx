import React from "react"
import Image from "next/image"

const DarkModeCard = () => {
	return (
		<div className="border-fill2 rounded-2xl border-8">
			<Image unoptimized className="h-full w-full rounded-2xl" src="/doc/theme-figma.png" alt="Theme Figma" width={800} height={600} />
		</div>
	)
}

export default DarkModeCard
