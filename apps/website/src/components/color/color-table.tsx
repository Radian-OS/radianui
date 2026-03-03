"use client"

import React from "react"
import { Palette } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"
import { Badge } from "@/registry/ui/badge"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/registry/ui/table"

export type ColorData = {
	token: string
	dark?: string
	light?: string
	usage?: string
	isDark?: boolean
}

export const ColorTable = ({ data }: { data: ColorData[] }) => {
	const isDark = useTheme()

	return (
		<div className="flex flex-col gap-2">
			<div className="overflow-x-auto">
				<Table className="text-fg-secondary border-border w-full min-w-[650px] table-auto border-separate border-spacing-0 overflow-hidden rounded-lg border">
					<TableHeader className="bg-fill1">
						<TableRow className="bg-fill1">
							<TableHead className="border-border w-[160px] border-b border-r px-2 py-3 text-start text-sm font-medium">
								Token
							</TableHead>
							<TableHead className="border-border w-[150px] border-b border-r px-2 py-3 text-start text-sm font-medium">
								Hex Value
							</TableHead>
							<TableHead className="border-border border-b px-2 py-3 text-start text-sm font-medium">
								Usage
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody className="">
						{data.map((prop) => (
							<TableRow key={prop.token} className="last:[&>td]:border-b-0">
								<TableCell className="border-soft w-[160px] border-b border-r px-2 py-3 text-sm">
									<span className="flex items-center gap-2 whitespace-nowrap">
										<Badge variant="outline" color="neutral" size="20">
											<Palette size="14" /> {prop.token}
										</Badge>
									</span>
								</TableCell>
								<TableCell className="border-soft w-[150px] border-b border-r px-2 py-3 text-sm">
									<div className="flex items-center gap-2">
										<span
											className="border-border inline-block h-5 w-5 rounded-sm border"
											style={{
												backgroundColor: isDark ? prop.dark : prop.light,
											}}></span>{" "}
										{isDark ? prop.dark : prop.light}
									</div>
								</TableCell>

								<TableCell className="grow border-b px-2 py-3 text-[13px]">
									<span>{prop.usage}</span>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}
