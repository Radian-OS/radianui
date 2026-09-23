"use client"

import React, { useMemo, useState } from "react"
import { Card, CardContent } from "@/styles/default/ui/card"
import { USERS_DATA } from "./types"
import { type UserSortField, UsersTable, type SortOrder } from "./users-table"
import { UsersTablePagination } from "./users-table-pagination"
import { type UserTab, UsersTableTabs } from "./users-table-tabs"
import { UsersTableToolbar } from "./users-table-toolbar"

export function UsersTableView() {
	const [activeTab, setActiveTab] = useState<UserTab>("all")
	const [searchQuery, setSearchQuery] = useState("")
	const [selectedIds, setSelectedIds] = useState<string[]>([])
	const [sortField, setSortField] = useState<UserSortField | null>("name")
	const [sortOrder, setSortOrder] = useState<SortOrder>("asc")
	const [currentPage, setCurrentPage] = useState<number>(1)
	const pageSize = 12

	// Filter users by tab and search
	const filteredUsers = useMemo(() => {
		return USERS_DATA.filter((user) => {
			// Tab Filter
			if (activeTab !== "all" && user.signedUpAs !== activeTab) {
				return false
			}

			// Search Query Filter
			if (searchQuery.trim()) {
				const query = searchQuery.toLowerCase().trim()
				const matchesName = user.name.toLowerCase().includes(query)
				const matchesAddress = user.address.toLowerCase().includes(query)
				const matchesEmail = user.email.toLowerCase().includes(query)
				const matchesPhone = user.phone
					? user.phone.toLowerCase().includes(query)
					: false
				if (!matchesName && !matchesAddress && !matchesEmail && !matchesPhone) {
					return false
				}
			}

			return true
		})
	}, [activeTab, searchQuery])

	// Sort users
	const sortedUsers = useMemo(() => {
		if (!sortField) return filteredUsers

		return [...filteredUsers].sort((a, b) => {
			let aVal = a[sortField] || ""
			let bVal = b[sortField] || ""

			return sortOrder === "asc"
				? aVal.localeCompare(bVal)
				: bVal.localeCompare(aVal)
		})
	}, [filteredUsers, sortField, sortOrder])

	// Paginate users
	const paginatedUsers = useMemo(() => {
		const startIndex = (currentPage - 1) * pageSize
		return sortedUsers.slice(startIndex, startIndex + pageSize)
	}, [sortedUsers, currentPage, pageSize])

	const totalPages = Math.ceil(filteredUsers.length / pageSize) || 1

	const handleSort = (field: UserSortField) => {
		if (sortField === field) {
			setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
		} else {
			setSortField(field)
			setSortOrder("asc")
		}
	}

	const handleTabChange = (tab: UserTab) => {
		setActiveTab(tab)
		setCurrentPage(1)
		setSelectedIds([])
	}

	const handleSearchChange = (query: string) => {
		setSearchQuery(query)
		setCurrentPage(1)
		setSelectedIds([])
	}

	const toggleSelect = (id: string) => {
		setSelectedIds((prev) =>
			prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
		)
	}

	const toggleSelectAll = () => {
		if (selectedIds.length === paginatedUsers.length) {
			setSelectedIds([])
		} else {
			setSelectedIds(paginatedUsers.map((u) => u.id))
		}
	}

	const handlePageChange = (page: number) => {
		setCurrentPage(page)
		setSelectedIds([])
	}

	return (
		<Card className="border-border/70 bg-card/60 flex w-full flex-col gap-4 rounded-2xl border p-6 shadow-xl backdrop-blur-xs">
			<CardContent className="flex flex-col gap-4 p-0">
				{/* Top Tabs */}
				<UsersTableTabs activeTab={activeTab} onTabChange={handleTabChange} />

				{/* Search & Actions Toolbar */}
				<UsersTableToolbar
					searchQuery={searchQuery}
					onSearchChange={handleSearchChange}
				/>

				{/* Data Table */}
				<UsersTable
					users={paginatedUsers}
					selectedIds={selectedIds}
					onToggleSelect={toggleSelect}
					onToggleSelectAll={toggleSelectAll}
					sortField={sortField}
					sortOrder={sortOrder}
					onSort={handleSort}
				/>

				{/* Footer Pagination */}
				<UsersTablePagination
					currentPage={currentPage}
					totalPages={totalPages}
					totalResults={filteredUsers.length}
					onPageChange={handlePageChange}
				/>
			</CardContent>
		</Card>
	)
}
