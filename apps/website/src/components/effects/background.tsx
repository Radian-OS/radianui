import React from "react"
import { FlickeringGrid } from "./flickering"

export default function Background({ children }: { children?: React.ReactNode }) {
	return (
		<div className="relative w-full px-4 md:px-5">
			{/* Half circle with primary color layer blur */}
			<div className="bg-primary/60 absolute left-1/2 top-[600px] z-30 mx-auto aspect-square w-[200px] -translate-x-1/2 rounded-t-full blur-[600px] md:w-[300px] xl:w-[550px]"></div>

			{/* Neutral radial background overlay */}
			<div className="bg-radial-[at_50%_100%] from-bg/12 to-bg absolute top-[380px] z-20 aspect-[2/1] max-h-[960px] w-full rounded-t-full to-75%" />

			<div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCI+PHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjMDAwIi8+PHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSJ1cmwoI25vaXNlKSIvPjxmaWx0ZXIgaWQ9Im5vaXNlIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC44IiBudW1PY3RhdmVzPSIxMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgZmlsbD0iIzAwMCIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] bg-[length:64px_64px] bg-repeat opacity-10 mix-blend-overlay" />

			{/* Half circle flickering grid */}
			<div className="absolute top-[380px] z-10 aspect-[2/1] w-full overflow-hidden rounded-t-full">
				<FlickeringGrid className="max-h- absolute inset-0 z-10 max-h-[960px]" squareSize={4} gridGap={6} color="#6B7280" maxOpacity={0.4} flickerChance={0.1} />
			</div>

			<div className="relative z-50 w-full">{children}</div>
		</div>
	)
}
