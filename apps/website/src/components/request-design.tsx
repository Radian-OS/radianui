"use client"

import { ArrowUpRight } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { Input } from "@/registry/ui/input"
import { TextArea } from "@/registry/ui/text-area"

export function RequestDesign() {
	return (
		<div className="bg-fill1 mt-8 flex flex-col gap-6 rounded-2xl p-10">
			<div className="flex flex-col gap-2">
				<span className="text-primary text-xs font-normal">Request design</span>
				<h2 className="text-fg heading-6">
					Can&apos;t find what you&apos;re looking for?
				</h2>
				<p className="text-fg-secondary text-base font-normal">
					Tell us which component, template, or asset you need. We review every
					request and prioritize the most popular ones in future updates.
				</p>
			</div>

			<div className="mt-4 flex flex-col gap-3">
				<TextArea
					placeholder="What would you like us to add?"
					className="h-[96px] w-full resize-none"
				/>
				<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
					<Input
						placeholder="Enter your email address here"
						type="email"
						className="flex-1"
					/>
					<Button variant="strong" color="primary">
						Submit Request
						<ArrowUpRight />
					</Button>
				</div>
			</div>
		</div>
	)
}
