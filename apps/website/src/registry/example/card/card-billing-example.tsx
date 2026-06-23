import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/registry/ui/card"
import { Progress } from "@/registry/ui/progress"

export default function CardBillingExample() {
	return (
		<Card className="w-95">
			<CardHeader className="flex items-center justify-between">
				<CardTitle>7 days remaining in cycle</CardTitle>
				<Badge size="20" variant="soft" color="primary">
					Billing
				</Badge>
			</CardHeader>
			<CardContent className="flex flex-col items-center gap-4">
				<section className="flex w-full flex-col gap-1">
					<span className="text-fg-secondary flex justify-between text-xs">
						<p>Included Credits</p>
						<p>On-Demand</p>
					</span>
					<span className="flex justify-between">
						<p className="heading-6">$42.00 / $50</p>
						<p className="heading-6">$0</p>
					</span>
					<Progress value={80} />
				</section>

				<section className="flex w-full flex-col gap-1">
					<span className="text-fg-secondary flex justify-between text-xs">
						<p>Api Requests</p>
						<p>$38.12</p>
					</span>
					<span className="text-fg-secondary flex justify-between text-xs">
						<p>Compute Time</p>
						<p>$3.88</p>
					</span>
				</section>
			</CardContent>
			<CardFooter className="max-w-85 w-full self-center border border-x-0 border-b-0 border-t border-dashed">
				<Button className="w-full" variant="outline" color="neutral">
					Add Credits
				</Button>
			</CardFooter>
		</Card>
	)
}
