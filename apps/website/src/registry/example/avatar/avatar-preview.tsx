import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"

const profile = {
	name: "Kaelin Tristian",
	avatar: "/media/female-5.jpg",
}

export default function AvatarPreview() {
	return (
		<Avatar size="xl" rounded="circle">
			<AvatarImage src={profile.avatar} />
			<AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
		</Avatar>
	)
}
