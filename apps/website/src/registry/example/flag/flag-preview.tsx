import { Flag } from "@radianui/flags"

export default function FlagPreview() {
	return (
		<div className="flex flex-wrap items-center justify-center gap-5">
			<Flag
				country="US"
				size={48}
				className="drop-shadow-sm"
				aria-label="United States"
			/>
			<Flag country="IN" shape="circle" size={48} aria-label="India" />
			<Flag country="JP" size={48} aria-label="Japan" />
		</div>
	)
}
