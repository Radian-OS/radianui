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

	const iframeSrc = useMemo(() => {
		const searchParams = new URLSearchParams({
			component: selectedComponent,
			primaryColor: params.primaryColor,
			headingFont: params.headingFont,
			bodyFont: params.bodyFont,
			radius: params.radius,
			controlRadius: params.controlRadius,
			template: params.template,
			style: params.style,
			useSrcDir: String(params.useSrcDir),
			iconLibrary: params.iconLibrary,
			density: params.density,
		})

		if (params.primaryColor) {
			searchParams.set("primaryColor", params.primaryColor)
		}

		if (params.baseColor) {
			searchParams.set("baseColor", params.baseColor)
		}

		if (params.iconLibrary) {
			searchParams.set("iconLibrary", params.iconLibrary)
		}

		if (params.density) {
			searchParams.set("density", params.density)
		}

		return `/preview/${selectedComponent}?${searchParams.toString()}`
	}, [selectedComponent])

	const postToIframe = useCallback((message: Record<string, unknown>) => {
		iframeRef.current?.contentWindow?.postMessage(message, "*")
	}, [])

	useEffect(() => {
		postToIframe({
			type: "primary-color-change",
			primaryColor: params.primaryColor,
		})
	}, [params.primaryColor, postToIframe])

	useEffect(() => {
		postToIframe({
			type: "heading-font-change",
			headingFont: params.headingFont,
		})
	}, [params.headingFont, postToIframe])

	useEffect(() => {
		postToIframe({ type: "body-font-change", bodyFont: params.bodyFont })
	}, [params.bodyFont, postToIframe])

	useEffect(() => {
		postToIframe({
			type: "icon-library-change",
			iconLibrary: params.iconLibrary,
		})
	}, [params.iconLibrary, postToIframe])

	useEffect(() => {
		postToIframe({
			type: "density-change",
			density: params.density,
		})
	}, [params.density, postToIframe])

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
