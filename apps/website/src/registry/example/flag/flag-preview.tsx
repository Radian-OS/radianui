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
			<Flag country="GB" shape="circle" size={48} aria-label="United Kingdom" />
			<Flag country="JP" size={48} aria-label="Japan" />
			<Flag
				country="DE"
				shape="circle"
				size={48}
				style={{ opacity: 0.9 }}
				aria-label="Germany"
			/>
		</div>
	)
}
