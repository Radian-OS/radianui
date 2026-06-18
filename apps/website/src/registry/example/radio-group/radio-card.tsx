import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import { Label } from "@/registry/ui/label"
import { RadioGroup, RadioGroupItem } from "@/registry/ui/radio-group"

const owners = [
	{
		value: "maya",
		id: "owner_maya",
		name: "Maya Patel",
		role: "Engineering Manager",
		description: "Can manage projects and members",
		avatarSrc: "/media/female-3.jpg",
		avatarFallback: "MP",
	},
	{
		value: "alex",
		id: "owner_alex",
		name: "Alex Morgan",
		role: "Senior Product Designer",
		description: "Has full workspace permissions",
		avatarSrc: "/media/male-1.jpg",
		avatarFallback: "AM",
	},
	{
		value: "james",
		id: "owner_james",
		name: "James Lee",
		role: "Operations Manager",
		description: "Oversees workflows and resources",
		avatarSrc: "/media/male-2.jpg",
		avatarFallback: "JL",
	},
]

export default function RadioCard() {
	return (
		<div className="flex flex-col gap-3">
			<Label>Choose Workspace Owner</Label>
			<RadioGroup defaultValue="alex" className="flex flex-col gap-2">
				{owners.map((owner) => (
					<Label
						key={owner.value}
						htmlFor={owner.id}
						className="has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:ring-primary/30 border-soft-alpha bg-bg flex cursor-pointer items-center gap-4 rounded-xl border p-4 has-[[data-state=checked]]:ring-2">
						{/* Avatar */}
						<Avatar size="40" rounded="square">
							<AvatarImage src={owner.avatarSrc} alt={owner.name} />
							<AvatarFallback>{owner.avatarFallback}</AvatarFallback>
						</Avatar>

						{/* Content */}
						<div className="flex flex-1 flex-col gap-1">
							<div className="flex items-center gap-1">
								<Label className="text-fg text-sm font-semibold">
									{owner.name}
								</Label>
								<span className="text-fg-tertiary text-sm">({owner.role})</span>
							</div>
							<p className="text-fg-tertiary text-sm">{owner.description}</p>
						</div>

						{/* Radio */}
						<RadioGroupItem value={owner.value} id={owner.id} />
					</Label>
				))}
			</RadioGroup>
		</div>
	)
}
