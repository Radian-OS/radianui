"use client"

import React, { useState } from "react"
import { Check, ChevronsUpDown, MoreHorizontal } from "lucide-react"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/styles/default/ui/table"
import { Checkbox } from "@/styles/default/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/styles/default/ui/avatar"
import { Button } from "@/styles/default/ui/button"
import type { Order } from "./types"

interface OrdersTableProps {
	orders: Order[]
}

export function OrdersTable({ orders }: OrdersTableProps) {
	const [selectedRows, setSelectedRows] = useState<string[]>([])

	const allSelected = orders.length > 0 && selectedRows.length === orders.length

	function toggleSelectAll() {
		if (allSelected) {
			setSelectedRows([])
		} else {
			setSelectedRows(orders.map((o) => o.id))
		}
	}

	function toggleRow(id: string) {
		setSelectedRows((prev) =>
			prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
		)
	}

	return (
		<div className="border-border bg-card w-full overflow-hidden rounded-xl border shadow-xs">
			<Table>
				<TableHeader>
					<TableRow className="border-border bg-muted/20 hover:bg-muted/30 border-b">
						<TableHead className="w-12 px-4">
							<Checkbox
								checked={allSelected}
								onCheckedChange={toggleSelectAll}
								aria-label="Select all"
							/>
						</TableHead>
						<TableHead className="text-fg-secondary text-xs font-semibold">
							<div className="flex items-center gap-1.5">
								<span>ID</span>
								<ChevronsUpDown className="size-3.5" />
							</div>
						</TableHead>
						<TableHead className="text-fg-secondary text-xs font-semibold">
							<div className="flex items-center gap-1.5">
								<span>Date</span>
								<ChevronsUpDown className="size-3.5" />
							</div>
						</TableHead>
						<TableHead className="text-fg-secondary text-xs font-semibold">
							<div className="flex items-center gap-1.5">
								<span>Status</span>
								<ChevronsUpDown className="size-3.5" />
							</div>
						</TableHead>
						<TableHead className="text-fg-secondary text-xs font-semibold">
							<div className="flex items-center gap-1.5">
								<span>Customer</span>
								<ChevronsUpDown className="size-3.5" />
							</div>
						</TableHead>
						<TableHead className="text-fg-secondary text-xs font-semibold">
							<div className="flex items-center gap-1.5">
								<span>Purchased</span>
								<ChevronsUpDown className="size-3.5" />
							</div>
						</TableHead>
						<TableHead className="text-fg-secondary text-xs font-semibold">
							<div className="flex items-center gap-1.5">
								<span>Revenue</span>
								<ChevronsUpDown className="size-3.5" />
							</div>
						</TableHead>
						<TableHead className="w-10 px-2" />
					</TableRow>
				</TableHeader>

				<TableBody>
					{orders.map((order) => {
						const isSelected = selectedRows.includes(order.id)
						const initials = order.customer.name
							.split(" ")
							.map((n) => n[0])
							.join("")
							.toUpperCase()

						return (
							<TableRow
								key={order.id}
								data-state={isSelected ? "selected" : undefined}
								className="border-border/60 hover:bg-muted/40 border-b transition-colors">
								{/* Checkbox */}
								<TableCell className="px-4">
									<Checkbox
										checked={isSelected}
										onCheckedChange={() => toggleRow(order.id)}
										aria-label={`Select ${order.id}`}
									/>
								</TableCell>

								{/* Order ID */}
								<TableCell className="text-fg-secondary text-xs font-medium">
									{order.id}
								</TableCell>

								{/* Date */}
								<TableCell className="text-fg text-xs">{order.date}</TableCell>

								{/* Status Badge */}
								<TableCell>
									<span className="border-success-border/20 bg-success-accent text-success-text inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium">
										<Check className="size-3 stroke-[2.5]" />
										<span>{order.status}</span>
									</span>
								</TableCell>

								{/* Customer (Avatar + Name) */}
								<TableCell>
									<div className="flex items-center gap-2.5">
										<Avatar
											size="24"
											rounded="circle"
											className="border-border border">
											<AvatarImage
												src={order.customer.avatarUrl}
												alt={order.customer.name}
											/>
											<AvatarFallback className="text-[10px] font-medium">
												{initials}
											</AvatarFallback>
										</Avatar>
										<span className="text-fg text-xs font-medium">
											{order.customer.name}
										</span>
									</div>
								</TableCell>

								{/* Purchased Item */}
								<TableCell className="text-fg max-w-xs truncate text-xs">
									{order.purchased}
								</TableCell>

								{/* Revenue */}
								<TableCell className="text-fg text-xs font-medium">
									{order.revenue}
								</TableCell>

								{/* Actions Menu */}
								<TableCell className="px-2">
									<Button
										variant="ghost"
										color="neutral"
										size="32"
										className="text-fg-secondary hover:text-fg size-8 p-0">
										<MoreHorizontal className="size-4" />
									</Button>
								</TableCell>
							</TableRow>
						)
					})}
				</TableBody>
			</Table>
		</div>
	)
}
