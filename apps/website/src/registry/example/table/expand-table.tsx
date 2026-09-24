"use client"

import { Fragment } from "react"
import {
	type ColumnDef,
	columnSizingFeature,
	columnVisibilityFeature,
	createExpandedRowModel,
	flexRender,
	rowExpandingFeature,
	rowSelectionFeature,
	tableFeatures,
	useTable,
} from "@tanstack/react-table"
import { ChevronDownIcon, ChevronUpIcon, InfoIcon } from "lucide-react"
import { Badge } from "@/registry/ui/badge"
import { IconButton } from "@/registry/ui/button"
import { Checkbox } from "@/registry/ui/checkbox"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/registry/ui/table"

const features = tableFeatures({
	rowExpandingFeature,
	rowSelectionFeature,
	columnSizingFeature,
	columnVisibilityFeature,
	expandedRowModel: createExpandedRowModel(),
})

type Item = {
	id: string
	name: string
	email: string
	status: "Active" | "Inactive" | "Pending"
	balance: number
	note?: string
}

const data: Item[] = [
	{
		id: "itm-003",
		name: "Carla Martinez",
		email: "carla.martinez@example.com",
		status: "Pending",
		balance: 320,
		note: "Carla recently created her account and is currently in pending status due to incomplete verification steps. Her balance reflects initial usage and indicates strong interest in our services. She has interacted with the onboarding tutorials and provided positive comments regarding clarity and design.",
	},
	{
		id: "itm-006",
		name: "Frank Wilson",
		email: "frank.wilson@example.com",
		status: "Inactive",
		balance: 50,
		note: "Frank account has been inactive for a while, though he retains a small remaining balance. In the past, he used our services regularly, but over time his engagement declined. We have not received recent feedback from him, making it unclear why he reduced activity.",
	},
	{
		id: "itm-007",
		name: "Grace Kim",
		email: "grace.kim@example.com",
		status: "Pending",
		balance: 200,
		note: "Grace is in pending status because her account verification is not yet complete. She has shown strong interest by exploring features and making initial deposits. Her balance indicates a willingness to invest further once her profile is fully activated. Grace values detailed explanations and clear step-by-step instructions.",
	},
	{
		id: "itm-008",
		name: "Henry Adams",
		email: "henry.adams@example.com",
		status: "Active",
		balance: 980,
		note: "Henry has been active for several months and regularly participates in both basic and advanced features. His balance reflects steady engagement and ongoing use of premium services. Henry values clear, fast support responses and has previously praised the helpfulness of our customer service team.",
	},
	{
		id: "itm-009",
		name: "Ivy Chen",
		email: "ivy.chen@example.com",
		status: "Active",
		balance: 640,
		note: "Ivy is a frequent buyer who consistently maintains activity on her account. She actively engages with offers and promotions, often using referral codes to share with friends and colleagues.",
	},
	{
		id: "itm-010",
		name: "Jack Thompson",
		email: "jack.thompson@example.com",
		status: "Inactive",
		balance: 0,
		note: "Jack account is currently inactive with no remaining balance. He used the platform actively during his first year but later became less engaged.",
	},
]

const columns: ColumnDef<typeof features, Item>[] = [
	{
		id: "expander",
		header: () => null,
		cell: ({ row }) => {
			return row.getCanExpand() ? (
				<IconButton
					{...{
						className: "size-7 shadow-none text-fg-secondary",
						onClick: row.getToggleExpandedHandler(),
						"aria-expanded": row.getIsExpanded(),
						"aria-label": row.getIsExpanded()
							? `Collapse details for ${row.original.name}`
							: `Expand details for ${row.original.name}`,
						variant: "ghost",
						color: "neutral",
					}}>
					{row.getIsExpanded() ? (
						<ChevronUpIcon
							className="opacity-60"
							size={16}
							aria-hidden="true"
						/>
					) : (
						<ChevronDownIcon
							className="opacity-60"
							size={16}
							aria-hidden="true"
						/>
					)}
				</IconButton>
			) : undefined
		},
	},
	{
		id: "select",
		header: ({ table }) => (
			<div className="flex items-center justify-center">
				<Checkbox
					size="sm"
					className="flex items-center justify-start"
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && "indeterminate")
					}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
					aria-label="Select all"
				/>
			</div>
		),
		cell: ({ row }) => (
			<div className="flex items-center justify-center">
				<Checkbox
					size="sm"
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label="Select row"
				/>
			</div>
		),
	},
	{
		header: "Name",
		accessorKey: "name",
		cell: ({ row }) => (
			<div className="font-medium">{row.getValue("name")}</div>
		),
	},
	{
		header: "Email",
		accessorKey: "email",
	},
	{
		header: "Status",
		accessorKey: "status",
		cell: ({ row }) => (
			<Badge
				color={row.getValue("status") === "Inactive" ? "neutral" : undefined}>
				{row.getValue("status")}
			</Badge>
		),
	},
	{
		header: () => <div className="text-right">Balance</div>,
		accessorKey: "balance",
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue("balance"))
			const formatted = new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "USD",
			}).format(amount)
			return <div className="text-right">{formatted}</div>
		},
	},
]

export default function ExpandTable() {
	const table = useTable({
		features,
		data,
		columns,
		getRowCanExpand: (row) => Boolean(row.original.note),
	})

	return (
		<div className="w-full">
			<div className="overflow-hidden rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id} className="hover:bg-transparent">
								{headerGroup.headers.map((header) => {
									return (
										<TableHead
											style={{ width: `${header.getSize()}px` }}
											key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
													)}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<Fragment key={row.id}>
									<TableRow
										key={row.id}
										data-state={row.getIsSelected() && "selected"}>
										{row.getVisibleCells().map((cell) => (
											<TableCell
												key={cell.id}
												className="whitespace-nowrap [&:has([aria-expanded])]:w-px [&:has([aria-expanded])]:py-0 [&:has([aria-expanded])]:pr-0">
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</TableCell>
										))}
									</TableRow>
									{row.getIsExpanded() && (
										<TableRow>
											<TableCell colSpan={row.getVisibleCells().length}>
												<div className="text-fg flex items-start py-2">
													<span
														className="me-3 mt-0.5 flex w-7 shrink-0 justify-center"
														aria-hidden="true">
														<InfoIcon className="opacity-60" size={16} />
													</span>
													<p className="text-sm">{row.original.note}</p>
												</div>
											</TableCell>
										</TableRow>
									)}
								</Fragment>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center">
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}
