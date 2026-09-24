import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { Card } from "@/registry/ui/card"
import { Divider } from "@/registry/ui/divider"
import { Progress } from "@/registry/ui/progress"

export default function CardBillingExample() {
	return (
		<Card className="w-full max-w-95 gap-5 p-5">
			<div className="flex items-center justify-between">
				<span className="text-base font-semibold">
					7 days remaining in cycle
				</span>
				<Badge variant="soft" size="20" color="violet-blue">
					Billing
				</Badge>
			</div>
			<div className="flex flex-col gap-4">
				<section className="flex flex-col gap-1">
					<div className="text-fg-secondary flex items-center justify-between text-xs">
						<span>Included Credits</span>
						<span>On-Demand</span>
					</div>
					<div className="heading-6 flex items-center justify-between">
						<span>$42.00 / $50</span>
						<span>$0</span>
					</div>
					<Progress value={80} />
				</section>
				<section className="flex flex-col gap-1">
					<div className="text-fg-secondary flex items-center justify-between text-xs">
						<span>Api Requests</span>
						<span>$38.12</span>
					</div>
					<div className="text-fg-secondary flex items-center justify-between text-xs">
						<span>Compute Time</span>
						<span>$3.88</span>
					</div>
				</section>
			</div>
			<Divider className="border-alpha border border-t border-b-0 border-dashed bg-transparent" />
			<Button color="neutral" variant="outline" className="w-full">
				Add Credits
			</Button>
		</Card>
	)
}
