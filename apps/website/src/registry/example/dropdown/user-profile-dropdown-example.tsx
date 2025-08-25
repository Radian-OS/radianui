import { EyeIcon, FolderCog, LogOut, Settings, SquareTerminal, UserCog } from "lucide-react"

import CodeSnippet from "@/components/code-snippet"
import { Avatar } from "@/registry/ui/avatar"
import { Badge } from "@/registry/ui/badge"
import { Checkbox } from "@/registry/ui/checkbox"
import { Dropdown, DropdownContent, DropdownDivider, DropdownItem, DropdownTrigger } from "@/registry/ui/dropdown"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const UserMenuDropdownExample = () => {
	return (
		<Tabs defaultValue="preview" variant={"outline-ghost"}>
			<div className="flex items-center justify-between">
				<TabsList>
					<TabsTrigger value="preview" icon={<EyeIcon />}>
						Preview
					</TabsTrigger>
					<TabsTrigger value="code" icon={<SquareTerminal />}>
						Code
					</TabsTrigger>
				</TabsList>
				<Dropdown></Dropdown>
			</div>

			<TabsContent value="preview">
				<div className="flex h-[420px] flex-col items-center justify-center overflow-auto rounded-xl border px-10">
					<Dropdown>
						<DropdownTrigger asChild className="cursor-pointer">
							<Avatar src="https://randomuser.me/api/portraits/men/1.jpg" size="40" />
						</DropdownTrigger>
						<DropdownContent align="center" className="[&_svg]:text-fg-secondary w-80 space-y-0.5">
							<div className="flex w-full items-center gap-3 p-2">
								<Avatar src="https://randomuser.me/api/portraits/men/1.jpg" size="36" />
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
							<DropdownItem className="px-2 py-1.5" start={<Settings />}>
								Settings
							</DropdownItem>
							<DropdownItem className="px-2 py-1.5" start={<UserCog />}>
								Manage Account
							</DropdownItem>
							<DropdownItem className="px-2 py-1.5" start={<FolderCog />}>
								Automations
							</DropdownItem>
							<DropdownDivider />
							<DropdownItem className="px-2 py-1.5" start={<LogOut />}>
								Logout
							</DropdownItem>
							<DropdownItem onClick={(e) => e.preventDefault()}>
								<Checkbox />
								British Pound
							</DropdownItem>
						</DropdownContent>
					</Dropdown>
				</div>
			</TabsContent>

			<TabsContent value="code">
				<CodeSnippet
					title="user-menu-dropdown.tsx"
					showLineNumber
					className="h-[420px]"
					code={`
<Dropdown>
	<DropdownTrigger asChild>
		<Button variant="outline" color="neutral">
			My Profile
		</Button>
	</DropdownTrigger>
	<DropdownContent align="center" className="w-80 space-y-0.5">
		<div className="flex w-full gap-3 p-2">
			<Avatar src="https://randomuser.me/api/portraits/men/1.jpg" size="36" />
			<div className="flex-1">
				<p className="text-sm-p font-medium">Wames Magar</p>
				<p className="body-13 text-fg-tertiary font-normal">wames@radian.com</p>
			</div>
			<Button variant="strong" color="primary">
				PRO
			</Button>
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
		<DropdownItem className="px-2 py-1.5" start={<Settings />}>
			Settings
		</DropdownItem>
		<DropdownItem className="px-2 py-1.5" start={<UserCog />}>
			Manage Account
		</DropdownItem>
		<DropdownItem className="px-2 py-1.5" start={<FolderCog />}>
			Automations
		</DropdownItem>
		<DropdownDivider />
		<DropdownItem className="px-2 py-1.5" start={<LogOut />}>
			Logout
		</DropdownItem>
	</DropdownContent>
</Dropdown>`}
				/>
			</TabsContent>
		</Tabs>
	)
}

export default UserMenuDropdownExample
