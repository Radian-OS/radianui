import { Slider, SliderThumb } from "@/registry/ui/slider"

export default function SliderVertical() {
	return (
		<Slider value={[80]} className="w-[320px] -rotate-90">
			<SliderThumb />
		</Slider>
	)
}
