import React from "react"
import { Type } from "lucide-react"
import { Command, CommandDivider, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/registry/ui/command"
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
						<CommandGroup>
							<CommandItem className="flex justify-between">
								<span>Marked Fonts</span>
								<span className="text-fg-tertiary text-[13px] font-normal">Sans Serif</span>
							</CommandItem>
							<CommandItem className="flex justify-between">
								<span>Marked Fonts1</span>
								<span className="text-fg-tertiary text-[13px] font-normal">Sans Serif</span>
							</CommandItem>
							<CommandItem className="flex justify-between">
								<span>Marked Fonts2</span>
								<span className="text-fg-tertiary text-[13px] font-normal">Sans Serif</span>
							</CommandItem>
							<CommandItem className="flex justify-between">
								<span>Marked Fonts3</span>
								<span className="text-fg-tertiary text-[13px] font-normal">Sans Serif</span>
							</CommandItem>
						</CommandGroup>
						<CommandDivider />
						<CommandGroup>
							<CommandItem className="flex justify-between">
								<span>Font Name1</span>
								<span className="text-fg-tertiary text-[13px] font-normal">Sans Serif</span>
							</CommandItem>
							<CommandItem className="flex justify-between">
								<span>Font Name2</span>
								<span className="text-fg-tertiary text-[13px] font-normal">Sans Serif</span>
							</CommandItem>
							<CommandItem className="flex justify-between">
								<span>Font Name3</span>
								<span className="text-fg-tertiary text-[13px] font-normal">Sans Serif</span>
							</CommandItem>
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
