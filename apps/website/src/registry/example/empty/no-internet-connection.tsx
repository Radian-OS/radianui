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

export default function NoInternetConnection() {
	return (
		<Empty>
			<EmptyMedia className="h-20">
				<NoInternetConnectionMediaContent className="h-18 w-27.5" />
			</EmptyMedia>
			<EmptyHeader>
				<EmptyTitle>No Internet Connection</EmptyTitle>
				<EmptyDescription>
					You’re offline. We’ll reconnect automatically when you’re back online
				</EmptyDescription>
			</EmptyHeader>
			<EmptyAction>
				<Button>Refresh Page</Button>
			</EmptyAction>
		</Empty>
	)
}

function NoInternetConnectionMediaContent(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			width={126}
			height={88}
			viewBox="0 0 126 88"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}>
			<g filter="url(#filter0_d_1643_2599)">
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
					fillRule="evenodd"
					clipRule="evenodd"
					d="M81.4076 50.0405V51.0148L78.55 51.0145V54.4194H82.6507V55.1162H78.55V57.9997H74.8227V55.1162H58.1184V55.7054H59.7207V57.9998H55.8176V55.1162H54.5647H54.2154H53.3119H52.9625H51.7096V55.7055H53.3119V57.9999H49.4088V55.1163H43.3493V54.4196H49.409V52.1743H47.8067V50.5376H46.2045V49.0569H44.6023V47.5761H43V38.8324H45.3009V41.9889H46.9031V43.4697H48.5053V45.1066H51.3628V43.5089H52.7316V41.9112H54.1277V40.3134H55.8176V32.4808H57.3807V31H67.6144V32.4808H69.1776V37.9316H62.8469V38.7157H67.6144V41.0101H61.1861V43.5088H64.2537V47.4009H62.07V45.8032H61.1861V48.979H59.7011V50.3429H58.1185V54.4198H74.8227V47.1181H71.9651V46.1438H71.1445V45.2865H70.3727V38.6862H71.1445V37.9068H73.328V38.6862H74.0999V42.7972H74.8227V35.3348H75.5945V34.5555H77.7781V35.3348H78.55V46.694H79.2728V38.6862H80.0445V37.9068H82.2281V38.6862H83V49.1833H82.2282V50.0405H81.4076ZM53.312 53.4408V54.4197H54.2155V53.4408H53.312ZM59.0221 57.3034V56.4024L57.4199 56.4022V49.646H59.0025V48.2821H60.4875V45.1063H62.7688V46.704H63.5551V44.2053H60.4875V40.3132H66.9158V39.4123H62.1483V37.2347H68.479V33.1774H66.9158V31.6966H58.0795V33.1774H56.5164V41.01H54.8265V42.6077H53.4304V44.2054H52.0616V45.8032H47.8067V44.1665H46.2045V42.6857H44.6023V39.5292H43.6987V46.8795H45.3009V48.3603H46.9031V49.841H48.5053V51.4777H50.1076V57.3034H52.6133V56.4025H51.011V54.4198H52.6133V52.7442H54.9141V54.4198H56.5164V57.3034H59.0221ZM75.5214 57.3033H77.8513L77.8512 50.3181H80.7088V49.3438H81.5294V48.4865H82.3013V39.3828H81.5294V38.6035H80.7432V39.3828H79.9714V47.3907H77.8513V36.0314H77.0794V35.2521H76.2932V36.0314H75.5214V43.4939H73.4012V39.3828H72.6293V38.6035H71.8431V39.3828H71.0714V44.5897H71.8431V45.447H72.6638V46.4213H75.5214V57.3033ZM44.6979 57.3033H43.3493V58H44.6979V57.3033ZM66.0873 57.3033H64.5626V58H66.0873V57.3033ZM47.9023 55.8026H45.8696V56.4993H47.9023V55.8026ZM71.8319 55.8026H69.0573V56.4993H71.8319V55.8026ZM81.7373 57.3033H80.2125V58H81.7373V57.3033Z"
					className="fill-primary-border"
				/>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M59.0221 57.3034V56.4024L57.4199 56.4022V49.646H59.0025V48.2821H60.4875V45.1063H62.7688V46.704H63.5551V44.2053H60.4875V40.3132H66.9158V39.4123H62.1483V37.2347H68.479V33.1774H66.9158V31.6966H58.0795V33.1774H56.5164V41.01H54.8265V42.6077H53.4304V44.2054H52.0616V45.8032H47.8067V44.1665H46.2045V42.6857H44.6023V39.5292H43.6987V46.8795H45.3009V48.3603H46.9031V49.841H48.5053V51.4777H50.1076V57.3034H52.6133V56.4025H51.011V54.4198H52.6133V52.7442H54.9141V54.4198H56.5164V57.3034H59.0221ZM61 33H59.5V34.5555H61V33Z"
					className="fill-primary-border"
				/>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M75.5214 57.3033H77.8513L77.8512 50.3181H80.7088V49.3438H81.5294V48.4865H82.3013V39.3828H81.5294V38.6035H80.7432V39.3828H79.9714V47.3907H77.8513V36.0314H77.0794V35.2521H76.2932V36.0314H75.5214V43.4939H73.4012V39.3828H72.6293V38.6035H71.8431V39.3828H71.0714V44.5897H71.8431V45.447H72.6638V46.4213H75.5214V57.3033Z"
					className="fill-primary-border"
				/>
			</g>
			<defs>
				<filter
					id="filter0_d_1643_2599"
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
						result="effect1_dropShadow_1643_2599"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_1643_2599"
						result="shape"
					/>
				</filter>
			</defs>
		</svg>
	)
}
