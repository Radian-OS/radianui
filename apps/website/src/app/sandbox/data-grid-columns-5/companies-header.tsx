"use client"

import React from "react"
import { Plus } from "lucide-react"
import { Button } from "@/styles/default/ui/button"

interface CompaniesHeaderProps {
	activeCount: number
	atRiskCount: number
	onAddCompany?: () => void
}

export function CompaniesHeader({
	activeCount,
	atRiskCount,
	onAddCompany,
}: CompaniesHeaderProps) {
	return (
		<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<div className="flex flex-col gap-1">
				<h1 className="heading-4 text-foreground">Companies</h1>
				<p className="text-fg-secondary flex items-center gap-1.5 text-xs">
					<span>{activeCount} active</span>
					<span>•</span>
					<span>{atRiskCount} at risk</span>
				</p>
			</div>

			<Button
				type="button"
				variant="strong"
				color="primary"
				size="32"
				onClick={onAddCompany}
				className="gap-1.5 text-xs font-semibold">
				<Plus className="size-4" />
				<span>Add company</span>
			</Button>
		</div>
	)
}
