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
				"data-vertical:h-full data-vertical:w-fit data-vertical:flex-col data-vertical:min-h-40 data-disabled:opacity-50 relative flex w-full touch-none select-none items-center",
				classNames?.sliderRoot,
				className
			)}
			min={min}
			max={max}
			{...props}>
			<SliderPrimitive.Track
				data-slot="slider-track"
				className={cn(
					"data-horizontal:h-1 data-vertical:h-full data-horizontal:w-full data-vertical:w-2 bg-fill3 relative h-2 grow overflow-hidden rounded-full",
					classNames?.sliderTrack
				)}>
				<SliderPrimitive.Range
					data-slot="slider-range"
					className={cn(
						"bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-8",
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
				"focus-visible:outline-hidden data-disabled:cursor-not-allowed border-primary bg-bg drop-shadow-xs block size-4 cursor-pointer rounded-full border-2 transition-colors",
				className
			)}
			{...props}
		/>
	)
}

export { Slider, SliderThumb }
