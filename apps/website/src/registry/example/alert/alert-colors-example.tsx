import React from "react"
import { IconSlot } from "@/registry/icon/icon-library"
import {
	Alert,
	AlertContent,
	AlertDescription,
	AlertIcon,
	AlertTitle,
} from "@/registry/ui/alert"

const AlertColorsExample = () => {
	return (
		<div className="max-w-135 flex w-full flex-col items-center justify-center gap-3">
			<Alert>
				<AlertIcon>
					<IconSlot slot="sparkles" size={20} />
				</AlertIcon>
				<AlertContent>
					<AlertTitle>Primary alert</AlertTitle>
					<AlertDescription>
						This alert is used to highlight information{" "}
					</AlertDescription>
				</AlertContent>
			</Alert>
			<Alert color="neutral">
				<AlertIcon>
					<IconSlot slot="box" size={20} />
				</AlertIcon>
				<AlertContent>
					<AlertTitle>Neutral alert</AlertTitle>
					<AlertDescription>
						This alert is used to highlight information{" "}
					</AlertDescription>
				</AlertContent>
			</Alert>
			<Alert color="success">
				<AlertIcon>
					<IconSlot slot="circle-check-big" size={20} />
				</AlertIcon>
				<AlertContent>
					<AlertTitle>Success alert</AlertTitle>
					<AlertDescription>
						This alert is used to highlight information{" "}
					</AlertDescription>
				</AlertContent>
			</Alert>
			<Alert color="error">
				<AlertIcon>
					<IconSlot slot="octagon-alert" size={20} />
				</AlertIcon>
				<AlertContent>
					<AlertTitle>Error alert</AlertTitle>
					<AlertDescription>
						This alert is used to highlight information{" "}
					</AlertDescription>
				</AlertContent>
			</Alert>
			<Alert color="info">
				<AlertIcon>
					<IconSlot slot="bell-ring" size={20} />
				</AlertIcon>
				<AlertContent>
					<AlertTitle>Info alert</AlertTitle>
					<AlertDescription>
						This alert is used to highlight information{" "}
					</AlertDescription>
				</AlertContent>
			</Alert>
			<Alert color="warning">
				<AlertIcon>
					<IconSlot slot="alert-triangle" size={20} />
				</AlertIcon>
				<AlertContent>
					<AlertTitle>Warning alert</AlertTitle>
					<AlertDescription>
						This alert is used to highlight information{" "}
					</AlertDescription>
				</AlertContent>
			</Alert>
		</div>
	)
}

export default AlertColorsExample
