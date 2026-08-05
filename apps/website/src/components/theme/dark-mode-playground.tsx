"use client"

import BeforeAfterSlider from "react-before-after-slider-component"
import "react-before-after-slider-component/dist/build.css"

const DarkModePlayground = () => {
	const iconStyles = {
		background: "white",
		border: "1px solid var(--color-border)",
		height: "28px",
		width: "28px",
		backgroundImage: "url(/doc/chevrons-left-right.svg)",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
	}
	return (
		<div className="flex items-center justify-center rounded-2xl border p-2">
			<section className="relative flex w-full items-center justify-center overflow-x-hidden rounded-2xl">
				<BeforeAfterSlider
					delimiterIconStyles={iconStyles}
					delimiterColor="transparent"
					firstImage={{ imageUrl: "/doc/dark.webp" }}
					secondImage={{ imageUrl: "/doc/light.webp" }}
					currentPercentPosition={50}
				/>
			</section>
		</div>
	)
}

export default DarkModePlayground
