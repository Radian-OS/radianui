import React, { HTMLAttributes } from "react"
import { Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/registry/ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/registry/ui/tooltip"

export type PropsData = {
	name: string
	defaultValue?: string
	values?: string[]
	description: string
	required?: boolean
}

export const Table = ({
	children,
	className,
	...props
}: HTMLAttributes<HTMLTableElement>) => (
	<div className="overflow-x-auto">
		<table
			className={cn(
				"text-fg-secondary border-soft w-full min-w-[650px] table-auto border-separate border-spacing-0 overflow-hidden rounded-lg border",
				className
			)}
			{...props}>
			{children}
		</table>
	</div>
)

export const TableHeader = ({
	children,
	className,
	...props
}: HTMLAttributes<HTMLTableSectionElement>) => (
	<thead className={cn("bg-bg", className)} {...props}>
		{children}
	</thead>
)

export const TableBody = ({
	children,
	className,
	...props
}: HTMLAttributes<HTMLTableSectionElement>) => (
	<tbody className={cn("", className)} {...props}>
		{children}
	</tbody>
)

export const TableHead = ({
	children,
	className,
	...props
}: HTMLAttributes<HTMLTableCellElement>) => (
	<th
		className={cn(
			"border-soft border-b px-2 py-3 text-start text-sm font-medium",
			className
		)}
		{...props}>
		{children}
	</th>
)

export const TableRow = ({
	children,
	className,
	...props
}: HTMLAttributes<HTMLTableRowElement>) => (
	<tr className={cn("", className)} {...props}>
		{children}
	</tr>
)

export const TableCell = ({
	children,
	className,
	colSpan,
	...props
}: HTMLAttributes<HTMLTableCellElement> & { colSpan?: number }) => (
	<td
		className={cn("px-3 py-2.5 text-sm", className)}
		colSpan={colSpan}
		{...props}>
		{children}
	</td>
)

export const DescriptionTooltip = ({
	description,
}: {
	description: string
}) => {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Info className="text-primary-border size-4" />
			</TooltipTrigger>
			<TooltipContent className="text-wrap">{description}</TooltipContent>
		</Tooltip>
	)
}

export const PropsTable = ({ data }: { data: PropsData[] }) => {
	return (
		<Table className="mt-3">
			<TableHeader>
				<TableRow className="bg-fill1 text-fg">
					<TableHead className="w-[200px]">Prop</TableHead>
					<TableHead className="w-[140px]">Default</TableHead>
					<TableHead>Values</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody className="bg-bg [&>tr:not(:last-child)>td]:border-soft [&>tr:not(:last-child)>td]:border-b">
				{data?.map((prop) => (
					<TableRow key={prop.name}>
						<TableCell className="w-[200px]">
							<span className="text-fg flex items-center gap-2 whitespace-nowrap">
								<DescriptionTooltip description={prop.description} />
								{prop.name}
								{prop.required && <span className="text-primary ml-1">*</span>}
							</span>
						</TableCell>
						<TableCell className="w-[140px]">
							<Badge variant="strong" color="neutral" size="20">
								{prop.defaultValue ?? "-"}
							</Badge>
						</TableCell>

						<TableCell className="grow">
							<span className="flex flex-wrap gap-1">
								{prop.values?.map((value) => (
									<Badge key={value} variant="soft" color="neutral" size="20">
										{value}
									</Badge>
								))}
							</span>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}
