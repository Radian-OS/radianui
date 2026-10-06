"use client"

import React from "react"
import Link from "next/link"
import { Code2, Globe, HardDrive, Layers, PartyPopper } from "lucide-react"
import { SERIES, type SeriesItem } from "./types"

export function SeriesSection() {
	const renderSeriesIcon = (type: SeriesItem["iconType"]) => {
		switch (type) {
			case "js":
				return (
					<div className="bg-warning-accent text-warning-text flex size-7 items-center justify-center rounded-md text-xs font-bold">
						JS
					</div>
				)
			case "dom":
				return (
					<div className="bg-info-accent text-info-text flex size-7 items-center justify-center rounded-md">
						<Globe className="size-4" />
					</div>
				)
			case "wordpress":
				return (
					<div className="bg-primary-accent text-primary-text flex size-7 items-center justify-center rounded-md">
						<Layers className="size-4" />
					</div>
				)
			case "review":
				return (
					<div className="bg-error-accent text-error-text flex size-7 items-center justify-center rounded-md">
						<PartyPopper className="size-4" />
					</div>
				)
			case "redesign":
				return (
					<div className="bg-fill2 text-fg-secondary flex size-7 items-center justify-center rounded-md">
						<HardDrive className="size-4" />
					</div>
				)
		}
	}

	return (
		<div className="flex flex-col gap-4 pt-8">
			{/* Section Header */}
			<div className="flex flex-col gap-1">
				<h2 className="heading-4 text-fg">Series</h2>
				<p className="text-fg-secondary text-xs sm:text-sm">
					Some things I wrote span years or dozens of parts.
				</p>
			</div>

			{/* Series List */}
			<div className="flex flex-col gap-4 pt-1">
				{SERIES.map((item) => (
					<Link
						key={item.id}
						href="#"
						className="group hover:bg-elevation-level1/20 flex items-start gap-3.5 rounded-xl p-3 transition-colors">
						<div className="mt-0.5 shrink-0">
							{renderSeriesIcon(item.iconType)}
						</div>
						<div className="flex flex-col gap-1">
							<h3 className="text-fg group-hover:text-primary text-xs font-bold transition-colors sm:text-sm">
								{item.title}
							</h3>
							<p className="text-fg-secondary text-xs leading-relaxed">
								{item.description}
							</p>
						</div>
					</Link>
				))}
			</div>
		</div>
	)
}
