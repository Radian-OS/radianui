import React from "react"
import { ArrowUpRight, CircleAlert, OctagonAlert } from "lucide-react"
import { Alert, AlertContent, AlertDescription, AlertIcon, AlertTitle } from "@/registry/ui/alert"
import { LinkButton } from "@/registry/ui/button"

const AlertErrorExamples = () => {
	return (
		<div className="max-w-135 flex w-full flex-col items-center justify-center gap-3">
			<Alert color="error" variant="soft-outline" close>
				<AlertIcon>
					<OctagonAlert size={20} />
				</AlertIcon>
				<AlertContent>
					<AlertTitle>An error occurred while uploading your file.</AlertTitle>
					<AlertDescription>Please ensure it is under 10MB and try again</AlertDescription>
					<section className="flex items-center gap-2 pt-2">
						<LinkButton color="error" href="#error-alerts-examples">
							Try again
						</LinkButton>
						<span className="bg-fg-tertiary size-1 rounded-full"></span>
						<LinkButton color="error" href="#error-alerts-examples">
							File Requirements
							<ArrowUpRight />
						</LinkButton>
					</section>
				</AlertContent>
			</Alert>
			<Alert color="error" variant="outline">
				<AlertIcon>
					<CircleAlert size={20} />
				</AlertIcon>
				<AlertContent>
					<AlertTitle>Connection Error</AlertTitle>
					<AlertDescription>Unable to connect to the server. Please try again later</AlertDescription>
					<section className="flex items-center pt-2">
						<LinkButton color="error" href="#error-alerts-examples">
							Retry
						</LinkButton>
					</section>
				</AlertContent>
			</Alert>
		</div>
	)
}

export default AlertErrorExamples
