"use client"

import * as React from "react"
import {
	BoldIcon,
	BookmarkIcon,
	Computer,
	ExternalLink,
	ItalicIcon,
	Moon,
	SunMedium,
	UnderlineIcon,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/registry/ui/button"
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuGroup,
	ContextMenuItem,
	ContextMenuSeparator,
	ContextMenuShortcut,
	ContextMenuTrigger,
} from "@/registry/ui/context-menu"
import {
	Menubar,
	MenubarCheckboxItem,
	MenubarContent,
	MenubarGroup,
	MenubarItem,
	MenubarMenu,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarSeparator,
	MenubarShortcut,
	MenubarTrigger,
} from "@/registry/ui/menubar"
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/registry/ui/navigation-menu"
import {
	Stepper,
	StepperIndicator,
	StepperItem,
	StepperNav,
	StepperSeparator,
	StepperTrigger,
} from "@/registry/ui/stepper"
import { Toggle } from "@/registry/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/registry/ui/toggle-group"

function Card({
	title,
	variants,
	children,
	href,
	allowOverflow = false,
}: {
	title: string
	variants: string
	children: React.ReactNode
	href: string
	allowOverflow?: boolean
}) {
	return (
		<div className="border-soft bg-bg flex flex-col rounded-xl border p-5 shadow-sm">
			<div className="mb-6 flex items-center justify-between">
				<span className="text-fg text-sm font-semibold">{title}</span>
				<span className="text-fg-secondary text-xs">{variants}</span>
			</div>
			<div
				className={`relative mb-6 flex min-h-[140px] flex-1 items-center justify-center ${allowOverflow ? "overflow-visible" : "overflow-hidden"}`}>
				<div className="relative z-10 flex w-full items-center justify-center">
					{children}
				</div>
			</div>
			<Button
				variant="soft"
				size="36"
				color="neutral"
				className="w-full"
				asChild>
				<Link href={href}>
					<ExternalLink className="text-fg-tertiary" /> View page
				</Link>
			</Button>
		</div>
	)
}

function PreviewWrapper({
	children,
	scale = 0.85,
}: {
	children: React.ReactNode
	scale?: number
}) {
	return (
		<div
			className="select-none"
			style={{ transform: `scale(${scale})` }}
			aria-hidden="true">
			{children}
		</div>
	)
}

const stepperSteps = [1, 2, 3, 4]

function StepperDemo() {
	return (
		<Stepper defaultValue={2} className="mx-10 w-full max-w-xs space-y-4">
			<StepperNav>
				{stepperSteps.map((step) => (
					<StepperItem key={step} step={step}>
						<StepperTrigger>
							<StepperIndicator className="rounded-lg">{step}</StepperIndicator>
						</StepperTrigger>
						{stepperSteps.length > step && (
							<StepperSeparator className="group-data-[state=completed]/step:bg-primary" />
						)}
					</StepperItem>
				))}
			</StepperNav>
		</Stepper>
	)
}

function MenubarDemo() {
	return (
		<Menubar className="w-fit">
			<MenubarMenu>
				<MenubarTrigger>File</MenubarTrigger>
				<MenubarContent>
					<MenubarGroup>
						<MenubarItem>
							New Tab <MenubarShortcut>⌘T</MenubarShortcut>
						</MenubarItem>
						<MenubarItem>
							New Window <MenubarShortcut>⌘N</MenubarShortcut>
						</MenubarItem>
						<MenubarItem disabled>New Incognito Window</MenubarItem>
					</MenubarGroup>
					<MenubarSeparator />
					<MenubarGroup>
						<MenubarItem>
							Print... <MenubarShortcut>⌘P</MenubarShortcut>
						</MenubarItem>
					</MenubarGroup>
				</MenubarContent>
			</MenubarMenu>
			<MenubarMenu>
				<MenubarTrigger>Edit</MenubarTrigger>
				<MenubarContent>
					<MenubarGroup>
						<MenubarItem>
							Undo <MenubarShortcut>⌘Z</MenubarShortcut>
						</MenubarItem>
						<MenubarItem>
							Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
						</MenubarItem>
					</MenubarGroup>
					<MenubarSeparator />
					<MenubarGroup>
						<MenubarItem>Cut</MenubarItem>
						<MenubarItem>Copy</MenubarItem>
						<MenubarItem>Paste</MenubarItem>
					</MenubarGroup>
				</MenubarContent>
			</MenubarMenu>
			<MenubarMenu>
				<MenubarTrigger>View</MenubarTrigger>
				<MenubarContent className="w-44">
					<MenubarGroup>
						<MenubarCheckboxItem>Bookmarks Bar</MenubarCheckboxItem>
						<MenubarCheckboxItem>Full URLs</MenubarCheckboxItem>
					</MenubarGroup>
					<MenubarSeparator />
					<MenubarGroup>
						<MenubarItem inset>
							Reload <MenubarShortcut>⌘R</MenubarShortcut>
						</MenubarItem>
						<MenubarItem disabled inset>
							Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
						</MenubarItem>
					</MenubarGroup>
					<MenubarSeparator />
					<MenubarGroup>
						<MenubarItem inset>Toggle Fullscreen</MenubarItem>
					</MenubarGroup>
				</MenubarContent>
			</MenubarMenu>
			<MenubarMenu>
				<MenubarTrigger>Profiles</MenubarTrigger>
				<MenubarContent>
					<MenubarRadioGroup value="benoit">
						<MenubarRadioItem value="andy">Andy</MenubarRadioItem>
						<MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
						<MenubarRadioItem value="luis">Luis</MenubarRadioItem>
					</MenubarRadioGroup>
					<MenubarSeparator />
					<MenubarGroup>
						<MenubarItem inset>Edit...</MenubarItem>
					</MenubarGroup>
					<MenubarSeparator />
					<MenubarGroup>
						<MenubarItem inset>Add Profile...</MenubarItem>
					</MenubarGroup>
				</MenubarContent>
			</MenubarMenu>
		</Menubar>
	)
}

