"use client"

import { useState } from "react"
import { Button } from "@/registry/ui/button"
import { SidebarMenuButtonProps, SidebarProps } from "@/registry/ui/sidebar"
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/registry/ui/sidebar"
import { AppSidebar } from "./app-sidebar"

type Variant = NonNullable<SidebarMenuButtonProps["variant"]>
type Theme = NonNullable<SidebarProps["theme"]>

const variants: Variant[] = ["strong", "soft", "neutral"]
const themes: Theme[] = ["gray-body", "gray", "default", "inverse"]

export function SidebarPlayground() {
	const [activeVariant, setActiveVariant] = useState<Variant>("neutral")
	const [activeTheme, setActiveTheme] = useState<Theme>("gray-body")

	return (
		<SidebarProvider>
			<AppSidebar menuButtonVariant={activeVariant} theme={activeTheme} />
			<SidebarInset>
				<div className="flex w-full flex-1 flex-col">
					<div className="border-soft bg-bg flex items-center gap-2 border-b p-4">
						<SidebarTrigger />
						<span className="text-base font-medium">Pipeline</span>
					</div>
					<div className="flex h-full flex-col items-center justify-center gap-8 p-8">
						<div className="flex flex-col items-center gap-3">
							<span className="text-fg-secondary text-xs font-medium uppercase tracking-widest">
								SidebarMenuButton Variant
							</span>
							<span className="text-fg text-xl font-semibold">
								{activeVariant}
							</span>
							<div className="flex flex-wrap justify-center gap-2">
								{variants.map((variant) => (
									<Button
										key={variant}
										variant={activeVariant === variant ? "strong" : "outline"}
										color="neutral"
										size="32"
										onClick={() => setActiveVariant(variant)}>
										{variant}
									</Button>
								))}
							</div>
						</div>
						<div className="flex flex-col items-center gap-3">
							<span className="text-fg-secondary text-xs font-medium uppercase tracking-widest">
								Sidebar Theme
							</span>
							<span className="text-fg text-xl font-semibold">
								{activeTheme}
							</span>
							<div className="flex flex-wrap justify-center gap-2">
								{themes.map((theme) => (
									<Button
										key={theme}
										variant={activeTheme === theme ? "strong" : "outline"}
										color="neutral"
										size="32"
										onClick={() => setActiveTheme(theme)}>
										{theme}
									</Button>
								))}
							</div>
						</div>
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
