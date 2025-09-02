import React from "react"
import { Construction } from "lucide-react"
import { Alert } from "@/registry/ui/alert"

const AlertLucide = () => {
	return (
		<Alert
			variant="soft"
			color="warning"
			start={
				<div className={"flex h-14 flex-col justify-start"}>
					<Construction size={20} className="text-warning-text" />
				</div>
			}
			title="Native Icon set"
			description="Currently we are using Lucide icon library to provide a consistent set of icons. We are actively working on our own native icon set, which will be available in a future update."
		/>
	)
}

export default AlertLucide
