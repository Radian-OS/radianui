import {
	Menubar,
	MenubarContent,
	MenubarGroup,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarShortcut,
	MenubarTrigger,
} from "@/registry/ui/menubar"

export default function MenubarWithDestructiveExample() {
	return (
		<Menubar className="w-fit">
			<MenubarMenu>
				<MenubarTrigger>Account</MenubarTrigger>
				<MenubarContent className="w-52">
					<MenubarGroup>
						<MenubarItem>Profile</MenubarItem>
						<MenubarItem>
							Settings <MenubarShortcut>⌘,</MenubarShortcut>
						</MenubarItem>
						<MenubarItem>Billing</MenubarItem>
					</MenubarGroup>
					<MenubarSeparator />
					<MenubarGroup>
						<MenubarItem>Switch Workspace</MenubarItem>
						<MenubarItem>Invite Members</MenubarItem>
					</MenubarGroup>
					<MenubarSeparator />
					<MenubarGroup>
						<MenubarItem variant="destructive">
							Log Out <MenubarShortcut>⇧⌘Q</MenubarShortcut>
						</MenubarItem>
					</MenubarGroup>
				</MenubarContent>
			</MenubarMenu>

			<MenubarMenu>
				<MenubarTrigger>Data</MenubarTrigger>
				<MenubarContent className="w-52">
					<MenubarGroup>
						<MenubarItem>Export Data</MenubarItem>
						<MenubarItem>Import Data</MenubarItem>
						<MenubarItem>Sync Now</MenubarItem>
					</MenubarGroup>
					<MenubarSeparator />
					<MenubarGroup>
						<MenubarItem variant="destructive">Clear Cache</MenubarItem>
						<MenubarItem variant="destructive">Delete All Records</MenubarItem>
					</MenubarGroup>
				</MenubarContent>
			</MenubarMenu>
		</Menubar>
	)
}
