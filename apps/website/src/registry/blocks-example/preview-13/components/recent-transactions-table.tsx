"use client"

import * as React from "react"
import { useState } from "react"
import { ArrowUpDown, Search } from "lucide-react"

import { IconSlot } from "@/registry/icon/icon-library"
import { Badge, BadgeDot } from "@/registry/ui/badge"
import { Button, IconButton } from "@/registry/ui/button"
import { Card } from "@/registry/ui/card"
import { Checkbox } from "@/registry/ui/checkbox"
import { Input, InputWrapper } from "@/registry/ui/input"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/registry/ui/table"

import { RECENT_TRANSACTIONS } from "./data"
import type { TransactionStatus } from "./types"

export function RecentTransactionsTable() {
	const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
	const [searchQuery, setSearchQuery] = useState("")

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

	const getStatusBadge = (status: TransactionStatus) => {
		switch (status) {
			case "Success":
				return (
					<Badge
						variant="soft"
						color="success"
						size="sm"
						className="gap-1 px-2.5 py-0.5 text-xs font-medium">
						<BadgeDot className="bg-success" />
						<span>Success</span>
					</Badge>
				)
			case "Pending":
				return (
					<Badge
						variant="soft"
						color="warning"
						size="sm"
						className="gap-1 px-2.5 py-0.5 text-xs font-medium">
						<BadgeDot className="bg-warning" />
						<span>Pending</span>
					</Badge>
				)
			case "Refunded":
				return (
					<Badge
						variant="soft"
						color="neutral"
						size="sm"
						className="gap-1 px-2.5 py-0.5 text-xs font-medium">
						<BadgeDot className="bg-fg-tertiary" />
						<span>Refunded</span>
					</Badge>
				)
		}
	}

	return (
		<Card className="bg-fill1 border-border/70 flex flex-col justify-between gap-0 p-0.5 pb-1 shadow-2xs">
			{/* Outer Card Top Header */}
			<div className="flex flex-col gap-3 px-3 pt-1.5 pb-1.5 sm:flex-row sm:items-center sm:justify-between">
				<div className="font-heading text-fg-secondary flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase">
					<span>RECENT TRANSACTIONS</span>
					<IconSlot slot="info" className="text-fg-secondary size-4" />
				</div>

				<div className="flex items-center gap-2">
					{/* Search Transactions Input using registry InputWrapper & Input */}
					<InputWrapper
						size="sm"
						className="border-border/70 bg-elevation-level1 h-8 w-60 shadow-2xs">
						<Search className="text-fg-tertiary size-4 shrink-0" />
						<Input
							type="search"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder="Search transactions..."
							className="min-w-0 flex-1 text-xs"
						/>
					</InputWrapper>

					{/* Add Transaction CTA */}
					<Button
						variant="strong"
						color="primary"
						size="sm"
						className="h-8 gap-1.5 px-3 text-xs font-semibold shadow-xs">
						<IconSlot slot="plus" className="size-4" />
						<span>Add Transaction</span>
					</Button>

					{/* More Options */}
					<IconButton
						variant="outline"
						color="neutral"
						size="sm"
						className="border-border/70 bg-elevation-level1 text-fg-secondary size-8 shadow-2xs"
						aria-label="More options">
						<IconSlot slot="threeDot" className="size-4 opacity-70" />
					</IconButton>
				</div>
			</div>

			{/* Inner White Box Table Container */}
			<Card className="bg-elevation-level1 border-border/60 [scrollbar-width:none] overflow-x-auto border p-1 shadow-2xs [-ms-overflow-style:none] sm:p-1.5 [&::-webkit-scrollbar]:hidden">
				<Table>
					<TableHeader className="[&_tr]:border-none">
						<TableRow className="border-none hover:bg-transparent">
							<TableHead className="w-10 bg-transparent px-3 text-center">
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
							<TableHead className="font-heading text-fg-secondary bg-transparent px-3 text-xs font-semibold tracking-wider uppercase">
								<div className="flex items-center gap-1.5">
									<span>ID</span>
									<ArrowUpDown
										size={16}
										className="text-fg-secondary size-4 shrink-0 opacity-80"
									/>
								</div>
							</TableHead>
							<TableHead className="font-heading text-fg-secondary bg-transparent px-3 text-xs font-semibold tracking-wider uppercase">
								<div className="flex items-center gap-1.5">
									<span>CUSTOMER</span>
									<ArrowUpDown
										size={16}
										className="text-fg-secondary size-4 shrink-0 opacity-80"
									/>
								</div>
							</TableHead>
							<TableHead className="font-heading text-fg-secondary bg-transparent px-3 text-xs font-semibold tracking-wider uppercase">
								<div className="flex items-center gap-1.5">
									<span>PRODUCT</span>
									<ArrowUpDown
										size={16}
										className="text-fg-secondary size-4 shrink-0 opacity-80"
									/>
								</div>
							</TableHead>
							<TableHead className="font-heading text-fg-secondary bg-transparent px-3 text-xs font-semibold tracking-wider uppercase">
								<div className="flex items-center gap-1.5">
									<span>STATUS</span>
									<ArrowUpDown
										size={16}
										className="text-fg-secondary size-4 shrink-0 opacity-80"
									/>
								</div>
							</TableHead>
							<TableHead className="font-heading text-fg-secondary bg-transparent px-3 text-xs font-semibold tracking-wider uppercase">
								<div className="flex items-center gap-1.5">
									<span>QTY</span>
									<ArrowUpDown
										size={16}
										className="text-fg-secondary size-4 shrink-0 opacity-80"
									/>
								</div>
							</TableHead>
							<TableHead className="font-heading text-fg-secondary bg-transparent px-3 text-xs font-semibold tracking-wider uppercase">
								<div className="flex items-center gap-1.5">
									<span>UNIT PRICE</span>
									<ArrowUpDown
										size={16}
										className="text-fg-secondary size-4 shrink-0 opacity-80"
									/>
								</div>
							</TableHead>
							<TableHead className="font-heading text-fg-secondary bg-transparent px-3 text-xs font-semibold tracking-wider uppercase">
								<div className="flex items-center gap-1.5">
									<span>TOTAL REVENUE</span>
									<ArrowUpDown
										size={16}
										className="text-fg-secondary size-4 shrink-0 opacity-80"
									/>
								</div>
							</TableHead>
							<TableHead className="font-heading text-fg-secondary bg-transparent px-3 pr-4 text-right text-xs font-semibold tracking-wider uppercase">
								ACTIONS
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody className="[&_tr]:border-none">
						{filteredTransactions.map((tx) => {
							const isChecked = selectedRows.has(tx.id)

							return (
								<TableRow
									key={tx.id}
									className="hover:bg-fill1/60 h-11 border-none transition-colors">
									<TableCell className="px-3 text-center">
										<Checkbox
											size="sm"
											checked={isChecked}
											onCheckedChange={(checked) =>
												handleSelectRow(tx.id, Boolean(checked))
											}
											aria-label={`Select ${tx.id}`}
										/>
									</TableCell>
									<TableCell className="text-fg-secondary px-3 font-mono text-sm">
										{tx.id}
									</TableCell>
									<TableCell className="text-fg px-3 text-sm font-semibold whitespace-nowrap">
										{tx.customer}
									</TableCell>
									<TableCell className="text-fg-secondary px-3 text-sm whitespace-nowrap">
										{tx.product}
									</TableCell>
									<TableCell className="px-3">
										{getStatusBadge(tx.status)}
									</TableCell>
									<TableCell className="text-fg-secondary px-3 font-mono text-sm">
										{tx.qty}
									</TableCell>
									<TableCell className="text-fg-secondary px-3 font-mono text-sm">
										{tx.unitPrice}
									</TableCell>
									<TableCell className="font-heading text-fg px-3 font-mono text-sm font-semibold">
										{tx.totalRevenue}
									</TableCell>
									<TableCell className="px-3 pr-4 text-right">
										<IconButton
											variant="outline"
											color="neutral"
											size="xs"
											className="border-border/50 bg-fill1/80 text-fg-secondary hover:text-fg size-7 shadow-2xs"
											aria-label="Actions">
											<IconSlot slot="threeDot" className="size-4 opacity-70" />
										</IconButton>
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
