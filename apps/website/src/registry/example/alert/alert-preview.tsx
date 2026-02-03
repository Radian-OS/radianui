import { CircleCheckBig } from "lucide-react"
import { Alert, AlertContent, AlertDescription, AlertIcon, AlertTitle } from "@/registry/ui/alert"
import { Button } from "@/registry/ui/button"

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
						<Button variant="link" color="success">
							Statement
						</Button>
						<span className="bg-fg-tertiary size-1 rounded-full"></span>
						<Button variant="link" color="success">
							Transaction
						</Button>
					</section>
				</AlertContent>
			</Alert>
		</div>
	)
}
