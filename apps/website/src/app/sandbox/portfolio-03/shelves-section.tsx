"use client"

import React from "react"
import Link from "next/link"
import { Button } from "@/styles/default/ui/button"
import { Card, CardContent } from "@/styles/default/ui/card"
import { SHELVES } from "./types"

export function ShelvesSection() {
	return (
		<div id="shelves" className="flex flex-col gap-4 pt-8">
			{/* Section Header */}
			<div className="flex flex-col gap-1">
				<div className="flex items-center gap-3">
					<h2 className="heading-4 text-fg">Shelves</h2>
					<Button
						type="button"
						variant="outline"
						color="neutral"
						size="28"
						className="h-6 rounded-md px-2 text-[11px] font-medium">
						All Shelves
					</Button>
				</div>
				<p className="text-fg-secondary text-xs sm:text-sm">
					Hand-picked paths through everything I&apos;ve written.
				</p>
			</div>

			{/* 2x2 Shelves Grid */}
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				{SHELVES.map((shelf) => (
					<Link key={shelf.id} href="#" className="group block">
						<Card className="border-border/70 bg-elevation-level1/20 hover:border-border hover:bg-elevation-level1/40 h-full rounded-2xl border p-5 shadow-xs transition-all duration-200">
							<CardContent className="flex flex-col gap-2.5 p-0">
								<div className="flex items-center justify-between">
									<h3 className="text-fg group-hover:text-primary text-sm font-bold transition-colors">
										{shelf.title}
									</h3>
									<span className="border-border/60 bg-elevation-level1/60 text-primary rounded-full border px-2 py-0.5 text-[10px] font-bold">
										{shelf.count}
									</span>
								</div>
								<p className="text-fg-secondary text-xs leading-relaxed">
									{shelf.description}
								</p>
							</CardContent>
						</Card>
					</Link>
				))}
			</div>
		</div>
	)
}
