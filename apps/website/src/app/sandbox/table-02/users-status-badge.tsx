"use client"

import React from "react"
import { AlertTriangle, Check } from "lucide-react"
import { Badge } from "@/styles/default/ui/badge"
import type { AccountType } from "./types"

interface UsersStatusBadgeProps {
	status: AccountType
}

export function UsersStatusBadge({ status }: UsersStatusBadgeProps) {
	if (status === "valid") {
		return (
			<Badge
				variant="soft"
				color="neutral"
				size="20"
				className="border-border/70 bg-elevation-level1/40 text-fg-secondary gap-1 px-2 py-0.5 text-[11px] font-medium">
				<Check className="text-success size-3" />
				<span>Valid account</span>
			</Badge>
		)
	}

	return (
		<Badge
			variant="soft"
			color="warning"
			size="20"
			className="border-warning-border/30 bg-warning-accent text-warning-text gap-1 px-2 py-0.5 text-[11px] font-medium">
			<AlertTriangle className="text-warning size-3" />
			<span>Fake account</span>
		</Badge>
	)
}
