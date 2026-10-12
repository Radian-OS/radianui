import React from "react"
import { Badge } from "@/styles/default/ui/badge"
import { Button } from "@/styles/default/ui/button"

export function HeroSection() {
	return (
		<div className="mx-auto flex max-w-screen-xl flex-col gap-14 px-5 py-8 sm:gap-20 sm:px-6 sm:py-20 lg:gap-24">
			<div className="mx-auto flex max-w-screen-lg flex-col gap-8 sm:gap-9 lg:gap-10">
				<div className="flex flex-col items-center gap-6 sm:gap-8 lg:gap-9">
					<div className="flex flex-col items-center gap-5 sm:gap-6">
						{/* Badge */}
						<Badge
							variant="outline"
							className="bg-elevation-level1 rounded-full px-3 py-1">
							<span className="text-sm font-medium capitalize">
								Ultimate Product Library
							</span>
						</Badge>

						{/* Heading */}
						<h1 className="heading-1 text-fg text-center">
							Build beautiful products not in months but weeks
						</h1>
					</div>

					<p className="text-fg-secondary mx-auto max-w-3xl text-center text-base font-normal sm:text-lg">
						Start your product with high quality industry standard interfaces.
						Copy and paste code directly in your app. Built with{" "}
						<span className="text-fg font-semibold">
							React, TypeScript, Tailwind CSS
						</span>{" "}
						and <span className="text-fg font-semibold">shadcn/ui</span>.
					</p>
				</div>

				{/* Action Buttons */}
				<div className="flex w-full flex-col justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
					<Button className="w-full sm:w-fit" size="40">
						Browse Components
					</Button>
					<Button className="w-full sm:w-fit" variant="outline" size="40">
						Get Started
					</Button>
				</div>
			</div>

			{/* Hero Preview Banner */}
			<div className="from-primary/20 via-primary-accent/30 to-info/20 border-border relative flex h-56 items-center justify-center overflow-hidden rounded-2xl border bg-gradient-to-br sm:h-96 lg:h-[36rem]">
				<div className="border-border/60 bg-elevation-level1/80 flex items-center gap-3 rounded-xl border px-6 py-4 shadow-xl backdrop-blur-md">
					<div className="from-primary to-info size-8 rounded-lg bg-gradient-to-tr" />
				</div>
			</div>
		</div>
	)
}

export default HeroSection
