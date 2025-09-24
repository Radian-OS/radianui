import { AlignCenter, AlignLeft, AlignRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import { Button } from "@/registry/ui/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/registry/ui/hover-card"

const profile = {
	name: "Aurthur Dominic",
	avatar: "https://randomuser.me/api/portraits/men/88.jpg",
	email: "dominic@radianos.com",
}

function ProfileCard() {
	return (
		<div className="flex w-fit flex-col gap-3">
			<div className="flex flex-col gap-2">
				<div className="text-sm font-medium">Contact Details</div>
			</div>
			<div className="flex items-center gap-3">
				<Avatar>
					<AvatarImage src={profile.avatar} />
					<AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
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
		</div>
	)
}

export default function HoverCardAlign() {
	return (
		<div className="flex items-center justify-center gap-6">
			<HoverCard>
				<HoverCardTrigger asChild>
					<Button size={"32"} color="neutral" variant="outline">
						<AlignLeft />
						Left
					</Button>
				</HoverCardTrigger>
				<HoverCardContent align="start" className="w-fit">
					<ProfileCard />
				</HoverCardContent>
			</HoverCard>

			<HoverCard>
				<HoverCardTrigger asChild>
					<Button size={"32"} color="neutral" variant="outline">
						<AlignCenter />
						Center
					</Button>
				</HoverCardTrigger>
				<HoverCardContent align="center" className="w-fit">
					<ProfileCard />
				</HoverCardContent>
			</HoverCard>

			<HoverCard>
				<HoverCardTrigger asChild>
					<Button size={"32"} color="neutral" variant="outline">
						<AlignRight />
						End
					</Button>
				</HoverCardTrigger>
				<HoverCardContent align="end" className="w-fit">
					<ProfileCard />
				</HoverCardContent>
			</HoverCard>
		</div>
	)
}
