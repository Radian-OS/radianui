import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"

export default function RingAvatarPreview() {
	return (
		<div className="flex flex-wrap items-center justify-center gap-4">
			<Avatar size="64" className="border-primary border-2 p-0.5">
				<AvatarImage src="https://randomuser.me/api/portraits/men/29.jpg" />
				<AvatarFallback>CH</AvatarFallback>
			</Avatar>
			<Avatar size="64" className="border-info border-2 p-0.5">
				<AvatarImage src="https://randomuser.me/api/portraits/men/88.jpg" />
				<AvatarFallback className="text-info bg-info/10">AJ</AvatarFallback>
			</Avatar>
			<Avatar size="64" className="border-success border-2 p-0.5">
				<AvatarImage src="https://randomuser.me/api/portraits/men/80.jpg" />
				<AvatarFallback className="text-success bg-success/10">AJ</AvatarFallback>
			</Avatar>
			<Avatar className="border-error border-2 p-0.5" size="64">
				<AvatarImage src="https://randomuser.me/api/portraits/men/83.jpg" />
				<AvatarFallback className="text-error bg-error/10">AJ</AvatarFallback>
			</Avatar>
			<Avatar className="border-warning border-2 p-0.5" size="64">
				<AvatarImage src="https://randomuser.me/api/portraits/men/97.jpg" />
				<AvatarFallback className="text-warning bg-warning/10">AJ</AvatarFallback>
			</Avatar>
		</div>
	)
}
