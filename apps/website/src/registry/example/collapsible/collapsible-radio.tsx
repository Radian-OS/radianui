"use client"

import { useState } from "react"
import { ChevronDown, SunMoon } from "lucide-react"
import { cn } from "@/lib/utils"
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/registry/ui/collapsible"
import { Label } from "@/registry/ui/label"
import { RadioGroup, RadioGroupItem } from "@/registry/ui/radio-group"

const OPTIONS = [
	{ value: "dark", label: "Dark Mode" },
	{ value: "light", label: "Light Mode" },
	{ value: "system", label: "System Settings" },
]

export default function CollapsibleRadio() {
	const [open, setOpen] = useState(false)
	const [selected, setSelected] = useState("dark")

	return (
		<div className="w-100">
			<Collapsible
				open={open}
				onOpenChange={setOpen}
				className="border-border bg-bg overflow-hidden rounded-lg border">
				{/* Trigger row */}
				<CollapsibleTrigger asChild>
					<div className="flex w-full cursor-pointer items-center gap-2 px-3 py-2.5">
						<SunMoon className="text-fg-secondary size-5 shrink-0" />
						<span className="text-fg flex-1 text-left text-sm font-medium">
							Appearance Settings
						</span>
						<ChevronDown
							className={cn(
								"text-fg-tertiary size-5 shrink-0 transition-transform duration-200",
								open && "rotate-180"
							)}
						/>
					</div>
				</CollapsibleTrigger>

				{/* Expandable options */}
				<CollapsibleContent>
					<div>
						<RadioGroup
							value={selected}
							onValueChange={setSelected}
							className="gap-0">
							{OPTIONS.map((opt) => (
								<Label
									key={opt.value}
									className="border-border flex cursor-pointer items-center gap-2 border-t px-3 py-2.5 transition-colors">
									<RadioGroupItem value={opt.value} />
									<span className="text-fg text-sm">{opt.label}</span>
								</Label>
							))}
						</RadioGroup>
					</div>
				</CollapsibleContent>
			</Collapsible>
		</div>
	)
}
