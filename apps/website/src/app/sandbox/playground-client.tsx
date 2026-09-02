"use client"

import React, { useRef, useState } from "react"
import { SidebarInset, SidebarProvider } from "@/styles/default/ui/sidebar"
import { PlaygroundCodeViewer } from "./components/playground-code-viewer"
import { PlaygroundHeader } from "./components/playground-header"
import { PlaygroundPreview } from "./components/playground-preview"
import { PlaygroundSidebar } from "./components/playground-sidebar"
import {
	type DeviceSize,
	type FilesData,
	type PreviewKey,
	type ViewMode,
	sandboxComponents,
} from "./components/types"
import { useInspectMode } from "./components/use-inspect-mode"

export interface PlaygroundClientProps {
	files: FilesData
}

export function PlaygroundClient({ files }: PlaygroundClientProps) {
	const [activeComponent, setActiveComponent] = useState<PreviewKey>("hero-21")
	const [activeFile, setActiveFile] = useState<string>("hero-section.tsx")
	const [viewMode, setViewMode] = useState<ViewMode>("preview")
	const [deviceSize, setDeviceSize] = useState<DeviceSize>("desktop")

	const iframeRef = useRef<HTMLIFrameElement>(null)

	const activeComponentConfig =
		sandboxComponents.find((c) => c.id === activeComponent) ||
		sandboxComponents[0]

	useInspectMode(iframeRef, viewMode, activeComponent)

	const handleSelectComponent = (
		component: PreviewKey,
		defaultFile: string
	) => {
		setActiveComponent(component)
		setActiveFile(defaultFile)
	}

	return (
		<SidebarProvider className="h-svh" defaultWidth="13.5rem">
			<PlaygroundSidebar
				activeComponent={activeComponent}
				onSelectComponent={handleSelectComponent}
			/>

			<SidebarInset className="bg-bg relative flex min-h-0 flex-1 flex-col overflow-hidden">
				<PlaygroundHeader
					activeComponentConfig={activeComponentConfig}
					activeFile={activeFile}
					viewMode={viewMode}
					onViewModeChange={setViewMode}
					deviceSize={deviceSize}
					onDeviceSizeChange={setDeviceSize}
				/>

				<div className="flex min-h-0 flex-1 overflow-hidden">
					<div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden">
						{(viewMode === "preview" || viewMode === "inspect") && (
							<PlaygroundPreview
								activeComponentConfig={activeComponentConfig}
								deviceSize={deviceSize}
								iframeRef={iframeRef}
							/>
						)}

						{viewMode === "code" && (
							<PlaygroundCodeViewer
								files={files}
								activeComponentConfig={activeComponentConfig}
								activeFile={activeFile}
								onSelectFile={setActiveFile}
							/>
						)}
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
