import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"

export default function RingAvatarPreview() {
	return (
		<div className="flex flex-wrap items-center justify-center gap-6">
			<Avatar size="64" className="ring-primary ring-offset-bg rounded-full ring-2 ring-offset-2">
				<AvatarImage src="/media/female-1.png" />
				<AvatarFallback>CH</AvatarFallback>
			</Avatar>
			<Avatar className="ring-error ring-offset-bg rounded-full ring-2 ring-offset-2" size="64">
				<AvatarImage src="/media/female-3.png" />
				<AvatarFallback className="text-error bg-error-focus">AJ</AvatarFallback>
			</Avatar>
			<Avatar size="64" rounded="square" className="ring-info ring-offset-bg rounded-xl ring-2 ring-offset-2">
				<AvatarImage src="/media/male-6.png" />
				<AvatarFallback className="text-info bg-info-focus">AJ</AvatarFallback>
			</Avatar>
			<Avatar size="64" rounded="square" className="ring-success ring-offset-bg rounded-xl ring-2 ring-offset-2">
				<AvatarImage src="/media/male-3.png" />
				<AvatarFallback className="text-success bg-success-focus">AJ</AvatarFallback>
			</Avatar>
		</div>
	)
}
