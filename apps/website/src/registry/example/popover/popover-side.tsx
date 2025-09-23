import { MoveDown, MoveLeft, MoveRight, MoveUp } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import { Button } from "@/registry/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"

const profile = {
	name: "Aurthur Dominic",
	avatar: "https://randomuser.me/api/portraits/men/80.jpg",
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

export default function PopoverSide() {
	return (
		<div className="flex items-center justify-center gap-6">
			<Popover>
				<PopoverTrigger asChild>
					<Button size={"32"} color="neutral" variant="outline">
						<MoveLeft />
						Left
					</Button>
				</PopoverTrigger>
				<PopoverContent side="left">
					<ProfileCard />
				</PopoverContent>
			</Popover>

			<Popover>
				<PopoverTrigger asChild>
					<Button size={"32"} color="neutral" variant="outline">
						<MoveUp />
						Top
					</Button>
				</PopoverTrigger>
				<PopoverContent side="top">
					<ProfileCard />
				</PopoverContent>
			</Popover>

			<Popover>
				<PopoverTrigger asChild>
					<Button size={"32"} color="neutral" variant="outline">
						<MoveRight />
						Right
					</Button>
				</PopoverTrigger>
				<PopoverContent side="right">
					<ProfileCard />
				</PopoverContent>
			</Popover>

			<Popover>
				<PopoverTrigger asChild>
					<Button size={"32"} color="neutral" variant="outline">
						<MoveDown />
						Bottom
					</Button>
				</PopoverTrigger>
				<PopoverContent side="bottom">
					<ProfileCard />
				</PopoverContent>
			</Popover>
		</div>
	)
}
