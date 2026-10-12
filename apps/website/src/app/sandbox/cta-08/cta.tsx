import React from "react"
import { Badge } from "@/styles/default/ui/badge"
import { Button } from "@/styles/default/ui/button"

export function CTA8() {
	return (
		<div className="mx-auto max-w-screen-xl px-5 py-8 sm:px-6 sm:py-15">
			<div className="bg-elevation-level1 border-border flex flex-col overflow-hidden rounded-2xl border lg:flex-row lg:justify-between">
				{/* Left Content */}
				<div className="flex flex-col justify-center gap-8 px-6 py-12 sm:px-10 sm:py-16 lg:w-[480px] lg:py-20 lg:pr-0 lg:pl-16">
					<div className="flex flex-col gap-6">
						<div className="flex flex-col gap-3">
							<Badge variant="outline">Get Started</Badge>

							<h2 className="heading-2 text-fg">
								Start building your product today
							</h2>
						</div>

						<p className="text-fg-secondary text-base font-normal">
							Get started by creating first component for your next big idea.
						</p>
					</div>

					<div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
						<Button variant="outline" size="40" className="w-full">
							Get Started
						</Button>
						<Button size="40" className="w-full">
							Browse Components
						</Button>
					</div>
				</div>

				{/* Right Visual Image / Gradient Artwork */}
				<div className="from-primary/20 via-primary-accent/30 to-info/20 relative flex min-h-[16rem] items-center justify-center overflow-hidden bg-gradient-to-br p-6 sm:min-h-[22rem] lg:w-[35rem]">
					<div className="border-border/60 bg-elevation-level1/80 relative flex size-full max-w-md items-center justify-center rounded-xl border p-8 shadow-lg backdrop-blur-md">
						<div className="flex flex-col items-center gap-3 text-center">
							<div className="from-primary to-info size-12 rounded-xl bg-gradient-to-tr shadow-md" />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CTA8
