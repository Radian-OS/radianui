import React from "react"
import { Box } from "lucide-react"
import {
	Alert,
	AlertContent,
	AlertDescription,
	AlertIcon,
	AlertTitle,
} from "@/registry/ui/alert"

const AlertVariantsExample = () => {
	return (
		<div className="flex w-full max-w-132.5 flex-col items-center justify-center gap-3">
			<Alert variant="outline">
				<AlertIcon>
					<Box size={20} />
				</AlertIcon>
				<AlertContent>
					<AlertTitle>Outline alert</AlertTitle>
					<AlertDescription>This is a variation of alert</AlertDescription>
				</AlertContent>
			</Alert>

			<Alert variant="soft">
				<AlertIcon>
					<Box size={20} />
				</AlertIcon>
				<AlertContent>
					<AlertTitle>Soft alert</AlertTitle>
					<AlertDescription>This is a variation of alert</AlertDescription>
				</AlertContent>
			</Alert>

			<Alert variant="soft-outline">
				<AlertIcon>
					<Box size={20} />
				</AlertIcon>
				<AlertContent>
					<AlertTitle>Soft outline alert</AlertTitle>
					<AlertDescription>This is a variation of alert</AlertDescription>
				</AlertContent>
			</Alert>
			<Alert variant="strong">
				<AlertIcon>
					<Box size={20} />
				</AlertIcon>
				<AlertContent>
					<AlertTitle>Strong alert</AlertTitle>
					<AlertDescription>This is a variation of alert</AlertDescription>
				</AlertContent>
			</Alert>
		</div>
	)
}

export default AlertVariantsExample
