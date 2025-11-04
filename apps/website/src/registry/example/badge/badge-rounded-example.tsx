import React from "react"
import { BadgeAlert } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import { Badge } from "@/registry/ui/badge"

function BadgeRoundedExample() {
	return (
		<div className="flex flex-col items-center gap-3 sm:flex-row">
			<Badge variant="strong" className="rounded-full">
				VIP
			</Badge>
			<Badge variant="strong" color="neutral" className="rounded-full">
				22
			</Badge>
			<Badge variant="outline" color="neutral" className="rounded-full">
				<span className="bg-primary size-1.5 rounded-full" />
				New Customer
			</Badge>
			<Badge variant="strong" color="error" className="rounded-full">
				<Avatar size="16">
					<AvatarImage src="https://randomuser.me/api/portraits/men/1.jpg" />
					<AvatarFallback>S</AvatarFallback>
				</Avatar>
				Samuel Eto
			</Badge>
			<Badge className="rounded-full" variant="soft" color="error">
				<BadgeAlert /> 244 Errors
			</Badge>
		</div>
	)
}

export default BadgeRoundedExample
