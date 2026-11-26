"use client"

import * as React from "react"
import { useState } from "react"

import { cn } from "@/lib/utils"

import { IconSlot } from "@/registry/icon/icon-library"
import { Badge, BadgeDot } from "@/components/ui/badge"
import { Button, IconButton } from "@/components/ui/button"
import { Card } from "@/registry/ui/card"
import { Checkbox } from "@/registry/ui/checkbox"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"
import { Input, InputWrapper } from "@/registry/ui/input"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/registry/ui/table"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip"

import { RECENT_TRANSACTIONS } from "./data"
import type { TransactionItem, TransactionStatus } from "./types"

type SortKey = keyof TransactionItem
type SortDir = "asc" | "desc"

const SORTABLE_COLUMNS: { key: SortKey; label: string }[] = [
	{ key: "id", label: "ID" },
	{ key: "customer", label: "CUSTOMER" },
	{ key: "product", label: "PRODUCT" },
	{ key: "status", label: "STATUS" },
	{ key: "qty", label: "QTY" },
	{ key: "unitPrice", label: "UNIT PRICE" },
	{ key: "totalRevenue", label: "TOTAL REVENUE" },
]

function parseSortableValue(
	item: TransactionItem,
	key: SortKey
): number | string {
	const value = item[key]
	if (typeof value === "number") return value
	if (key === "unitPrice" || key === "totalRevenue") {
		return Number(value.replace(/[^0-9.-]+/g, ""))
	}
	return value
}

