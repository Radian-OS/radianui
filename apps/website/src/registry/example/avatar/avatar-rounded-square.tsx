import React from "react"
import { Avatar, AvatarFallback, AvatarImage, AvatarIndicator, AvatarStatus } from "@/registry/ui/avatar"

export default function AvatarRoundedSquare() {
	return (
		<div className="flex gap-6">
			<Avatar size="48" rounded="square">
				<AvatarImage src="/media/organization-3.png" />
				<AvatarFallback>AB</AvatarFallback>
			</Avatar>

			<Avatar size="48" rounded="square">
				<AvatarFallback className="text-success-text bg-success-focus">AP</AvatarFallback>
			</Avatar>

			<Avatar size="48" rounded="square">
				<AvatarImage src="/media/female-1.png" />
				<AvatarFallback>CH</AvatarFallback>
				<AvatarIndicator className="bottom-1.5 right-1.5">
					<AvatarStatus variant="online" />
				</AvatarIndicator>
			</Avatar>
		</div>
	)
}
