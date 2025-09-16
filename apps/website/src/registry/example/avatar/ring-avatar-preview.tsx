import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"

function RingAvatarPreview() {
	return (
		<div className="flex gap-6">
			<Avatar size="64" className="p-0.75 border-3 border-primary">
				<AvatarImage src="https://randomuser.me/api/portraits/men/29.jpg" />
				<AvatarFallback>CH</AvatarFallback>
			</Avatar>
			<Avatar size="64" className="p-0.75 border-3 border-info">
				<AvatarImage src="https://randomuser.me/api/portraits/men/88.jpg" />
				<AvatarFallback className="text-info bg-info/10">AJ</AvatarFallback>
			</Avatar>
			<Avatar size="64" className="p-0.75 border-3 border-success">
				<AvatarImage src="https://randomuser.me/api/portraits/men/80.jpg" />
				<AvatarFallback className="text-success bg-success/10">AJ</AvatarFallback>
			</Avatar>
			<Avatar className="p-0.75 border-3 border-error" size="64">
				<AvatarImage src="https://randomuser.me/api/portraits/men/83.jpg" />
				<AvatarFallback className="text-error bg-error/10">AJ</AvatarFallback>
			</Avatar>
			<Avatar className="p-0.75 border-3 border-warning" size="64">
				<AvatarImage src="https://randomuser.me/api/portraits/men/97.jpg" />
				<AvatarFallback className="text-warning bg-warning/10">AJ</AvatarFallback>
			</Avatar>
		</div>
	)
}

export default RingAvatarPreview
