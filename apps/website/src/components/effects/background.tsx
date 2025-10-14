import React from "react"
import { FlickeringGrid } from "./flickering"

export default function Background({ children }: { children?: React.ReactNode }) {
	return (
		<div className="relative w-full px-4 md:px-5">
			{/* Half circle with primary color layer blur */}
			<div className="bg-primary/60 xl:w-25/100 md:w-60/100 absolute left-1/2 top-[600px] z-30 mx-auto aspect-[2/1] -translate-x-1/2 rounded-t-full blur-[600px]"></div>

			{/* Neutral radial background overlay */}
			<div className="bg-radial-[at_50%_100%] from-bg/12 to-bg absolute top-[380px] z-20 aspect-[2/1] max-h-[960px] w-full rounded-t-full to-75%" />

			{/* Half circle flickering grid */}
			<div className="absolute top-[380px] z-10 aspect-[2/1] w-full overflow-hidden rounded-t-full">
				<FlickeringGrid className="max-h- absolute inset-0 z-10 max-h-[960px]" squareSize={4} gridGap={6} color="#6B7280" maxOpacity={0.4} flickerChance={0.1} />
			</div>

			<div className="relative z-50 w-full">{children}</div>
		</div>
	)
}
