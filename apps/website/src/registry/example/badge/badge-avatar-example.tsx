import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import { Badge } from "@/registry/ui/badge"

const BadgeAvatarExample = () => {
	return (
		<div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
			<Badge className="rounded-full py-1 pl-1 pr-2" variant="outline" color="neutral">
				<Avatar size="16">
					<AvatarImage src="https://randomuser.me/api/portraits/men/1.jpg" alt="man1" />
					<AvatarFallback>S</AvatarFallback>
				</Avatar>
				Jean Marine
			</Badge>
			<Badge className="rounded-full py-1 pl-1 pr-2" variant="soft">
				<Avatar size="16">
					<AvatarImage src="https://randomuser.me/api/portraits/men/1.jpg" alt="man2" />
					<AvatarFallback>S</AvatarFallback>
				</Avatar>
				Jean Marine
			</Badge>
			<Badge className="rounded-full py-1 pl-1 pr-2" variant="outline" color="primary">
				<Avatar size="16">
					<AvatarImage src="https://randomuser.me/api/portraits/men/1.jpg" alt="man3" />
					<AvatarFallback>S</AvatarFallback>
				</Avatar>
				Jean Marine
			</Badge>
			<Badge className="rounded-full py-1 pl-1 pr-2" variant="strong" color="primary">
				<Avatar size="16">
					<AvatarImage src="https://randomuser.me/api/portraits/men/1.jpg" alt="man4" />
					<AvatarFallback>S</AvatarFallback>
				</Avatar>
				Jean Marine
			</Badge>
		</div>
	)
}

export default BadgeAvatarExample
