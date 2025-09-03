"use client"

import React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Input } from "./input"
// import NumberInput from "./number"
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip"

const DEFAULT_STEPPER_VALUE = 5

type Mark = {
	value: number
	label: React.ReactNode
}

type SliderProps = React.ComponentPropsWithRef<typeof SliderPrimitive.Root> & {
	label?: string
	withInput?: boolean
	showSteppers?: boolean
	marks?: Mark[]
	start?: React.ReactNode
	end?: React.ReactNode
	showTooltip?: boolean
	classNames?: {
		base?: string /* The div that wraps the component */
		label?: string /* The label of the slider */
		sliderWrapper?: string /* The wrapper for the slider track, thumbs, and optional steppers or input */
		sliderRoot?: string /* The root of the slider */
		sliderTrack?: string /* The track of the slider */
		sliderRange?: string /* The filled portion of the slider */
		sliderThumb?: string /* The draggable handle of the slider */
		input?: string /* The number input element (displayed when `withInput` is true) */
		mark?: string /* The mark element rendered along the slider track */
	}
}

function Slider({ className, label, withInput = false, showSteppers = false, marks, min = 0, max = 100, start, end, showTooltip = true, classNames, ref, ...props }: SliderProps) {
	const [internalValue, setInternalValue] = React.useState<number[]>(props.value ?? props.defaultValue ?? [0])
	const [input, setInput] = React.useState<number | null>(null)
	const currentValue = props.value || internalValue

	const isSingleThumb = currentValue.length == 1

	function handleValueChange(value: number[]) {
		setInternalValue(value)
		props.onValueChange?.(value)
	}

	/**
	 * Handler for changes in the number input.
	 * Only applicable when a single-thumb slider is used.
	 *
	 * @param value - The new numeric value from the input
	 */
	function handleInputChange(value: number | null) {
		setInput(value)
		if (value) handleValueChange([value])
	}

	/**
	 * Handler for when the number input loses focus.
	 * Sets the input to 0 if it is null.
	 */
	function handleInputBlur() {
		if (input == null) {
			setInput(0)
			handleValueChange([0])
		}
	}

	function handleLabelClick(mark: Mark) {
		if (props.disabled) return

		if (isSingleThumb) {
			handleValueChange([mark.value])
		} else {
			const distances = currentValue.map((value) => Math.abs(value - mark.value))
			const closestValueIndex = distances.indexOf(Math.min(...distances))
			const newValue = [...currentValue]
			newValue[closestValueIndex] = mark.value
			handleValueChange(newValue)
		}
	}

	/* When the slider is single-thumb, keep the input in sync with the slider value */
	React.useEffect(
		function () {
			if (currentValue.length == 1) setInput(currentValue[0])
		},
		[currentValue]
	)

	props.orientation = props.orientation ?? "horizontal"
	const orientation = props.orientation

	return (
		<div
			className={cn(
				"flex flex-col",
				{
					"gap-2": end || start,
					"w-full": orientation === "horizontal",
					"w-full items-center justify-center": orientation === "vertical",
					"cursor-not-allowed": props.disabled,
				},
				end || start ? "gap-2" : "gap-3",
				className,
				classNames?.base
			)}>
			{label && <label className={cn("text-sm font-medium", { "text-fg-tertiary": props.disabled }, classNames?.label)}>{label}</label>}
			<div
				className={cn(
					"flex gap-2",
					{
						"w-full items-center justify-center": orientation === "horizontal",
						"h-full w-fit flex-col items-center": orientation === "vertical",
					},
					classNames?.sliderWrapper
				)}>
				{showSteppers && isSingleThumb && (
					<Button
						iconOnly
						className={cn("size-8", {
							"pointer-events-none cursor-not-allowed opacity-80": props.disabled,
						})}
						variant="outline"
						onClick={function () {
							setInternalValue([Math.max(min, internalValue[0] - (props.step || DEFAULT_STEPPER_VALUE))])
						}}
						disabled={props.disabled}>
						<Minus size={16} />
					</Button>
				)}
				{start}
				<div
					className={cn("relative", {
						"flex-1": orientation === "horizontal",
						"flex h-60 items-center justify-center": orientation === "vertical",
					})}>
					<SliderPrimitive.Root
						ref={ref}
						className={cn(
							"data-disabled:opacity-80 flex w-full touch-none select-none items-center data-[orientation=vertical]:h-full data-[orientation=vertical]:w-fit data-[orientation=vertical]:flex-col",
							classNames?.sliderRoot
						)}
						value={currentValue}
						onValueChange={handleValueChange}
						min={min}
						max={max}
						{...props}>
						<SliderPrimitive.Track
							className={cn(
								"bg-fill3 relative h-2 grow overflow-hidden rounded-full data-[orientation=horizontal]:h-2 data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-2",
								classNames?.sliderTrack
							)}>
							<SliderPrimitive.Range className={cn("bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-8", classNames?.sliderRange)} />
						</SliderPrimitive.Track>
						{currentValue?.map((value, index) =>
							showTooltip ? (
								<Tooltip key={index}>
									<TooltipTrigger asChild>
										<SliderPrimitive.Thumb
											className={cn(
												"border-primary bg-bg drop-shadow-xs focus-visible:outline-hidden data-disabled:cursor-not-allowed block size-5 cursor-pointer rounded-full border-2 transition-colors",
												classNames?.sliderThumb
											)}
										/>
									</TooltipTrigger>
									<TooltipContent withArrow>{value.toString()}</TooltipContent>
								</Tooltip>
							) : (
								<SliderPrimitive.Thumb
									key={index}
									className={cn(
										"border-primary bg-bg drop-shadow-xs focus-visible:outline-hidden data-disabled:cursor-not-allowed block h-5 w-5 cursor-pointer rounded-full border-2 transition-colors",
										classNames?.sliderThumb
									)}
								/>
							)
						)}
					</SliderPrimitive.Root>
					{/* Render marks below the slider track if provided */}
					{marks && marks.length > 0 && (
						<div
							className={cn({
								"relative mx-auto mb-3 mt-2 w-[95%]": orientation === "horizontal",
								"relative my-auto h-[95%]": orientation === "vertical",
							})}>
							{marks.map(function (mark) {
								// Calculate the position of the mark as a percentage
								const percent = ((mark.value - min) / (max - min)) * 100
								return (
									<div
										key={mark.value}
										className={cn(
											"text-fg-secondary absolute cursor-pointer text-xs font-medium",
											{
												"-translate-x-1/2": orientation === "horizontal",
												"ml-2 translate-y-1/2": orientation === "vertical",
												"cursor-not-allowed opacity-80": props.disabled,
											},
											classNames?.mark
										)}
										style={orientation === "horizontal" ? { left: `${percent}%` } : { bottom: `${percent}%` }}
										onClick={function () {
											handleLabelClick(mark)
										}}>
										{mark.label}
									</div>
								)
							})}
						</div>
					)}
				</div>
				{end}
				{showSteppers && isSingleThumb && (
					<Button
						iconOnly
						className={cn("size-8", {
							"pointer-events-none cursor-not-allowed opacity-80": props.disabled,
						})}
						variant="outline"
						onClick={function () {
							setInternalValue([Math.min(max || 100, internalValue[0] + (props.step || DEFAULT_STEPPER_VALUE))])
						}}>
						<Plus size={16} />
					</Button>
				)}
				{withInput && isSingleThumb && (
					<Input
						className="w-20"
						value={input ?? ""}
						onBlur={handleInputBlur}
						onChange={function (e) {
							const value = e.target.value
							if (!value) handleInputChange(null)

							let validValue = parseFloat(value)
							if (parseFloat(value) < min) {
								validValue = min
							} else if (parseFloat(value) > max) {
								validValue = max
							}
							handleInputChange(validValue)
						}}
						onKeyDown={function (e) {
							if (e.key === "Enter") {
								handleInputBlur()
								e.currentTarget.blur()
							}
						}}
						disabled={props.disabled}
					/>
				)}
			</div>
		</div>
	)
}
Slider.displayName = "Slider"

export default Slider
