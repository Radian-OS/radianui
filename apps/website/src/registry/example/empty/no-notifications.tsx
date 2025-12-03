import { SVGProps } from "react"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/registry/ui/empty"

export default function NoNotifications() {
	return (
		<Empty>
			<EmptyMedia>
				<EmptyMediaContent />
			</EmptyMedia>
			<EmptyHeader>
				<EmptyTitle>All caught up!</EmptyTitle>
				<EmptyDescription>You’re all caught up. No new notifications</EmptyDescription>
			</EmptyHeader>
		</Empty>
	)
}

function EmptyMediaContent(props: SVGProps<SVGSVGElement>) {
	return (
		<svg width={128} height={76} viewBox="0 0 128 76" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<g clipPath="url(#clip0_1636_2678)">
				<path d="M0 16C0 11.5817 3.58172 8 8 8H112C116.418 8 120 11.5817 120 16V76H0V16Z" className="fill-primary-accent" />
				<rect x={10.5} y={18.5} width={99} height={27} rx={6.5} className="fill-bg" />
				<rect x={10.5} y={18.5} width={99} height={27} rx={6.5} className="stroke-primary-focus" />
				<rect x={17.4375} y={24.4375} width={15.125} height={15.125} rx={7.5625} className="fill-fill1-alpha stroke-soft" strokeWidth={0.875} />
				<rect x={37} y={24.125} width={66} height={5.25} rx={1.75} className="fill-primary-accent" />
				<rect x={37} y={34.625} width={35} height={5.25} rx={1.75} className="fill-primary-accent" />
				<rect x={10.5} y={52.5} width={99} height={27} rx={6.5} className="fill-bg" />
				<rect x={10.5} y={52.5} width={99} height={27} rx={6.5} className="stroke-primary-focus" />
				<rect x={17.4375} y={58.4375} width={15.125} height={15.125} rx={7.5625} className="fill-fill1-alpha stroke-soft" strokeWidth={0.875} />
				<rect x={37} y={58.125} width={66} height={5.25} rx={1.75} className="fill-primary-accent" />
				<rect x={37} y={68.625} width={35} height={5.25} rx={1.75} className="fill-primary-accent" />
				<rect y={44} width={120} height={32} fill="url(#paint0_linear_1636_2678)" />
			</g>
			<path d="M100 14C100 6.26801 106.268 0 114 0C121.732 0 128 6.26801 128 14C128 21.732 121.732 28 114 28C106.268 28 100 21.732 100 14Z" className="fill-primary-border" />
			<path d="M119.333 10L112 17.3333L108.667 14" className="stroke-bg" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
			<defs>
				<linearGradient id="paint0_linear_1636_2678" x1={60} y1={44} x2={60} y2={76} gradientUnits="userSpaceOnUse">
					<stop stopColor="var(--color-bg)" stopOpacity={0} />
					<stop offset={1} stopColor="var(--color-bg)" />
				</linearGradient>
				<clipPath id="clip0_1636_2678">
					<path d="M0 16C0 11.5817 3.58172 8 8 8H112C116.418 8 120 11.5817 120 16V76H0V16Z" className="fill-bg" />
				</clipPath>
			</defs>
		</svg>
	)
}
