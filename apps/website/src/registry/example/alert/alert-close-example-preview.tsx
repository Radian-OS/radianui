import { useState } from "react"
import { CircleCheckBig } from "lucide-react"
import { Alert, AlertContent, AlertDescription, AlertIcon, AlertTitle } from "@/registry/ui/alert"
import { LinkButton } from "@/registry/ui/button"

function DismissibleAlert() {
	const [isVisible, setIsVisible] = useState(true)
	const handleClose = () => setIsVisible(false)

	return (
		<div className="max-w-132.5">
			{isVisible && (
				<Alert close onClose={() => handleClose()} color="primary" variant="outline">
					<AlertIcon>
						<CircleCheckBig size={20} />
					</AlertIcon>
					<AlertContent>
						<AlertTitle>Payment Recieved</AlertTitle>
						<AlertDescription>Your payment of $79.99 to Stipe has been successfully processed on card ending in XXXX XXXX XXX 4242.</AlertDescription>
						<section className="flex items-center gap-2 pt-2">
							<LinkButton href="#on-close-functionality">Statement</LinkButton>
							<span className="bg-fill4 size-1 rounded-full"></span>
							<LinkButton href="#on-close-functionality">Transaction</LinkButton>
						</section>
					</AlertContent>
				</Alert>
			)}
		</div>
	)
}

export default DismissibleAlert
