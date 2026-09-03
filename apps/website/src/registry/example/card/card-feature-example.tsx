import { ChevronRight, ReceiptText } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { Card } from "@/registry/ui/card"

export default function CardFeatureExample() {
	return (
		<Card className="w-full max-w-95 gap-0 p-0">
			<div className="flex flex-col gap-5 p-5">
				<span className="bg-primary-accent flex w-fit items-center justify-center rounded-lg p-2.5">
					<ReceiptText className="text-primary size-5" />
				</span>
				<div className="flex flex-col gap-2">
					<span className="text-base font-semibold">Active Suscriptions</span>
					<span className="text-fg-secondary text-sm">
						Review all active plans, upcoming renewal dates, and payment history
						from a single place.
					</span>
				</div>
				<Button variant="link">
					Manage Plans <ChevronRight />
				</Button>
			</div>
		</Card>
	)
}
