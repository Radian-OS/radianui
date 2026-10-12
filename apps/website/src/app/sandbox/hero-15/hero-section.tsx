import React from "react"
import { ArrowRight } from "lucide-react"
import { Badge } from "@/styles/default/ui/badge"
import { Button } from "@/styles/default/ui/button"

export function HeroSection() {
	return (
		<div className="w-full py-8 sm:py-15">
			<div className="mx-auto flex max-w-screen-xl flex-col items-center justify-between gap-14 px-5 sm:gap-20 sm:px-6 lg:flex-row lg:items-center">
				{/* Left Content Column */}
				<div className="flex flex-col justify-center sm:max-w-xl lg:max-w-xl">
					<div className="flex flex-col gap-6 sm:gap-8 lg:gap-9">
						<div className="flex flex-col gap-5 sm:gap-6">
							{/* Announcement Badge */}
							<Badge
								variant="outline"
								className="bg-elevation-level1 flex w-fit items-center gap-2 rounded-full p-1 text-sm font-medium">
								<Badge variant="outline" className="rounded-full">
									Version 1.0
								</Badge>
								<div className="flex items-center gap-1 pr-2">
									<span>Announcement News</span>
									<ArrowRight className="size-4" />
								</div>
							</Badge>

							{/* Slogan */}
							<h1 className="heading-1 text-fg">
								Ship high performing products fast
							</h1>
						</div>

						<p className="text-fg-secondary text-base font-normal sm:text-lg">
							Start your product with high quality industry standard interfaces.
							Copy and paste code directly in your app. Built with{" "}
							<span className="text-fg font-semibold">
								React, TypeScript, Tailwind CSS
							</span>{" "}
							and <span className="text-fg font-semibold">shadcn/ui</span>.
						</p>
					</div>

					{/* Action Buttons */}
					<div className="mt-8 flex flex-col items-center gap-3 sm:mt-9 sm:flex-row sm:gap-4 lg:mt-10">
						<Button className="w-full sm:w-fit" size="40">
							Browse Components
						</Button>
						<Button className="w-full sm:w-fit" size="40" variant="outline">
							Get Started
						</Button>
					</div>
				</div>

				{/* Right Artwork Panel */}
				<div className="from-primary/20 via-primary-accent/30 to-info/20 border-border relative flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl border bg-gradient-to-br p-6 sm:h-96 lg:h-[28rem] lg:w-[31rem]">
					<div className="border-border/60 bg-elevation-level1/80 flex items-center gap-3 rounded-xl border px-6 py-4 shadow-xl backdrop-blur-md">
						<div className="from-primary to-info size-8 rounded-lg bg-gradient-to-tr" />
						<div>
							<p className="text-fg text-sm font-semibold">Component Library</p>
							<p className="text-fg-tertiary text-xs">
								Production ready interfaces
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default HeroSection
