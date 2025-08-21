import React, { HTMLAttributes } from "react"
import { Box, ExternalLink, Info } from "lucide-react"
import Link from "next/link"
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

export const Table = ({ children, className, ...props }: HTMLAttributes<HTMLTableElement>) => (
	<div className="overflow-x-auto">
		<table className={cn("text-fg-secondary border-soft w-full min-w-[650px] table-auto border-separate border-spacing-0 overflow-hidden rounded-lg border", className)} {...props}>
			{children}
		</table>
	</div>
)

export const TableHeader = ({ children, className, ...props }: HTMLAttributes<HTMLTableSectionElement>) => (
	<thead className={cn("bg-base", className)} {...props}>
		{children}
	</thead>
)

export const TableBody = ({ children, className, ...props }: HTMLAttributes<HTMLTableSectionElement>) => (
	<tbody className={cn("", className)} {...props}>
		{children}
	</tbody>
)

export const TableHead = ({ children, className, ...props }: HTMLAttributes<HTMLTableCellElement>) => (
	<th className={cn("border-soft border-b px-2 py-3 text-start text-sm font-medium", className)} {...props}>
		{children}
	</th>
)

export const TableRow = ({ children, className, ...props }: HTMLAttributes<HTMLTableRowElement>) => (
	<tr className={cn("", className)} {...props}>
		{children}
	</tr>
)

export const TableCell = ({ children, className, colSpan, ...props }: HTMLAttributes<HTMLTableCellElement> & { colSpan?: number }) => (
	<td className={cn("px-2 py-3 text-sm", className)} colSpan={colSpan} {...props}>
		{children}
	</td>
)

export const DescriptionTooltip = ({ description }: { description: string }) => {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Info className="text-primary size-4" />
			</TooltipTrigger>
			<TooltipContent>{description}</TooltipContent>
		</Tooltip>
	)
}

export const PropsTable = ({ title, data, externalReference }: { title?: string; data: PropsData[]; externalReference?: string }) => {
	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-center gap-2 p-2">
				<span className="text-fg-tertiary bg-bg rounded-md p-1">
					<Box size={16} />
				</span>
				<span className="text-fg-secondary text-sm font-medium">{`<${title}>`}</span>
			</div>
			<Table>
				<TableHeader>
					<TableRow className="bg-base">
						<TableHead className="w-[200px]">Name</TableHead>
						<TableHead className="w-[140px]">Default</TableHead>
						<TableHead>Values</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody className="[&>tr:nth-child(odd)]:bg-fill1 [&>tr:nth-child(even)]:bg-base">
					{data.map((prop) => (
						<TableRow key={prop.name}>
							<TableCell className="w-[200px]">
								<span className="flex items-center gap-2 whitespace-nowrap">
									<DescriptionTooltip description={prop.description} />
									{prop.name}
									{prop.required && <span className="text-primary ml-1">*</span>}
								</span>
							</TableCell>
							<TableCell className="w-[140px]">
								<Badge variant="soft" size="20">
									{prop.defaultValue ?? "-"}
								</Badge>
							</TableCell>

							<TableCell className="grow">
								<span className="flex flex-wrap gap-1">
									{prop.values?.map((value) => (
										<Badge key={value} variant="neutral" size="20">
											{value}
										</Badge>
									))}
								</span>
							</TableCell>
						</TableRow>
					))}
					{externalReference && (
						<TableRow>
							<TableCell className="max-w-[150px]">
								<Link href={externalReference} className="text-primary flex items-center gap-2 text-sm font-medium" target="_blank" rel="noopener noreferrer">
									<ExternalLink size={16} />
									<span className="flex-1">External Reference</span>
								</Link>
							</TableCell>
							<TableCell className="max-w-[120px]">
								<Badge variant="soft" size="20">
									-
								</Badge>
							</TableCell>
							<TableCell>
								<Badge variant="neutral" size="20">
									-
								</Badge>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	)
}
