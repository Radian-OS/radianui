import { Slider, SliderThumb } from "@/styles/default/ui/slider"

export default function SliderWithMarks() {
	const marks = [0, 25, 50, 75, 100]
	const max = 100
	const min = 0

	return (
		<div className="relative w-[320px]">
			<Slider defaultValue={[50]} step={25} max={max} min={min}>
				<SliderThumb />
			</Slider>

			<div className="relative mx-auto mt-3 w-[95%]">
				{marks.map((mark) => {
					const percent = ((mark - min) / (max - min)) * 100
					return (
						<span
							key={mark}
							className="text-fg-secondary absolute flex -translate-x-1/2 flex-col items-center text-xs"
							style={{ left: `${percent}%` }}>
							{mark}
						</span>
					)
				})}
			</div>
		</div>
	)
}
