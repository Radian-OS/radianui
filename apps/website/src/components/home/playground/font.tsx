import React from "react"
import { ClipboardList, FileText, MessageCircleQuestion, Settings, Type } from "lucide-react"
import { Command, CommandDivider, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandShortcut } from "@/registry/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"

export default function Font() {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<div className="hover:bg-fill2 flex size-8 cursor-pointer items-center justify-center rounded-md">
					<Type size={18} />
				</div>
			</PopoverTrigger>
			<PopoverContent sideOffset={10} className="border-none p-0">
				<Command className="w-full max-w-md">
					<CommandInput placeholder="Search Google Fonts" />
					<CommandList>
						<CommandEmpty>No results found</CommandEmpty>
						<CommandItem>
							<FileText />
							<span>Search Google Fonts</span>
							<CommandShortcut>⌘D</CommandShortcut>
						</CommandItem>
						<CommandItem>
							<ClipboardList />
							<span>Create task</span>
							<CommandShortcut>⌘T</CommandShortcut>
						</CommandItem>
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
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
