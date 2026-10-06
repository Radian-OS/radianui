"use client"

import React, { useMemo, useState } from "react"
import { Card, CardContent } from "@/styles/default/ui/card"
import { CourseTable, type SortField, type SortOrder } from "./course-table"
import { CourseTableHeader } from "./course-table-header"
import { CourseTablePagination } from "./course-table-pagination"
import { CourseTableTabs, type TabKey } from "./course-table-tabs"
import { CourseTableToolbar } from "./course-table-toolbar"
import { COURSES_DATA } from "./types"

export function CourseCatalogView() {
	const [activeTab, setActiveTab] = useState<TabKey>("all")
	const [selectedCategory, setSelectedCategory] = useState<string>("all")
	const [searchQuery, setSearchQuery] = useState<string>("")
	const [sortField, setSortField] = useState<SortField | null>("title")
	const [sortOrder, setSortOrder] = useState<SortOrder>("asc")
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [pageSize, setPageSize] = useState<number>(8)

	// Counts for tabs
	const counts = useMemo(() => {
		return {
			all: COURSES_DATA.length,
			published: COURSES_DATA.filter((c) => c.status === "published").length,
			draft: COURSES_DATA.filter((c) => c.status === "draft").length,
			archived: COURSES_DATA.filter((c) => c.status === "archived").length,
		}
	}, [])

	// Filter courses
	const filteredCourses = useMemo(() => {
		return COURSES_DATA.filter((course) => {
			// Tab Filter
			if (activeTab !== "all" && course.status !== activeTab) {
				return false
			}

			// Category Filter
			if (selectedCategory !== "all" && course.category !== selectedCategory) {
				return false
			}

			// Search Query Filter
			if (searchQuery.trim()) {
				const query = searchQuery.toLowerCase().trim()
				const matchesTitle = course.title.toLowerCase().includes(query)
				const matchesInstructor = course.instructor
					.toLowerCase()
					.includes(query)
				const matchesCategory = course.category.toLowerCase().includes(query)
				const matchesUrgency = course.urgency.toLowerCase().includes(query)
				if (
					!matchesTitle &&
					!matchesInstructor &&
					!matchesCategory &&
					!matchesUrgency
				) {
					return false
				}
			}

			return true
		})
	}, [activeTab, selectedCategory, searchQuery])

	// Sort courses
	const sortedCourses = useMemo(() => {
		if (!sortField) return filteredCourses

		return [...filteredCourses].sort((a, b) => {
			let aVal: any = a[sortField]
			let bVal: any = b[sortField]

			if (aVal === null || aVal === undefined) aVal = -1
			if (bVal === null || bVal === undefined) bVal = -1

			if (typeof aVal === "string") {
				return sortOrder === "asc"
					? aVal.localeCompare(bVal)
					: bVal.localeCompare(aVal)
			}

			return sortOrder === "asc" ? aVal - bVal : bVal - aVal
		})
	}, [filteredCourses, sortField, sortOrder])

	// Paginate courses
	const paginatedCourses = useMemo(() => {
		const startIndex = (currentPage - 1) * pageSize
		return sortedCourses.slice(startIndex, startIndex + pageSize)
	}, [sortedCourses, currentPage, pageSize])

	const handleSort = (field: SortField) => {
		if (sortField === field) {
			setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
		} else {
			setSortField(field)
			setSortOrder("asc")
		}
	}

	const handleTabChange = (tab: TabKey) => {
		setActiveTab(tab)
		setCurrentPage(1)
	}

	const handleCategoryChange = (cat: string) => {
		setSelectedCategory(cat)
		setCurrentPage(1)
	}

	const handleSearchChange = (query: string) => {
		setSearchQuery(query)
		setCurrentPage(1)
	}

	const handlePageSizeChange = (size: number) => {
		setPageSize(size)
		setCurrentPage(1)
	}

	return (
		<Card className="border-border/70 bg-card/60 flex w-full flex-col gap-5 rounded-2xl border p-6 shadow-xl backdrop-blur-xs">
			<CardContent className="flex flex-col gap-4 p-0">
				<CourseTableHeader
					publishedCount={counts.published}
					draftCount={counts.draft}
				/>

				<CourseTableTabs
					activeTab={activeTab}
					onTabChange={handleTabChange}
					counts={counts}
				/>

				<CourseTableToolbar
					searchQuery={searchQuery}
					onSearchChange={handleSearchChange}
					selectedCategory={selectedCategory}
					onCategoryChange={handleCategoryChange}
				/>

				<CourseTable
					courses={paginatedCourses}
					sortField={sortField}
					sortOrder={sortOrder}
					onSort={handleSort}
				/>

				<CourseTablePagination
					currentPage={currentPage}
					pageSize={pageSize}
					totalCount={filteredCourses.length}
					onPageChange={setCurrentPage}
					onPageSizeChange={handlePageSizeChange}
				/>
			</CardContent>
		</Card>
	)
}
