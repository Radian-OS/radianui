import { SVGProps } from "react"
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/registry/ui/empty"

export default function NoSearchResults() {
	return (
		<Empty>
			<EmptyMedia>
				<EmptyMediaContent />
			</EmptyMedia>
			<EmptyHeader>
				<EmptyTitle>No Search Results</EmptyTitle>
				<EmptyDescription>
					No results found. Try different keyword or adjusting your search
					filters
				</EmptyDescription>
			</EmptyHeader>
		</Empty>
	)
}

function EmptyMediaContent(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			width={120}
			height={80}
			viewBox="0 0 120 80"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}>
			<g clipPath="url(#clip0_1643_2671)">
				<g filter="url(#filter0_d_1643_2671)">
					<rect
						width={120}
						height={24}
						rx={6}
						className="fill-bg"
						shapeRendering="crispEdges"
					/>
					<rect
						x={0.5}
						y={0.5}
						width={119}
						height={23}
						rx={5.5}
						className="stroke-primary-focus"
						shapeRendering="crispEdges"
					/>
					<path
						d="M22 18L19.1333 15.1333M20.6667 11.3333C20.6667 14.2789 18.2789 16.6667 15.3333 16.6667C12.3878 16.6667 10 14.2789 10 11.3333C10 8.38781 12.3878 6 15.3333 6C18.2789 6 20.6667 8.38781 20.6667 11.3333Z"
						className="stroke-primary-border"
						strokeWidth={1.5}
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<rect
						x={30}
						y={9}
						width={59}
						height={6}
						rx={2}
						className="fill-primary-accent"
					/>
				</g>
				<g filter="url(#filter1_d_1643_2671)">
					<rect
						y={30}
						width={120}
						height={28}
						rx={6}
						className="fill-bg"
						shapeRendering="crispEdges"
					/>
					<rect
						x={0.5}
						y={30.5}
						width={119}
						height={27}
						rx={5.5}
						className="stroke-fill3"
						shapeRendering="crispEdges"
					/>
					<rect
						x={8.5}
						y={36.5}
						width={15}
						height={15}
						rx={7.5}
						className="fill-fill1-alpha stroke-fill3"
					/>
					<rect
						x={30}
						y={37}
						width={77}
						height={5}
						rx={1}
						className="fill-primary-accent"
					/>
					<rect
						x={30}
						y={46}
						width={52}
						height={5}
						rx={1}
						className="fill-primary-accent"
					/>
				</g>
				<g filter="url(#filter2_d_1643_2671)">
					<rect
						y={64}
						width={120}
						height={28}
						rx={6}
						className="fill-bg"
						shapeRendering="crispEdges"
					/>
					<rect
						x={0.5}
						y={64.5}
						width={119}
						height={27}
						rx={5.5}
						className="stroke-fill3"
						shapeRendering="crispEdges"
					/>
					<rect
						x={8.5}
						y={70.5}
						width={15}
						height={15}
						rx={7.5}
						className="fill-fill1-alpha stroke-fill3"
					/>
					<rect
						x={30}
						y={71}
						width={77}
						height={5}
						rx={1}
						className="fill-primary-accent"
					/>
				</g>
				<rect
					y={51}
					width={120}
					height={32}
					fill="url(#paint0_linear_1643_2671)"
				/>
			</g>
			<defs>
				<filter
					id="filter0_d_1643_2671"
					x={-1}
					y={0}
					width={122}
					height={26}
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB">
					<feFlood floodOpacity={0} result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy={1} />
					<feGaussianBlur stdDeviation={0.5} />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0.0980392 0 0 0 0 0.0941176 0 0 0 0 0.105882 0 0 0 0.04 0"
					/>
					<feBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_1643_2671"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_1643_2671"
						result="shape"
					/>
				</filter>
				<filter
					id="filter1_d_1643_2671"
					x={-1}
					y={30}
					width={122}
					height={30}
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB">
					<feFlood floodOpacity={0} result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy={1} />
					<feGaussianBlur stdDeviation={0.5} />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0.0980392 0 0 0 0 0.0941176 0 0 0 0 0.105882 0 0 0 0.04 0"
					/>
					<feBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_1643_2671"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_1643_2671"
						result="shape"
					/>
				</filter>
				<filter
					id="filter2_d_1643_2671"
					x={-1}
					y={64}
					width={122}
					height={30}
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB">
					<feFlood floodOpacity={0} result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dy={1} />
					<feGaussianBlur stdDeviation={0.5} />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0.0980392 0 0 0 0 0.0941176 0 0 0 0 0.105882 0 0 0 0.04 0"
					/>
					<feBlend
						mode="normal"
						in2="BackgroundImageFix"
						result="effect1_dropShadow_1643_2671"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_1643_2671"
						result="shape"
					/>
				</filter>
				<linearGradient
					id="paint0_linear_1643_2671"
					x1={60}
					y1={51}
					x2={60}
					y2={83}
					gradientUnits="userSpaceOnUse">
					<stop stopColor="var(--color-bg)" stopOpacity={0} />
					<stop offset={1} stopColor="var(--color-bg)" />
				</linearGradient>
				<clipPath id="clip0_1643_2671">
					<rect width={120} height={80} className="fill-bg" />
				</clipPath>
			</defs>
		</svg>
	)
}
