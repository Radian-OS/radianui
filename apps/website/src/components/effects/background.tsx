import React from "react"
import { FlickeringGrid } from "./flickering"

export default function Background({ children }: { children?: React.ReactNode }) {
	return (
		<div className="relative h-fit w-full">
			<svg className="absolute left-0 top-[100px] z-50 max-h-[500px]" viewBox="0 0 600 500">
				{/* Static track */}
				<path
					d="M 0 0 L 165 0 C 181 5 186 12 193 26 L 285 197 C 288 201 291 202 296 202 L 449 200 C 457 201 465 208 469 218 L 600 500"
					fill="none"
					stroke="var(--color-soft)"
					strokeWidth="1"
					strokeLinecap="round"
				/>

				{/* Animated beam segment */}
				<path
					id="beamPath"
					d="M 0 0 L 165 0 C 181 5 186 12 193 26 L 285 197 C 288 201 291 202 296 202 L 449 200 C 457 201 465 208 469 218 L 600 500"
					fill="none"
					stroke="var(--color-primary)"
					strokeWidth="1"
					strokeLinecap="round"
					className="animate-[var(--animate-beam-flow)] [stroke-dasharray:50_1000] [stroke-dashoffset:1000]"
					vectorEffect="non-scaling-stroke"
					pathLength="1000"
				/>
			</svg>
			<svg className="absolute left-0 top-[400px] z-50 max-h-[500px]" viewBox="0 0 600 500">
				{/* Static track */}
				<path
					d="M 0 0 L 165 0 C 181 5 186 12 193 26 L 230 105 C 232 113 239 120 249 117 L 344 116 C 355 115 363 118 367 127 L 600 500"
					fill="none"
					strokeWidth="1"
					stroke="var(--color-soft)"
				/>

				{/* Animated beam segment */}
				<path
					id="beamPath"
					d="M 0 0 L 165 0 C 181 5 186 12 193 26 L 230 105 C 232 113 239 120 249 117 L 344 116 C 355 115 363 118 367 127 L 600 500"
					fill="none"
					stroke="var(--color-primary)"
					strokeWidth="1"
					strokeLinecap="round"
					className="animate-[var(--animate-beam-flow2)] opacity-0 [stroke-dasharray:50_1000] [stroke-dashoffset:1000]"
					vectorEffect="non-scaling-stroke"
					pathLength="1000"
				/>
			</svg>

			<svg className="absolute right-0 top-[100px] z-50 max-h-[500px] scale-x-[-1]" viewBox="0 0 600 500">
				{/* Static track */}
				<path
					d="M 0 0 L 165 0 C 181 5 186 12 193 26 L 285 197 C 288 201 291 202 296 202 L 449 200 C 457 201 465 208 469 218 L 600 500"
					fill="none"
					stroke="var(--color-soft)"
					strokeWidth="1"
					strokeLinecap="round"
				/>

				{/* Animated beam segment */}
				<path
					id="beamPath"
					d="M 0 0 L 165 0 C 181 5 186 12 193 26 L 285 197 C 288 201 291 202 296 202 L 449 200 C 457 201 465 208 469 218 L 600 500"
					fill="none"
					stroke="var(--color-primary)"
					strokeWidth="1"
					strokeLinecap="round"
					className="animate-[var(--animate-beam-flow)] [stroke-dasharray:50_1000] [stroke-dashoffset:1000]"
					vectorEffect="non-scaling-stroke"
					pathLength="1000"
				/>
			</svg>
			<svg className="absolute right-0 top-[400px] z-50 max-h-[500px] scale-x-[-1]" viewBox="0 0 600 500">
				{/* Static track */}
				<path
					d="M 0 0 L 165 0 C 181 5 186 12 193 26 L 230 105 C 232 113 239 120 249 117 L 344 116 C 355 115 363 118 367 127 L 600 500"
					fill="none"
					strokeWidth="1"
					stroke="var(--color-soft)"
				/>

				{/* Animated beam segment */}
				<path
					id="beamPath"
					d="M 0 0 L 165 0 C 181 5 186 12 193 26 L 230 105 C 232 113 239 120 249 117 L 344 116 C 355 115 363 118 367 127 L 600 500"
					fill="none"
					stroke="var(--color-primary)"
					strokeWidth="1"
					strokeLinecap="round"
					className="animate-[var(--animate-beam-flow2)] opacity-0 [stroke-dasharray:50_1000] [stroke-dashoffset:1000]"
					vectorEffect="non-scaling-stroke"
					pathLength="1000"
				/>
			</svg>

			<div className="absolute top-0 z-50 w-full">{children}</div>

			{/* Half circle with primary color layer blur */}
			<div className="bg-primary/60 xl:w-45/100 md:w-60/100 absolute left-1/2 top-[600px] z-30 mx-auto aspect-[2/1] -translate-x-1/2 rounded-t-full blur-[600px]"></div>

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
