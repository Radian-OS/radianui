import { Slider, SliderThumb } from "@/styles/default/ui/slider"

export default function RangeSlider() {
	return (
		<Slider className="w-[420px]" defaultValue={[20, 60]}>
			<SliderThumb />
			<SliderThumb />
		</Slider>
	)
}
