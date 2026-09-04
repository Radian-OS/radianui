"use client"

import React from "react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function AgentlabAnnouncementBar() {
	return (
		<aside
			aria-label="Announcement"
			className="bg-black-inverse text-white-inverse relative z-20 flex w-full items-center justify-center px-4 py-2 text-xs font-medium tracking-wide transition-colors">
			<Link
				href="https://agentlab.framer.ai"
				target="_blank"
				rel="noopener noreferrer"
				className="flex items-center gap-1.5 transition-opacity hover:underline hover:opacity-80">
				<span>AgentLab Raises $5M+ Seed to Build the Future</span>
				<ArrowRight className="size-3.5 shrink-0" />
			</Link>
		</aside>
	)
}
