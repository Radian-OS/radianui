import Image from "next/image"

export function OmrixDashboardMockup() {
	return (
		<div className="border-border/80 bg-elevation-level1 relative mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border shadow-2xl">
			<Image
				src="/sandbox/placeholder.svg"
				alt="Dashboard preview placeholder"
				width={1200}
				height={750}
				className="aspect-[16/10] w-full object-cover"
				priority
			/>
		</div>
	)
}
