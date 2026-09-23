"use client"

import React from "react"
import { ShieldCheck, Sparkles, Star, Trophy } from "lucide-react"
import { CLIENTS } from "./types"

export function ClientsSection() {
	const renderLogoIcon = (id: string) => {
		switch (id) {
			case "ransom":
				return <ShieldCheck className="text-fg-secondary size-5" />
			case "bigenough":
				return <Trophy className="text-fg-secondary size-5" />
			case "cara":
				return <Sparkles className="text-fg-secondary size-5" />
			case "authentic":
				return <Star className="text-fg-secondary size-5" />
		}
	}

	return (
		<div className="flex flex-col gap-5">
			<h2 className="heading-5 text-fg">Clients</h2>

			{/* 4 Client brand cards */}
			<div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
				{CLIENTS.map((client) => (
					<div
						key={client.id}
						className="border-border/70 bg-elevation-level1/20 hover:border-warning-border/40 group flex flex-col items-center justify-center gap-1.5 rounded-2xl border p-5 text-center transition-all">
						{renderLogoIcon(client.id)}
						<span className="text-fg-secondary group-hover:text-fg text-xs font-bold tracking-wider transition-colors">
							{client.name}
						</span>
						<span className="text-fg-tertiary text-[10px]">
							{client.subtitle}
						</span>
					</div>
				))}
			</div>

			{/* Scroll indicator */}
			<div className="bg-border/40 mx-auto mt-2 h-1.5 w-48 overflow-hidden rounded-full">
				<div className="bg-warning h-full w-24 rounded-full transition-all duration-300" />
			</div>
		</div>
	)
}
