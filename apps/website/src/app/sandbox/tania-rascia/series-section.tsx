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
					<div className="flex size-7 items-center justify-center rounded-md bg-amber-500/20 text-xs font-bold text-amber-400">
						JS
					</div>
				)
			case "dom":
				return (
					<div className="flex size-7 items-center justify-center rounded-md bg-sky-500/20 text-sky-400">
						<Globe className="size-4" />
					</div>
				)
			case "wordpress":
				return (
					<div className="flex size-7 items-center justify-center rounded-md bg-blue-500/20 text-blue-400">
						<Layers className="size-4" />
					</div>
				)
			case "review":
				return (
					<div className="flex size-7 items-center justify-center rounded-md bg-rose-500/20 text-rose-400">
						<PartyPopper className="size-4" />
					</div>
				)
			case "redesign":
				return (
					<div className="text-fg-secondary flex size-7 items-center justify-center rounded-md bg-zinc-500/20">
						<HardDrive className="size-4" />
					</div>
				)
		}
	}

	return (
		<div className="flex flex-col gap-4 pt-8">
			{/* Section Header */}
			<div className="flex flex-col gap-1">
				<h2 className="heading-4 text-foreground">Series</h2>
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
							<h3 className="text-foreground text-xs font-bold transition-colors group-hover:text-rose-400 sm:text-sm">
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
