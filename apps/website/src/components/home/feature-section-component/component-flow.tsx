import React from "react"
import { BentoCardGrid } from "../features-section"
import { ComponentsUI } from "./components-ui"

interface ComponentFlowCardProps {
	gridRef?: React.RefObject<HTMLDivElement | null>
}

export const ComponentFlowCard: React.FC<ComponentFlowCardProps> = ({ gridRef }) => {
	return (
		<div className="h-full w-full overflow-hidden pt-5">
			<BentoCardGrid gridRef={gridRef} className="flex flex-col items-center">
				<div className="relative flex w-full items-center justify-center">
					{/* Left side SVGs */}
					<div className="absolute -top-2 left-0 flex flex-col gap-[38px]">
						<svg xmlns="http://www.w3.org/2000/svg" width="212" height="103" viewBox="0 0 212 103" fill="none">
							<path
								d="M-8.91712e-06 0.5L68.4891 0.499994C72.7181 0.499994 76.6348 2.726 78.7989 6.35934L132.572 96.6406C134.736 100.274 138.652 102.5 142.881 102.5L212 102.5"
								stroke="var(--color-soft)"
							/>
							<path
								d="M-8.91712e-06 0.5L68.4891 0.499994C72.7181 0.499994 76.6348 2.726 78.7989 6.35934L132.572 96.6406C134.736 100.274 138.652 102.5 142.881 102.5L212 102.5"
								stroke="var(--color-primary-border)"
								strokeWidth="1"
								strokeLinecap="round"
								className="opacity-0 [stroke-dasharray:30_1000] [stroke-dashoffset:0]"
								vectorEffect="non-scaling-stroke"
								style={{
									animationName: "component-beam-flow-reverse",
									animationDirection: "reverse",
									animationDuration: "2s",
									animationTimingFunction: "ease-in-out",
									animationIterationCount: "infinite",
									animationDelay: "0s",
								}}
							/>
						</svg>
						<svg width="212" height="1" viewBox="0 0 212 1" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M0 0.5L212 0.499983" stroke="var(--color-soft)" />
							{/* Animated beam - flows FROM left TO right (into component) */}
							<path
								d="M0 0.5L212 0.499983"
								stroke="var(--color-primary-border)"
								strokeWidth="1"
								strokeLinecap="round"
								className="opacity-0 [stroke-dasharray:30_1000] [stroke-dashoffset:0]"
								vectorEffect="non-scaling-stroke"
								style={{
									animationName: "component-beam-flow-reverse",
									animationDirection: "reverse",
									animationDuration: "2s",
									animationTimingFunction: "ease-in-out",
									animationIterationCount: "infinite",
									animationDelay: "0s",
								}}
							/>
						</svg>

						<svg width="212" height="1" viewBox="0 0 212 1" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M0 0.5L212 0.499983" stroke="var(--color-soft)" />
							{/* Animated beam - flows FROM left TO right (into component) */}
							<path
								d="M0 0.5L212 0.499983"
								stroke="var(--color-primary-border)"
								strokeWidth="1"
								strokeLinecap="round"
								className="opacity-0 [stroke-dasharray:30_1000] [stroke-dashoffset:0]"
								vectorEffect="non-scaling-stroke"
								style={{
									animationName: "component-beam-flow-reverse",
									animationDirection: "reverse",
									animationDuration: "2s",
									animationTimingFunction: "ease-in-out",
									animationIterationCount: "infinite",
									animationDelay: "0s",
								}}
							/>
						</svg>

						<svg width="212" height="103" viewBox="0 0 212 103" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M0 102.5H68.4891C72.7181 102.5 76.6348 100.274 78.7989 96.6407L132.572 6.35935C134.736 2.72601 138.652 0.5 142.881 0.5H212" stroke="var(--color-soft)" />
							{/* Animated beam - flows FROM left TO right (into component) */}
							<path
								d="M0 102.5H68.4891C72.7181 102.5 76.6348 100.274 78.7989 96.6407L132.572 6.35935C134.736 2.72601 138.652 0.5 142.881 0.5H212"
								stroke="var(--color-primary-border)"
								strokeWidth="1"
								strokeLinecap="round"
								className="opacity-0 [stroke-dasharray:30_1000] [stroke-dashoffset:0]"
								vectorEffect="non-scaling-stroke"
								style={{
									animationName: "component-beam-flow-reverse",
									animationDirection: "reverse",
									animationDuration: "2s",
									animationTimingFunction: "ease-in-out",
									animationIterationCount: "infinite",
									animationDelay: "0s",
								}}
							/>
						</svg>
					</div>

					{/* Center ComponentUI */}
					<div className="z-1 relative">
						<ComponentsUI />
					</div>

					{/* Right side SVGs */}
					<div className="absolute -top-2 right-0 z-0 flex flex-col gap-[38px]">
						<svg width="212" height="103" viewBox="0 0 212 103" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M0 102.5H68.4891C72.7181 102.5 76.6348 100.274 78.7989 96.6407L132.572 6.35935C134.736 2.72601 138.652 0.5 142.881 0.5H212" stroke="var(--color-soft)" />
							<path
								d="M0 102.5H68.4891C72.7181 102.5 76.6348 100.274 78.7989 96.6407L132.572 6.35935C134.736 2.72601 138.652 0.5 142.881 0.5H212"
								stroke="var(--color-primary-border)"
								strokeWidth="1"
								strokeLinecap="round"
								className="opacity-0 [stroke-dasharray:30_1000]"
								vectorEffect="non-scaling-stroke"
								style={{
									animationName: "component-beam-flow-reverse",
									animationDuration: "2s",
									animationTimingFunction: "ease-in-out",
									animationIterationCount: "infinite",
									animationDelay: "2.7s",
								}}
							/>
						</svg>

						<svg width="212" height="1" viewBox="0 0 212 1" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M0 0.5L212 0.499983" stroke="var(--color-soft)" />
							<path
								d="M0 0.5L212 0.499983"
								stroke="var(--color-primary-border)"
								strokeWidth="1"
								strokeLinecap="round"
								className="opacity-0 [stroke-dasharray:30_1000]"
								vectorEffect="non-scaling-stroke"
								style={{
									animationName: "component-beam-flow-reverse",
									animationDuration: "2s",
									animationTimingFunction: "ease-in-out",
									animationIterationCount: "infinite",
									animationDelay: "2.7s",
								}}
							/>
						</svg>

						<svg width="212" height="1" viewBox="0 0 212 1" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M0 0.5L212 0.499983" stroke="var(--color-soft)" />
							<path
								d="M0 0.5L212 0.499983"
								stroke="var(--color-primary-border)"
								strokeWidth="1"
								strokeLinecap="round"
								className="opacity-0 [stroke-dasharray:30_1000]"
								vectorEffect="non-scaling-stroke"
								style={{
									animationName: "component-beam-flow-reverse",
									animationDuration: "2s",
									animationTimingFunction: "ease-in-out",
									animationIterationCount: "infinite",
									animationDelay: "2.7s",
								}}
							/>
						</svg>

						<svg width="212" height="103" viewBox="0 0 212 103" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M0 0.5H68.4891C72.7181 0.5 76.6348 2.72601 78.7989 6.35935L132.572 96.6407C134.736 100.274 138.652 102.5 142.881 102.5H212" stroke="var(--color-soft)" />
							<path
								d="M0 0.5H68.4891C72.7181 0.5 76.6348 2.72601 78.7989 6.35935L132.572 96.6407C134.736 100.274 138.652 102.5 142.881 102.5H212"
								stroke="var(--color-primary-border)"
								strokeWidth="1"
								strokeLinecap="round"
								className="opacity-0 [stroke-dasharray:30_1000]"
								vectorEffect="non-scaling-stroke"
								style={{
									animationName: "component-beam-flow-reverse",
									animationDuration: "2s",
									animationTimingFunction: "ease-in-out",
									animationIterationCount: "infinite",
									animationDelay: "2.7s",
								}}
							/>
						</svg>
					</div>
				</div>
			</BentoCardGrid>
		</div>
	)
}
