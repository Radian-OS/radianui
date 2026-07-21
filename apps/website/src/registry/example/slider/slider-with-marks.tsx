import { Label } from "@/registry/ui/label"
import { Slider, SliderThumb } from "@/registry/ui/slider"

export default function SliderWithMarks() {
	const min = 0
	const max = 12
	const step = 1
	const marks = [0, 2, 4, 6, 8, 10, 12]
	const allMarks = Array.from({ length: max - min + 1 }, (_, i) => i + min)

	return (
		<div className="flex w-full max-w-[320px] flex-col gap-2">
			<Label className="text-fg font-semibold">Duration (Months)</Label>

			<div className="relative w-full">
				<Slider defaultValue={[6]} step={step} max={max} min={min}>
					<SliderThumb />
				</Slider>

				{/* Tick marks */}
				<div className="relative mt-2 w-full px-2">
					{allMarks.map((mark) => {
						const percent = ((mark - min) / (max - min)) * 100
						const isMajor = marks.includes(mark)
						return (
							<span
								key={mark}
								className="absolute top-0 flex -translate-x-1/2 flex-col items-center"
								style={{ left: `${percent}%` }}>
								<span
									className={`bg-fg-secondary w-px opacity-30 ${isMajor ? "h-1" : "h-0.5"}`}
								/>
							</span>
						)
					})}
				</div>

				{/* Labels */}
				<div className="relative mt-3 w-full px-2">
					{marks.map((mark) => {
						const percent = ((mark - min) / (max - min)) * 100
						return (
							<span
								key={mark}
								className="text-fg-secondary absolute -translate-x-1/2 text-xs"
								style={{ left: `${percent}%` }}>
								{mark}
							</span>
						)
					})}
				</div>
			</div>
		</div>
	)
}
