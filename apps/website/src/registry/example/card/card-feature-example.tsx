import { ChevronRight, ReceiptText } from "lucide-react"
import { Button } from "@/registry/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/registry/ui/card"

export default function CardFeatureExample() {
	return (
		<Card className="w-95">
			<CardHeader>
				<span className="bg-primary-accent border-soft-alpha flex w-fit items-center justify-center rounded-lg border p-2.5">
					<ReceiptText className="text-primary size-5" />
				</span>
			</CardHeader>
			<CardContent className="flex flex-col justify-center gap-2">
				<CardTitle>Active Subscriptions</CardTitle>
				<CardDescription>
					Review all active plans, upcoming renewal dates, and payment history
					from a single place.
				</CardDescription>
			</CardContent>
			<CardFooter>
				<Button variant="link">
					Manage Plans <ChevronRight />
				</Button>
			</CardFooter>
		</Card>
	)
}
