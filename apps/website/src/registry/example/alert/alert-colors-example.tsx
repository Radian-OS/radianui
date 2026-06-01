import React from "react"
import {
	BellRing,
	Box,
	CircleCheckBig,
	OctagonAlert,
	Sparkles,
	TriangleAlert,
} from "lucide-react"
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
					<Sparkles size={20} />
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
					<Box size={20} />
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
					<CircleCheckBig size={20} />
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
					<OctagonAlert size={20} />
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
					<BellRing size={20} />
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
					<TriangleAlert size={20} />
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
