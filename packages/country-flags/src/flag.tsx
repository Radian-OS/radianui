import { type CSSProperties, type SVGProps, useId } from "react"
import {
	type CountryCode,
	countryCodeToFlagId,
	flagsById,
	idToken,
} from "./generated/flag-data"

export type FlagShape = "flat" | "circle"

type FlagAccessibilityProps =
	| {
			"aria-label": string
			"aria-hidden"?: false
	  }
	| {
			"aria-label"?: undefined
			"aria-hidden"?: true
	  }

type NativeSvgProps = Omit<
	SVGProps<SVGSVGElement>,
	| "aria-hidden"
	| "aria-label"
	| "children"
	| "dangerouslySetInnerHTML"
	| "height"
	| "width"
>

export type FlagProps = NativeSvgProps &
	FlagAccessibilityProps & {
		country: CountryCode
		shape?: FlagShape
		size?: number | string
	}

const shapeStyles: Record<FlagShape, CSSProperties> = {
	flat: {},
	circle: { clipPath: "circle(50%)" },
}

const flatViewBox = "0 0 24 24"
const defaultCircleViewBox = "4.1378 4.1378 15.7244 15.7244"

export function Flag({
	"aria-hidden": ariaHidden,
	"aria-label": ariaLabel,
	country,
	shape = "flat",
	size = 24,
	style,
	...svgProps
}: FlagProps) {
	const instanceId = `rf${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`
	const normalizedCountry = country?.toUpperCase() as CountryCode
	const flagId = countryCodeToFlagId[normalizedCountry]
	const flag = flagId ? flagsById[flagId] : undefined
	const resolvedAriaLabel = ariaLabel?.trim() || undefined
	const isLabelled = Boolean(resolvedAriaLabel)

	if (!flag) {
		return (
			<svg
				{...svgProps}
				aria-hidden={ariaHidden ?? (isLabelled ? undefined : true)}
				aria-label={resolvedAriaLabel}
				data-country={normalizedCountry}
				data-flag="placeholder"
				data-shape={shape}
				focusable="false"
				height={size}
				role={isLabelled ? "img" : undefined}
				style={{
					display: "inline-block",
					flex: "none",
					overflow: "hidden",
					verticalAlign: "middle",
					...shapeStyles[shape],
					...style,
				}}
				viewBox={flatViewBox}
				width={size}
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect width="24" height="24" fill="#DEE0E3" />
			</svg>
		)
	}

	return (
		<svg
			{...svgProps}
			aria-hidden={ariaHidden ?? (isLabelled ? undefined : true)}
			aria-label={resolvedAriaLabel}
			data-country={normalizedCountry}
			data-flag={flagId}
			data-shape={shape}
			focusable="false"
			height={size}
			role={isLabelled ? "img" : undefined}
			style={{
				display: "inline-block",
				flex: "none",
				overflow: "hidden",
				verticalAlign: "middle",
				...shapeStyles[shape],
				...style,
			}}
			viewBox={
				shape === "circle"
					? (flag.circleViewBox ?? defaultCircleViewBox)
					: flatViewBox
			}
			width={size}
			xmlns="http://www.w3.org/2000/svg"
			dangerouslySetInnerHTML={{
				__html: flag.svg.replaceAll(idToken, instanceId),
			}}
		/>
	)
}
