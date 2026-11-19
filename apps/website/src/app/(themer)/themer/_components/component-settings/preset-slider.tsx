import { RotateCcw } from "lucide-react"
import { Slider, SliderThumb } from "@/styles/default/ui/slider"
import { cn } from "@/lib/utils"

export function PresetSlider<T extends string>({
	label,
	options,
	value,
	onValueChange,
	inheritLabel,
}: {
	label: string
	options: readonly T[]
	value: T | undefined
	onValueChange: (value: T | undefined) => void
	inheritLabel?: string
}) {
	const isInherited = inheritLabel !== undefined && value === undefined
	const valueLabel = isInherited ? inheritLabel : (value ?? options[0])
	const currentIndex = isInherited
		? -1
		: Math.max(0, options.indexOf(value as T))

	return (
		<div className="flex flex-col gap-1.5">
			<div className="flex items-center justify-between text-[13px] leading-4">
				<span className="text-fg-secondary">{label}</span>
				<div className="flex items-center gap-1.5">
					<span
						className={cn(
							"text-[13px]",
							isInherited
								? "text-fg-secondary font-normal"
								: "text-fg font-medium"
						)}>
						{valueLabel}
					</span>
					{inheritLabel && !isInherited && (
						<button
							type="button"
							onClick={() => onValueChange(undefined)}
							className="text-fg-tertiary hover:text-fg flex cursor-pointer items-center transition-colors"
							title={`Reset to ${inheritLabel}`}
							aria-label={`Reset ${label} to ${inheritLabel}`}>
							<RotateCcw className="size-3" />
						</button>
					)}
				</div>
			</div>
			<Slider
				min={0}
				max={options.length - 1}
				step={1}
				value={[currentIndex]}
				onValueChange={([next]) => onValueChange(options[next])}
				classNames={{
					sliderTrack: "border-border bg-fill2 h-4 border",
					sliderRange: isInherited ? "opacity-0" : undefined,
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
					aria-valuetext={valueLabel}
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
