import React from "react"
import { BadgeAlert } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import { Badge, BadgeDot } from "@/registry/ui/badge"

function BadgeRoundedExample() {
	return (
		<div className="flex flex-wrap items-center justify-center gap-3">
			<Badge variant="strong" className="rounded-full">
				VIP
			</Badge>
			<Badge variant="strong" color="neutral" className="rounded-full">
				22
			</Badge>
			<Badge variant="outline" color="neutral" className="rounded-full">
				<BadgeDot className="bg-primary-border" />
				New Customer
			</Badge>
			<Badge
				variant="strong"
				color="success"
				className="rounded-full py-1 pr-2 pl-1">
				<Avatar size="16">
					<AvatarImage
						src="https://randomuser.me/api/portraits/men/1.jpg"
						alt="man5"
					/>
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
