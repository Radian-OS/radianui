"use client"

import React from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/styles/default/ui/button"

export function AgentlabCtaBanner() {
	return (
		<section className="bg-black-inverse text-white-inverse relative overflow-hidden py-24 md:py-32">
			{/* Subtle ambient glow */}
			<div className="bg-primary/20 pointer-events-none absolute top-1/2 left-1/2 -z-10 h-96 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />

			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
					{/* Left Title */}
					<div className="lg:col-span-6">
						<h2 className="heading-2">Ready to Automate your Workflow?</h2>
					</div>

					{/* Right Content & Actions */}
					<div className="flex flex-col items-start lg:col-span-6">
						<p className="text-white-inverse/70 text-sm leading-relaxed sm:text-base">
							Deploy intelligent agents, eliminate repetitive manual steps,
							reduce operational costs, and deliver results faster than ever
							before.
						</p>

						<div className="mt-8 flex flex-wrap items-center gap-4">
							<Button variant="strong" color="neutral" size="40">
								<ArrowRight className="size-4" />
								<span>TALK TO SALES</span>
							</Button>

							<Button variant="outline" color="neutral" size="40">
								<span>VIEW PRICING</span>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
