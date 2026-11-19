import { Slider, SliderThumb } from "@/styles/default/ui/slider"

export function PresetSlider<T extends string>({
	label,
	defaultLabel = "Fundamentals",
	options,
	value,
	onValueChange,
}: {
	label: string
	defaultLabel?: string
	options: readonly (T | undefined)[]
	value: T | undefined
	onValueChange: (value: T | undefined) => void
}) {
	const valueLabel = value ?? defaultLabel
	return (
		<div className="flex flex-col gap-1.5">
			<div className="flex items-center justify-between text-[13px] leading-4">
				<span className="text-fg-secondary">{label}</span>
				<span className="text-fg font-medium">{valueLabel}</span>
			</div>
			<Slider
				min={0}
				max={options.length - 1}
				step={1}
				value={[options.indexOf(value)]}
				onValueChange={([next]) => onValueChange(options[next])}
				classNames={{ sliderTrack: "border-border bg-fill2 h-4 border" }}>
				<span
					aria-hidden="true"
					className="pointer-events-none absolute inset-x-2 top-1/2 flex -translate-y-1/2 justify-between">
					{options.map((preset) => (
						<span
							key={preset ?? "fundamentals"}
							className="bg-bg/60 h-1.5 w-px"
						/>
					))}
				</span>
				<SliderThumb
					aria-label={`${label} preset`}
					aria-valuetext={valueLabel}
					className="border-bg bg-primary focus-visible:ring-primary focus-visible:ring-offset-bg z-10 size-4 border-[3px] shadow-sm focus-visible:ring-2 focus-visible:ring-offset-2"
				/>
			</Slider>
		</div>
	)
}
