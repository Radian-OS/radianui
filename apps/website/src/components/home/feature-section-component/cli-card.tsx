import React from "react"
import { Skeleton } from "@/styles/default/ui/skeleton"
import { Spinner } from "@/styles/default/ui/spinner"
import { BentoCardGrid } from "../features-section"

interface FlowCardProps {
	gridRef?: React.RefObject<HTMLDivElement | null>
}

export function CliCard({ gridRef }: FlowCardProps) {
	return (
		<BentoCardGrid gridRef={gridRef} className="flex flex-col px-7 sm:px-12">
			<div className="relative select-none">
				<div className="bg-elevation-negative border-soft w-90 rounded-xl border px-1.5 py-2">
					<div className="flex h-full flex-col gap-2">
						<div className="flex px-2 pt-1">
							<div className="flex h-[8px] items-center gap-1.5">
								<span className="bg-fill4 size-1.5 rounded-full" />
								<span className="bg-fill4 size-1.5 rounded-full" />
								<span className="bg-fill4 size-1.5 rounded-full" />
							</div>
						</div>
						<div className="border-soft bg-elevation-level1 flex h-full w-full gap-3 rounded-lg border p-4">
							<Spinner variant="activity" className="text-primary size-5" />
							<p
								className="text-fg-secondary text-[13px] font-normal"
								style={{ fontFamily: '"JetBrains Mono", monospace' }}>
								npx radianui@latest init --next
							</p>
						</div>
					</div>
				</div>
				<svg
					width="35"
					height="271"
					viewBox="0 0 35 271"
					className="absolute left-9"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M0.5 0V33.0294C0.5 36.212 1.76428 39.2643 4.01472 41.5147L30.4853 67.9853C32.7357 70.2357 34 73.288 34 76.4706V277.5"
						stroke="var(--color-soft)"
					/>
					<path
						d="M0.5 0V33.0294C0.5 36.212 1.76428 39.2643 4.01472 41.5147L30.4853 67.9853C32.7357 70.2357 34 73.288 34 76.4706V277.5"
						stroke="var(--color-primary-border)"
						strokeWidth="1"
						strokeLinecap="round"
						className="opacity-0 [stroke-dasharray:50_1000] [stroke-dashoffset:0]"
						vectorEffect="non-scaling-stroke"
						style={{
							animationName: "component-beam-flow-reverse",
							animationDirection: "reverse",
							animationDuration: "3s",
							animationTimingFunction: "ease-in-out",
							animationIterationCount: "infinite",
							animationDelay: "0s",
						}}
					/>
				</svg>
				<div className="bg-elevation-negative border-soft absolute left-32 top-40 rounded-xl border px-1.5 py-2">
					<div className="flex h-full flex-col gap-2">
						<div className="flex items-center gap-3 px-2 pt-1">
							<div className="flex items-center gap-1.5">
								<span className="bg-fill4 size-1.5 rounded-full" />
								<span className="bg-fill4 size-1.5 rounded-full" />
								<span className="bg-fill4 size-1.5 rounded-full" />
							</div>
							<p
								className="text-fg-secondary text-[13px] font-normal"
								style={{ fontFamily: '"JetBrains Mono", monospace' }}>
								Installation
							</p>
						</div>
						<div className="border-soft bg-elevation-level1 flex h-full w-full flex-col rounded-lg border p-4">
							<p
								className="text-fg-secondary whitespace-nowrap text-[13px] font-normal"
								style={{ fontFamily: '"JetBrains Mono", monospace' }}>
								√ No package.json found at C:\Users\RadianOS\Projects. Create a
								new project? ... yes
							</p>
							<p
								className="text-fg-secondary text-[13px] font-normal"
								style={{ fontFamily: '"JetBrains Mono", monospace' }}>
								√ What would you like to name your project? ... my-app
							</p>
							<p
								className="text-fg-secondary text-[13px] font-normal"
								style={{ fontFamily: '"JetBrains Mono", monospace' }}>
								√ Would you like to use /src directory? ... yes{" "}
							</p>
							<div className="flex flex-col gap-2 pt-2">
								<Skeleton className="w-70 h-3 rounded-lg" />
								<Skeleton className="h-3 w-20 rounded-lg" />
								<Skeleton className="h-3 w-60 rounded-lg" />
								<Skeleton className="h-3 w-60 rounded-lg" />
								<Skeleton className="h-3 w-40 rounded-lg" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</BentoCardGrid>
	)
}
