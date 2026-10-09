"use client"

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuItem,
} from "@/styles/default/ui/sidebar"
import { Button, IconButton } from "@/styles/default/ui/button"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/styles/default/ui/select"
import {
	Lock,
	Shuffle,
	Plus,
	Paintbrush,
	Component,
	CodeXml,
} from "lucide-react"
import PresetPicker from "./preset-picker"
import { GoogleIcon, RadianIcon } from "./icons"
import FontPicker from "./font-picker"
import CornerPicker from "./corner-picker"
import DensityPicker from "./density-picker"
import IconLibraryPicker from "./icons-library-picker"

export function ThemerSidebar() {
	return (
		<Sidebar collapsible="icon">
			<SidebarHeader className="border-border flex h-12 shrink-0 flex-row items-center justify-start gap-2 border-b px-3 py-3.5">
				<RadianIcon />
				<span className="text-fg text-sm font-medium">Radian theme</span>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel className="text-fg-tertiary px-0 font-medium">
						Presets
					</SidebarGroupLabel>
					<PresetPicker />
				</SidebarGroup>

				{/* Colors */}
				<SidebarGroup>
					<SidebarGroupLabel className="text-fg-tertiary px-0 font-medium">
						Colors
					</SidebarGroupLabel>
					<div className="grid grid-cols-3 gap-2">
						{/* Primary */}
						<div className="col-span-1 row-span-2 flex h-[136px] flex-col justify-between overflow-hidden rounded-lg bg-[#10b981] p-2 text-white shadow-sm">
							<div className="flex items-start justify-between">
								<span className="text-xs font-semibold">Primary</span>
								<Lock className="size-3 opacity-70" />
							</div>
							<div className="flex flex-col gap-0.5">
								<span className="mb-1 w-fit rounded-sm bg-white/20 px-1.5 py-0.5 text-[10px] leading-none">
									Main
								</span>
								<span className="truncate text-xs font-medium">
									Royal Emerald
								</span>
								<div className="mt-1 flex gap-1">
									<div className="h-1 w-full rounded-full bg-white/30" />
									<div className="h-1 w-full rounded-full bg-white/30" />
									<div className="h-1 w-full rounded-full bg-white/30" />
									<div className="h-1 w-full rounded-full bg-white" />
								</div>
							</div>
						</div>

						{/* Secondary */}
						<div className="col-span-1 flex h-[64px] flex-col justify-between overflow-hidden rounded-lg bg-[#f97316] p-2 text-white shadow-sm">
							<div className="flex items-start justify-between">
								<span className="mr-1 truncate text-xs font-semibold">
									Secondary
								</span>
								<Lock className="size-3 shrink-0 opacity-70" />
							</div>
							<div className="mt-auto flex gap-1">
								<div className="h-1 w-full rounded-full bg-white/30" />
								<div className="h-1 w-full rounded-full bg-white/30" />
								<div className="h-1 w-full rounded-full bg-white" />
							</div>
						</div>

						{/* Tertiary */}
						<div className="col-span-1 flex h-[64px] flex-col justify-between overflow-hidden rounded-lg bg-[#d946ef] p-2 text-white shadow-sm">
							<div className="flex items-start justify-between">
								<span className="mr-1 truncate text-xs font-semibold">
									Tertiary
								</span>
								<Lock className="size-3 shrink-0 opacity-70" />
							</div>
							<div className="mt-auto flex gap-1">
								<div className="h-1 w-full rounded-full bg-white/30" />
								<div className="h-1 w-full rounded-full bg-white" />
								<div className="h-1 w-full rounded-full bg-white/30" />
							</div>
						</div>

						{/* Quaternary */}
						<div className="col-span-1 flex h-[64px] flex-col justify-between overflow-hidden rounded-lg bg-[#14b8a6] p-2 text-white shadow-sm">
							<div className="flex items-start justify-between">
								<span className="mr-1 truncate text-xs font-semibold">
									Quaternary
								</span>
								<Lock className="size-3 shrink-0 opacity-70" />
							</div>
							<div className="mt-auto flex gap-1">
								<div className="h-1 w-full rounded-full bg-white/30" />
								<div className="h-1 w-full rounded-full bg-white" />
								<div className="h-1 w-full rounded-full bg-white/30" />
							</div>
						</div>

						{/* Plus */}
						<div className="bg-fill1 border-border text-sidebar-fg/50 hover:bg-fill2 col-span-1 flex h-[64px] cursor-pointer items-center justify-center rounded-lg border border-dashed transition-colors">
							<Plus className="size-4" />
						</div>
					</div>

					{/* Zinc Grey Tint Bar */}
					<div className="mt-4 flex flex-col gap-2">
						<div className="text-sidebar-fg/70 flex justify-between text-xs">
							<span>Zinc Grey</span>
							<span>Tinted by primary</span>
						</div>
						<div className="flex h-4 w-full overflow-hidden rounded-sm">
							<div className="flex-1 bg-zinc-200" />
							<div className="flex-1 bg-zinc-400" />
							<div className="flex-1 bg-zinc-500" />
							<div className="flex-1 bg-zinc-600" />
							<div className="flex-1 bg-zinc-800" />
							<div className="flex-1 bg-zinc-950" />
						</div>
					</div>
				</SidebarGroup>

				<SidebarGroup>
					<SidebarGroupLabel className="text-fg-tertiary px-0 font-medium">
						Typography
					</SidebarGroupLabel>
					<div className="flex flex-col gap-3">
						<FontPicker
							label="Heading"
							fontName="Manrope"
							fontClass="font-sans"
							provider="Google"
							type="Sans"
							icon={<GoogleIcon size={14} />}
						/>
						<FontPicker
							label="Body"
							fontName="JetBrains Mono"
							fontClass="font-mono"
							provider="Google"
							type="Mono"
							icon={<GoogleIcon size={14} />}
						/>
					</div>
				</SidebarGroup>

				{/* Corners */}
				<SidebarGroup>
					<SidebarGroupLabel className="text-fg-tertiary px-0 font-medium">
						Corners
					</SidebarGroupLabel>
					<CornerPicker />
				</SidebarGroup>

				{/* Density */}
				<SidebarGroup>
					<SidebarGroupLabel className="text-fg-tertiary px-0 font-medium">
						Density
					</SidebarGroupLabel>
					<DensityPicker />
				</SidebarGroup>

				{/* Icons */}
				<SidebarGroup>
					<SidebarGroupLabel className="text-sidebar-fg/70 mb-2 px-0 font-normal">
						Icons
					</SidebarGroupLabel>
					<IconLibraryPicker />
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter className="border-border flex flex-row gap-3 border-t px-3 py-3.5">
				<Button size="32" variant="outline" className="flex-1" color="neutral">
					<Shuffle className="text-fg-secondary size-4" />
					Shuffle all
				</Button>
				<Button size="32" variant="outline" className="w-fit" color="neutral">
					<Lock className="text-fg-secondary size-4" />
					Lock all
				</Button>
			</SidebarFooter>
		</Sidebar>
	)
}
