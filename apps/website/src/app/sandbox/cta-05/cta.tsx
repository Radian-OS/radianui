import React from "react"
import { Badge } from "@/styles/default/ui/badge"
import { Button } from "@/styles/default/ui/button"

export function CTA5() {
	return (
		<div className="mx-auto max-w-screen-xl px-5 py-8 sm:px-6 sm:py-15">
			<div className="bg-elevation-level1 border-border flex flex-col rounded-2xl border px-6 py-16 sm:py-20 lg:py-24">
				<div className="flex flex-col gap-8">
					<div className="flex flex-col items-center gap-6">
						<div className="flex flex-col items-center gap-3">
							<Badge variant="outline">Get Started</Badge>

							<h2 className="heading-2 text-fg text-center">
								Start building your product today
							</h2>
						</div>

						<p className="text-fg-secondary text-center text-base font-normal">
							Get started by creating first component for your next big idea.
						</p>
					</div>

					<div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
						<Button
							variant="outline"
							size="40"
							className="order-2 w-full sm:order-1 sm:w-fit">
							Get Started
						</Button>
						<Button size="40" className="order-1 w-full sm:order-2 sm:w-fit">
							Browse Components
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CTA5
