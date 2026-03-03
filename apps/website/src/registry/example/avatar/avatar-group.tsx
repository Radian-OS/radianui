import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"

export const people = [
	{
		name: "Noah Brooks",
		image: "/media/male-1.jpg",
	},
	{
		name: "Liam Reed",
		image: "/media/male-2.jpg",
	},
	{
		name: "Ethan Cole",
		image: "/media/male-3.jpg",
	},
	{
		name: "Ava Patel",
		image: "/media/female-1.jpg",
	},
	{
		name: "Mia Chen",
		image: "/media/female-2.jpg",
	},
]

// Utility function to get the initials of a name
function getInitials(name: string) {
	const parts = name.trim().split(" ")
	if (parts.length === 1) {
		return parts[0][0]?.toUpperCase() ?? ""
	}
	return (
		(parts[0][0]?.toUpperCase() ?? "") +
		(parts[parts.length - 1][0]?.toUpperCase() ?? "")
	)
}

export default function AvatarGroup() {
	return (
		<div className="flex -space-x-2.5">
			{people.map((person) => (
				<Avatar
					size="32"
					className="border-bg border-4 hover:z-10"
					key={person.name}>
					<AvatarImage src={person.image} />
					<AvatarFallback>{getInitials(person.name)}</AvatarFallback>
				</Avatar>
			))}
			<Avatar size="32" className="border-bg border-4 hover:z-10">
				<AvatarFallback className="text-sm font-semibold">+9</AvatarFallback>
			</Avatar>
		</div>
	)
}
