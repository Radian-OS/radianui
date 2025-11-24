import React from "react"
import { FlickeringGrid } from "./flickering"

export default function Background({ children }: { children?: React.ReactNode }) {
	return (
		<div className="relative w-full px-4 md:px-5">
			<div className="bg-primary/60 absolute left-1/2 top-[560px] z-30 mx-auto aspect-square w-[300px] -translate-x-1/2 rounded-full rounded-b-none blur-[130px] min-[450px]:w-[400px] sm:w-[600px] md:w-[700px] xl:aspect-video xl:w-[1300px]"></div>

			{/* Neutral background overlay */}
			<div className="from-bg via-bg/0 to-bg bg-linear-to-b absolute inset-0 top-[380px] z-20 h-full max-h-[960px] w-full to-90%" />

			{/* Noise */}
			{/* <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCI+PHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjMDAwIi8+PHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSJ1cmwoI25vaXNlKSIvPjxmaWx0ZXIgaWQ9Im5vaXNlIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC44IiBudW1PY3RhdmVzPSIxMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgZmlsbD0iIzAwMCIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] bg-[length:64px_64px] bg-repeat opacity-10 mix-blend-overlay" /> */}

			{/* flickering grid */}
			<FlickeringGrid
				className="absolute inset-0 top-[380px] z-10 max-h-[960px] w-full overflow-hidden"
				squareSize={4}
				gridGap={6}
				color="#6B7280"
				maxOpacity={0.4}
				flickerChance={0.4}
			/>

			<div className="relative z-50 w-full">{children}</div>
		</div>
	)
}
