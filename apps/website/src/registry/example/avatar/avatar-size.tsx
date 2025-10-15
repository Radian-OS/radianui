import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"

export default function AvatarSize() {
	return (
		<div className="flex flex-wrap items-center justify-center gap-4">
			<Avatar size="16">
				<AvatarImage src="https://randomuser.me/api/portraits/men/1.jpg" />
				<AvatarFallback>CH</AvatarFallback>
			</Avatar>
			<Avatar size="20">
				<AvatarImage src="https://randomuser.me/api/portraits/men/2.jpg" />
				<AvatarFallback>CH</AvatarFallback>
			</Avatar>
			<Avatar size="24">
				<AvatarImage src="https://randomuser.me/api/portraits/men/3.jpg" />
				<AvatarFallback>CH</AvatarFallback>
			</Avatar>
			<Avatar size="32">
				<AvatarImage src="https://randomuser.me/api/portraits/men/4.jpg" />
				<AvatarFallback>CH</AvatarFallback>
			</Avatar>
			<Avatar size="36">
				<AvatarImage src="https://randomuser.me/api/portraits/men/5.jpg" />
				<AvatarFallback>CH</AvatarFallback>
			</Avatar>
			<Avatar size="40">
				<AvatarImage src="https://randomuser.me/api/portraits/men/6.jpg" />
				<AvatarFallback>CH</AvatarFallback>
			</Avatar>
			<Avatar size="48">
				<AvatarImage src="https://randomuser.me/api/portraits/men/7.jpg" />
				<AvatarFallback>CH</AvatarFallback>
			</Avatar>
			<Avatar size="64">
				<AvatarImage src="https://randomuser.me/api/portraits/men/8.jpg" />
				<AvatarFallback>CH</AvatarFallback>
			</Avatar>
			<Avatar size="80">
				<AvatarImage src="https://randomuser.me/api/portraits/men/9.jpg" />
				<AvatarFallback>CH</AvatarFallback>
			</Avatar>
		</div>
	)
}
