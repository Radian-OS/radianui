import { notFound } from "next/navigation"

export default function Page() {
	notFound()
}

/*
"use client"

import {
	Suspense,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react"
import { useThemerPreset } from "@/lib/themer-preset"
import { ThemerSidebar } from "./_components/themer-sidebar"

function ThemerPage() {
	const [params] = useThemerPreset()
	const [selectedComponent, setSelectedComponent] =
		useState<string>("preview-02")

	const iframeRef = useRef<HTMLIFrameElement>(null)

	const iframeSrc = useMemo(() => {
		const searchParams = new URLSearchParams({
			component: selectedComponent,
			headingFont: params.headingFont,
			bodyFont: params.bodyFont,
			radius: params.radius,
			template: params.template,
			style: params.style,
			useSrcDir: String(params.useSrcDir),
			iconLibrary: params.iconLibrary,
		})

		if (params.primaryColor) {
			searchParams.set("primaryColor", params.primaryColor)
		}

		if (params.baseColor) {
			searchParams.set("baseColor", params.baseColor)
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
	}, [params.primaryColor])

	useEffect(() => {
		postToIframe({
			type: "base-color-change",
			baseColor: params.baseColor,
		})
	}, [params.baseColor])

	useEffect(() => {
		postToIframe({ type: "style-change", style: params.style })
	}, [params.style])

	useEffect(() => {
		postToIframe({
			type: "heading-font-change",
			headingFont: params.headingFont,
		})
	}, [params.headingFont])

	useEffect(() => {
		postToIframe({ type: "body-font-change", bodyFont: params.bodyFont })
	}, [params.bodyFont])

	useEffect(() => {
		postToIframe({ type: "template-change", template: params.template })
	}, [params.template])

	useEffect(() => {
		postToIframe({
			type: "icon-library-change",
			iconLibrary: params.iconLibrary,
		})
	}, [params.iconLibrary])

	useEffect(() => {
		const iframe = iframeRef.current
		if (!iframe?.contentWindow) return

		iframe.contentWindow.postMessage(
			{ type: "radius-change", radius: params.radius },
			"*"
		)
	}, [params.radius])

	return (
		<div className="bg-fill2 flex h-screen w-full">
			<ThemerSidebar
				selectedComponent={selectedComponent}
				setSelectedComponent={setSelectedComponent}
			/>

			// Preview Area
			<main className="flex flex-1 flex-col overflow-hidden p-5">
				<div className="border-border flex flex-1 overflow-hidden rounded-xl border shadow-sm">
					<iframe ref={iframeRef} src={iframeSrc} className="h-full w-full" />
				</div>
			</main>
		</div>
	)
}
*/
