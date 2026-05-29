import { IconSlot } from "@/registry/icon/icon-library"
import {
	Command,
	CommandDivider,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandShortcut,
} from "@/registry/ui/command"

export default function CommandPreview() {
	return (
		<Command className="w-full max-w-md">
			<CommandInput placeholder="Type command or search docs..." />
			<CommandList>
				<CommandEmpty>No results found</CommandEmpty>
				<CommandGroup heading="Create">
					<CommandItem>
						<IconSlot slot="file-text" />
						<span>Create document</span>
						<CommandShortcut>⌘D</CommandShortcut>
					</CommandItem>
					<CommandItem>
						<IconSlot slot="clipboard" />
						<span>Create task</span>
						<CommandShortcut>⌘T</CommandShortcut>
					</CommandItem>
				</CommandGroup>
				<CommandDivider />
				<CommandGroup title="Settings">
					<CommandItem>
						<IconSlot slot="setting" />
						<span>Open settings</span>
						<CommandShortcut>⌘S</CommandShortcut>
					</CommandItem>
					<CommandItem>
						<IconSlot slot="file-question" />
						<span>Open help center</span>
						<CommandShortcut>H</CommandShortcut>
					</CommandItem>
					<CommandItem>
						<IconSlot slot="sun" />
						<span>Change theme</span>
					</CommandItem>
				</CommandGroup>
			</CommandList>
		</Command>
	)
}
