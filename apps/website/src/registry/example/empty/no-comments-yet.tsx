import { SVGProps } from "react"
import { Button } from "@/registry/ui/button"
import { Empty, EmptyAction, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/registry/ui/empty"

export default function NoCommentsYet() {
	return (
		<Empty>
			<EmptyMedia className="h-20">
				<NoInternetConnectionMediaContent />
			</EmptyMedia>
			<EmptyHeader>
				<EmptyTitle>No Comments Yet</EmptyTitle>
				<EmptyDescription>Be the first to comment on this post</EmptyDescription>
			</EmptyHeader>
			<EmptyAction>
				<Button>Add Comment</Button>
			</EmptyAction>
		</Empty>
	)
}

function NoInternetConnectionMediaContent(props: SVGProps<SVGSVGElement>) {
	return (
		<svg width={122} height={67} viewBox="0 0 122 67" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g filter="url(#filter0_d_1634_2455)">
				<rect x={1.5} width={119} height={28} rx={8} className="fill-bg" shapeRendering="crispEdges" />
				<rect x={2} y={0.5} width={118} height={27} rx={7.5} className="stroke-primary-border" shapeRendering="crispEdges" />
				<rect x={10} y={6.5} width={15} height={15} rx={7.5} fillOpacity={0.04} className="stroke-soft" />
				<rect x={31.5} y={7} width={77} height={5} rx={1} className="fill-primary-accent" />
				<rect x={31.5} y={16} width={52} height={5} rx={1} className="fill-primary-accent" />
			</g>
			<g filter="url(#filter1_d_1634_2455)">
				<rect x={1.5} y={36} width={119} height={28} rx={8} className="fill-bg" shapeRendering="crispEdges" />
				<rect x={1.5} y={36} width={119} height={28} rx={8} className="stroke-primary-border" strokeLinecap="round" strokeDasharray="4 4" shapeRendering="crispEdges" />
				<rect x={10} y={42.5} width={15} height={15} rx={7.5} fillOpacity={0.02} className="fill-fill1-alpha stroke-soft" strokeLinecap="round" />
				<rect x={31.5} y={43} width={77} height={5} rx={1} className="fill-primary-accent" />
				<rect x={31.5} y={52} width={52} height={5} rx={1} className="fill-primary-accent" />
			</g>
			<defs>
				<filter id="filter0_d_1634_2455" x={0.5} y={0} width={121} height={30} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
					<feFlood floodOpacity={0} result="BackgroundImageFix" />
					<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
					<feOffset dy={1} />
					<feGaussianBlur stdDeviation={0.5} />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix type="matrix" values="0 0 0 0 0.0980392 0 0 0 0 0.0941176 0 0 0 0 0.105882 0 0 0 0.04 0" />
					<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1634_2455" />
					<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1634_2455" result="shape" />
				</filter>
				<filter id="filter1_d_1634_2455" x={0} y={35.5} width={122} height={31} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
					<feFlood floodOpacity={0} result="BackgroundImageFix" />
					<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
					<feOffset dy={1} />
					<feGaussianBlur stdDeviation={0.5} />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix type="matrix" values="0 0 0 0 0.0980392 0 0 0 0 0.0941176 0 0 0 0 0.105882 0 0 0 0.04 0" />
					<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1634_2455" />
					<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1634_2455" result="shape" />
				</filter>
			</defs>
		</svg>
	)
}
