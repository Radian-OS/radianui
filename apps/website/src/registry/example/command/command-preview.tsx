import {
	ClipboardList,
	FileText,
	MessageCircleQuestion,
	Settings,
	Sun,
} from "lucide-react"
import {
	Command,
	CommandDivider,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandShortcut,
} from "@/styles/default/ui/command"

export default function CommandPreview() {
	return (
		<Command className="w-full max-w-md">
			<CommandInput placeholder="Type command or search docs..." />
			<CommandList>
				<CommandEmpty>No results found</CommandEmpty>
				<CommandGroup heading="Create">
					<CommandItem>
						<FileText />
						<span>Create document</span>
						<CommandShortcut>⌘D</CommandShortcut>
					</CommandItem>
					<CommandItem>
						<ClipboardList />
						<span>Create task</span>
						<CommandShortcut>⌘T</CommandShortcut>
					</CommandItem>
				</CommandGroup>
				<CommandDivider />
				<CommandGroup title="Settings">
					<CommandItem>
						<Settings />
						<span>Open settings</span>
						<CommandShortcut>⌘S</CommandShortcut>
					</CommandItem>
					<CommandItem>
						<MessageCircleQuestion />
						<span>Open help center</span>
						<CommandShortcut>H</CommandShortcut>
					</CommandItem>
					<CommandItem>
						<Sun />
						<span>Change theme</span>
					</CommandItem>
				</CommandGroup>
			</CommandList>
		</Command>
	)
}
