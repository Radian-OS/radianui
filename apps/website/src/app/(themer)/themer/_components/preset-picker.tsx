import { Button } from "@/styles/default/ui/button"
import { useThemerPickerPlacement } from "./themer-picker-placement"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandList,
} from "@/styles/default/ui/command"
import { CommandInput as CmdkInput } from "cmdk"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/styles/default/ui/popover"
import { ScrollArea } from "@/styles/default/ui/scroll-area"
import { Info, Search } from "lucide-react"
import { GoogleIcon, NotionIcon, SpotifyIcon, AppleIcon, XIcon } from "./icons"

export const THEMER_PRESET_GROUPS = [
	{
		group: "Popular Brands",
		presets: [
			{
				icon: <GoogleIcon />,
				title: "Google",
				value: "google",
			},
			{
				icon: <SpotifyIcon />,
				title: "Spotify",
				value: "spotify",
			},
			{
				icon: <NotionIcon />,
				title: "Notion",
				value: "notion",
			},
			{
				icon: <AppleIcon />,
				title: "Apple",
				value: "apple",
			},
			{
				icon: <XIcon />,
				title: "X (Twitter)",
				value: "x",
			},
		],
	},
	{
		group: "Pre Built Themes",
		presets: [
			{ icon: <Info />, title: "Forest", value: "forest" },
			{ icon: <Info />, title: "Ocean", value: "ocean" },
			{ icon: <Info />, title: "Sunset", value: "sunset" },
			{ icon: <Info />, title: "Midnight", value: "midnight" },
			{ icon: <Info />, title: "Desert", value: "desert" },
			{ icon: <Info />, title: "Tundra", value: "tundra" },
			{ icon: <Info />, title: "Galaxy", value: "galaxy" },
			{ icon: <Info />, title: "Volcanic", value: "volcanic" },
			{ icon: <Info />, title: "Coral", value: "coral" },
		],
	},
] as const

function CommandInput() {
	return (
		<div
			data-slot="command-input-wrapper"
			className="flex h-11 items-center gap-2 border-b px-3.5 py-3">
			<Search className="text-fg-tertiary size-5 shrink-0" />
			<CmdkInput
				placeholder="Search presets"
				data-slot="command-input"
				className="placeholder:text-fg-tertiary flex h-11 w-full rounded-md bg-transparent text-sm font-normal outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
			/>
		</div>
	)
}

export default function PresetPicker() {
	const placement = useThemerPickerPlacement("start", 20)
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					size="lg"
					variant="soft"
					color="neutral"
					className="bg-fill1-alpha w-full justify-between rounded-[10px] p-3 select-none">
					<span className="font-medium">Theme</span>
					<span className="text-fg-tertiary">None</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent
				{...placement}
				className="w-[280px] max-w-[calc(100vw-1.5rem)] rounded-lg p-0 shadow-sm">
				<Command className="border-0 p-0">
					<CommandInput />
					<CommandList className="max-h-none overflow-visible">
						<CommandEmpty>No preset found.</CommandEmpty>
						<ScrollArea className="h-[min(30rem,max(8rem,calc(var(--radix-popover-content-available-height)-3rem)))]">
							{THEMER_PRESET_GROUPS.map((group) => (
								<CommandGroup heading={group.group} key={group.group}>
									{group.presets.map((preset) => (
										<CommandItem key={preset.value}>
											{preset.icon}
											<span>{preset.title}</span>
										</CommandItem>
									))}
								</CommandGroup>
							))}
						</ScrollArea>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
