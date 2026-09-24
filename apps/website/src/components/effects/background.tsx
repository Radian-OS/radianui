import { FlickeringGrid } from "./flickering"

export default function Background({
	children,
}: {
	children?: React.ReactNode
	topPosition?: string
}) {
	return (
		<div className="relative w-full px-4 md:px-5">
			{/* Neutral background overlay */}
			<div className="from-bg via-bg/0 to-bg pointer-events-none absolute inset-0 top-[380px] z-20 max-h-[600px] w-full bg-linear-to-b to-90% md:max-h-[960px]" />

			<div className="pointer-events-none absolute -inset-x-4 top-0 z-[25] mx-auto hidden h-full w-full max-w-[1440px] md:-inset-x-5 lg:block">
				<div className="relative mx-auto h-full max-w-[1440px] px-4 md:px-5">
					<div className="bg-soft absolute top-0 left-0 z-30 h-full w-px" />
					<div className="bg-soft absolute top-0 right-0 z-30 h-full w-px" />
				</div>
			</div>

			{/* Noise */}
			{/* <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCI+PHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjMDAwIi8+PHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSJ1cmwoI25vaXNlKSIvPjxmaWx0ZXIgaWQ9Im5vaXNlIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC44IiBudW1PY3RhdmVzPSIxMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgZmlsbD0iIzAwMCIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] bg-[length:64px_64px] bg-repeat opacity-10 mix-blend-overlay" /> */}

			{/* flickering grid */}
			<FlickeringGrid
				className="absolute inset-0 top-[380px] z-10 h-auto max-h-[600px] w-full overflow-hidden md:max-h-[960px]"
				squareSize={3}
				gridGap={6}
				color="#6B7280"
				maxOpacity={0.2}
				flickerChance={0.3}
			/>

			<div className="relative z-30 w-full">{children}</div>
		</div>
	)
}
