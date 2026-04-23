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
				"cn-slider data-vertical:h-full data-vertical:w-fit data-vertical:flex-col data-vertical:min-h-40 relative flex w-full touch-none select-none items-center",
				classNames?.sliderRoot,
				className
			)}
			min={min}
			max={max}
			{...props}>
			<SliderPrimitive.Track
				data-slot="slider-track"
				className={cn(
					"cn-slider-track data-horizontal:h-1 data-vertical:h-full data-horizontal:w-full data-vertical:w-2 relative grow overflow-hidden",
					classNames?.sliderTrack
				)}>
				<SliderPrimitive.Range
					data-slot="slider-range"
					className={cn(
						"cn-slider-range data-horizontal:h-full data-vertical:w-8 absolute",
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
				"cn-slider-thumb focus-visible:outline-hidden data-disabled:cursor-not-allowed block size-4 cursor-pointer transition-colors",
				className
			)}
			{...props}
		/>
	)
}

export { Slider, SliderThumb }
