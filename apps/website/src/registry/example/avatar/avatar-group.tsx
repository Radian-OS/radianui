import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"

export const people = [
	{
		name: "John Doe",
		image: "https://randomuser.me/api/portraits/men/1.jpg",
	},
	{
		name: "Jane Smith",
		image: "https://randomuser.me/api/portraits/women/1.jpg",
	},
	{
		name: "Michael Brown",
		image: "https://randomuser.me/api/portraits/men/2.jpg",
	},
	{
		name: "Emily Davis",
		image: "https://randomuser.me/api/portraits/women/2.jpg",
	},
	{
		name: "Chris Johnson",
		image: "https://randomuser.me/api/portraits/men/3.jpg",
	},
	{
		name: "Sophia Lee",
		image: "https://randomuser.me/api/portraits/women/3.jpg",
	},
	{
		name: "Daniel Garcia",
		image: "https://randomuser.me/api/portraits/men/4.jpg",
	},
	{
		name: "Olivia Martinez",
		image: "https://randomuser.me/api/portraits/women/4.jpg",
	},
	{
		name: "Ethan Wilson",
		image: "https://randomuser.me/api/portraits/men/5.jpg",
	},
	{
		name: "Mia Taylor",
		image: "https://randomuser.me/api/portraits/women/5.jpg",
	},
]

function getInitials(name: string) {
	const parts = name.trim().split(" ")
	if (parts.length === 1) {
		return parts[0][0]?.toUpperCase() ?? ""
	}
	return (parts[0][0]?.toUpperCase() ?? "") + (parts[parts.length - 1][0]?.toUpperCase() ?? "")
}

export default function AvatarGroup() {
	return (
		<div className="flex -space-x-2.5">
			{people.slice(0, 4).map((person) => (
				<Avatar className="border-bg border-2 hover:z-10" key={person.name}>
					<AvatarImage src={person.image} />
					<AvatarFallback>{getInitials(person.name)}</AvatarFallback>
				</Avatar>
			))}
			<Avatar className="border-bg border-2 hover:z-10">
				<AvatarFallback>+7</AvatarFallback>
			</Avatar>
		</div>
	)
}
