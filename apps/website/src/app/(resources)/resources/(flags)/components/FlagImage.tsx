import type { ImgHTMLAttributes } from "react"
import { cn } from "@/lib/utils"
import type { FlagName, FlagShape } from "./flags-data"
import {
	getFlagDisplayName,
	getFlagImageLayout,
	getFlagSvgUrl,
} from "./flags-data"

interface FlagImageProps extends Pick<
	ImgHTMLAttributes<HTMLImageElement>,
	"decoding" | "fetchPriority" | "loading"
> {
	name: FlagName
	shape: FlagShape
	size: number
	alt?: string
	className?: string
	imageClassName?: string
}

export function FlagImage({
	name,
	shape,
	size,
	alt = `${getFlagDisplayName(name)} flag`,
	className,
	imageClassName,
	...imageProps
}: FlagImageProps) {
	const src = getFlagSvgUrl(name)

	if (shape === "flat") {
		return (
			<img
				{...imageProps}
				src={src}
				alt={alt}
				width={size}
				height={size}
				className={cn("shrink-0 object-contain", className, imageClassName)}
			/>
		)
	}

	const { imageSize, left, top } = getFlagImageLayout(name, size)
	const intrinsicSize = Math.ceil(imageSize)

	return (
		<span
			className={cn(
				"relative inline-block shrink-0 overflow-hidden rounded-full",
				className
			)}
			style={{ width: size, height: size }}>
			<img
				{...imageProps}
				src={src}
				alt={alt}
				width={intrinsicSize}
				height={intrinsicSize}
				className={cn("absolute max-w-none", imageClassName)}
				style={{
					width: imageSize,
					height: imageSize,
					left,
					top,
				}}
			/>
		</span>
	)
}
