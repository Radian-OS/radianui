import React from "react"
import { BadgeCheck, BadgeInfo, BellIcon, Clock } from "lucide-react"
import { Alert, AlertIcon, AlertTitle, AlertToolbar } from "@/registry/ui/alert"
import { LinkButton } from "@/registry/ui/button"

const AlertVariantsExample = () => {
	return (
		<div className="flex w-full flex-col items-center justify-center gap-4">
			<Alert variant="strong" close={true}>
				<AlertIcon>
					<BellIcon />
				</AlertIcon>

				<AlertTitle>Alert Strong Variant</AlertTitle>
				<AlertToolbar>
					<LinkButton className="text-white" href="#variants">
						Upgrade
					</LinkButton>
				</AlertToolbar>
			</Alert>

			<Alert variant="soft" close>
				<AlertIcon>
					<BadgeInfo />
				</AlertIcon>
				<AlertTitle>Alert Soft Variant</AlertTitle>
				<AlertToolbar>
					<LinkButton href="#variants">Upgrade</LinkButton>
				</AlertToolbar>
			</Alert>

			<Alert variant="soft-outline" close>
				<AlertIcon>
					<BadgeCheck />
				</AlertIcon>
				<AlertTitle>Alert Soft-Outline Variant</AlertTitle>
				<AlertToolbar>
					<LinkButton href="#variants">Upgrade</LinkButton>
				</AlertToolbar>
			</Alert>

			<Alert variant="outline" close>
				<AlertIcon>
					<Clock />
				</AlertIcon>
				<AlertTitle>Alert Outline Variant</AlertTitle>
				<AlertToolbar>
					<LinkButton href="#variants">Upgrade</LinkButton>
				</AlertToolbar>
			</Alert>
		</div>
	)
}

export default AlertVariantsExample
