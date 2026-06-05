import React from "react"
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	AvatarIndicator,
	AvatarStatus,
} from "@/registry/ui/avatar"

export default function AvatarRoundedSquare() {
	return (
		<div className="flex gap-6">
			<Avatar size="48" rounded="square">
				<AvatarImage src="/media/organization-3.png" />
				<AvatarFallback>AB</AvatarFallback>
			</Avatar>

			<Avatar size="48" rounded="square">
				<AvatarFallback color="green">AP</AvatarFallback>
			</Avatar>

			<Avatar size="48" rounded="square">
				<AvatarImage src="/media/female-1.jpg" />
				<AvatarFallback>CH</AvatarFallback>
				<AvatarIndicator position="bottom-right">
					<AvatarStatus variant="online" />
				</AvatarIndicator>
			</Avatar>
		</div>
	)
}
