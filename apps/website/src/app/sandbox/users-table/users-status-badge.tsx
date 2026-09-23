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
				<Check className="size-3 text-emerald-400" />
				<span>Valid account</span>
			</Badge>
		)
	}

	return (
		<Badge
			variant="soft"
			color="amber"
			size="20"
			className="gap-1 border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-400">
			<AlertTriangle className="size-3 text-amber-400" />
			<span>Fake account</span>
		</Badge>
	)
}
