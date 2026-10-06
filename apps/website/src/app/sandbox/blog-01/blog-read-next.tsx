"use client"

import React from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Card } from "@/styles/default/ui/card"
import { READ_NEXT_CARDS } from "./types"

export function BlogReadNext() {
	return (
		<div className="flex flex-col gap-6">
			<h3 className="heading-4 text-fg">Read Next</h3>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				{READ_NEXT_CARDS.map((card) => (
					<Card
						key={card.id}
						className="border-border/70 bg-card hover:border-border flex flex-col justify-between gap-4 border p-5 transition-colors">
						<div className="flex flex-col gap-1.5">
							<span className="text-fg-secondary text-xs">
								{card.category} <span className="opacity-40">|</span>{" "}
								{card.readTime}
							</span>
							<h4 className="text-fg text-sm font-semibold sm:text-base">
								{card.title}
							</h4>
							<p className="text-fg-secondary text-xs leading-relaxed">
								{card.description}
							</p>
						</div>

						<Link
							href={card.href}
							className="group text-fg hover:text-primary flex w-fit items-center gap-1 text-xs font-semibold transition-colors">
							<span>Read article</span>
							<ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
						</Link>
					</Card>
				))}
			</div>
		</div>
	)
}
