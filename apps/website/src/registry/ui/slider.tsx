"use client"

import React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "@/lib/utils"

export type SliderProps = React.ComponentPropsWithRef<typeof SliderPrimitive.Root> & {
	classNames?: {
		sliderRoot?: string
		sliderTrack?: string
		sliderRange?: string
	}
}

export type SliderThumbProps = React.ComponentProps<typeof SliderPrimitive.Thumb>

function Slider({ className, min = 0, max = 100, classNames, children, ...props }: SliderProps) {
	return (
		<SliderPrimitive.Root
			data-slot="slider"
			className={cn(
				"data-disabled:opacity-50 relative flex w-full touch-none select-none items-center data-[orientation=vertical]:h-full data-[orientation=vertical]:w-fit data-[orientation=vertical]:flex-col",
				classNames?.sliderRoot,
				className
			)}
			min={min}
			max={max}
			{...props}>
			<SliderPrimitive.Track
				data-slot="slider-track"
				className={cn(
					"bg-fill3 relative h-2 grow overflow-hidden rounded-full data-[orientation=horizontal]:h-2 data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-2",
					classNames?.sliderTrack
				)}>
				<SliderPrimitive.Range
					data-slot="slider-range"
					className={cn("bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-8", classNames?.sliderRange)}
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
				"border-primary bg-bg drop-shadow-xs focus-visible:outline-hidden data-disabled:cursor-not-allowed block size-4 cursor-pointer rounded-full border-2 transition-colors",
				className
			)}
			{...props}
		/>
	)
}

export { Slider, SliderThumb }
