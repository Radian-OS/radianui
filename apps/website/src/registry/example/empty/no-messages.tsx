import { SVGProps } from "react"
import { Button } from "@/styles/default/ui/button"
import {
	Empty,
	EmptyAction,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/styles/default/ui/empty"

export default function NoMessages() {
	return (
		<Empty>
			<EmptyMedia>
				<EmptyMediaContent height={68} />
			</EmptyMedia>
			<EmptyHeader>
				<EmptyTitle>Empty Inbox</EmptyTitle>
				<EmptyDescription>
					Start chatting to see your messages here
				</EmptyDescription>
			</EmptyHeader>
			<EmptyAction>
				<Button>New Message</Button>
			</EmptyAction>
		</Empty>
	)
}

function EmptyMediaContent(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			width={102}
			height={77}
			viewBox="0 0 102 77"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}>
			<rect
				x={17}
				y={25}
				width={66}
				height={30}
				rx={8}
				className="fill-primary-accent"
			/>
			<rect
				x={0.5}
				y={43.5}
				width={101}
				height={33}
				rx={6.5}
				className="fill-bg"
			/>
			<rect
				x={0.5}
				y={43.5}
				width={101}
				height={33}
				rx={6.5}
				className="stroke-primary-focus"
			/>
			<path
				d="M7 60C7 54.4772 11.4772 50 17 50C22.5228 50 27 54.4772 27 60C27 65.5228 22.5228 70 17 70C11.4772 70 7 65.5228 7 60Z"
				className="fill-primary-border"
			/>
			<path
				d="M10 70C10 66.1409 13 63 17 63C21 63 24 66.1409 24 70H10Z"
				className="fill-elevation-level1"
			/>
			<path
				d="M17.0046 61C19.209 61 21 59.209 21 57.0046C21 54.8002 19.209 53 17.0046 53C14.8002 53 13 54.791 13 56.9954C13 59.1998 14.791 60.9908 16.9954 60.9908L17.0046 61Z"
				className="fill-elevation-level1"
			/>
			<rect
				x={35}
				y={52}
				width={60}
				height={6}
				rx={3}
				className="fill-primary-focus"
			/>
			<rect x={35} y={62} width={29} height={6} rx={3} className="bg-fill2" />
			<rect
				x={0.5}
				y={0.5}
				width={101}
				height={33}
				rx={6.5}
				className="fill-bg"
			/>
			<rect
				x={0.5}
				y={0.5}
				width={101}
				height={33}
				rx={6.5}
				className="stroke-primary-border"
			/>
			<path
				d="M7 17C7 11.4772 11.4772 7 17 7C22.5228 7 27 11.4772 27 17C27 22.5228 22.5228 27 17 27C11.4772 27 7 22.5228 7 17Z"
				className="fill-primary-border"
			/>
			<path
				d="M10 27C10 23.1409 13 20 17 20C21 20 24 23.1409 24 27H10Z"
				className="fill-elevation-level1"
			/>
			<path
				d="M17.0046 18C19.209 18 21 16.209 21 14.0046C21 11.8002 19.209 10 17.0046 10C14.8002 10 13 11.791 13 13.9954C13 16.1998 14.791 17.9908 16.9954 17.9908L17.0046 18Z"
				className="fill-elevation-level1"
			/>
			<rect
				x={35}
				y={9}
				width={60}
				height={6}
				rx={3}
				className="fill-primary-focus"
			/>
			<rect x={35} y={19} width={29} height={6} rx={3} className="bg-fill2" />
		</svg>
	)
}
