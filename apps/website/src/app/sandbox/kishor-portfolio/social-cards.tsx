"use client"

import React from "react"
import Link from "next/link"
import { ArrowUpRight, Instagram, Linkedin } from "lucide-react"
import { Card, CardContent } from "@/styles/default/ui/card"

export function SocialCards() {
	return (
		<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
			{/* LinkedIn Card */}
			<Link
				href="https://linkedin.com"
				target="_blank"
				rel="noreferrer"
				className="group block">
				<Card className="border-border/70 bg-elevation-level1/20 hover:border-border hover:bg-elevation-level1/40 rounded-xl border p-4 transition-all duration-200">
					<CardContent className="flex items-center justify-between p-0">
						<div className="flex items-center gap-3">
							<div className="bg-info text-info-fg flex size-9 shrink-0 items-center justify-center rounded-lg shadow-xs">
								<Linkedin className="fill-info-fg size-5" />
							</div>
							<div className="flex flex-col text-left">
								<span className="text-fg text-xs font-semibold">LinkedIn</span>
								<span className="text-fg-secondary truncate text-[11px]">
									kishor-kumar-khadka-8aa005194
								</span>
							</div>
						</div>
						<ArrowUpRight className="text-fg-tertiary group-hover:text-fg size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
					</CardContent>
				</Card>
			</Link>

			{/* Instagram Card */}
			<Link
				href="https://instagram.com"
				target="_blank"
				rel="noreferrer"
				className="group block">
				<Card className="border-border/70 bg-elevation-level1/20 hover:border-border hover:bg-elevation-level1/40 rounded-xl border p-4 transition-all duration-200">
					<CardContent className="flex items-center justify-between p-0">
						<div className="flex items-center gap-3">
							<div className="bg-primary-hover text-white-inverse flex size-9 shrink-0 items-center justify-center rounded-lg shadow-xs">
								<Instagram className="size-5" />
							</div>
							<div className="flex flex-col text-left">
								<span className="text-fg text-xs font-semibold">Instagram</span>
								<span className="text-fg-secondary truncate text-[11px]">
									_imkishor
								</span>
							</div>
						</div>
						<ArrowUpRight className="text-fg-tertiary group-hover:text-fg size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
					</CardContent>
				</Card>
			</Link>
		</div>
	)
}
