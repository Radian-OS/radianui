"use client"

import React from "react"
import { ChevronsRight, Plus } from "lucide-react"
import { Button, IconButton } from "@/styles/default/ui/button"

interface IntegrationsHeaderProps {
	isSidebarOpen: boolean
	onToggleSidebar: () => void
	onAddCustomIntegration?: () => void
}

export function IntegrationsHeader({
	isSidebarOpen,
	onToggleSidebar,
	onAddCustomIntegration,
}: IntegrationsHeaderProps) {
	return (
		<div className="border-border/40 flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-start sm:justify-between">
			<div className="flex items-start gap-3">
				{!isSidebarOpen && (
					<IconButton
						variant="outline"
						color="neutral"
						size="36"
						aria-label="Expand settings navigation"
						onClick={onToggleSidebar}
						className="text-fg-secondary hover:text-fg mt-0.5 shrink-0">
						<ChevronsRight className="size-4" />
					</IconButton>
				)}

				<div className="flex flex-col">
					<h1 className="heading-2 text-foreground">Integrations</h1>
					<p className="text-fg-secondary mt-1 text-sm">
						Supercharge your workflow and connect the tools you and your team
						uses every day.
					</p>
				</div>
			</div>

			<div className="flex items-center gap-2 self-start sm:self-center">
				<Button
					variant="outline"
					color="neutral"
					size="36"
					onClick={onAddCustomIntegration}>
					<Plus className="size-4" />
					Custom integration
				</Button>
			</div>
		</div>
	)
}
