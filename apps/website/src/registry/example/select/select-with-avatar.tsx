import { Avatar, AvatarImage } from "@/registry/ui/avatar"
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/registry/ui/select"

export default function SelectWithBadge() {
	return (
		<div className="w-full max-w-80">
			<Select indicatorPosition="right">
				<SelectTrigger>
					<SelectValue placeholder="Select a user" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel className="text-fg-secondary py-1 ps-2 text-xs font-normal">
							Select a user
						</SelectLabel>
						<SelectItem value="1">
							<span className="flex items-center gap-2">
								<Avatar size="24">
									<AvatarImage src="https://randomuser.me/api/portraits/men/1.jpg" />
								</Avatar>
								<span>Alan Bold</span>
							</span>
						</SelectItem>
						<SelectItem value="2">
							<span className="flex items-center gap-2">
								<Avatar size="24">
									<AvatarImage src="https://randomuser.me/api/portraits/men/2.jpg" />
								</Avatar>
								<span>Ethan James</span>
							</span>
						</SelectItem>
						<SelectItem value="3">
							<span className="flex items-center gap-2">
								<Avatar size="24">
									<AvatarImage src="https://randomuser.me/api/portraits/men/3.jpg" />
								</Avatar>
								<span>Nina Clark</span>
							</span>
						</SelectItem>
						<SelectItem value="4">
							<span className="flex items-center gap-2">
								<Avatar size="24">
									<AvatarImage src="https://randomuser.me/api/portraits/men/4.jpg" />
								</Avatar>
								<span>Sean Otto</span>
							</span>
						</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	)
}
