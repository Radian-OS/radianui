import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import { Badge } from "@/registry/ui/badge"

const BadgeAvatarExample = () => {
	return (
		<div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
			<Badge className="rounded-full" variant="outline" color="neutral">
				<Avatar size="16">
					<AvatarImage src="https://randomuser.me/api/portraits/men/1.jpg" />
					<AvatarFallback>S</AvatarFallback>
				</Avatar>
				Jean Marine
			</Badge>
			<Badge className="rounded-full" variant="soft">
				<Avatar size="16">
					<AvatarImage src="https://randomuser.me/api/portraits/men/1.jpg" />
					<AvatarFallback>S</AvatarFallback>
				</Avatar>
				Jean Marine
			</Badge>
			<Badge className="rounded-full" variant="outline" color="primary">
				<Avatar size="16">
					<AvatarImage src="https://randomuser.me/api/portraits/men/1.jpg" />
					<AvatarFallback>S</AvatarFallback>
				</Avatar>
				Jean Marine
			</Badge>
			<Badge className="rounded-full" variant="strong" color="primary">
				<Avatar size="16">
					<AvatarImage src="https://randomuser.me/api/portraits/men/1.jpg" />
					<AvatarFallback>S</AvatarFallback>
				</Avatar>
				Jean Marine
			</Badge>
		</div>
	)
}

export default BadgeAvatarExample
