import { AlarmClock, Map, Users } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import { Button } from "@/registry/ui/button"
import { Divider } from "@/registry/ui/divider"

function DividerPreview() {
	const people = [
		{
			name: "Noah Brooks",
			image: "/media/male-1.png",
		},
		{
			name: "Liam Reed",
			image: "/media/male-2.png",
		},
		{
			name: "Ethan Cole",
			image: "/media/male-3.png",
		},
		{
			name: "Ava Patel",
			image: "/media/female-1.png",
		},
		{
			name: "Mia Chen",
			image: "/media/female-2.png",
		},
	]
	// Utility function to get the initials of a name
	function getInitials(name: string) {
		const parts = name.trim().split(" ")
		if (parts.length === 1) {
			return parts[0][0]?.toUpperCase() ?? ""
		}
		return (parts[0][0]?.toUpperCase() ?? "") + (parts[parts.length - 1][0]?.toUpperCase() ?? "")
	}
	return (
		<div className="border-soft max-w-100.75 max-h-47.5 size-full rounded-xl border p-4 shadow-md">
			<section className="flex items-center justify-between">
				<div className="text-base font-medium">January Design Fest</div>
				<div className="text-fg-tertiary text-sm">Nov 12</div>
			</section>
			<Divider orientation="horizontal" className="my-3" />
			<div className="h-13.5 flex">
				<section className="flex flex-col gap-0.5">
					<span className="text-sm font-medium">NOV</span>
					<span className="heading-5 font-semibold">06</span>
				</section>
				<Divider orientation="vertical" className="mx-3 self-stretch" />
				<section className="flex flex-col gap-2.5">
					<span className="text-fg-secondary flex items-center gap-2 text-sm">
						<AlarmClock className="size-5" />
						<span className="text-sm">San Francisco</span>
					</span>
					<span className="text-fg-secondary flex items-center gap-2 text-sm">
						<Map className="size-5" />
						<span className="text-sm">12:48 AM</span>
					</span>
				</section>
				<Divider orientation="vertical" className="mx-3 self-stretch" />
				<section className="flex flex-col gap-2.5">
					<span className="text-fg-secondary flex items-center gap-2 text-sm">
						<Users className="size-5" />
						<span className="text-sm">S. Tevez</span>
					</span>
					<div className="flex -space-x-2">
						{people.map((person) => (
							<Avatar size="20" className="border-bg border-4 hover:z-10" key={person.name}>
								<AvatarImage src={person.image} />
								<AvatarFallback>{getInitials(person.name)}</AvatarFallback>
							</Avatar>
						))}
					</div>
				</section>
			</div>
			<div className="w-full pt-5">
				<Button variant="soft" className="w-full">
					View Full Details
				</Button>
			</div>
		</div>
	)
}
export default DividerPreview
