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

export default function NoFilesUploaded() {
	return (
		<Empty>
			<EmptyMedia>
				<EmptyMediaContent height={80} width={100} />
			</EmptyMedia>
			<EmptyHeader>
				<EmptyTitle>No Files Uploaded</EmptyTitle>
				<EmptyDescription>
					Once you upload, your files will show up here
				</EmptyDescription>
			</EmptyHeader>
			<EmptyAction>
				<Button>Upload Files</Button>
			</EmptyAction>
		</Empty>
	)
}

function EmptyMediaContent(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			width={101}
			height={81}
			viewBox="0 0 101 81"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}>
			<rect
				x={0.5}
				y={0.5}
				width={100}
				height={80}
				rx={10}
				className="fill-bg stroke-primary-border"
				strokeDasharray="4 4"
			/>
			<path
				d="M50.5 11C60.165 11 68 18.835 68 28.5C68 38.165 60.165 46 50.5 46C40.835 46 33 38.165 33 28.5C33 18.835 40.835 11 50.5 11Z"
				className="fill-bg"
			/>
			<path
				d="M50.5 11C60.165 11 68 18.835 68 28.5C68 38.165 60.165 46 50.5 46C40.835 46 33 38.165 33 28.5C33 18.835 40.835 11 50.5 11Z"
				className="stroke-soft"
			/>
			<path
				d="M50.5 26.8333V31.8333M50.5 26.8333L48 29.3333M50.5 26.8333L53 29.3333M57.1666 35.1667C57.6087 35.1667 58.0326 34.9911 58.3451 34.6785C58.6577 34.366 58.8333 33.942 58.8333 33.5V25.1667C58.8333 24.7246 58.6577 24.3007 58.3451 23.9882C58.0326 23.6756 57.6087 23.5 57.1666 23.5H50.5833C50.3046 23.5027 50.0296 23.4355 49.7835 23.3045C49.5375 23.1735 49.3283 22.9828 49.175 22.75L48.5 21.75C48.3482 21.5196 48.1416 21.3304 47.8987 21.1995C47.6558 21.0686 47.3842 21 47.1083 21H43.8333C43.3913 21 42.9673 21.1756 42.6548 21.4882C42.3422 21.8007 42.1666 22.2246 42.1666 22.6667V33.5C42.1666 33.942 42.3422 34.366 42.6548 34.6785C42.9673 34.9911 43.3913 35.1667 43.8333 35.1667H57.1666Z"
				className="stroke-primary"
				strokeWidth={1.5}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<rect
				x={15.5}
				y={52.5}
				width={70}
				height={6}
				rx={2}
				className="fill-primary-focus"
			/>
			<rect
				x={28.5}
				y={62.5}
				width={44}
				height={6}
				rx={2}
				className="fill-primary-focus"
			/>
		</svg>
	)
}
