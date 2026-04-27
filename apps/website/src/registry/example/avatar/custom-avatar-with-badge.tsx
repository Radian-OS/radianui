import React from "react"
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	AvatarIndicator,
} from "@/styles/default/ui/avatar"

export default function CustomAvatarWithBadgePreview() {
	return (
		<div className="flex gap-6">
			<Avatar size="48">
				<AvatarImage src="/media/female-6.jpg" />
				<AvatarFallback>CH</AvatarFallback>
				<AvatarIndicator className="-bottom-0.5 -right-0.5">
					<div className="bg-error border-alpha ring-offset-bg flex size-4 items-center justify-center rounded-full border text-xs text-white ring ring-transparent ring-offset-2">
						<span>2</span>
					</div>
				</AvatarIndicator>
			</Avatar>
			<Avatar size="48" rounded="square">
				<AvatarImage src="/media/male-5.jpg" />
				<AvatarFallback className="text-info-text bg-info-focus">
					AJ
				</AvatarFallback>
				<AvatarIndicator className="-right-0.5 -top-0.5">
					<div className="bg-info border-alpha ring-offset-bg flex size-4 items-center justify-center rounded-full border text-xs text-white ring ring-transparent ring-offset-2">
						<span>8</span>
					</div>
				</AvatarIndicator>
			</Avatar>
		</div>
	)
}
