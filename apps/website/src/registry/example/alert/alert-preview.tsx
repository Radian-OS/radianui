import { CircleCheckBig } from "lucide-react"
import { Alert, AlertContent, AlertDescription, AlertIcon, AlertTitle } from "@/registry/ui/alert"

export default function AlertPreview() {
	return (
		<div className="max-w-132.5 flex w-full flex-col items-center gap-6">
			<Alert color="success">
				<AlertIcon>
					<CircleCheckBig size={20} />
				</AlertIcon>
				<AlertContent>
					<AlertTitle>Payment Successful</AlertTitle>
					<AlertDescription>Your payment has been successfully transferred.</AlertDescription>
					<section className="flex items-center gap-2 pt-2">
						<p className="text-sm font-medium">Statement</p>
						<span className="bg-fg-tertiary size-1 rounded-full"></span>
						<p className="text-sm font-medium">Transaction</p>
					</section>
				</AlertContent>
			</Alert>
		</div>
	)
}
