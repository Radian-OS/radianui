"use client"

import React from "react"
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react"
import { Checkbox } from "@/styles/default/ui/checkbox"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/styles/default/ui/table"
import type { UserItem } from "./types"
import { UsersTableRow } from "./users-table-row"

export type UserSortField =
	| "name"
	| "address"
	| "signedUpAs"
	| "email"
	| "phone"
export type SortOrder = "asc" | "desc"

interface UsersTableProps {
	users: UserItem[]
	selectedIds: string[]
	onToggleSelect: (id: string) => void
	onToggleSelectAll: () => void
	sortField: UserSortField | null
	sortOrder: SortOrder
	onSort: (field: UserSortField) => void
	onDownloadUser?: (user: UserItem) => void
}

export function UsersTable({
	users,
	selectedIds,
	onToggleSelect,
	onToggleSelectAll,
	sortField,
	sortOrder,
	onSort,
	onDownloadUser,
}: UsersTableProps) {
	const allSelected = users.length > 0 && selectedIds.length === users.length

	const renderSortIcon = (field: UserSortField) => {
		if (sortField !== field) {
			return <ChevronsUpDown className="text-fg-tertiary size-3.5" />
		}
		if (sortOrder === "asc") {
			return <ArrowUp className="text-foreground size-3.5" />
		}
		return <ArrowDown className="text-foreground size-3.5" />
	}

	return (
		<div className="border-border/70 bg-card/40 w-full overflow-hidden rounded-xl border">
			<Table>
				<TableHeader>
					<TableRow className="border-border/70 bg-elevation-level1/10 hover:bg-elevation-level1/10 border-b">
						{/* Master Select All Checkbox */}
						<TableHead className="w-10 py-3 pr-1 pl-4">
							<Checkbox
								size="sm"
								checked={allSelected}
								onCheckedChange={onToggleSelectAll}
								aria-label="Select all users"
							/>
						</TableHead>

						{/* Name */}
						<TableHead
							onClick={() => onSort("name")}
							className="text-fg-secondary hover:text-foreground cursor-pointer text-xs font-semibold select-none">
							<div className="flex items-center gap-1.5">
								<span>Name</span>
								{renderSortIcon("name")}
							</div>
						</TableHead>

						{/* Address */}
						<TableHead
							onClick={() => onSort("address")}
							className="text-fg-secondary hover:text-foreground cursor-pointer text-xs font-semibold select-none">
							<div className="flex items-center gap-1.5">
								<span>Address</span>
								{renderSortIcon("address")}
							</div>
						</TableHead>

						{/* Signed up as */}
						<TableHead
							onClick={() => onSort("signedUpAs")}
							className="text-fg-secondary hover:text-foreground cursor-pointer text-xs font-semibold select-none">
							<div className="flex items-center gap-1.5">
								<span>Signed up as</span>
								{renderSortIcon("signedUpAs")}
							</div>
						</TableHead>

						{/* Email */}
						<TableHead
							onClick={() => onSort("email")}
							className="text-fg-secondary hover:text-foreground cursor-pointer text-xs font-semibold select-none">
							<div className="flex items-center gap-1.5">
								<span>Email</span>
								{renderSortIcon("email")}
							</div>
						</TableHead>

						{/* Phone */}
						<TableHead
							onClick={() => onSort("phone")}
							className="text-fg-secondary hover:text-foreground cursor-pointer text-xs font-semibold select-none">
							<div className="flex items-center gap-1.5">
								<span>Phone</span>
								{renderSortIcon("phone")}
							</div>
						</TableHead>

						{/* Actions */}
						<TableHead className="w-10 pr-4" />
					</TableRow>
				</TableHeader>

				<TableBody>
					{users.length === 0 ? (
						<TableRow>
							<TableCell
								colSpan={7}
								className="text-fg-tertiary py-12 text-center text-xs">
								No users found matching your search.
							</TableCell>
						</TableRow>
					) : (
						users.map((user) => (
							<UsersTableRow
								key={user.id}
								user={user}
								isSelected={selectedIds.includes(user.id)}
								onToggleSelect={onToggleSelect}
								onDownloadUser={onDownloadUser}
							/>
						))
					)}
				</TableBody>
			</Table>
		</div>
	)
}
