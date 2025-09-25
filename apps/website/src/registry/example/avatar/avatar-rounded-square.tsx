import React from "react"
import { Avatar, AvatarFallback, AvatarImage, AvatarIndicator, AvatarStatus } from "@/registry/ui/avatar"

export default function AvatarRoundedSquare() {
	return (
		<div className="flex gap-5">
			<Avatar size="48" rounded="square">
				<AvatarImage src="https://randomuser.me/api/portraits/men/6.jpg" />
				<AvatarFallback>CH</AvatarFallback>
			</Avatar>

			<Avatar size="48" rounded="square">
				<AvatarFallback>CH</AvatarFallback>
			</Avatar>

			<Avatar size="48" rounded="square">
				<AvatarImage src="https://randomuser.me/api/portraits/men/4.jpg" />
				<AvatarFallback>CH</AvatarFallback>
				<AvatarIndicator className="bottom-1.5 right-1.5">
					<AvatarStatus variant="online" />
				</AvatarIndicator>
			</Avatar>
		</div>
	)
}
