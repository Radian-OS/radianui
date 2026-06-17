"use client"

import { useId, useState } from "react"
import { Globe } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/registry/ui/badge"
import { Label } from "@/registry/ui/label"
import { Switch, SwitchWrapper } from "@/registry/ui/switch"

export default function SwitchSuccessCard() {
	const id = useId()
	const [checked, setChecked] = useState(true)

	return (
		<Label htmlFor={id} className="cursor-pointer">
			<div
				className={cn(
					"bg-bg relative flex w-full items-center gap-4 rounded-xl border p-4 transition-colors",
					checked ? "border-success" : "border-soft-alpha"
				)}>
				{/* Icon */}
				<div className="text-fg-secondary bg-fill2 flex shrink-0 items-center justify-center rounded-xl p-2.5">
					<Globe className="size-6" />
				</div>

				{/* Text */}
				<div className="flex flex-1 flex-col gap-0.5">
					<div className="flex items-center gap-1.5">
						<span className="text-fg text-sm font-semibold">Label</span>
						<span className="text-fg-subtle text-sm">(Sublabel)</span>
						<Badge color="emerald" variant="soft" size="20">
							New
						</Badge>
					</div>
					<p className="text-fg-subtle text-xs font-normal">
						Insert the cards description here.
					</p>
				</div>

				{/* Switch */}
				<SwitchWrapper className="self-start">
					<Switch
						id={id}
						size="20"
						checked={checked}
						onCheckedChange={setChecked}
						className={cn(checked && "data-[state=checked]:bg-success")}
					/>
				</SwitchWrapper>
			</div>
		</Label>
	)
}
