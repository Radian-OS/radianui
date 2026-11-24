"use client"

import {
	ChevronRight,
	ChevronLeft,
	Undo2,
	Shuffle,
	SwatchBook,
	Layers2,
	Palette,
	Radius,
	Scaling,
	Star,
	Type,
	X,
} from "lucide-react"
import { Button, IconButton } from "@/styles/default/ui/button"
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerTitle,
} from "@/registry/ui/drawer"
import { ScrollArea } from "@/styles/default/ui/scroll-area"
import { cn } from "@/lib/utils"
import {
	ThemerFundamentals,
	type FundamentalsSection,
} from "./themer-fundamentals"
import { ThemerDrawerContext } from "./themer-picker-placement"
import { ThemerSettings } from "./themer-sidebar"

import { ThemerMobilePresets } from "./themer-mobile-presets"

const shortcuts = [
	{ section: "preset", label: "Preset", title: "Presets", icon: Star },
	{ section: "color", label: "Color", title: "Colors", icon: Palette },
	{
		section: "neutral",
		label: "Neutral",
		title: "Neutral base",
		icon: Layers2,
	},
	{ section: "fonts", label: "Fonts", title: "Fonts", icon: Type },
	{ section: "radius", label: "Radius", title: "Radius", icon: Radius },
	{ section: "spacing", label: "Spacing", title: "Spacing", icon: Scaling },
] as const satisfies readonly {
	section: FundamentalsSection
	label: string
	title: string
	icon: typeof Star
}[]

export type MobileThemerShortcut = (typeof shortcuts)[number]["section"]
export type MobileThemerPanel = MobileThemerShortcut | "settings"

export const MOBILE_THEMER_DRAWER_ID = "themer-settings-drawer"

export function ThemerMobileShortcuts({
	selectedShortcut,
	openPanel,
	onSelect,
}: {
	selectedShortcut: MobileThemerShortcut
	openPanel: MobileThemerPanel | null
	onSelect: (panel: MobileThemerShortcut, trigger: HTMLButtonElement) => void
}) {
	return (
		<div
			role="group"
			aria-label="Themer shortcuts"
			className="bg-bg grid shrink-0 grid-cols-6 gap-1 px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:hidden">
			{shortcuts.map(({ section, label, icon: Icon }) => {
				const expanded = openPanel === section
				const active = selectedShortcut === section

				return (
					<Button
						key={section}
						size="sm"
						variant="ghost"
						color="neutral"
						aria-haspopup="dialog"
						aria-current={active || undefined}
						aria-expanded={expanded}
						aria-controls={expanded ? MOBILE_THEMER_DRAWER_ID : undefined}
						className={cn(
							"text-fg-secondary h-auto w-full min-w-0 flex-col gap-0.5 rounded-2xl! px-[11px] py-2.5 text-xs leading-tight font-medium",
							active && "bg-fill1-alpha hover:bg-fill1-alpha"
						)}
						onClick={(event) => onSelect(section, event.currentTarget)}>
						<Icon aria-hidden="true" />
						{label}
					</Button>
				)
			})}
		</div>
	)
}

