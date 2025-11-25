import { SVGProps } from "react"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/registry/ui/empty"

export default function EmptyResult() {
	return (
		<Empty>
			<EmptyMedia>
				<EmptyResultMediaContent />
			</EmptyMedia>
			<EmptyHeader>
				<EmptyTitle>No results found</EmptyTitle>
				<EmptyDescription>Please try using a different keyword or update your search filters</EmptyDescription>
			</EmptyHeader>
		</Empty>
	)
}

function EmptyResultMediaContent(props: SVGProps<SVGSVGElement>) {
	return (
		<svg width={100} height={75} viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<path
				d="M33.2969 6.35937L27.0156 1.6875C25.5312 0.593749 23.75 0 21.9062 0H4.6875C2.09375 0 0 2.09375 0 4.6875V59.2969H63.1406C65.5156 59.2969 67.4219 57.375 67.4219 55.0156V12.7344C67.4219 10.1406 65.3281 8.04688 62.7344 8.04688H38.4219C36.5781 8.04688 34.7812 7.45312 33.2969 6.35937Z"
				className="fill-primary-hover"
			/>
			<path
				opacity={0.5}
				d="M12.1719 11.6406H59.0469C60.3438 11.6406 61.3906 12.6875 61.3906 13.9844V45.2344C61.3906 46.5313 60.3438 47.5781 59.0469 47.5781H12.1719C10.875 47.5781 9.82812 46.5313 9.82812 45.2344V13.9844C9.82812 12.6875 10.875 11.6406 12.1719 11.6406Z"
				className="fill-white"
			/>
			<path
				opacity={0.5}
				d="M8.71875 15.2188H55.5938C56.8906 15.2188 57.9375 16.2656 57.9375 17.5625V48.8125C57.9375 50.1094 56.8906 51.1563 55.5938 51.1563H8.71875C7.42188 51.1563 6.375 50.1094 6.375 48.8125V17.5625C6.375 16.2656 7.42188 15.2188 8.71875 15.2188Z"
				className="fill-white"
			/>
			<path
				d="M13.1406 24.0313L0 59.2812H64.1875C66.1406 59.2812 67.8906 58.0625 68.5781 56.2344L79.3594 27.2969C80.5 24.2344 78.2344 20.9688 74.9688 20.9688H17.5312C15.5781 20.9844 13.8281 22.1875 13.1406 24.0313Z"
				className="fill-primary-border"
			/>
		</svg>
	)
}
