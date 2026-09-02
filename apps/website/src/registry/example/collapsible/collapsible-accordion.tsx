"use client"

import { useState } from "react"
import { ChevronDown, Pizza } from "lucide-react"
import { cn } from "@/lib/utils"
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/registry/ui/collapsible"

const ITEMS = [
	{
		id: "1",
		question: "How to make pizza?",
		answer:
			"Preheat your oven to 475°F. Roll out pizza dough on a floured surface. Spread tomato sauce evenly, add mozzarella and your favorite toppings.",
	},
]

export default function CollapsibleAccordion() {
	const [open, setOpen] = useState(false)

	return (
		<div className="w-full max-w-100">
			{ITEMS.map((item) => (
				<Collapsible key={item.id} open={open} onOpenChange={setOpen}>
					<div
						className={cn(
							"border-soft bg-bg flex w-full flex-col gap-2 rounded-lg border p-3 transition-all"
						)}>
						<CollapsibleTrigger asChild>
							<div className="flex w-full cursor-pointer items-center gap-3 text-left">
								<Pizza className="text-fg-secondary size-5 shrink-0" />
								<span className="text-fg flex-1 text-sm font-medium">
									{item.question}
								</span>
								<ChevronDown
									className={cn(
										"text-fg-secondary size-5 shrink-0 transition-transform duration-200",
										open && "rotate-180"
									)}
								/>
							</div>
						</CollapsibleTrigger>

						<CollapsibleContent>
							<p className="text-fg-secondary w-full text-sm leading-relaxed">
								{item.answer}
							</p>
						</CollapsibleContent>
					</div>
				</Collapsible>
			))}
		</div>
	)
}