export function ThemerMobileDrawer({
	panel,
	open,
	onOpenChange,
	onCloseAutoFocus,
	onOpenAllSettings,
	onSelectShortcut,
}: {
	panel: MobileThemerPanel
	open: boolean
	onOpenChange: (open: boolean) => void
	onCloseAutoFocus: (event: Event) => void
	onOpenAllSettings: () => void
	onSelectShortcut: (
		panel: MobileThemerShortcut,
		trigger: HTMLButtonElement
	) => void
}) {
	const allSettings = panel === "settings"
	const title =
		shortcuts.find(({ section }) => section === panel)?.title ??
		"Themer settings"

	return (
		<Drawer
			open={open}
			onOpenChange={onOpenChange}
			direction="bottom"
			variant="rounded"
			handle
			scrollLockTimeout={0}>
			<DrawerContent
				id={MOBILE_THEMER_DRAWER_ID}
				onCloseAutoFocus={onCloseAutoFocus}
				className={cn(
					"max-h-[85dvh] gap-0 rounded-b-none p-0 pt-7 before:pointer-events-none before:absolute before:top-full before:h-px before:w-px before:content-[''] after:hidden! sm:hidden",
					allSettings && "h-[min(85dvh,42rem)]"
				)}>
				{panel === "preset" || panel === "color" ? (
					<ScrollArea
						type="auto"
						className="min-h-0 [&_[data-slot=scroll-area-viewport]]:max-h-[calc(85dvh-28px)] [&_[data-slot=scroll-area-viewport]]:overflow-y-auto!">
						{panel === "preset" ? (
							<ThemerMobilePresets />
						) : (
							<ThemerDrawerContext value={true}>
								<div className="flex flex-col gap-2 px-3 pb-[max(12px,env(safe-area-inset-bottom))]">
									<div className="flex touch-none items-center justify-between">
										<div className="flex items-center gap-2">
											<DrawerClose>
												<IconButton
													size="xs"
													variant="ghost"
													color="neutral"
													aria-label="Close Colors drawer"
													className="text-fg-secondary size-5 p-0 [&>svg]:size-5">
													<ChevronLeft />
												</IconButton>
											</DrawerClose>
											<DrawerTitle className="text-fg text-base font-medium">
												Colors
											</DrawerTitle>
										</div>
										<DrawerDescription className="sr-only">
											Edit the primary color and additional color schemes.
										</DrawerDescription>
										<div className="flex items-center gap-2">
											<IconButton
												size="md"
												variant="ghost"
												color="neutral"
												className="text-fg-secondary"
												disabled
												aria-label="Undo colors">
												<Undo2 />
											</IconButton>
											<IconButton
												size="md"
												variant="ghost"
												color="neutral"
												className="text-fg-secondary"
												disabled
												aria-label="Shuffle all colors">
												<Shuffle />
											</IconButton>
											<span className="bg-border h-4 w-px" aria-hidden="true" />
											<IconButton
												size="md"
												variant="ghost"
												color="neutral"
												className="text-fg-secondary"
												disabled
												aria-label="Color library">
												<SwatchBook />
											</IconButton>
										</div>
									</div>
									<ThemerFundamentals section="color" />
								</div>
							</ThemerDrawerContext>
						)}
					</ScrollArea>
				) : panel === "neutral" || panel === "fonts" ? (
					<>
						<DrawerTitle className="sr-only">
							{panel === "fonts" ? "Typography" : "Neutral Base"}
						</DrawerTitle>
						<DrawerDescription className="sr-only">
							Customize your theme and preview the changes.
						</DrawerDescription>
						<ThemerDrawerContext value={true}>
							<div className="px-3 pb-2">
								<ThemerFundamentals section={panel} />
							</div>
						</ThemerDrawerContext>
						<ThemerMobileShortcuts
							selectedShortcut={panel}
							openPanel={panel}
							onSelect={onSelectShortcut}
						/>
					</>
				) : (
					<>
						<div className="border-border flex h-11 shrink-0 touch-none items-center justify-between gap-2 border-b px-4">
							<DrawerTitle className="text-base font-semibold">
								{title}
							</DrawerTitle>
							<DrawerDescription className="sr-only">
								Customize your theme and preview the changes.
							</DrawerDescription>
							<DrawerClose>
								<IconButton
									size="xs"
									color="neutral"
									variant="ghost"
									aria-label="Close Themer settings">
									<X aria-hidden="true" />
								</IconButton>
							</DrawerClose>
						</div>
						<ThemerDrawerContext value={true}>
							{allSettings ? (
								<div className="flex min-h-0 flex-1 flex-col pb-[env(safe-area-inset-bottom)]">
									<ThemerSettings />
								</div>
							) : (
								<ScrollArea
									type="auto"
									className="min-h-0 [&_[data-slot=scroll-area-viewport]]:max-h-[calc(85dvh-4.5rem)] [&_[data-slot=scroll-area-viewport]]:overscroll-y-none [&:not(:has([data-slot=scroll-area-scrollbar]))_[data-slot=scroll-area-viewport]]:touch-none [&:not(:has([data-slot=scroll-area-scrollbar]))_[data-slot=scroll-area-viewport]]:overflow-y-hidden!">
									<div className="flex flex-col gap-3 px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
										<ThemerFundamentals section={panel} />
										<Button
											size="sm"
											color="neutral"
											variant="ghost"
											className="w-full justify-between"
											onClick={onOpenAllSettings}>
											All settings
											<ChevronRight aria-hidden="true" />
										</Button>
									</div>
								</ScrollArea>
							)}
						</ThemerDrawerContext>
					</>
				)}
			</DrawerContent>
		</Drawer>
	)
}