export function RecentTransactionsTable() {
	const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
	const [searchQuery, setSearchQuery] = useState("")
	const [sortKey, setSortKey] = useState<SortKey | null>(null)
	const [sortDir, setSortDir] = useState<SortDir>("asc")

	const handleSort = (key: SortKey) => {
		if (sortKey === key) {
			if (sortDir === "asc") {
				setSortDir("desc")
			} else {
				setSortKey(null)
			}
		} else {
			setSortKey(key)
			setSortDir("asc")
		}
	}

	const handleSelectAll = (checked: boolean) => {
		if (checked) {
			setSelectedRows(new Set(RECENT_TRANSACTIONS.map((t) => t.id)))
		} else {
			setSelectedRows(new Set())
		}
	}

	const handleSelectRow = (id: string, checked: boolean) => {
		setSelectedRows((prev) => {
			const next = new Set(prev)
			if (checked) next.add(id)
			else next.delete(id)
			return next
		})
	}

	const filteredTransactions = RECENT_TRANSACTIONS.filter(
		(t) =>
			t.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
			t.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
			t.id.toLowerCase().includes(searchQuery.toLowerCase())
	)

	const sortedTransactions = React.useMemo(() => {
		if (!sortKey) return filteredTransactions
		return [...filteredTransactions].sort((a, b) => {
			const aVal = parseSortableValue(a, sortKey)
			const bVal = parseSortableValue(b, sortKey)
			const cmp =
				typeof aVal === "number" && typeof bVal === "number"
					? aVal - bVal
					: String(aVal).localeCompare(String(bVal))
			return sortDir === "asc" ? cmp : -cmp
		})
	}, [filteredTransactions, sortKey, sortDir])

	const getStatusBadge = (status: TransactionStatus) => {
		switch (status) {
			case "Success":
				return (
					<Badge color="success">
						<BadgeDot className="bg-success" />
						Success
					</Badge>
				)
			case "Pending":
				return (
					<Badge color="warning">
						<BadgeDot className="bg-warning" />
						Pending
					</Badge>
				)
			case "Refunded":
				return (
					<Badge color="neutral">
						<BadgeDot className="bg-fg-tertiary" />
						Refunded
					</Badge>
				)
		}
	}

	return (
		<Card className="bg-fill1 border-border/70 flex min-w-0 flex-col justify-between gap-0 overflow-hidden p-0.5 pb-1 shadow-2xs">
			{/* Outer Card Top Header */}
			<div className="flex flex-col gap-3 px-3 pt-1.5 pb-1.5 lg:flex-row lg:items-center lg:justify-between">
				<div className="font-heading text-fg-secondary flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase">
					<span>RECENT TRANSACTIONS</span>
					<Tooltip>
						<TooltipTrigger asChild>
							<button
								type="button"
								className="text-fg-secondary hover:text-fg inline-flex cursor-pointer items-center transition-colors"
								aria-label="Recent transactions info">
								<IconSlot slot="info" className="size-4" />
							</button>
						</TooltipTrigger>
						<TooltipContent withArrow>
							Latest customer orders and payment statuses
						</TooltipContent>
					</Tooltip>
				</div>

				<div className="flex w-full flex-wrap items-center gap-2 lg:w-auto lg:flex-nowrap">
					{/* Search Transactions Input using registry InputWrapper & Input */}
					<InputWrapper className="w-full sm:w-52 md:w-60">
						<IconSlot slot="search" className="text-fg-tertiary size-4" />
						<Input
							type="search"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder="Search transactions..."
						/>
					</InputWrapper>

					{/* Add Transaction CTA */}
					<Button color="primary">
						<IconSlot slot="plus" />
						<span>Add Transaction</span>
					</Button>

					{/* More Options */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<IconButton
								variant="ghost"
								color="neutral"
								aria-label="More options">
								<IconSlot slot="threeDot" />
							</IconButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="center" className="w-40">
							<DropdownMenuItem>
								<IconSlot slot="file-text" />
								Export CSV
							</DropdownMenuItem>
							<DropdownMenuItem>
								<IconSlot slot="setting" />
								Table settings
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>

			{/* Inner White Box Table Container */}
			<Card className="bg-elevation-level1 border-border/60 min-w-0 [scrollbar-width:none] overflow-x-auto border p-1 shadow-2xs [-ms-overflow-style:none] sm:p-1.5 [&::-webkit-scrollbar]:hidden">
				<Table>
					<TableHeader>
						<TableRow className="border-border/60 border-b hover:bg-transparent">
							<TableHead className="w-10 bg-transparent text-center">
								<Checkbox
									size="sm"
									checked={
										selectedRows.size === RECENT_TRANSACTIONS.length &&
										RECENT_TRANSACTIONS.length > 0
									}
									onCheckedChange={(checked) =>
										handleSelectAll(Boolean(checked))
									}
									aria-label="Select all"
								/>
							</TableHead>
							{SORTABLE_COLUMNS.map((col) => {
								const isSorted = sortKey === col.key

								return (
									<TableHead
										key={col.key}
										className="text-fg-secondary bg-transparent font-semibold tracking-wider uppercase">
										<button
											type="button"
											onClick={() => handleSort(col.key)}
											className="group hover:text-fg flex cursor-pointer items-center gap-1.5 transition-colors select-none">
											<span>{col.label}</span>
											<IconSlot
												slot="chevrons-up-down"
												className="text-fg-secondary group-hover:text-fg size-4 shrink-0 opacity-80 transition-colors group-hover:opacity-100"
											/>
										</button>
									</TableHead>
								)
							})}
							<TableHead className="text-fg-secondary bg-transparent pr-4 text-right font-semibold tracking-wider uppercase">
								ACTIONS
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody className="[&_tr]:border-none">
						{sortedTransactions.map((tx) => {
							const isChecked = selectedRows.has(tx.id)

							return (
								<TableRow
									key={tx.id}
									className="hover:bg-fill1/60 border-none transition-colors">
									<TableCell className="text-center">
										<Checkbox
											size="sm"
											checked={isChecked}
											onCheckedChange={(checked) =>
												handleSelectRow(tx.id, Boolean(checked))
											}
											aria-label={`Select ${tx.id}`}
										/>
									</TableCell>
									<TableCell className="text-fg-secondary text-sm tabular-nums">
										{tx.id}
									</TableCell>
									<TableCell className="text-fg text-sm font-semibold whitespace-nowrap">
										{tx.customer}
									</TableCell>
									<TableCell className="text-fg-secondary text-sm whitespace-nowrap">
										{tx.product}
									</TableCell>
									<TableCell>{getStatusBadge(tx.status)}</TableCell>
									<TableCell className="text-fg-secondary text-sm tabular-nums">
										{tx.qty}
									</TableCell>
									<TableCell className="text-fg-secondary text-sm tabular-nums">
										{tx.unitPrice}
									</TableCell>
									<TableCell className="text-fg text-sm font-semibold tabular-nums">
										{tx.totalRevenue}
									</TableCell>
									<TableCell className="pr-4 text-right">
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<IconButton
													variant="outline"
													color="neutral"
													aria-label="Actions">
													<IconSlot slot="threeDot" />
												</IconButton>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="center" className="w-40">
												<DropdownMenuItem>
													<IconSlot slot="file-text" />
													View details
												</DropdownMenuItem>
												<DropdownMenuItem>
													<IconSlot slot="receipt" />
													Download receipt
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							)
						})}
					</TableBody>
				</Table>
			</Card>
		</Card>
	)
}
