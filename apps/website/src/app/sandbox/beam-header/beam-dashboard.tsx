import Image from "next/image"

export function BeamDashboard() {
	return (
		<div className="bg-bg relative w-full overflow-hidden">
			<Image
				src="/sandbox/placeholder.svg"
				alt="Beam dashboard preview placeholder"
				width={1200}
				height={750}
				className="aspect-[16/10] w-full object-cover"
				priority
			/>
		</div>
	)
}
