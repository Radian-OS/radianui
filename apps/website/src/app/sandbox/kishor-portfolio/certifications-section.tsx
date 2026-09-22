"use client"

import React from "react"
import { GraduationCap } from "lucide-react"
import { CERTIFICATIONS } from "./types"

export function CertificationsSection() {
	return (
		<div className="flex flex-col gap-3.5 pt-4">
			<h2 className="heading-5 text-foreground">
				Certifications ({CERTIFICATIONS.length})
			</h2>

			<div className="divide-border/60 border-border/70 bg-elevation-level1/10 flex flex-col divide-y rounded-xl border">
				{CERTIFICATIONS.map((cert) => (
					<div
						key={cert.id}
						className="hover:bg-elevation-level1/20 flex items-center gap-3.5 p-4 transition-colors">
						<div className="border-border/70 bg-elevation-level1/40 text-foreground flex size-9 shrink-0 items-center justify-center rounded-lg border font-bold">
							{cert.iconType === "college" ? (
								<GraduationCap className="size-4.5 text-amber-400" />
							) : (
								<span className="text-sm font-black text-sky-400">G</span>
							)}
						</div>
						<div className="flex flex-col">
							<span className="text-foreground text-xs font-semibold sm:text-sm">
								{cert.title}
							</span>
							<span className="text-fg-secondary text-[11px]">
								{cert.issuer} | {cert.date}
							</span>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
