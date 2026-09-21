import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/styles/default/ui/avatar"
import { Card, CardContent } from "@/styles/default/ui/card"

export function FeaturedCard() {
	return (
		<section className="mx-auto my-8 max-w-7xl">
			<Card className="group border-border/80 bg-elevation-level1 gap-0 overflow-hidden p-0 transition-shadow duration-300 hover:shadow-md">
				<div className="grid grid-cols-1 lg:grid-cols-12">
					{/* Left: Featured Image Container */}
					<div className="relative min-h-[280px] sm:min-h-[340px] lg:col-span-6 lg:min-h-[420px]">
						<Image
							src="/sandbox/placeholder.svg"
							alt="What's new at Zentra: smarter tools for smarter finances"
							fill
							className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
							priority
						/>
					</div>

					{/* Right: Article Details */}
					<div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-6 lg:p-12">
						<div>
							{/* Category Tag */}
							<span className="text-primary text-xs font-semibold tracking-wide uppercase">
								Product Updates
							</span>

							{/* Heading 3 with typography utility rule */}
							<Link href="#featured-article" className="mt-4 block">
								<h2 className="heading-3 text-fg group-hover:text-primary transition-colors">
									What&apos;s new at Zentra: smarter tools for smarter finances
								</h2>
							</Link>

							{/* Excerpt */}
							<p className="text-fg-secondary mt-4 text-sm leading-relaxed sm:text-base">
								Delivering a good user experience without compromising the
								authoring experience required us to develop an authoring format
								that enables writers to express interactivity and simple page
								logic without mixing code and content.
							</p>
						</div>

						{/* Author & Date Footer */}
						<div className="border-border/50 mt-8 flex items-center justify-between border-t pt-6">
							<div className="flex items-center gap-3">
								<Avatar
									size="32"
									rounded="circle"
									className="border-border border">
									<AvatarImage
										src="/sandbox/placeholder.svg"
										alt="Savannah Nguyen"
									/>
									<AvatarFallback className="text-xs font-semibold">
										SN
									</AvatarFallback>
								</Avatar>
								<span className="text-fg text-sm font-medium">
									Savannah Nguyen
								</span>
							</div>

							<time className="text-fg-secondary text-sm" dateTime="2025-07-28">
								Jul 28, 2025
							</time>
						</div>
					</div>
				</div>
			</Card>
		</section>
	)
}
