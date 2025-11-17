import { EarthLock, Heart, MapPinned, Share, Users } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import { Badge } from "@/registry/ui/badge"
import { Button, IconButton } from "@/registry/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/registry/ui/hover-card"

const profile = {
	name: "Zoya Petrova",
	description: "Engineering partner for @Radianos",
	avatar: "/media/organization-2.png",
}

const group = {
	name: "Azure Coast Society",
	logo: "/media/organization-2.png",
	description: "Hey water enthusiasts! Anyone in Queens who loves exploring scenic rivers and lakes? Let's plan some trips!",
	location: "Berlin, Germany",
	visibility: "Public",
	memberCount: 489,
}

export default function HoverCardPreview() {
	return (
		<HoverCard>
			<HoverCardTrigger className="group flex cursor-pointer items-center gap-3">
				<Avatar>
					<AvatarImage src={profile.avatar} />
					<AvatarFallback>{profile.name.charAt(0).toUpperCase()}</AvatarFallback>
				</Avatar>
				<div className="space-y-0.5 text-sm">
					<p className="font-medium underline-offset-2 transition group-hover:underline">{profile.name}</p>
					<p className="text-fg-tertiary">{profile.description}</p>
				</div>
			</HoverCardTrigger>
			<HoverCardContent className="flex w-80 flex-col gap-4 rounded-xl">
				<div className="space-y-3">
					{/* Group information */}
					<div className="flex items-center gap-2.5">
						<div className="space-y-0.5">
							<p className="text-base font-medium">{group.name}</p>
							<p className="text-fg-tertiary text-sm">{group.description}</p>
						</div>
						<Avatar className="self-start">
							<AvatarImage src={profile.avatar} />
							<AvatarFallback>{profile.name.charAt(0).toUpperCase()}</AvatarFallback>
						</Avatar>
					</div>

					{/* Badges */}
					<div className="flex flex-wrap gap-2">
						<Badge variant="soft" color="neutral">
							<MapPinned />
							{group.location}
						</Badge>
						<Badge variant="soft" color="neutral">
							<EarthLock />
							{group.visibility}
						</Badge>
						<Badge variant="soft" color="neutral">
							<Users />
							{group.memberCount}
						</Badge>
					</div>
				</div>

				{/* Divider */}
				<div className="border-soft-alpha border-t border-dashed" />

				{/* Action buttons */}
				<div className="flex items-center justify-between">
					<div className="flex gap-3">
						<IconButton variant="outline" color="neutral">
							<Heart />
						</IconButton>
						<IconButton variant="outline" color="neutral">
							<Share />
						</IconButton>
					</div>
					<Button variant="strong" color="primary">
						Request
					</Button>
				</div>
			</HoverCardContent>
		</HoverCard>
	)
}
