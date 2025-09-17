import BeforeAfterSlider from "react-before-after-slider-component"
import "react-before-after-slider-component/dist/build.css"

const DarkModePlayground = () => {
	return (
		<div className="flex items-center justify-center rounded-2xl border p-2">
			<section className="relative flex w-full items-center justify-center rounded-2xl">
				<BeforeAfterSlider
					firstImage={{ imageUrl: "/thumbnails/dark.png" }}
					secondImage={{ imageUrl: "/thumbnails/light.png" }}
					currentPercentPosition={50}
					className="rounded-2xl"
				/>
			</section>
		</div>
	)
}

export default DarkModePlayground
