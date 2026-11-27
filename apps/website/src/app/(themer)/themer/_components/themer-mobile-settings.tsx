"use client"

import { useState } from "react"
import {
	MobilePickerContext,
	type MobilePickerView,
} from "./themer-mobile-picker"
import {
	ChevronRight,
	Component,
	ChevronLeft,
	Undo2,
	RotateCcw,
	Shuffle,
	SwatchBook,
	Layers2,
	Palette,
	Spline,
	FlipHorizontal2,
	Star,
	SunMoon,
	Type,
	X,
} from "lucide-react"
import CornerPicker from "./corner-picker"
import AppearanceModePicker from "./appearance-mode-picker"
import DensityPicker from "./density-picker"
import { Button, IconButton } from "@/styles/default/ui/button"
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerTitle,
} from "@/registry/ui/drawer"
import { Divider } from "@/styles/default/ui/divider"
import { ScrollArea } from "@/styles/default/ui/scroll-area"
import { cn } from "@/lib/utils"
import { useThemerStore } from "@/lib/themer-store"
import {
	ThemerFundamentals,
	type FundamentalsSection,
} from "./themer-fundamentals"
import { ThemerDrawerContext } from "./themer-picker-placement"
import { ThemerSettings } from "./themer-sidebar"

import { ThemerMobileComponents } from "./themer-mobile-components"
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
	{ section: "radius", label: "Radius", title: "Radius", icon: Spline },
	{
		section: "spacing",
		label: "Spacing",
		title: "Spacing",
		icon: FlipHorizontal2,
	},
	{ section: "appearance", label: "Mode", title: "Mode", icon: SunMoon },
	{
		section: "components",
		label: "UI Bits",
		title: "UI Bits",
		icon: Component,
	},
] as const satisfies readonly {
	section: FundamentalsSection | "components"
	label: string
	title: string
	icon: typeof Star
}[]

export type MobileThemerShortcut = (typeof shortcuts)[number]["section"]
export type MobileThemerPanel = MobileThemerShortcut | "settings"

export const MOBILE_THEMER_DRAWER_ID = "themer-settings-drawer"

const shortcutButtonClass =
	"text-fg-secondary h-auto min-w-0 flex-1 flex-col gap-0.5 rounded-2xl! px-[11px] py-2.5 text-xs leading-tight font-medium"

const shortcutActions = [
	{ action: "shuffle", label: "Shuffle", icon: Shuffle },
	{ action: "reset", label: "Reset", icon: RotateCcw },
] as const

export function ThemerMobileShortcuts({
	selectedShortcut,
	openPanel,
	onSelect,
}: {
	selectedShortcut: MobileThemerShortcut
	openPanel: MobileThemerPanel | null
	onSelect: (panel: MobileThemerShortcut, trigger: HTMLButtonElement) => void
}) {
	const shuffleFundamentals = useThemerStore(
		(state) => state.shuffleFundamentals
	)
	const resetParams = useThemerStore((state) => state.resetParams)
	const actions = {
		shuffle: shuffleFundamentals,
		reset: resetParams,
	} as const

	return (
		<ScrollArea
			orientation="horizontal"
			type="auto"
			data-vaul-no-drag
			className="bg-bg w-full min-w-0 shrink-0 sm:hidden [&>[data-slot=scroll-area-scrollbar]]:h-1 [&>[data-slot=scroll-area-viewport]]:touch-pan-x [&>[data-slot=scroll-area-viewport]]:overscroll-x-contain">
			<div
				role="group"
				aria-label="Themer shortcuts"
				className="flex min-w-max gap-1 px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
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
								shortcutButtonClass,
								active && "bg-fill1-alpha hover:bg-fill1-alpha"
							)}
							onClick={(event) => onSelect(section, event.currentTarget)}>
							<Icon aria-hidden="true" />
							{label}
						</Button>
					)
				})}
				<Divider
					orientation="vertical"
					className="bg-alpha mx-1 self-center data-[orientation=vertical]:h-8"
				/>
				{shortcutActions.map(({ action, label, icon: Icon }) => (
					<Button
						key={action}
						type="button"
						size="sm"
						variant="ghost"
						color="neutral"
						className={shortcutButtonClass}
						onClick={actions[action]}>
						<Icon aria-hidden="true" />
						{label}
					</Button>
				))}
			</div>
		</ScrollArea>
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
	const [active, setActive] = useState<MobilePickerView | null>(null)
	const [target, setTarget] = useState<HTMLDivElement | null>(null)
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
				{...(active && {
					"aria-label": active.label,
					"aria-labelledby": undefined,
					"aria-describedby": undefined,
				})}
				onEscapeKeyDown={(event) => {
					if (!active) return
					event.preventDefault()
					active.back()
				}}
				className={cn(
					"max-h-[85dvh] gap-0 rounded-b-none p-0 pt-7 before:pointer-events-none before:absolute before:top-full before:h-px before:w-px before:content-[''] after:hidden! sm:hidden",
					!active &&
						(allSettings || panel === "components") &&
						"h-[min(85dvh,42rem)]"
				)}>
				<MobilePickerContext value={{ target, active, setActive }}>
					<div className={active ? "hidden" : "contents"}>
						{panel === "components" ? (
							<ThemerMobileComponents />
						) : panel === "preset" || panel === "color" ? (
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
															size="md"
															variant="ghost"
															color="neutral"
															aria-label="Close Colors drawer"
															className="text-fg-secondary">
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
													<span
														className="bg-border h-4 w-px"
														aria-hidden="true"
													/>
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
						) : panel === "appearance" ? (
							<>
								<DrawerDescription className="sr-only">
									Choose the default appearance mode for your theme.
								</DrawerDescription>
								<AppearanceModePicker onBack={() => onOpenChange(false)} />
							</>
						) : panel === "spacing" ? (
							<>
								<DrawerDescription className="sr-only">
									Choose the spacing scale for your theme.
								</DrawerDescription>
								<DensityPicker onBack={() => onOpenChange(false)} />
							</>
						) : panel === "radius" ? (
							<>
								<DrawerDescription className="sr-only">
									Choose a corner radius preset or adjust controls and
									containers individually.
								</DrawerDescription>
								<CornerPicker onBack={() => onOpenChange(false)} />
							</>
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
													<ChevronRight
														className="size-5!"
														aria-hidden="true"
													/>
												</Button>
											</div>
										</ScrollArea>
									)}
								</ThemerDrawerContext>
							</>
						)}
					</div>
					<div ref={setTarget} className="contents" />
				</MobilePickerContext>
			</DrawerContent>
		</Drawer>
	)
}
