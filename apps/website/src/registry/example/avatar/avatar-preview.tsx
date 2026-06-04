import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	AvatarIndicator,
	AvatarStatus,
} from "@/registry/ui/avatar"

const profile = {
	name: "Kaelin Tristian",
	avatar: "/media/female-5.jpg",
}

export default function AvatarPreview() {
	return (
		<>
			<Avatar size="48" rounded="circle">
				<AvatarImage src={profile.avatar} />
				<AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
			</Avatar>
			<Avatar size="80">
				{/* <AvatarImage src={profile.avatar} /> */}
				<AvatarFallback color="red">{profile.name.charAt(0)}</AvatarFallback>
			</Avatar>
			<Avatar size="48">
				<AvatarImage src={profile.avatar} />
				<AvatarFallback color="cyan">{profile.name.charAt(0)}</AvatarFallback>
				<AvatarIndicator position="bottom-right">
					<AvatarStatus variant="online" />
				</AvatarIndicator>
			</Avatar>
		</>
	)
}
