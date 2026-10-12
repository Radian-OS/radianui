import React from "react"
import { Badge } from "@/styles/default/ui/badge"
import { Card, CardContent } from "@/styles/default/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/styles/default/ui/avatar"
import data from "./data.json"

export function TestimonialSection() {
	return (
		<div className="bg-bg w-full py-8 sm:py-15">
			<div className="mx-auto flex max-w-screen-xl flex-col items-center gap-10 px-6 sm:gap-12">
				{/* Header */}
				<div className="flex max-w-screen-sm flex-col items-center gap-5 text-center sm:gap-6">
					<Badge
						variant="outline"
						className="bg-bg max-w-fit rounded-full px-3 py-1">
						<span className="text-sm font-medium capitalize">Community</span>
					</Badge>
					<h2 className="heading-2">Loved by Builders and Creatives</h2>
					<p className="text-fg-secondary text-base">
						Thousands of developers and builders around the globe are using
						Radian to ship their next big idea and they love it.
					</p>
				</div>

				{/* Cards Grid with Bottom Gradient Mask */}
				<div className="w-full [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]">
					<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
						{data.testimonials.map((item) => (
							<Card
								key={item.id}
								className="bg-elevation-level1 border-border hover:border-fg/20 flex flex-col justify-between rounded-2xl p-6 transition-all duration-200">
								<CardContent className="flex flex-col gap-5 p-0">
									{/* User Info & Brand Header */}
									<div className="flex items-center justify-between gap-3">
										<div className="flex items-center gap-3">
											<Avatar size="40" rounded="circle">
												<AvatarImage src={item.avatar} alt={item.name} />
												<AvatarFallback className="text-xs font-semibold">
													{item.initials}
												</AvatarFallback>
											</Avatar>
											<div className="flex flex-col">
												<h3 className="text-fg text-sm font-semibold">
													{item.name}
												</h3>
												<p className="text-fg-secondary text-xs">
													{item.handle}
												</p>
											</div>
										</div>

										<div className="size-6 shrink-0 opacity-70 transition-opacity hover:opacity-100 dark:brightness-200">
											<img
												src={item.brandLogo}
												alt="Brand logo"
												className="size-full object-contain"
											/>
										</div>
									</div>

									{/* Quote Content */}
									<p className="text-fg text-sm leading-relaxed">
										“{item.content}”
									</p>

									{/* Timestamp */}
									<div className="text-fg-tertiary text-xs">{item.time}</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default TestimonialSection
