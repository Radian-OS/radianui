"use client"

import React, { useMemo, useState } from "react"
import { Card, CardContent } from "@/styles/default/ui/card"
import { ProjectsTableHeader } from "./projects-table-header"
import {
	type ProjectSortField,
	ProjectsTable,
	type SortOrder,
} from "./projects-table"
import { ProjectsTablePagination } from "./projects-table-pagination"
import { ProjectsTableToolbar } from "./projects-table-toolbar"
import { PROJECTS_DATA } from "./types"

export function ProjectsTableView() {
	const [searchQuery, setSearchQuery] = useState("")
	const [selectedIds, setSelectedIds] = useState<string[]>([])
	const [sortField, setSortField] = useState<ProjectSortField | null>("name")
	const [sortOrder, setSortOrder] = useState<SortOrder>("asc")
	const [currentPage, setCurrentPage] = useState<number>(1)
	const pageSize = 12

	// Filter projects
	const filteredProjects = useMemo(() => {
		if (!searchQuery.trim()) return PROJECTS_DATA

		const query = searchQuery.toLowerCase().trim()
		return PROJECTS_DATA.filter((p) => {
			const matchesName = p.name.toLowerCase().includes(query)
			const matchesCategory = p.category.toLowerCase().includes(query)
			const matchesTags = p.tags.some((t) => t.toLowerCase().includes(query))
			return matchesName || matchesCategory || matchesTags
		})
	}, [searchQuery])

	// Sort projects
	const sortedProjects = useMemo(() => {
		if (!sortField) return filteredProjects

		return [...filteredProjects].sort((a, b) => {
			let aVal: any
			let bVal: any

			if (sortField === "name") {
				aVal = a.name
				bVal = b.name
			} else if (sortField === "category") {
				aVal = a.category
				bVal = b.category
			} else if (sortField === "progress") {
				aVal = a.progressStep / a.progressTotal
				bVal = b.progressStep / b.progressTotal
			} else if (sortField === "deadline") {
				aVal = a.deadline || ""
				bVal = b.deadline || ""
			} else if (sortField === "rating") {
				aVal = a.rating
				bVal = b.rating
			}

			if (typeof aVal === "string") {
				return sortOrder === "asc"
					? aVal.localeCompare(bVal)
					: bVal.localeCompare(aVal)
			}

			return sortOrder === "asc" ? aVal - bVal : bVal - aVal
		})
	}, [filteredProjects, sortField, sortOrder])

	// Paginate projects
	const paginatedProjects = useMemo(() => {
		const startIndex = (currentPage - 1) * pageSize
		return sortedProjects.slice(startIndex, startIndex + pageSize)
	}, [sortedProjects, currentPage, pageSize])

	const totalPages = Math.ceil(filteredProjects.length / pageSize) || 1

	const handleSort = (field: ProjectSortField) => {
		if (sortField === field) {
			setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
		} else {
			setSortField(field)
			setSortOrder("asc")
		}
	}

	const toggleSelect = (id: string) => {
		setSelectedIds((prev) =>
			prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
		)
	}

	const toggleSelectAll = () => {
		if (selectedIds.length === paginatedProjects.length) {
			setSelectedIds([])
		} else {
			setSelectedIds(paginatedProjects.map((p) => p.id))
		}
	}

	const handlePageChange = (page: number) => {
		setCurrentPage(page)
		setSelectedIds([])
	}

	const handleSearchChange = (query: string) => {
		setSearchQuery(query)
		setCurrentPage(1)
		setSelectedIds([])
	}

	return (
		<Card className="border-border/70 bg-card/60 flex w-full flex-col gap-4 rounded-2xl border p-6 shadow-xl backdrop-blur-xs">
			<CardContent className="flex flex-col gap-4 p-0">
				{/* Top Header */}
				<ProjectsTableHeader />

				{/* Search & Actions Toolbar */}
				<ProjectsTableToolbar
					searchQuery={searchQuery}
					onSearchChange={handleSearchChange}
				/>

				{/* Data Table */}
				<ProjectsTable
					projects={paginatedProjects}
					selectedIds={selectedIds}
					onToggleSelect={toggleSelect}
					onToggleSelectAll={toggleSelectAll}
					sortField={sortField}
					sortOrder={sortOrder}
					onSort={handleSort}
				/>

				{/* Footer Pagination */}
				<ProjectsTablePagination
					currentPage={currentPage}
					totalPages={totalPages}
					totalResults={filteredProjects.length}
					onPageChange={handlePageChange}
				/>
			</CardContent>
		</Card>
	)
}
