import React from "react"

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
	return (
		<svg
			width={width}
			height={height}
			viewBox={viewBox}
			fill="none"
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink">
			<rect width={width} height={height} fill="url(#pattern0_2797_43017)" />
			<defs>
				<pattern
					id="pattern0_2797_43017"
					patternUnits="userSpaceOnUse"
					patternTransform="matrix(8.60365 0 0 12.2873 -0.819336 -0.573559)"
					preserveAspectRatio="none"
					viewBox="-0.819336 -0.573559 8.60365 12.2873"
					width="1"
					height="1">
					<use
						xlinkHref="#pattern0_2797_43017_inner"
						transform="translate(-8.60365 -12.2873)"
					/>
					<use
						xlinkHref="#pattern0_2797_43017_inner"
						transform="translate(0 -12.2873)"
					/>
					<use
						xlinkHref="#pattern0_2797_43017_inner"
						transform="translate(-8.60365 0)"
					/>
					<g id="pattern0_2797_43017_inner">
						<line
							opacity="0.8"
							x1="-0.409576"
							y1="12.0005"
							x2="8.19407"
							y2="-0.286788"
							stroke="#E9EAEC"
						/>
					</g>
				</pattern>
			</defs>
		</svg>
	)
}

export default DiagonalDivider
