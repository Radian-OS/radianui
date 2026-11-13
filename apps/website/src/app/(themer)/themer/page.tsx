"use client"

import { SidebarProvider, SidebarInset } from "@/styles/default/ui/sidebar"
import { ThemerSidebar } from "./_components/themer-sidebar"
import { DeviceSize, ThemerTopbar } from "./_components/themer-topbar"
import { cn } from "@/lib/utils"
import {
	Suspense,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react"
import { useThemerPreset } from "@/lib/themer-preset"

function ThemerPage() {
	const [params, setParams] = useThemerPreset()
	const [selectedComponent, setSelectedComponent] =
		useState<string>("preview-03")
	const [device, setDevice] = useState<DeviceSize>("desktop")
	const iframeRef = useRef<HTMLIFrameElement>(null)

	const iframeSrc = `/preview/${selectedComponent}`

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

	useEffect(() => {
		syncAllToIframe()
	}, [syncAllToIframe])

	return (
		<SidebarProvider
			style={{ "--sidebar-width": "430px" } as React.CSSProperties}>
			<ThemerSidebar />

			<SidebarInset className="bg-fill1">
				<ThemerTopbar
					selectedComponent={selectedComponent}
					onSelectComponent={setSelectedComponent}
					device={device}
					onDeviceChange={setDevice}
				/>
				<div
					className="relative flex flex-1 flex-col overflow-auto p-4 md:p-8"
					style={{
						backgroundImage:
							"radial-gradient(var(--color-fill2-alpha) 1px, transparent 1px)",
						backgroundSize: "20px 20px",
					}}>
					<div
						className={cn(
							"border-border bg-bg mx-auto flex flex-1 overflow-hidden rounded-xl border shadow-sm transition-all duration-200",
							device === "mobile" && "w-[375px]",
							device === "tablet" && "w-[768px]",
							device === "desktop" && "w-full"
						)}>
						<iframe
							ref={iframeRef}
							src={iframeSrc}
							className="h-full w-full border-0"
							title="Preview"
							onLoad={syncAllToIframe}
						/>
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}

export default function ThemerPageWrapper() {
	return (
		<Suspense fallback={<div className="bg-fill2 flex h-screen w-full" />}>
			<ThemerPage />
		</Suspense>
	)
}
