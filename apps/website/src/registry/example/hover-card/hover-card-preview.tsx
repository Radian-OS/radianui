import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import { Button } from "@/registry/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/registry/ui/hover-card"

const profile = {
	name: "Aurthur Dominic",
	avatar: "https://randomuser.me/api/portraits/men/80.jpg",
	email: "dominic@radianos.com",
}

export default function HoverCardPreview() {
	return (
		<HoverCard>
			<HoverCardTrigger asChild>
				<Button variant={"outline"}>Hover Me</Button>
			</HoverCardTrigger>
			<HoverCardContent className="flex w-fit flex-col gap-3">
				<div className="flex items-center gap-3">
					<Avatar>
						<AvatarImage src={profile.avatar} />
						<AvatarFallback>{profile.name.charAt(0).toUpperCase()}</AvatarFallback>
					</Avatar>
					<div className="flex flex-col text-sm">
						<div className="font-medium">{profile.name}</div>
						<div className="text-fg-secondary">{profile.email}</div>
					</div>
				</div>
				<div className="flex gap-3">
					<Button variant="outline">Send Message</Button>
					<Button>Contact</Button>
				</div>
			</HoverCardContent>
		</HoverCard>
	)
}
