import * as React from "react"
import { FolderCog, Ghost, LogOut, Settings, UserCog } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/ui/avatar"
import { Badge } from "@/registry/ui/badge"
import { Dropdown, DropdownContent, DropdownDivider, DropdownItem, DropdownTrigger } from "@/registry/ui/dropdown"
import { Switch } from "@/registry/ui/switch"

const UserMenuDropdownExample = () => {
	const [incognito, setIncognito] = React.useState(false)

	return (
		<Dropdown>
			<DropdownTrigger asChild className="cursor-pointer">
				<Avatar size="40">
					<AvatarImage src="https://randomuser.me/api/portraits/men/1.jpg" />
					<AvatarFallback>WM</AvatarFallback>
				</Avatar>
			</DropdownTrigger>
			<DropdownContent align="center" className="[&_svg]:text-fg-secondary w-80 space-y-0.5">
				<div className="flex w-full items-center gap-3 p-2">
					<Avatar size="36">
						<AvatarImage src="https://randomuser.me/api/portraits/men/1.jpg" />
						<AvatarFallback>WM</AvatarFallback>
					</Avatar>
					<div className="flex-1">
						<p className="text-sm-p font-medium">Wames Magar</p>
						<p className="body-13 text-fg-tertiary font-normal">wames@radian.com</p>
					</div>
					<Badge variant="strong" color="primary" size="24">
						PRO
					</Badge>
				</div>
				<DropdownDivider />
				<div className="flex w-full items-center gap-3 p-2">
					<div className="flex-1">
						<p className="text-sm-p font-medium">Account Storage</p>
						<p className="body-13 text-fg-tertiary font-normal">Your account has 2GB storage</p>
					</div>
					<Badge variant="soft" color="primary">
						Manage
					</Badge>
				</div>
				<DropdownDivider />
				<DropdownItem className="px-2 py-1.5">
					<Settings />
					Settings
				</DropdownItem>
				<DropdownItem className="px-2 py-1.5">
					<UserCog />
					Manage Account
				</DropdownItem>
				<DropdownItem className="px-2 py-1.5">
					<FolderCog />
					Automations
				</DropdownItem>
				<DropdownItem
					onSelect={(e) => {
						setIncognito((prev) => !prev)
						e.preventDefault()
					}}
					className="px-2 py-1.5">
					<Ghost />
					Go Incognito
					<Switch className="ml-auto" id="incognito" checked={incognito} />
				</DropdownItem>
				<DropdownDivider />
				<DropdownItem className="px-2 py-1.5">
					<LogOut />
					Logout
				</DropdownItem>
			</DropdownContent>
		</Dropdown>
	)
}

export default UserMenuDropdownExample
