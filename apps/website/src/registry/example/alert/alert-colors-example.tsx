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
					<BellIcon />
				</AlertIcon>
				<AlertContent>
					<AlertTitle>Primary</AlertTitle>
					<AlertDescription>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis maiores mollitia repellendus libero, soluta laborum doloribus doloremque nemo laboriosam voluptas,
					</AlertDescription>
				</AlertContent>
			</Alert>

			<Alert color="info" variant="strong" close onClose={() => handleClose("info")}>
				<AlertIcon>
					<BellIcon />
				</AlertIcon>
				<AlertContent>
					<AlertTitle>Info</AlertTitle>
					<AlertDescription>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis maiores mollitia repellendus libero, soluta laborum doloribus doloremque nemo laboriosam voluptas,
					</AlertDescription>
				</AlertContent>
			</Alert>

			<Alert color="success" variant="strong" close onClose={() => handleClose("success")}>
				<AlertIcon>
					<BellIcon />
				</AlertIcon>
				<AlertContent>
					<AlertTitle>Success</AlertTitle>
					<AlertDescription>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis maiores mollitia repellendus libero, soluta laborum doloribus doloremque nemo laboriosam voluptas,
					</AlertDescription>
				</AlertContent>
			</Alert>

			<Alert color="error" variant="strong" close onClose={() => handleClose("error")}>
				<AlertIcon>
					<BellIcon />
				</AlertIcon>
				<AlertContent>
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis maiores mollitia repellendus libero, soluta laborum doloribus doloremque nemo laboriosam voluptas,
					</AlertDescription>
				</AlertContent>
			</Alert>

			<Alert color="warning" variant="strong" close onClose={() => handleClose("warning")}>
				<AlertIcon>
					<BellIcon />
				</AlertIcon>
				<AlertContent>
					<AlertTitle>Warning</AlertTitle>
					<AlertDescription>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis maiores mollitia repellendus libero, soluta laborum doloribus doloremque nemo laboriosam voluptas,
					</AlertDescription>
				</AlertContent>
			</Alert>

			<Alert color="neutral" variant="strong" close onClose={() => handleClose("neutral")}>
				<AlertIcon>
					<BellIcon />
				</AlertIcon>
				<AlertContent>
					<AlertTitle>Neutral</AlertTitle>
					<AlertDescription>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis maiores mollitia repellendus libero, soluta laborum doloribus doloremque nemo laboriosam voluptas,
					</AlertDescription>
				</AlertContent>
			</Alert>
		</div>
	)
}

export default AlertColorsExample
