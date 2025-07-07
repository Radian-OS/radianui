import React, { HTMLAttributes } from "react"
import { Box, Info } from "lucide-react"
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
	<div className="no-scrollbar overflow-x-scroll">
		<table className={cn("text-text-secondary border-soft w-full table-fixed border-separate border-spacing-0 overflow-hidden rounded-lg border", className)} {...props}>
			{children}
		</table>
	</div>
)

export const TableHeader = ({ children, className, ...props }: HTMLAttributes<HTMLTableSectionElement>) => (
	<thead className={cn("bg-bg-base", className)} {...props}>
		{children}
	</thead>
)

export const TableBody = ({ children, className, ...props }: HTMLAttributes<HTMLTableSectionElement>) => (
	<tbody className={cn("", className)} {...props}>
		{children}
	</tbody>
)

export const TableHead = ({ children, className, ...props }: HTMLAttributes<HTMLTableCellElement>) => (
	<th className={cn("border-soft border-b px-2 py-3 text-start text-[13px] text-sm font-medium first:rounded-tl-xl last:rounded-tr-xl", className)} {...props}>
		{children}
	</th>
)

export const TableRow = ({ children, className, ...props }: HTMLAttributes<HTMLTableRowElement>) => (
	<tr className={cn("even:bg-fill-level1", className)} {...props}>
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

export const PropsTable = ({ title, data, externalUrl }: { title?: string; data: PropsData[]; externalUrl?: string }) => {
	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-center gap-2 p-2">
				<span className="text-text-tertiary p-1">
					<Box size={16} />
				</span>
				<span className="text-text-secondary text-sm font-medium">{`<${title}>`}</span>
			</div>
			<Table>
				<TableHeader>
					<TableRow>
						{["Name", "Default", "Values"].map((item) => (
							<TableHead key={item}>{item}</TableHead>
						))}
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.map((prop) => (
						<TableRow key={prop.name}>
							<TableCell>
								<span className="flex items-center gap-2">
									<DescriptionTooltip description={prop.description} />
									{prop.name}
									{prop.required && <span className="text-primary ml-1">*</span>}
								</span>
							</TableCell>
							<TableCell>
								<Badge variant="soft" size="20">
									{prop.defaultValue ?? "-"}
								</Badge>
							</TableCell>

							<TableCell>
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
					{externalUrl && (
						<TableRow>
							<TableCell colSpan={3} className="text-center">
								<Link href={externalUrl} className="text-primary font-medium hover:underline" target="_blank" rel="noopener noreferrer">
									View all props →
								</Link>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	)
}
