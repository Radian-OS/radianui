"use client"

import React from "react"
import Image from "next/image"

interface MetricItem {
	value: string
	label: string
}

const leftMetrics: MetricItem[] = [
	{ value: "10x", label: "Faster workflow execution" },
	{ value: "85%", label: "Reduction in repetitive tasks" },
]

export function AgentlabRoiSection() {
	return (
		<section
			id="case-study"
			className="border-border/60 bg-fill1/40 border-t py-24 md:py-32">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="border-border/80 bg-bg grid grid-cols-1 items-center gap-12 rounded-3xl border p-8 shadow-sm md:p-12 lg:grid-cols-2 lg:gap-16">
					{/* Left Column: Metrics & Chart */}
					<div className="flex flex-col justify-between">
						<div className="grid grid-cols-2 gap-6">
							{leftMetrics.map((item) => (
								<div key={item.label}>
									<div className="text-fg font-serif text-4xl font-normal sm:text-5xl">
										{item.value}
									</div>
									<div className="text-fg-secondary mt-2 text-xs font-medium sm:text-sm">
										{item.label}
									</div>
								</div>
							))}
						</div>

						{/* Chart Visualization */}
						<div className="from-primary/5 to-primary/10 relative mt-10 h-48 w-full overflow-hidden rounded-xl bg-gradient-to-b p-4 sm:h-56">
							<Image
								src="https://framerusercontent.com/images/hEq2lGnA6G6ziYMb2M9sqX6hSdU.png"
								alt="Growth trajectory analytics curve"
								fill
								sizes="(max-width: 1024px) 100vw, 50vw"
								className="object-contain object-bottom"
							/>
						</div>
					</div>

					{/* Right Column: Narrative & High-Uptime Metric */}
					<div className="flex flex-col justify-between lg:pl-6">
						<div>
							<h3 className="heading-3 text-fg font-serif text-2xl font-normal tracking-tight sm:text-3xl md:text-4xl">
								Automate your most complex, high-impact multi-step workflows
							</h3>
							<p className="text-fg-secondary mt-4 text-sm leading-relaxed sm:text-base">
								Streamline multi-step processes, reduce manual effort, and
								improve consistency across your operations with real-time
								execution and control.
							</p>
						</div>

						<div className="border-border/60 mt-12 border-t pt-8">
							<div className="text-fg font-serif text-4xl font-normal sm:text-5xl">
								99.9%
							</div>
							<div className="text-fg-secondary mt-2 text-xs font-medium sm:text-sm">
								Reliable task completion across workflows
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
