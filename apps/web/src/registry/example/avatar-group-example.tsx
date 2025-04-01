import { Avatar, AvatarGroup } from "../ui/avatar"

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

const AvatarGroupExample = () => {
	return (
		<div className="flex flex-col gap-4">
			<AvatarGroup>
				{people.map((person) => (
					<Avatar src={person.image} name={person.name} key={person.image} />
				))}
			</AvatarGroup>
			<AvatarGroup max={3} size={"24"}>
				{people.map((person) => (
					<Avatar src={person.image} name={person.name} key={person.image} />
				))}
			</AvatarGroup>
			<AvatarGroup max={3} size={"32"}>
				{people.map((person) => (
					<Avatar src={person.image} name={person.name} key={person.image} />
				))}
			</AvatarGroup>
		</div>
	)
}

export default AvatarGroupExample
