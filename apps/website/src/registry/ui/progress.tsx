import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

export type ProgressProps = React.ComponentProps<
	typeof ProgressPrimitive.Root
> & {
	indicatorClassName?: string
}

function Progress({
	value,
	className,
	indicatorClassName,
	...props
}: ProgressProps) {
	return (
		<ProgressPrimitive.Root
			className={cn(
				"bg-fill3 translate-z-0 relative h-1.5 w-full transform overflow-hidden rounded-full",
				className
			)}
			{...props}>
			<ProgressPrimitive.Indicator
				className={cn(
					"bg-primary duration-660 h-full w-full transition-transform [transition-timing-function:cubic-bezier(0,0,1,1)]",
					indicatorClassName
				)}
				style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
			/>
		</ProgressPrimitive.Root>
	)
}

Progress.displayName = ProgressPrimitive.Root.displayName

function ProgressCircle({
	className,
	indicatorClassName,
	trackClassName,
	value = 0,
	size = 48,
	strokeWidth = 4,
	children,
	...props
}: React.ComponentProps<"div"> & {
	/**
	 * Progress value from 0 to 100
	 */
	value?: number
	/**
	 * Size of the circle in pixels
	 */
	size?: number
	/**
	 * Width of the progress stroke
	 */
	strokeWidth?: number
	/**
	 * Additional className for the progress stroke
	 */
	indicatorClassName?: string
	/**
	 * Additional className for the progress track
	 */
	trackClassName?: string
	/**
	 * Content to display in the center of the circle
	 */
	children?: React.ReactNode
}) {
	const radius = (size - strokeWidth) / 2
	const circumference = radius * 2 * Math.PI
	const offset = circumference - (value / 100) * circumference
	return (
		<div
			data-slot="progress-circle"
			className={cn(
				"relative inline-flex items-center justify-center",
				className
			)}
			style={{ width: size, height: size }}
			{...props}>
			<svg
				className="absolute inset-0 -rotate-90"
				width={size}
				height={size}
				viewBox={`0 0 ${size} ${size}`}>
				<circle
					data-slot="progress-circle-track"
					cx={size / 2}
					cy={size / 2}
					r={radius}
					stroke="currentColor"
					strokeWidth={strokeWidth}
					fill="none"
					className={cn("text-secondary", trackClassName)}
				/>
				<circle
					data-slot="progress-circle-indicator"
					cx={size / 2}
					cy={size / 2}
					r={radius}
					stroke="currentColor"
					strokeWidth={strokeWidth}
					fill="none"
					strokeDasharray={circumference}
					strokeDashoffset={offset}
					strokeLinecap="round"
					className={cn(
						"text-primary transition-all duration-300 ease-in-out",
						indicatorClassName
					)}
				/>
			</svg>
			{children && (
				<div
					data-slot="progress-circle-content"
					className="relative z-10 flex items-center justify-center text-sm font-medium">
					{children}
				</div>
			)}
		</div>
	)
}

ProgressCircle.displayName = ProgressPrimitive.Root.displayName

function ProgressRadial({
	className,
	value = 0,
	size = 120,
	strokeWidth = 8,
	startAngle = -90,
	endAngle = 90,
	showLabel = false,
	trackClassName,
	indicatorClassName,
	children,
	...props
}: React.ComponentProps<"div"> & {
	/**
	 * Progress value from 0 to 100
	 */
	value?: number
	/**
	 * Size of the radial in pixels
	 */
	size?: number
	/**
	 * Width of the progress stroke
	 */
	strokeWidth?: number
	/**
	 * Start angle in degrees
	 */
	startAngle?: number
	/**
	 * Additional className for the progress stroke
	 */
	indicatorClassName?: string
	/**
	 * Additional className for the progress track
	 */
	trackClassName?: string
	/**
	 * End angle in degrees
	 */
	endAngle?: number
	/**
	 * Whether to show percentage label
	 */
	showLabel?: boolean
	/**
	 * Custom content to display
	 */
	children?: React.ReactNode
}) {
	const radius = (size - strokeWidth) / 2
	const angleRange = endAngle - startAngle
	const progressAngle = (value / 100) * angleRange
	const toRadians = (degrees: number) => (degrees * Math.PI) / 180
	const startX = size / 2 + radius * Math.cos(toRadians(startAngle))
	const startY = size / 2 + radius * Math.sin(toRadians(startAngle))
	const endX =
		size / 2 + radius * Math.cos(toRadians(startAngle + progressAngle))
	const endY =
		size / 2 + radius * Math.sin(toRadians(startAngle + progressAngle))
	const largeArc = progressAngle > 180 ? 1 : 0
	const pathData = [
		"M",
		startX,
		startY,
		"A",
		radius,
		radius,
		0,
		largeArc,
		1,
		endX,
		endY,
	].join(" ")
	return (
		<div
			data-slot="progress-radial"
			className={cn(
				"relative inline-flex items-center justify-center",
				className
			)}
			style={{ width: size, height: size }}
			{...props}>
			<svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
				<path
					d={[
						"M",
						size / 2 + radius * Math.cos(toRadians(startAngle)),
						size / 2 + radius * Math.sin(toRadians(startAngle)),
						"A",
						radius,
						radius,
						0,
						angleRange > 180 ? 1 : 0,
						1,
						size / 2 + radius * Math.cos(toRadians(endAngle)),
						size / 2 + radius * Math.sin(toRadians(endAngle)),
					].join(" ")}
					stroke="currentColor"
					strokeWidth={strokeWidth}
					fill="none"
					strokeLinecap="round"
					className={cn("text-secondary", trackClassName)}
				/>
				<path
					d={pathData}
					stroke="currentColor"
					strokeWidth={strokeWidth}
					fill="none"
					strokeLinecap="round"
					className={cn(
						"text-primary transition-all duration-300 ease-in-out",
						indicatorClassName
					)}
				/>
			</svg>
			{(showLabel || children) && (
				<div className="absolute inset-0 flex items-center justify-center">
					{children || <span className="text-lg font-bold">{value}%</span>}
				</div>
			)}
		</div>
	)
}

ProgressRadial.displayName = ProgressPrimitive.Root.displayName

export { Progress, ProgressCircle, ProgressRadial }
