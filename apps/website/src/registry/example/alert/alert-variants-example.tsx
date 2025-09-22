import React from "react"
import { BadgeCheck, BadgeInfo, BellIcon, Clock } from "lucide-react"
import { Alert, AlertContent, AlertDescription, AlertIcon, AlertTitle } from "@/registry/ui/alert"

const AlertVariantsExample = () => {
	const handleClose = (variant: string) => {
		console.log(`Closing ${variant} alert`)
	}
	return (
		<div className="flex w-full flex-col items-center justify-center gap-4">
			<Alert variant="strong" close onClose={() => handleClose("strong")}>
				<AlertIcon>
					<BellIcon size={20} />
				</AlertIcon>
				<AlertContent>
					<AlertTitle>Strong Variant</AlertTitle>
					<AlertDescription>This is Strong Variant Alert</AlertDescription>
				</AlertContent>
			</Alert>

			<Alert variant="soft" close onClose={() => handleClose("soft")}>
				<AlertIcon>
					<BadgeInfo size={20} />
				</AlertIcon>
				<AlertContent>
					<AlertTitle>Soft Variant</AlertTitle>
					<AlertDescription>This is Soft Variant Alert</AlertDescription>
				</AlertContent>
			</Alert>

			<Alert variant="soft-outline" close onClose={() => handleClose("soft-outline")}>
				<AlertIcon>
					<BadgeCheck size={20} />
				</AlertIcon>
				<AlertContent>
					<AlertTitle>Soft-Outline Variant</AlertTitle>
					<AlertDescription>This is Soft-Outline Variant Alert</AlertDescription>
				</AlertContent>
			</Alert>

			<Alert variant="outline" close onClose={() => handleClose("outline")}>
				<AlertIcon>
					<Clock size={20} />
				</AlertIcon>
				<AlertContent>
					<AlertTitle>Outline Variant</AlertTitle>
					<AlertDescription>This is Outline Variant Alert</AlertDescription>
				</AlertContent>
			</Alert>
		</div>
	)
}

export default AlertVariantsExample
