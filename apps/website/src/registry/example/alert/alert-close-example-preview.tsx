"use client"

import { useState } from "react"
import { IconSlot } from "@/registry/icon/icon-library"
import {
	Alert,
	AlertContent,
	AlertDescription,
	AlertIcon,
	AlertTitle,
} from "@/registry/ui/alert"
import { Button } from "@/registry/ui/button"

function DismissibleAlert() {
	const [isVisible, setIsVisible] = useState(true)

	const handleClose = () => {
		setIsVisible(false)

		// Bring the alert back after 3 seconds
		setTimeout(() => {
			setIsVisible(true)
		}, 1500)
	}

	return (
		<div className="max-w-132.5">
			<div
				className={`transition-all duration-300 ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}>
				{isVisible && (
					<Alert close onClose={handleClose} color="primary" variant="outline">
						<AlertIcon>
							<IconSlot slot="circle-check-big" size={20} />
						</AlertIcon>
						<AlertContent>
							<AlertTitle>Payment Received</AlertTitle>
							<AlertDescription>
								Your payment of $79.99 to Stripe has been successfully processed
								on card ending in XXXX XXXX XXX 4242.
							</AlertDescription>
							<section className="flex items-center gap-2 pt-2">
								<Button variant="link" color="primary">
									View Statement
								</Button>
								<span className="bg-fill4 size-1 rounded-full"></span>
								<Button variant="link" color="primary">
									Dismiss
								</Button>
							</section>
						</AlertContent>
					</Alert>
				)}
			</div>
		</div>
	)
}

export default DismissibleAlert
