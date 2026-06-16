import { Slider, SliderThumb } from "@/registry/ui/slider"

export default function SliderDisabled() {
	return (
		<Slider className="w-[320px]" defaultValue={[15]} disabled>
			<SliderThumb />
		</Slider>
	)
}
