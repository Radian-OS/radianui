import React, { useId } from "react"

interface DiagonalDividerProps {
	className?: string
	width?: string | number
	height?: string | number
	viewBox?: string
}

const DiagonalDivider = ({
	className,
	width = "1440",
	height = "48",
	viewBox = "0 0 1440 48",
}: DiagonalDividerProps) => {
	const uniqueId = useId()
	const patternId = `pattern_diagonal_${uniqueId}`
	const innerId = `pattern_diagonal_inner_${uniqueId}`

	return (
		<svg
			width={width}
			height={height}
			viewBox={viewBox}
			fill="none"
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink">
			<rect width={width} height={height} fill={`url(#${patternId})`} />
			<defs>
				<pattern
					id={patternId}
					patternUnits="userSpaceOnUse"
					patternTransform="matrix(8.60365 0 0 12.2873 -0.819336 -0.573559)"
					preserveAspectRatio="none"
					viewBox="-0.819336 -0.573559 8.60365 12.2873"
					width="1"
					height="1">
					<use
						xlinkHref={`#${innerId}`}
						transform="translate(-8.60365 -12.2873)"
					/>
					<use xlinkHref={`#${innerId}`} transform="translate(0 -12.2873)" />
					<use xlinkHref={`#${innerId}`} transform="translate(-8.60365 0)" />
					<g id={innerId}>
						<line
							opacity="0.8"
							x1="-0.409576"
							y1="12.0005"
							x2="8.19407"
							y2="-0.286788"
							className="stroke-border"
						/>
					</g>
				</pattern>
			</defs>
		</svg>
	)
}

export default DiagonalDivider
