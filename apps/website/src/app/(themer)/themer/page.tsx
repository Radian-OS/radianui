"use client"

import { SidebarProvider, SidebarInset } from "@/styles/default/ui/sidebar"
import { ThemerSidebar } from "./_components/themer-sidebar"
import {
	ThemerMobileDrawer,
	ThemerMobileShortcuts,
	type MobileThemerPanel,
	type MobileThemerShortcut,
} from "./_components/themer-mobile-settings"
import { DeviceSize, ThemerTopbar } from "./_components/themer-topbar"
import { cn } from "@/lib/utils"
import { Suspense, useCallback, useEffect, useRef, useState } from "react"
import { useThemerPreset } from "@/lib/themer-preset"

const THEMER_PREVIEW_STORAGE_KEY = "radian-themer-preview"
const DEFAULT_PREVIEW = "preview-07"

function ThemerPage() {
	const [params] = useThemerPreset()
	const [selectedComponent, setSelectedComponent] = useState<string | null>(
		null
	)
	const [device, setDevice] = useState<DeviceSize>("desktop")
	const iframeRef = useRef<HTMLIFrameElement>(null)
	const [mobilePanel, setMobilePanel] = useState<MobileThemerPanel>("settings")
	const [selectedShortcut, setSelectedShortcut] =
		useState<MobileThemerShortcut>("preset")
	const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
	const mobileTriggerRef = useRef<HTMLButtonElement>(null)

	const openMobilePanel = (
		panel: MobileThemerPanel,
		trigger: HTMLButtonElement
	) => {
		mobileTriggerRef.current = trigger
		if (panel !== "settings") setSelectedShortcut(panel)
		setMobilePanel(panel)
		setMobileDrawerOpen(true)
	}

	useEffect(() => {
		const desktop = window.matchMedia("(min-width: 640px)")
		const closeOnDesktop = () => {
			if (desktop.matches) setMobileDrawerOpen(false)
		}
		desktop.addEventListener("change", closeOnDesktop)
		return () => desktop.removeEventListener("change", closeOnDesktop)
	}, [])

	useEffect(() => {
		try {
			const saved = localStorage.getItem(THEMER_PREVIEW_STORAGE_KEY)
			setSelectedComponent(saved || DEFAULT_PREVIEW)
		} catch {
			setSelectedComponent(DEFAULT_PREVIEW)
		}
	}, [])

	const handleSelectComponent = useCallback((component: string) => {
		setSelectedComponent(component)
		try {
			localStorage.setItem(THEMER_PREVIEW_STORAGE_KEY, component)
		} catch {}
	}, [])

	const iframeSrc = selectedComponent ? `/preview/${selectedComponent}` : null

	const postToIframe = useCallback((message: Record<string, unknown>) => {
		iframeRef.current?.contentWindow?.postMessage(message, "*")
	}, [])

	const syncAllToIframe = useCallback(() => {
		postToIframe({
			type: "all-params-sync",
			params,
		})
	}, [params, postToIframe])

	useEffect(() => {
		const handleMessage = (event: MessageEvent) => {
			if (event.data?.type === "preview-ready") {
				syncAllToIframe()
			}
		}

		window.addEventListener("message", handleMessage)
		return () => {
			window.removeEventListener("message", handleMessage)
		}
	}, [syncAllToIframe])

	// Iframe swallows pointer events, so Radix doesn't detect outside clicks through it.
	// When focus moves to the iframe (window blur), close any open floating elements via Escape.
	useEffect(() => {
		const closeOnIframeFocus = () => {
			document.dispatchEvent(
				new KeyboardEvent("keydown", { key: "Escape", bubbles: true })
			)
		}
		window.addEventListener("blur", closeOnIframeFocus)
		return () => window.removeEventListener("blur", closeOnIframeFocus)
	}, [])

	useEffect(() => {
		syncAllToIframe()
	}, [syncAllToIframe])

	return (
		<SidebarProvider
			className="h-dvh min-h-0 overflow-hidden"
			style={{ "--sidebar-width": "min(50vw, 430px)" } as React.CSSProperties}>
			<ThemerSidebar />

			<SidebarInset className="bg-fill1 min-h-0 min-w-0">
				<ThemerTopbar
					selectedComponent={selectedComponent ?? ""}
					onSelectComponent={handleSelectComponent}
					device={device}
					onDeviceChange={setDevice}
					mobileSettingsOpen={mobileDrawerOpen}
					onOpenMobileSettings={(trigger) =>
						openMobilePanel("settings", trigger)
					}
				/>
				<div
					className="relative flex min-h-0 flex-1 flex-col overflow-hidden px-2 pt-3 sm:p-4 lg:p-8"
					style={{
						backgroundImage:
							"radial-gradient(var(--color-fill2-alpha) 1px, transparent 1px)",
						backgroundSize: "20px 20px",
					}}>
					<div
						className={cn(
							"border-border bg-bg mx-auto flex min-h-0 max-w-full flex-1 overflow-hidden rounded-xl border shadow-sm transition-all duration-200",
							device === "mobile" && "w-[375px]",
							device === "tablet" && "w-[768px]",
							device === "desktop" && "w-full",
							"max-sm:w-full max-sm:rounded-b-none"
						)}>
						{iframeSrc && (
							<iframe
								ref={iframeRef}
								src={iframeSrc}
								className="h-full w-full border-0"
								title="Preview"
								onLoad={syncAllToIframe}
							/>
						)}
					</div>
				</div>
				<ThemerMobileShortcuts
					selectedShortcut={selectedShortcut}
					openPanel={mobileDrawerOpen ? mobilePanel : null}
					onSelect={openMobilePanel}
				/>
			</SidebarInset>
			<ThemerMobileDrawer
				panel={mobilePanel}
				open={mobileDrawerOpen}
				onOpenChange={setMobileDrawerOpen}
				onOpenAllSettings={() => setMobilePanel("settings")}
				onCloseAutoFocus={(event) => {
					event.preventDefault()
					mobileTriggerRef.current?.focus({ preventScroll: true })
				}}
			/>
		</SidebarProvider>
	)
}

export default function ThemerPageWrapper() {
	return (
		<Suspense fallback={<div className="bg-fill2 flex h-dvh w-full" />}>
			<ThemerPage />
		</Suspense>
	)
}
