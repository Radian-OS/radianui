import React from "react"
import { Badge } from "@/styles/default/ui/badge"
import { Button } from "@/styles/default/ui/button"
import { Input } from "@/styles/default/ui/input"

export function CTA7() {
	return (
		<div className="bg-fill1 w-full">
			<div className="mx-auto max-w-screen-xl px-5 py-16 sm:px-6 sm:py-20 lg:py-24">
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
						<Input
							type="email"
							placeholder="Your work email"
							size="40"
							className="bg-elevation-level1 text-base text-ellipsis sm:w-80"
						/>
						<Button size="40" className="w-full sm:w-fit">
							Start your 14 days trial
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CTA7
