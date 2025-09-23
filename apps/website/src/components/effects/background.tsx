import React from "react"
import { FlickeringGrid } from "./flickering"

export default function Background({ children }: { children?: React.ReactNode }) {
	return (
		<div className="relative h-fit w-full">
			{/* <svg className="max-w-1/2 absolute left-0 top-[20%] z-0 max-h-[500px]" viewBox="0 0 600 500">
				<path d="M 0 0 L 165 0 C 181 5 186 12 193 26 L 285 197 C 288 201 291 202 296 202 L 449 200 C 457 201 465 208 469 218 L 600 500" stroke="white" />
			</svg>

			<svg className="max-w-1/2 absolute left-0 top-[50%] z-0 max-h-[400px]" viewBox="0 0 400 400">
				<path d="M 0 0 L 165 0 C 181 5 186 12 193 26 L 240 130 C 242 138 248 143 256 144 L 355 144 C 361 144 365 147 367 151 L 418 232" stroke="white" />
			</svg> */}

			<div className="absolute top-0 z-50 w-full">{children}</div>

			{/* Half circle with primary color layer blur */}
			<div className="bg-primary/60 w-45/100 absolute left-1/2 top-[600px] z-30 mx-auto aspect-[2/1] -translate-x-1/2 rounded-t-full blur-[1900px]"></div>

			{/* Neutral radial background overlay */}
			{/* <div className="bg-radial-[at_50%_100%] from-bg/0 to-bg absolute top-[380px] aspect-[2/1] w-full overflow-hidden rounded-t-full"></div> */}
			<div className="bg-radial-[at_50%_100%] from-bg/12 to-bg absolute top-[380px] z-20 aspect-[2/1] w-full rounded-t-full to-75%" />

			{/* Half circle flickering grid */}
			<div className="absolute top-[380px] z-10 aspect-[2/1] w-full overflow-hidden rounded-t-full">
				<FlickeringGrid className="absolute inset-0 z-10 size-full" squareSize={4} gridGap={6} color="#6B7280" maxOpacity={0.4} flickerChance={0.1} />
			</div>
		</div>
	)
}
