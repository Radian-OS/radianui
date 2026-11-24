import { Slider, SliderThumb } from "@/styles/default/ui/slider"
import { cn } from "@/lib/utils"

export function PresetSlider<T extends string>({
	label,
	options,
	value,
	onValueChange,
	defaultLabel,
	defaultValue,
	presetValue,
	className,
}: {
	label: string
	options: readonly T[]
	value: T | undefined
	onValueChange: (value: T) => void
	className?: string
	defaultLabel: string
	defaultValue: number | undefined
	presetValue: (preset: T) => number
}) {
	const isInherited = value === undefined
	const measured = defaultValue !== undefined && !Number.isNaN(defaultValue)
	const closestPreset = measured
		? options.reduce((closest, preset) => {
				const effectiveValue = Math.min(defaultValue, 999)
				return Math.abs(presetValue(preset) - effectiveValue) <
					Math.abs(presetValue(closest) - effectiveValue)
					? preset
					: closest
			})
		: options[0]
	const selectedPreset = value ?? closestPreset
	const currentIndex = options.indexOf(selectedPreset)
	const valueLabel =
		value ??
		(measured ? (defaultValue >= 999 ? "Full" : `Default`) : defaultLabel)

	return (
		<div className={cn("flex flex-col gap-1.5", className)}>
			<div className="flex items-center justify-between text-[13px] leading-4">
				<span className="text-fg-secondary">{label}</span>
				<span
					className={cn(
						"text-[13px]",
						isInherited
							? "text-fg-secondary font-normal"
							: "text-fg font-medium"
					)}>
					{valueLabel}
				</span>
			</div>
			<Slider
				min={0}
				max={options.length - 1}
				step={1}
				value={[currentIndex]}
				onValueChange={([next]) => onValueChange(options[next])}
				onPointerUp={(event) => {
					if (isInherited && event.button === 0) onValueChange(selectedPreset)
				}}
				classNames={{
					sliderTrack: "border-border bg-fill2 h-4 border",
					sliderRange: isInherited ? "bg-fg-tertiary/30" : undefined,
				}}>
				<span
					aria-hidden="true"
					className="pointer-events-none absolute inset-x-2 top-1/2 flex -translate-y-1/2 justify-between">
					{options.map((preset) => (
						<span key={preset} className="bg-bg/60 h-1.5 w-px" />
					))}
				</span>
				<SliderThumb
					aria-label={`${label} preset`}
					aria-valuetext={
						isInherited ? `${valueLabel}, ${defaultLabel}` : valueLabel
					}
					onKeyDown={(event) => {
						if (isInherited && (event.key === "Enter" || event.key === " ")) {
							event.preventDefault()
							onValueChange(selectedPreset)
						}
					}}
					className={cn(
						"border-bg z-10 size-4 border-[3px] shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-offset-2",
						isInherited
							? "border-border bg-fill3 hover:bg-primary/50"
							: "bg-primary border-bg focus-visible:ring-primary focus-visible:ring-offset-bg"
					)}
				/>
			</Slider>
		</div>
	)
}
