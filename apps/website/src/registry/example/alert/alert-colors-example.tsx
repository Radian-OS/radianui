import React from "react"
import { BellIcon } from "lucide-react"
import { Alert, AlertContent, AlertDescription, AlertIcon, AlertTitle } from "@/registry/ui/alert"

const AlertColorsExample = () => {
	const handleClose = (alertType: string) => {
		console.log(`Closing ${alertType} alert`)
	}

	return (
		<div className="flex w-full flex-col items-center justify-center gap-4">
			<Alert color="primary" variant="strong" close onClose={() => handleClose("primary")}>
				<AlertIcon>
					<BellIcon size={20} />
				</AlertIcon>
				<AlertContent>
					<AlertTitle>Strong Primary</AlertTitle>
					<AlertDescription>This is Strong Primary Alert</AlertDescription>
				</AlertContent>
			</Alert>

			<Alert color="info" variant="strong" close onClose={() => handleClose("info")}>
				<AlertIcon>
					<BellIcon size={20} />
				</AlertIcon>
				<AlertContent>
					<AlertTitle>Strong Info</AlertTitle>
					<AlertDescription>This is Strong Info Alert</AlertDescription>
				</AlertContent>
			</Alert>

			<Alert color="success" variant="strong" close onClose={() => handleClose("success")}>
				<AlertIcon>
					<BellIcon size={20} />
				</AlertIcon>
				<AlertContent>
					<AlertTitle>Strong Success</AlertTitle>
					<AlertDescription>This is Strong Success Alert</AlertDescription>
				</AlertContent>
			</Alert>

			<Alert color="error" variant="strong" close onClose={() => handleClose("error")}>
				<AlertIcon>
					<BellIcon size={20} />
				</AlertIcon>
				<AlertContent>
					<AlertTitle>Strong Error</AlertTitle>
					<AlertDescription>This is Strong Error Alert</AlertDescription>
				</AlertContent>
			</Alert>

			<Alert color="warning" variant="strong" close onClose={() => handleClose("warning")}>
				<AlertIcon>
					<BellIcon size={20} />
				</AlertIcon>
				<AlertContent>
					<AlertTitle>Strong Warning</AlertTitle>
					<AlertDescription>This is Strong Warning Alert</AlertDescription>
				</AlertContent>
			</Alert>

			<Alert color="neutral" variant="strong" close onClose={() => handleClose("neutral")}>
				<AlertIcon>
					<BellIcon size={20} />
				</AlertIcon>
				<AlertContent>
					<AlertTitle>Strong Neutral</AlertTitle>
					<AlertDescription>This is Strong Neutral Alert</AlertDescription>
				</AlertContent>
			</Alert>
		</div>
	)
}

export default AlertColorsExample
