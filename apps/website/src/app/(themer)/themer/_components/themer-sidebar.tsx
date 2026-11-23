"use client"

import { useState } from "react"

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/styles/default/ui/sidebar"
import { Button } from "@/styles/default/ui/button"
import { ChevronRight, Component, Lock, Shuffle } from "lucide-react"
import { BadgeSettings } from "./component-settings/badge-settings"
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/styles/default/ui/tabs"
import { ScrollArea } from "@/styles/default/ui/scroll-area"
import { COMPONENTS_DATA } from "@/config/navigation-config"
import { ButtonSettings } from "./component-settings/button-settings"
import { ComponentSettingsPopover } from "./components-settings-popover"

import { useThemerPreset } from "@/lib/themer-preset"
import { RadianIcon } from "./icons"
import { ThemerFundamentals } from "./themer-fundamentals"

const components = [...COMPONENTS_DATA].sort((a, b) => a.localeCompare(b))

export function ThemerSettings() {
	const [selectedComponent, setSelectedComponent] = useState("Button")
	const [params] = useThemerPreset()

	return (
		<Tabs
			defaultValue="fundamentals"
			className="flex min-h-0 flex-1 flex-col gap-0">
			<div className="border-border shrink-0 border-b p-2">
				<TabsList width="full" aria-label="Themer settings">
					<TabsTrigger value="fundamentals">Fundamentals</TabsTrigger>
					<TabsTrigger value="components">Components</TabsTrigger>
				</TabsList>
			</div>
			<TabsContent value="fundamentals" className="flex min-h-0 flex-col">
				<SidebarContent className="overflow-hidden">
					<ScrollArea type="auto" className="min-h-0 flex-1 pb-2">
						<ThemerFundamentals />
					</ScrollArea>
				</SidebarContent>
			</TabsContent>
			<TabsContent value="components" className="flex min-h-0 flex-col">
				<SidebarContent className="overflow-hidden">
					<ScrollArea type="auto" className="min-h-0 flex-1">
						<SidebarGroup className="py-3">
							<SidebarMenu>
								{components.map((name) => {
									const hasOverrides =
										(name === "Button" || name === "Badge") &&
										params.components[name] !== undefined
									const item = (
										<SidebarMenuButton
											type="button"
											size="sm"
											isActive={selectedComponent === name}
											aria-pressed={selectedComponent === name}
											onClick={() => setSelectedComponent(name)}
											className="h-10 px-3 text-[13px] font-medium">
											<Component className="size-4" aria-hidden="true" />
											<span className="flex items-center gap-1">
												{name}
												{hasOverrides && (
													<>
														<span
															aria-hidden="true"
															className="bg-primary size-[5px] shrink-0 rounded-full"
														/>
														<span className="sr-only">
															Has component overrides
														</span>
													</>
												)}
											</span>
											<ChevronRight
												className="text-fg-tertiary! ml-auto size-4.5!"
												aria-hidden="true"
											/>
										</SidebarMenuButton>
									)
									return (
										<SidebarMenuItem key={name}>
											{name === "Button" ? (
												<ButtonSettings>{item}</ButtonSettings>
											) : name === "Badge" ? (
												<BadgeSettings>{item}</BadgeSettings>
											) : (
												<ComponentSettingsPopover name={name}>
													{item}
												</ComponentSettingsPopover>
											)}
										</SidebarMenuItem>
									)
								})}
							</SidebarMenu>
						</SidebarGroup>
					</ScrollArea>
				</SidebarContent>
			</TabsContent>
		</Tabs>
	)
}

export function ThemerSidebar() {
	return (
		<Sidebar
			collapsible="none"
			className="border-border hidden h-full shrink-0 border-r sm:flex">
			<SidebarHeader className="border-border flex h-11 shrink-0 flex-row items-center justify-start gap-2 border-b px-3 py-2">
				<RadianIcon />
				<span className="text-fg text-sm font-medium">Radian themer</span>
			</SidebarHeader>
			<ThemerSettings />
			<SidebarFooter className="border-border flex flex-row gap-2 border-t px-3 py-2">
				<Button size="sm" variant="outline" className="flex-1" color="neutral">
					<Shuffle className="text-fg-secondary size-4" />
					Shuffle all
				</Button>
				<Button size="sm" variant="outline" className="w-fit" color="neutral">
					<Lock className="text-fg-secondary size-4" />
					Lock all
				</Button>
			</SidebarFooter>
		</Sidebar>
	)
}
