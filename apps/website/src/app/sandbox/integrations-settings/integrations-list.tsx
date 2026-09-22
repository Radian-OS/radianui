"use client"

import React from "react"
import Link from "next/link"
import { ExternalLink, Settings } from "lucide-react"
import { Button } from "@/styles/default/ui/button"
import { Switch } from "@/styles/default/ui/switch"
import type { IntegrationItem } from "./types"

interface IntegrationsListProps {
	integrations: IntegrationItem[]
	onToggleIntegration: (id: string, enabled: boolean) => void
	onManageIntegration?: (id: string) => void
}

export function IntegrationsList({
	integrations,
	onToggleIntegration,
	onManageIntegration,
}: IntegrationsListProps) {
	if (integrations.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-16 text-center">
				<p className="text-fg text-sm font-medium">No integrations found</p>
				<p className="text-fg-secondary mt-1 text-xs">
					Try adjusting your search query or filter category.
				</p>
			</div>
		)
	}

	return (
		<div className="divide-border/40 divide-y">
			{integrations.map((item) => (
				<div
					key={item.id}
					className="flex flex-col gap-4 py-5 first:pt-2 last:pb-2 sm:flex-row sm:items-center sm:justify-between">
					{/* Left: Icon and Details */}
					<div className="flex items-start gap-4">
						<div className="border-border/70 bg-elevation-level1 flex size-11 shrink-0 items-center justify-center rounded-xl border shadow-2xs">
							{/* Rule 9: Brand Logo using Google Favicon Service */}
							<img
								src={`https://www.google.com/s2/favicons?sz=64&domain=${item.faviconDomain}`}
								alt={`${item.name} logo`}
								className="size-6 rounded-md object-contain"
								loading="lazy"
							/>
						</div>

						<div className="flex flex-col gap-0.5">
							<div className="flex flex-wrap items-center gap-2">
								<span className="text-fg text-sm font-semibold">
									{item.name}
								</span>
								<Link
									href={`https://${item.domain}`}
									target="_blank"
									rel="noopener noreferrer"
									className="text-fg-secondary hover:text-fg flex items-center gap-1 text-xs transition-colors">
									<span>{item.domain}</span>
									<ExternalLink className="text-fg-secondary size-3" />
								</Link>
							</div>

							<p className="text-fg-secondary text-xs sm:text-sm">
								{item.description}
							</p>
						</div>
					</div>

					{/* Right: Manage button & Toggle switch */}
					<div className="flex items-center gap-3 self-end sm:self-center">
						<Button
							variant="ghost"
							color="neutral"
							size="32"
							onClick={() => onManageIntegration?.(item.id)}
							className="text-fg-secondary hover:text-fg">
							<Settings className="size-4" />
							<span>Manage</span>
						</Button>

						<Switch
							size="24"
							shape="pill"
							checked={item.enabled}
							onCheckedChange={(checked) =>
								onToggleIntegration(item.id, checked)
							}
							aria-label={`Toggle ${item.name} integration`}
						/>
					</div>
				</div>
			))}
		</div>
	)
}
