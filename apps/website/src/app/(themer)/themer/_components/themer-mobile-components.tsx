import { useState } from "react"
import {
	ChevronLeft,
	ChevronRight,
	Component,
	Redo2,
	Shuffle,
	Undo2,
} from "lucide-react"
import { COMPONENTS_DATA } from "@/config/navigation-config"
import {
	DrawerClose,
	DrawerDescription,
	DrawerTitle,
} from "@/registry/ui/drawer"
import { Button, IconButton } from "@/styles/default/ui/button"
import { ScrollArea } from "@/styles/default/ui/scroll-area"
import { BadgeSettings } from "./component-settings/badge-settings"
import { ButtonSettings } from "./component-settings/button-settings"
import { useThemerPreset } from "@/lib/themer-preset"
import { cn } from "@/lib/utils"

const components = [...COMPONENTS_DATA].sort((a, b) => a.localeCompare(b))

const actions = [
	{ label: "Undo component changes", icon: Undo2 },
	{ label: "Redo component changes", icon: Redo2 },
	{ label: "Shuffle component settings", icon: Shuffle },
]

export function ThemerMobileComponents() {
	const [selectedComponent, setSelectedComponent] = useState("Button")
	const [params] = useThemerPreset()

	return (
		<div className="flex min-h-0 flex-1 flex-col pb-[env(safe-area-inset-bottom)]">
			<div className="flex shrink-0 touch-none items-center justify-between px-3 pb-2">
				<div className="flex items-center gap-2">
					<DrawerClose>
						<IconButton
							size="xs"
							variant="ghost"
							color="neutral"
							className="text-fg-secondary"
							aria-label="Close UI Bits">
							<ChevronLeft />
						</IconButton>
					</DrawerClose>
					<DrawerTitle className="text-fg text-base font-medium">
						UI Bits
					</DrawerTitle>
					<DrawerDescription className="sr-only">
						Browse the available Themer components.
					</DrawerDescription>
				</div>
				<div className="flex items-center gap-2">
					{actions.map(({ label, icon: Icon }) => (
						<IconButton
							key={label}
							size="md"
							variant="ghost"
							color="neutral"
							className="text-fg-secondary"
							aria-label={label}
							disabled>
							<Icon />
						</IconButton>
					))}
				</div>
			</div>
			<ScrollArea
				type="auto"
				data-vaul-no-drag
				className="min-h-0 flex-1 [&>[data-slot=scroll-area-viewport]]:absolute [&>[data-slot=scroll-area-viewport]]:inset-0 [&>[data-slot=scroll-area-viewport]]:touch-pan-y [&>[data-slot=scroll-area-viewport]]:overscroll-y-contain">
				<ul className="flex flex-col gap-0.5 px-3 pb-3">
					{components.map((name) => {
						const hasOverrides =
							(name === "Button" || name === "Badge") &&
							params.components[name] !== undefined
						const row = (
							<Button
								size="md"
								variant="ghost"
								color="neutral"
								aria-pressed={selectedComponent === name}
								className={cn(
									"text-fg w-full justify-start gap-2 px-2.5 font-normal",
									selectedComponent === name && "bg-fill1-alpha"
								)}
								onClick={() => setSelectedComponent(name)}>
								<Component className="text-fg-secondary" aria-hidden="true" />
								<span className="flex items-center gap-1">
									{name}
									{hasOverrides && (
										<>
											<span
												aria-hidden="true"
												className="bg-primary size-[5px] shrink-0 rounded-full"
											/>
											<span className="sr-only">Has component overrides</span>
										</>
									)}
								</span>
								<ChevronRight
									className="text-fg-tertiary ml-auto"
									aria-hidden="true"
								/>
							</Button>
						)
						return (
							<li key={name}>
								{name === "Button" ? (
									<ButtonSettings mobile>{row}</ButtonSettings>
								) : name === "Badge" ? (
									<BadgeSettings mobile>{row}</BadgeSettings>
								) : (
									row
								)}
							</li>
						)
					})}
				</ul>
			</ScrollArea>
		</div>
	)
}
