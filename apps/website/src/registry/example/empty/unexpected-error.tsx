import { SVGProps } from "react"
import { Button } from "@/registry/ui/button"
import {
	Empty,
	EmptyAction,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/registry/ui/empty"

export default function UnexpectedError() {
	return (
		<Empty>
			<EmptyMedia>
				<EmptyMediaContent />
			</EmptyMedia>
			<EmptyHeader>
				<EmptyTitle>Unexpected Error</EmptyTitle>
				<EmptyDescription>
					Something went wrong. Please try again later or refresh the page
				</EmptyDescription>
			</EmptyHeader>
			<EmptyAction>
				<Button variant="outline" color="neutral">
					Contact Support
				</Button>
				<Button>Retry</Button>
			</EmptyAction>
		</Empty>
	)
}

function EmptyMediaContent(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			width={126}
			height={88}
			viewBox="0 0 126 88"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}>
			<g filter="url(#filter0_d_1642_2500)">
				<rect
					x={8}
					y={4}
					width={110}
					height={72}
					rx={8}
					className="fill-bg"
					shapeRendering="crispEdges"
				/>
				<rect
					x={8.5}
					y={4.5}
					width={109}
					height={71}
					rx={7.5}
					className="stroke-soft"
					shapeRendering="crispEdges"
				/>
				<rect
					x={16}
					y={12}
					width={6}
					height={6}
					rx={3}
					className="fill-fill4"
				/>
				<rect
					x={26}
					y={12}
					width={6}
					height={6}
					rx={3}
					className="fill-fill4"
				/>
				<rect
					x={36}
					y={12}
					width={6}
					height={6}
					rx={3}
					className="fill-fill4"
				/>
				<path
					d="M71.6025 36.6581L64.61 25.45C64.4408 25.1759 64.2044 24.9496 63.9233 24.7924C63.6421 24.6352 63.3255 24.5524 63.0034 24.5519C62.6813 24.5513 62.3644 24.633 62.0827 24.7892C61.801 24.9454 61.5639 25.1709 61.3937 25.4444L54.39 36.6713C54.2271 36.9569 54.1415 37.28 54.1416 37.6087C54.1417 37.9375 54.2274 38.2606 54.3904 38.5461C54.5533 38.8316 54.7879 39.0698 55.0709 39.2371C55.3539 39.4043 55.6756 39.495 56.0044 39.5H69.9956C70.3256 39.4948 70.6484 39.4033 70.9321 39.2348C71.2158 39.0663 71.4505 38.8265 71.6129 38.5392C71.7753 38.252 71.8598 37.9273 71.858 37.5973C71.8561 37.2673 71.7681 36.9436 71.6025 36.6581Z"
					className="fill-primary-border"
				/>
				<path
					d="M62.4294 33.64L62.2632 31.155C62.2307 30.655 62.06 29.8469 62.4419 29.4407C62.7325 29.1282 63.4207 29.0744 63.6294 29.5075C63.8069 30.0165 63.8462 30.5634 63.7432 31.0925L63.5207 33.6507C63.5111 33.8914 63.4584 34.1285 63.365 34.3507C63.3283 34.4225 63.2726 34.483 63.204 34.5255C63.1353 34.568 63.0564 34.5909 62.9756 34.5917C62.8949 34.5926 62.8155 34.5713 62.746 34.5302C62.6765 34.4892 62.6195 34.4299 62.5813 34.3588C62.4933 34.1286 62.4421 33.8861 62.4294 33.64ZM63.005 37.0544C62.808 37.0533 62.6187 36.9771 62.4758 36.8414C62.3328 36.7057 62.247 36.5206 62.2357 36.3239C62.2244 36.1271 62.2885 35.9334 62.4149 35.7822C62.5413 35.631 62.7206 35.5337 62.9163 35.51C63.0214 35.4973 63.128 35.5063 63.2296 35.5363C63.3311 35.5664 63.4254 35.617 63.5066 35.6849C63.5878 35.7528 63.6543 35.8367 63.7018 35.9313C63.7494 36.0259 63.7771 36.1292 63.7831 36.235C63.7892 36.3407 63.7735 36.4465 63.7371 36.5459C63.7007 36.6454 63.6443 36.7363 63.5714 36.8131C63.4985 36.8898 63.4106 36.9509 63.3132 36.9924C63.2158 37.0339 63.1109 37.055 63.005 37.0544Z"
					className="fill-bg"
				/>
				<rect
					x={43}
					y={46}
					width={40}
					height={5}
					rx={1}
					className="fill-primary-focus"
				/>
				<rect
					x={51}
					y={54}
					width={24}
					height={5}
					rx={1}
					className="fill-primary-focus"
				/>
			</g>
			<defs>
				<filter
					id="filter0_d_1642_2500"
					x={0}
					y={0}
					width={126}
					height={88}
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB">
					<feFlood floodOpacity={0} result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy={4} />
					<feGaussianBlur stdDeviation={4} />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0.0980392 0 0 0 0 0.0941176 0 0 0 0 0.105882 0 0 0 0.08 0"
					/>
					<feBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_1642_2500"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_1642_2500"
						result="shape"
					/>
				</filter>
			</defs>
		</svg>
	)
}
