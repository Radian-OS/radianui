import { Avatar, AvatarFallback, AvatarImage } from "@/styles/default/ui/avatar"
import { Button } from "@/styles/default/ui/button"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/styles/default/ui/popover"

const profile = {
	name: "Aurthur Dominic",
	avatar: "https://randomuser.me/api/portraits/men/80.jpg",
	email: "dominic@radianos.com",
}

export default function PopoverPreview() {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button color="neutral" variant={"outline"}>
					{profile.name}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="flex w-fit flex-col gap-3">
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
			</PopoverContent>
		</Popover>
	)
}
