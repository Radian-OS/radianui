"use client"

import { useState } from "react"

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/styles/default/ui/sidebar"
import { Button } from "@/styles/default/ui/button"
import { ChevronRight, Component, Lock, Shuffle, Plus } from "lucide-react"
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/styles/default/ui/tabs"
import { ScrollArea } from "@/styles/default/ui/scroll-area"
import { COMPONENTS_DATA } from "@/config/navigation-config"
import PrimaryColorPicker from "./primary-color-picker"
import BaseColorPicker from "./base-color-picker"
import PresetPicker from "./preset-picker"
import { GoogleIcon, RadianIcon } from "./icons"
import FontPicker from "./font-picker"
import CornerPicker from "./corner-picker"
import DensityPicker from "./density-picker"
import IconLibraryPicker from "./icons-library-picker"
import AppearanceModePicker from "./appearance-mode-picker"
import { ButtonSettings } from "./button-settings"
import { ComponentSettingsPopover } from "./component-settings-popover"
import { useThemerPreset } from "@/lib/themer-preset"
import { FONTS, FontValue } from "@/registry/fonts"
import { BaseColorValue } from "@/registry/base-colors"

const components = [...COMPONENTS_DATA].sort((a, b) => a.localeCompare(b))

export function ThemerSidebar() {
	const [selectedComponent, setSelectedComponent] = useState("Accordion")
	const [params, setParams] = useThemerPreset()

	const selectedHeadingFont = FONTS.find(
		(font) => params.headingFont === font.value
	)
	const selectedBodyFont = FONTS.find((font) => params.bodyFont === font.value)

	const formatCategory = (cat?: string) => {
		if (!cat) return "Sans-Serif"
		return cat
			.split("-")
			.map((s) => s.charAt(0).toUpperCase() + s.slice(1))
			.join(" ")
	}

	const handlePrimaryColorChange = (val: string) =>
		setParams({ primaryColor: val })
	const handleBaseColorChange = (val: BaseColorValue) =>
		setParams({ baseColor: val })

	return (
		<Sidebar collapsible="icon">
			<SidebarHeader className="border-border flex h-12 shrink-0 flex-row items-center justify-start gap-2 border-b px-3 py-3.5">
				<RadianIcon />
				<span className="text-fg text-sm font-medium">Radian themer</span>
			</SidebarHeader>
			<Tabs defaultValue="fundamentals" className="min-h-0 flex-1 gap-0">
				<div className="border-border shrink-0 border-b p-2">
					<TabsList width="full" aria-label="Themer settings">
						<TabsTrigger value="fundamentals">Fundamentals</TabsTrigger>
						<TabsTrigger value="components">Components</TabsTrigger>
					</TabsList>
				</div>
				<TabsContent value="fundamentals" className="flex min-h-0 flex-col">
					<SidebarContent className="overflow-hidden">
						<ScrollArea className="min-h-0 flex-1">
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
									<PrimaryColorPicker
										value={params.primaryColor}
										onChange={handlePrimaryColorChange}
									/>

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
							</SidebarGroup>

							{/* Neutral Base */}
							<SidebarGroup>
								<SidebarGroupLabel className="text-fg-tertiary px-0 font-medium">
									Neutral Base
								</SidebarGroupLabel>
								<BaseColorPicker
									baseColor={params.baseColor}
									primaryColor={params.primaryColor}
									onBaseColorChange={handleBaseColorChange}
								/>
							</SidebarGroup>

							<SidebarGroup>
								<SidebarGroupLabel className="text-fg-tertiary px-0 font-medium">
									Typography
								</SidebarGroupLabel>
								<div className="flex flex-col gap-3">
									<FontPicker
										label="Heading"
										fontName={selectedHeadingFont?.name || "Geist"}
										fontClass={
											selectedHeadingFont?.category === "serif"
												? "font-serif"
												: selectedHeadingFont?.category === "monospace"
													? "font-mono"
													: "font-sans"
										}
										provider="Google"
										type={formatCategory(selectedHeadingFont?.category)}
										icon={<GoogleIcon size={14} />}
										value={params.headingFont}
										onValueChange={(value) =>
											setParams({ headingFont: value as FontValue })
										}
									/>
									<FontPicker
										label="Body"
										fontName={selectedBodyFont?.name || "JetBrains Mono"}
										fontClass={
											selectedBodyFont?.category === "serif"
												? "font-serif"
												: selectedBodyFont?.category === "sans-serif"
													? "font-sans"
													: "font-mono"
										}
										provider="Google"
										type={formatCategory(
											selectedBodyFont?.category || "monospace"
										)}
										icon={<GoogleIcon size={14} />}
										value={params.bodyFont}
										onValueChange={(value) =>
											setParams({ bodyFont: value as FontValue })
										}
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
								<DensityPicker
									value={params.density}
									onValueChange={(value) => setParams({ density: value })}
								/>
							</SidebarGroup>

							{/* Icons */}
							<SidebarGroup>
								<SidebarGroupLabel className="text-fg-tertiary mb-2 px-0 font-normal">
									Icons
								</SidebarGroupLabel>
								<IconLibraryPicker
									value={params.iconLibrary}
									onValueChange={(value) => setParams({ iconLibrary: value })}
								/>
							</SidebarGroup>

							<SidebarGroup>
								<SidebarGroupLabel className="text-fg-tertiary mb-2 px-0 font-normal">
									Appearance Mode
								</SidebarGroupLabel>
								<AppearanceModePicker />
							</SidebarGroup>
						</ScrollArea>
					</SidebarContent>
				</TabsContent>
				<TabsContent value="components" className="flex min-h-0 flex-col">
					<SidebarContent className="overflow-hidden">
						<ScrollArea className="min-h-0 flex-1">
							<SidebarGroup className="py-3">
								<SidebarMenu>
									{components.map((name) => {
										const item = (
											<SidebarMenuButton
												type="button"
												size="sm"
												isActive={selectedComponent === name}
												aria-pressed={selectedComponent === name}
												onClick={() => setSelectedComponent(name)}
												className="h-10 px-3 text-[13px] font-medium">
												<Component className="size-4" aria-hidden="true" />
												<span>{name}</span>
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
			<SidebarFooter className="border-border flex flex-row gap-3 border-t px-3 py-3.5">
				<Button size="lg" variant="outline" className="flex-1" color="neutral">
					<Shuffle className="text-fg-secondary size-4" />
					Shuffle all
				</Button>
				<Button size="lg" variant="outline" className="w-fit" color="neutral">
					<Lock className="text-fg-secondary size-4" />
					Lock all
				</Button>
			</SidebarFooter>
		</Sidebar>
	)
}
