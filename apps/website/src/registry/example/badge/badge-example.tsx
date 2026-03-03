import React from "react"
import { Bookmark, Plus, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import { Badge, BadgeDot } from "@/registry/ui/badge"

function BadgeExamplePreview() {
	return (
		<div className="flex flex-col items-center justify-center gap-2 sm:flex-row">
			<Badge
				size="20"
				className="rounded-full"
				variant="strong"
				color="success">
				New
			</Badge>
			<Badge color="neutral" variant="outline" size="24">
				<BadgeDot className="bg-fg-disabled" />
				Neutral
			</Badge>
			<Badge color="error" variant="strong">
				Close
				<X />
			</Badge>
			<Badge className="rounded-full" color="neutral" variant="outline">
				44
			</Badge>
			<Badge className="rounded-full p-1" color="neutral" variant="outline">
				<Plus />
			</Badge>
			<Badge className="rounded-full" color="primary" variant="strong">
				24
			</Badge>
			<Badge color="primary">
				<Bookmark />
				Bookmark
			</Badge>
			<Badge
				variant="outline"
				color="neutral"
				className="rounded-full py-1 pl-1 pr-2">
				<Avatar size="16">
					<AvatarImage
						src="https://randomuser.me/api/portraits/men/1.jpg"
						alt="User"
					/>
					<AvatarFallback>S</AvatarFallback>
				</Avatar>
				Samuel
			</Badge>
		</div>
	)
}

export default BadgeExamplePreview
