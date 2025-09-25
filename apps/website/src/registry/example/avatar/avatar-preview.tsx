import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"

export default function AvatarPreview() {
	return (
		<Avatar size="48" rounded="circle">
			<AvatarImage src="https://randomuser.me/api/portraits/men/1.jpg" />
			<AvatarFallback>JD</AvatarFallback>
		</Avatar>
	)
}
