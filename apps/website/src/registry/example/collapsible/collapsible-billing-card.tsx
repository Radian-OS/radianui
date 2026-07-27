"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/registry/ui/badge"
import { IconButton } from "@/registry/ui/button"
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/registry/ui/collapsible"
import { Progress } from "@/registry/ui/progress"

const LINE_ITEMS = [
	{ label: "User Signups", amount: "$20.20", bold: true },
	{ label: "Server Uptime", amount: "$14.25", bold: false },
	{ label: "Page Views", amount: "$12.75", bold: false },
	{ label: "Error Logs", amount: "$2.75", bold: false },
	{ label: "Database Queries", amount: "$31.00", bold: false },
	{ label: "Cache Hits", amount: "$5.25", bold: false },
	{ label: "Email Sends", amount: "$13.80", bold: false },
]

const ALWAYS_VISIBLE = LINE_ITEMS.slice(0, 3)
const COLLAPSIBLE_ITEMS = LINE_ITEMS.slice(3)

export default function CollapsibleBillingCard() {
	const [open, setOpen] = useState(false)

	return (
		<div className="w-100">
			<Collapsible open={open} onOpenChange={setOpen}>
				<div className="border-soft bg-bg flex flex-col gap-5 overflow-hidden rounded-2xl border p-5">
					{/* Header */}
					<div className="flex items-center justify-between">
						<span className="text-fg text-base font-semibold">
							7 days remaining in cycle
						</span>
						<Badge variant="soft" color="primary" size="20">
							Billing
						</Badge>
					</div>

					<div className="flex flex-col gap-4">
						{/* Credits row */}
						<div className="flex flex-col">
							<div className="flex items-start justify-between gap-1">
								<span className="text-fg-secondary text-xs">
									Included Credits
								</span>
								<span className="text-fg-secondary text-xs">On-Demand</span>
							</div>
							<div className="flex items-end justify-between">
								<span className="text-fg text-xl font-semibold">
									$100.00 / $150
								</span>
								<span className="text-fg text-xl font-bold">$0</span>
							</div>
							{/* Progress bar */}
							<Progress value={67} />
						</div>

						{/* Always-visible line items */}
						<div className={cn("flex flex-col gap-1", !open && "relative")}>
							{ALWAYS_VISIBLE.map((item) => (
								<div
									key={item.label}
									className="flex items-center justify-between">
									<span
										className={cn(
											"text-fg-secondary text-sm",
											item.bold && "text-fg font-semibold"
										)}>
										{item.label}
									</span>
									<span
										className={cn(
											"text-fg-secondary text-sm",
											item.bold && "text-fg font-semibold"
										)}>
										{item.amount}
									</span>
								</div>
							))}

							{/* Fade mask when collapsed */}
							{!open && (
								<div className="from-elevation-level1 pointer-events-none absolute -bottom-5 -left-5 -right-5 h-10 bg-gradient-to-t to-transparent" />
							)}
						</div>

						{/* Collapsible extra items */}
						<CollapsibleContent>
							<div className="mt-1 flex flex-col gap-1">
								{COLLAPSIBLE_ITEMS.map((item) => (
									<div
										key={item.label}
										className="flex items-center justify-between">
										<span className="text-fg-secondary text-sm">
											{item.label}
										</span>
										<span className="text-fg-secondary text-sm">
											{item.amount}
										</span>
									</div>
								))}
							</div>
						</CollapsibleContent>
					</div>
				</div>

				{/* Trigger button */}
				<div className="-mt-4 flex justify-center">
					<CollapsibleTrigger asChild>
						<IconButton
							color="neutral"
							variant="outline"
							className="hover:[background:linear-gradient(var(--color-fill1-alpha),var(--color-fill1-alpha)),linear-gradient(var(--color-bg),var(--color-bg))]">
							<ChevronDown
								className={cn(
									"size-5 transition-transform duration-200",
									open && "rotate-180"
								)}
							/>
						</IconButton>
					</CollapsibleTrigger>
				</div>
			</Collapsible>
		</div>
	)
}
