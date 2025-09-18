import BeforeAfterSlider from "react-before-after-slider-component"
import "react-before-after-slider-component/dist/build.css"

const DarkModePlayground = () => {
	const iconStyles = { background: "white", border: "1px solid var(--color-primary)", backgroundImage: "url(/doc/chevrons-left-right.png)" }
	return (
		<div className="flex items-center justify-center rounded-2xl border p-2">
			<section className="relative flex w-full items-center justify-center rounded-2xl">
				<BeforeAfterSlider
					delimiterIconStyles={iconStyles}
					delimiterColor="transparent"
					firstImage={{ imageUrl: "/doc/dark.png" }}
					secondImage={{ imageUrl: "/doc/light.png" }}
					currentPercentPosition={50}
				/>
			</section>
		</div>
	)
}

export default DarkModePlayground
