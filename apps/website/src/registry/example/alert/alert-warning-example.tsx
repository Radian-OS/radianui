import React from "react"
import { Inbox, TriangleAlert } from "lucide-react"
import {
	Alert,
	AlertContent,
	AlertDescription,
	AlertIcon,
	AlertTitle,
} from "@/registry/ui/alert"
import { Button } from "@/registry/ui/button"

const AlertWarningExample = () => {
	return (
		<div className="max-w-135 flex w-full flex-col items-center justify-center gap-3">
			<Alert color="warning" variant="soft-outline" close>
				<AlertIcon>
					<TriangleAlert size={20} />
				</AlertIcon>
				<AlertContent>
					<AlertTitle>Low Balance</AlertTitle>
					<AlertDescription>
						Your credit balance is low. Add more credits to avoid disruption
					</AlertDescription>
					<section className="flex items-center pt-2">
						<Button color="warning" variant="link">
							Add Credit
						</Button>
					</section>
				</AlertContent>
			</Alert>

			<Alert variant="outline" color="warning">
				<AlertIcon>
					<Inbox size={20} />
				</AlertIcon>
				<AlertContent>
					<AlertTitle>Storage Almost Full</AlertTitle>
					<AlertDescription>
						You’ve used 95% of your available storage space. Upgrade to get more
						storage
					</AlertDescription>
					<section className="flex items-center pt-2">
						<Button color="warning" variant="link">
							Upgrade Plan
						</Button>
					</section>
				</AlertContent>
			</Alert>

			<span>temp example</span>
			<Alert variant="strong" color="warning">
				<AlertIcon>
					<Inbox size={20} />
				</AlertIcon>
				<AlertContent>
					<AlertTitle>Storage Almost Full</AlertTitle>
					<AlertDescription>
						You’ve used 95% of your available storage space. Upgrade to get more
						storage
					</AlertDescription>
					<section className="flex items-center pt-2">
						<Button color="warning" variant="link" className="text-warning-fg">
							Upgrade Plan
						</Button>
					</section>
				</AlertContent>
			</Alert>
		</div>
	)
}

export default AlertWarningExample
