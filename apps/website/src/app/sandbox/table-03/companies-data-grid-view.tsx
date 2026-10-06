"use client"

import React, { useMemo, useState } from "react"
import { Card, CardContent } from "@/styles/default/ui/card"
import type { VisibleColumns } from "./columns-customizer"
import { CompaniesHeader } from "./companies-header"
import {
	CompaniesTable,
	type SortField,
	type SortOrder,
} from "./companies-table"
import { CompaniesTablePagination } from "./companies-table-pagination"
import { CompaniesToolbar } from "./companies-toolbar"
import { COMPANIES_DATA } from "./types"

export function CompaniesDataGridView() {
	const [searchQuery, setSearchQuery] = useState("")
	const [selectedIds, setSelectedIds] = useState<string[]>([])
	const [sortField, setSortField] = useState<SortField | null>("name")
	const [sortOrder, setSortOrder] = useState<SortOrder>("asc")
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [pageSize, setPageSize] = useState<number>(10)
	const [columns, setColumns] = useState<VisibleColumns>({
		company: true,
		owner: true,
		stage: true,
		arr: true,
		categories: true,
		health: true,
	})

	const activeCount = useMemo(() => {
		return COMPANIES_DATA.filter((c) => c.status === "active").length
	}, [])

	const atRiskCount = useMemo(() => {
		return COMPANIES_DATA.filter((c) => c.status === "at-risk").length
	}, [])

	// Filter companies
	const filteredCompanies = useMemo(() => {
		if (!searchQuery.trim()) return COMPANIES_DATA

		const query = searchQuery.toLowerCase().trim()
		return COMPANIES_DATA.filter((item) => {
			const matchesName = item.name.toLowerCase().includes(query)
			const matchesDomain = item.domain.toLowerCase().includes(query)
			const matchesOwner = item.owner.name.toLowerCase().includes(query)
			const matchesStage = item.stage.toLowerCase().includes(query)
			const matchesCategories = item.categories.some((cat) =>
				cat.toLowerCase().includes(query)
			)
			return (
				matchesName ||
				matchesDomain ||
				matchesOwner ||
				matchesStage ||
				matchesCategories
			)
		})
	}, [searchQuery])

	// Sort companies
	const sortedCompanies = useMemo(() => {
		if (!sortField) return filteredCompanies

		return [...filteredCompanies].sort((a, b) => {
			let aVal: any
			let bVal: any

			if (sortField === "name") {
				aVal = a.name
				bVal = b.name
			} else if (sortField === "owner") {
				aVal = a.owner.name
				bVal = b.owner.name
			} else if (sortField === "stage") {
				aVal = a.stage
				bVal = b.stage
			} else if (sortField === "arrValue") {
				aVal = a.arrValue
				bVal = b.arrValue
			} else if (sortField === "health") {
				aVal = a.health
				bVal = b.health
			}

			if (typeof aVal === "string") {
				return sortOrder === "asc"
					? aVal.localeCompare(bVal)
					: bVal.localeCompare(aVal)
			}

			return sortOrder === "asc" ? aVal - bVal : bVal - aVal
		})
	}, [filteredCompanies, sortField, sortOrder])

	// Paginate companies
	const paginatedCompanies = useMemo(() => {
		const startIndex = (currentPage - 1) * pageSize
		return sortedCompanies.slice(startIndex, startIndex + pageSize)
	}, [sortedCompanies, currentPage, pageSize])

	const handleSort = (field: SortField) => {
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
		if (selectedIds.length === paginatedCompanies.length) {
			setSelectedIds([])
		} else {
			setSelectedIds(paginatedCompanies.map((c) => c.id))
		}
	}

	const handlePageChange = (page: number) => {
		setCurrentPage(page)
		setSelectedIds([])
	}

	const handlePageSizeChange = (size: number) => {
		setPageSize(size)
		setCurrentPage(1)
		setSelectedIds([])
	}

	const handleSearchChange = (query: string) => {
		setSearchQuery(query)
		setCurrentPage(1)
	}

	return (
		<Card className="border-border/70 bg-card/60 flex w-full flex-col gap-5 rounded-2xl border p-6 shadow-xl backdrop-blur-xs">
			<CardContent className="flex flex-col gap-4 p-0">
				<CompaniesHeader activeCount={activeCount} atRiskCount={atRiskCount} />

				<CompaniesToolbar
					searchQuery={searchQuery}
					onSearchChange={handleSearchChange}
					columns={columns}
					onColumnsChange={setColumns}
				/>

				<CompaniesTable
					companies={paginatedCompanies}
					selectedIds={selectedIds}
					onToggleSelect={toggleSelect}
					onToggleSelectAll={toggleSelectAll}
					sortField={sortField}
					sortOrder={sortOrder}
					onSort={handleSort}
					columns={columns}
				/>

				<CompaniesTablePagination
					currentPage={currentPage}
					pageSize={pageSize}
					totalCount={filteredCompanies.length}
					onPageChange={handlePageChange}
					onPageSizeChange={handlePageSizeChange}
				/>
			</CardContent>
		</Card>
	)
}