function ContextMenuDemo() {
	return (
		<ContextMenu>
			<ContextMenuTrigger className="flex h-28 w-full max-w-xs items-center justify-center rounded-xl border border-dashed px-4 text-sm">
				Right click here
			</ContextMenuTrigger>
			<ContextMenuContent className="w-48">
				<ContextMenuGroup>
					<ContextMenuItem>
						Back
						<ContextMenuShortcut>⌘[</ContextMenuShortcut>
					</ContextMenuItem>
					<ContextMenuItem disabled>
						Forward
						<ContextMenuShortcut>⌘]</ContextMenuShortcut>
					</ContextMenuItem>
					<ContextMenuItem>
						Reload
						<ContextMenuShortcut>⌘R</ContextMenuShortcut>
					</ContextMenuItem>
				</ContextMenuGroup>
				<ContextMenuSeparator />
				<ContextMenuGroup>
					<ContextMenuItem>Show Bookmarks</ContextMenuItem>
				</ContextMenuGroup>
			</ContextMenuContent>
		</ContextMenu>
	)
}

function ToggleDemo() {
	return (
		<div className="flex items-center gap-3">
			<Toggle aria-label="Toggle bookmark">
				<BookmarkIcon className="group-data-[state=on]/toggle:fill-fg-secondary text-fg-secondary" />
				Bookmark
			</Toggle>
			<div className="border-border bg-bg flex items-center justify-center gap-1 rounded-lg border p-1">
				<Toggle
					variant="ghost"
					className="p-1.5"
					size="32"
					aria-label="Toggle bold">
					<BoldIcon className="text-fg-secondary" />
				</Toggle>
				<Toggle
					defaultPressed
					variant="ghost"
					className="p-1.5"
					size="32"
					aria-label="Toggle italic">
					<ItalicIcon className="text-fg-secondary" />
				</Toggle>
				<Toggle
					className="p-1.5"
					variant="ghost"
					size="32"
					aria-label="Toggle underline">
					<UnderlineIcon className="text-fg-secondary !size-5" />
				</Toggle>
			</div>
		</div>
	)
}

function ToggleGroupDemo() {
	return (
		<ToggleGroup
			spacing={0}
			type="single"
			defaultValue="light"
			variant="outline">
			<ToggleGroupItem value="light" aria-label="Light theme">
				<SunMedium className="text-fg-secondary" />
				Light
			</ToggleGroupItem>
			<ToggleGroupItem value="dark" aria-label="Dark theme">
				<Moon className="text-fg-secondary" />
				Dark
			</ToggleGroupItem>
			<ToggleGroupItem value="system" aria-label="System theme">
				<Computer className="text-fg-secondary" />
				System
			</ToggleGroupItem>
		</ToggleGroup>
	)
}

function NavigationMenuDemo() {
	return (
		<NavigationMenu viewport={false}>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
						<Link href="#">Features</Link>
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Products</NavigationMenuTrigger>
					<NavigationMenuContent
						align="left"
						className="min-w-50 rounded-2xl p-2">
						<ul className="flex w-full flex-col gap-1.5 px-1.5 py-1">
							<li>
								<NavigationMenuLink asChild>
									<Link href="#">Workspace</Link>
								</NavigationMenuLink>
							</li>
							<li>
								<NavigationMenuLink asChild>
									<Link href="#">Data Tables</Link>
								</NavigationMenuLink>
							</li>
							<li>
								<NavigationMenuLink asChild>
									<Link href="#">Components</Link>
								</NavigationMenuLink>
							</li>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Pricing</NavigationMenuTrigger>
					<NavigationMenuContent
						align="center"
						className="min-w-50 rounded-2xl p-2">
						<ul className="flex w-full flex-col gap-1.5 px-1.5 py-1">
							<li>
								<NavigationMenuLink asChild>
									<Link href="#">Plans &amp; Pricing</Link>
								</NavigationMenuLink>
							</li>
							<li>
								<NavigationMenuLink asChild>
									<Link href="#">Enterprise</Link>
								</NavigationMenuLink>
							</li>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	)
}

export function ComponentExpansionGrid() {
	return (
		<div className="my-9 mb-6 grid grid-cols-1 gap-5 md:grid-cols-2">
			<Card title="Stepper" variants="" href="/docs/components/stepper">
				<StepperDemo />
			</Card>

			<Card title="Menu Bar" variants="" href="/docs/components/menubar">
				<MenubarDemo />
			</Card>

			<Card
				title="Context Menu"
				variants=""
				href="/docs/components/context-menu">
				<PreviewWrapper scale={0.9}>
					<ContextMenuDemo />
				</PreviewWrapper>
			</Card>

			<Card title="Toggle" variants="" href="/docs/components/toggle">
				<PreviewWrapper>
					<ToggleDemo />
				</PreviewWrapper>
			</Card>

			<Card
				title="Toggle Group"
				variants=""
				href="/docs/components/toggle-group">
				<PreviewWrapper>
					<ToggleGroupDemo />
				</PreviewWrapper>
			</Card>

			<Card
				title="Navigation Menu"
				variants=""
				href="/docs/components/navigation-menu"
				allowOverflow>
				<NavigationMenuDemo />
			</Card>
		</div>
	)
}
