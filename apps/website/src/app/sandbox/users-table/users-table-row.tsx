"use client"

import React from "react"
import { Download } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/styles/default/ui/avatar"
import { Button } from "@/styles/default/ui/button"
import { Checkbox } from "@/styles/default/ui/checkbox"
import { TableCell, TableRow } from "@/styles/default/ui/table"
import type { UserItem } from "./types"
import { UsersStatusBadge } from "./users-status-badge"

interface UsersTableRowProps {
	user: UserItem
	isSelected: boolean
	onToggleSelect: (id: string) => void
	onDownloadUser?: (user: UserItem) => void
}

export function UsersTableRow({
	user,
	isSelected,
	onToggleSelect,
	onDownloadUser,
}: UsersTableRowProps) {
	return (
		<TableRow
			data-state={isSelected ? "selected" : undefined}
			className="border-border/60 hover:bg-elevation-level1/20 transition-colors">
			{/* Row Selection Checkbox */}
			<TableCell className="w-10 py-3 pr-1 pl-4">
				<Checkbox
					size="sm"
					checked={isSelected}
					onCheckedChange={() => onToggleSelect(user.id)}
					aria-label={`Select ${user.name}`}
				/>
			</TableCell>

			{/* Name Column with Avatar */}
			<TableCell className="py-3">
				<div className="flex items-center gap-2.5">
					<Avatar
						size="24"
						rounded="circle"
						className="border-border/60 bg-elevation-level1/50 border">
						{user.avatarUrl && (
							<AvatarImage src={user.avatarUrl} alt={user.name} />
						)}
						<AvatarFallback className="text-fg-secondary text-[10px] font-semibold">
							{user.initials}
						</AvatarFallback>
					</Avatar>
					<span className="text-fg text-xs font-medium">{user.name}</span>
				</div>
			</TableCell>

			{/* Address Column */}
			<TableCell className="text-fg-secondary max-w-[280px] truncate py-3 text-xs">
				{user.address}
			</TableCell>

			{/* Signed up as Column */}
			<TableCell className="py-3">
				<UsersStatusBadge status={user.signedUpAs} />
			</TableCell>

			{/* Email Column */}
			<TableCell className="text-fg-secondary py-3 text-xs">
				{user.email}
			</TableCell>

			{/* Phone Column */}
			<TableCell className="text-fg-secondary py-3 font-mono text-xs">
				{user.phone || ""}
			</TableCell>

			{/* Action Column: Download Icon */}
			<TableCell className="w-10 py-3 pr-4 text-right">
				<Button
					type="button"
					variant="ghost"
					color="neutral"
					size="28"
					onClick={() => onDownloadUser?.(user)}
					className="text-fg-tertiary hover:text-fg size-7 p-0">
					<Download className="size-3.5" />
				</Button>
			</TableCell>
		</TableRow>
	)
}
