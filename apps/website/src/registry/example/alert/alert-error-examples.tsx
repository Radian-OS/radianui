import React from "react"
import { IconSlot } from "@/registry/icon/icon-library"
import {
	Alert,
	AlertContent,
	AlertDescription,
	AlertIcon,
	AlertTitle,
} from "@/registry/ui/alert"
import { Button } from "@/registry/ui/button"

const AlertErrorExamples = () => {
	return (
		<div className="max-w-135 flex w-full flex-col items-center justify-center gap-3">
			<Alert color="error" variant="soft-outline" close>
				<AlertIcon>
					<IconSlot slot="octagon-alert" size={20} />
				</AlertIcon>
				<AlertContent>
					<AlertTitle>An error occurred while uploading your file.</AlertTitle>
					<AlertDescription>
						Please ensure it is under 10MB and try again
					</AlertDescription>
					<section className="flex items-center gap-2 pt-2">
						<Button color="error" variant="link">
							Try again
						</Button>
						<span className="bg-fg-tertiary size-1 rounded-full"></span>
						<Button color="error" variant="link">
							File Requirements
							<IconSlot slot="arrow-up-right" />
						</Button>
					</section>
				</AlertContent>
			</Alert>
			<Alert color="error" variant="outline">
				<AlertIcon>
					<IconSlot slot="circle-alert" size={20} />
				</AlertIcon>
				<AlertContent>
					<AlertTitle>Connection Error</AlertTitle>
					<AlertDescription>
						Unable to connect to the server. Please try again later
					</AlertDescription>
					<section className="flex items-center pt-2">
						<Button color="error" variant="link">
							Retry
						</Button>
					</section>
				</AlertContent>
			</Alert>
		</div>
	)
}

export default AlertErrorExamples
