import { Slider, SliderThumb } from "@/registry/ui/slider"

export default function SliderWithMarks() {
	const marks = [0, 25, 50, 75, 100]

	return (
		<div className="relative w-[320px]">
			<Slider defaultValue={[50]} step={25}>
				<SliderThumb />
			</Slider>

			<div className="absolute left-0 right-0 top-full flex justify-between px-2">
				{marks.map((mark) => (
					<span key={mark} className="text-muted-foreground relative flex flex-col items-center text-xs">
						<span className="bg-muted-foreground h-2 w-[2px]"></span>
						<span className="mt-1">{mark}</span>
					</span>
				))}
			</div>
		</div>
	)
}
