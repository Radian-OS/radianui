import React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "@/lib/utils"

export type SliderProps = React.ComponentPropsWithRef<
	typeof SliderPrimitive.Root
> & {
	classNames?: {
		sliderRoot?: string
		sliderTrack?: string
		sliderRange?: string
	}
}

export type SliderThumbProps = React.ComponentProps<
	typeof SliderPrimitive.Thumb
>

function Slider({
	className,
	min = 0,
	max = 100,
	classNames,
	children,
	...props
}: SliderProps) {
	return (
		<SliderPrimitive.Root
			data-slot="slider"
			className={cn(
				"relative flex touch-none items-center select-none data-disabled:opacity-50",
				"data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
				classNames?.sliderRoot,
				className
			)}
			min={min}
			max={max}
			{...props}>
			<SliderPrimitive.Track
				data-slot="slider-track"
				className={cn(
					"bg-fill2-alpha relative h-2 w-full grow overflow-hidden rounded-full",
					"data-[orientation=vertical]:w-2",
					classNames?.sliderTrack
				)}>
				<SliderPrimitive.Range
					data-slot="slider-range"
					className={cn(
						"bg-primary absolute h-full",
						"data-[orientation=vertical]:h-auto data-[orientation=vertical]:w-full",
						classNames?.sliderRange
					)}
				/>
			</SliderPrimitive.Track>

			{children}
		</SliderPrimitive.Root>
	)
}

function SliderThumb({ className, ...props }: SliderThumbProps) {
	return (
		<SliderPrimitive.Thumb
			data-slot="slider-thumb"
			className={cn(
				"border-primary bg-bg block size-4 cursor-pointer rounded-full border-2 drop-shadow-xs transition-colors focus-visible:outline-hidden data-disabled:cursor-not-allowed",
				className
			)}
			{...props}
		/>
	)
}

export { Slider, SliderThumb }
