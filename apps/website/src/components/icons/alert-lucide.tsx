import React from "react"
import { Construction } from "lucide-react"
import { Alert, AlertContent, AlertDescription, AlertIcon, AlertTitle } from "@/registry/ui/alert"

const AlertLucide = () => {
	return (
		<Alert variant="soft" color="warning">
			<AlertIcon className="self-start">
				<Construction className="text-warning-text" size={20} />
			</AlertIcon>
			<AlertContent>
				<AlertTitle className="font-semibold">Native Icon set</AlertTitle>
				<AlertDescription>
					Currently we are using Lucide icon library to provide a consistent set of icons. We are actively working on our own native icon set, which will be available in a future
					update.
				</AlertDescription>
			</AlertContent>
		</Alert>
	)
}

export default AlertLucide
