"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/styles/default/ui/card"
import { TIMELINE_ITEMS } from "./types"

export function TimelineSection() {
	return (
		<div className="flex flex-col gap-8 pt-2">
			{/* Hero Title */}
			<div className="flex flex-col gap-2">
				<h1 className="heading-2 text-fg">Hey, I&apos;m Tania!</h1>
				<p className="text-fg-secondary text-base sm:text-lg">
					Principal software engineer, writer, all-around nerd.
				</p>
			</div>

			{/* Timeline Content Grid */}
			<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
				{/* Left 2 Cols: Timeline Entries */}
				<div className="flex flex-col gap-5 lg:col-span-2">
					<h2 className="heading-5 text-fg">A brief timeline</h2>

					<div className="text-fg-secondary flex flex-col gap-4 text-xs leading-relaxed sm:text-sm">
						{TIMELINE_ITEMS.map((item) => (
							<div
								key={item.year}
								className="grid grid-cols-1 gap-1 sm:grid-cols-[100px_1fr] sm:gap-3">
								<span className="text-fg-tertiary font-mono text-xs">
									{item.year}
								</span>
								<p>
									{item.highlight && (
										<span className="text-primary font-semibold">
											{item.highlight}:{" "}
										</span>
									)}
									{item.description}
								</p>
							</div>
						))}

						<div className="grid grid-cols-1 gap-1 pt-1 sm:grid-cols-[100px_1fr] sm:gap-3">
							<span className="text-primary text-xs font-semibold">Also:</span>
							<p>
								city explorer, weight-lifter, brick-clicker, accordion
								enthusiast, biker, Magic gatherer, webmaster.
							</p>
						</div>
					</div>
				</div>

				{/* Right 1 Col: Mascot Graphic Card */}
				<div className="flex flex-col items-center justify-start">
					<Card className="border-border/70 bg-elevation-level1/20 flex w-full max-w-xs flex-col items-center rounded-2xl border p-5 text-center shadow-sm">
						<CardContent className="flex flex-col items-center gap-3.5 p-0">
							<div className="bg-primary-accent relative flex size-36 items-center justify-center rounded-full p-4">
								<Image
									src="/sandbox/placeholder.svg"
									alt="Tania Dev Mascot"
									width={100}
									height={100}
									className="object-contain"
								/>
							</div>
							<p className="text-fg-secondary text-xs leading-relaxed">
								Can&apos;t remember how to spell my name? Just go to{" "}
								<Link
									href="#"
									className="text-primary hover:text-primary-hover font-medium transition-colors">
									tania.dev
								</Link>
								!
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
}
