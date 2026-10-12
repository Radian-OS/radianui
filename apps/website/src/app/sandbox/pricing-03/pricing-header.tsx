import React from "react"
import { Badge } from "@/styles/default/ui/badge"
import { Switch } from "@/styles/default/ui/switch"

interface PricingHeaderProps {
	isBilledMonthly: boolean
	onBilledMonthlyChange: () => void
}

export function PricingHeader({
	isBilledMonthly,
	onBilledMonthlyChange,
}: PricingHeaderProps) {
	return (
		<>
			<div className="flex flex-col items-center gap-6 text-center">
				<div className="flex flex-col items-center gap-3 md:px-6">
					<Badge variant="outline">Pricing</Badge>
					<h1 className="heading-1 text-center">
						Find best plan for your project
					</h1>
				</div>
				<div>
					<p className="text-base font-normal">
						Start building for free and expedite your dreams into reality
					</p>
				</div>
			</div>

			<div className="mx-auto flex items-center gap-2">
				<p className="text-sm">Billed monthly</p>
				<Switch
					checked={isBilledMonthly}
					onCheckedChange={onBilledMonthlyChange}
					className="data-[state=checked]:bg-success"
				/>
				<p className="text-sm">Billed annually</p>
			</div>
		</>
	)
}
