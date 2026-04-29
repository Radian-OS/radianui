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

export default function Page() {
	return (
		<Suspense>
			<ThemerPage />
		</Suspense>
	)
}

function ThemerPage() {
	const [params] = useThemerPreset()
	const [selectedComponent, setSelectedComponent] = useState<string>("preview")

	const iframeRef = useRef<HTMLIFrameElement>(null)

	const iframeSrc = useMemo(
		() =>
			`/preview/test?primaryColor=${params.primaryColor}&component=${selectedComponent}&headingFont=${params.headingFont}&bodyFont=${params.bodyFont}&radius=${params.radius}&template=${params.template}&style=${params.style}&useSrcDir=${params.useSrcDir}`,
		[]
	)

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
		postToIframe({ type: "component-change", component: selectedComponent })
	}, [selectedComponent])

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
		const iframe = iframeRef.current
		if (!iframe?.contentWindow) return

		iframe.contentWindow.postMessage(
			{ type: "radius-change", radius: params.radius },
			"*"
		)
	}, [params.radius])

	return (
		<div className="bg-fill1 flex h-screen w-full">
			<ThemerSidebar
				selectedComponent={selectedComponent}
				setSelectedComponent={setSelectedComponent}
			/>

			{/* Preview Area */}
			<main className="flex flex-1 flex-col overflow-hidden p-5">
				<div className="border-border bg-elevation-level1 flex flex-1 overflow-hidden rounded-xl border shadow-sm">
					<iframe ref={iframeRef} src={iframeSrc} className="h-full w-full" />
				</div>
			</main>
		</div>
	)
}
