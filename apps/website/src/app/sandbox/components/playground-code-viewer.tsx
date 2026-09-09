"use client"

import React, { useEffect, useRef, useState } from "react"
import { Check, Copy, FileCode } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Button } from "@/styles/default/ui/button"
import { CodeArea } from "@/styles/default/ui/code-area"
import type { FilesData, SandboxComponentConfig } from "./types"

interface PlaygroundCodeViewerProps {
	files: FilesData
	activeComponentConfig: SandboxComponentConfig
	activeFile: string
	onSelectFile: (fileName: string) => void
	targetLineNumber?: number | null
}

export function PlaygroundCodeViewer({
	files,
	activeComponentConfig,
	activeFile,
	onSelectFile,
	targetLineNumber,
}: PlaygroundCodeViewerProps) {
	const [copied, setCopied] = useState(false)
	const { resolvedTheme } = useTheme()
	const codeContainerRef = useRef<HTMLDivElement>(null)

	const componentFiles = files[activeComponentConfig.filesKey] || {}
	const activeCode = componentFiles[activeFile] || ""

	const handleCopy = () => {
		navigator.clipboard.writeText(activeCode)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	// Scroll to target line number when set or changed
	useEffect(() => {
		if (!targetLineNumber) return

		const timer = setTimeout(() => {
			if (!codeContainerRef.current) return
			const highlighted = codeContainerRef.current.querySelector(
				".rs-highlighted-line"
			) as HTMLElement | null

			if (highlighted) {
				highlighted.scrollIntoView({
					behavior: "smooth",
					block: "center",
				})
			} else {
				const lines =
					codeContainerRef.current.querySelectorAll(".rs-line-number")
				const targetEl = lines[targetLineNumber - 1] as HTMLElement | null
				if (targetEl) {
					targetEl.scrollIntoView({
						behavior: "smooth",
						block: "center",
					})
				}
			}
		}, 150)

		return () => clearTimeout(timer)
	}, [targetLineNumber, activeFile])

	return (
		<div className="bg-bg text-fg relative flex flex-1 overflow-hidden">
			<style
				dangerouslySetInnerHTML={{
					__html: `
					.custom-shiki-container .rs-highlighted-line {
						background-color: rgba(59, 130, 246, 0.18) !important;
						border-left: 3px solid #3b82f6 !important;
						display: block !important;
						width: 100% !important;
						box-sizing: border-box !important;
						animation: pulse-inspect-line 2.5s ease-in-out infinite alternate !important;
					}
					@keyframes pulse-inspect-line {
						0% { background-color: rgba(59, 130, 246, 0.15); }
						100% { background-color: rgba(59, 130, 246, 0.32); }
					}
				`,
				}}
			/>

			{/* Inner Code Area Files List */}
			<div className="border-border bg-fill1/40 flex w-[200px] shrink-0 flex-col border-r">
				<div className="border-border bg-fill2/20 flex h-[48px] shrink-0 items-center border-b px-4">
					<span className="text-fg-secondary text-xs font-semibold uppercase tracking-wider">
						Files
					</span>
				</div>
				<div className="flex-1 space-y-1 overflow-y-auto p-2">
					{Object.keys(componentFiles).map((fileName) => {
						const isSelected = activeFile === fileName
						return (
							<button
								key={fileName}
								onClick={() => onSelectFile(fileName)}
								className={cn(
									"group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-xs font-medium transition-all duration-200",
									isSelected
										? "bg-primary text-primary-fg"
										: "text-fg-secondary hover:bg-fill3 hover:text-fg"
								)}>
								<FileCode
									className={cn(
										"size-3.5 shrink-0",
										isSelected
											? "text-primary-fg"
											: "text-fg-tertiary group-hover:text-primary"
									)}
								/>
								<span className="flex-1 truncate">{fileName}</span>
							</button>
						)
					})}
				</div>
			</div>

			{/* Main Code View Pane */}
			<div className="flex flex-1 flex-col overflow-hidden">
				{/* Code Pane Toolbar */}
				<div className="border-border bg-fill1 flex h-[48px] shrink-0 items-center justify-between border-b px-6">
					<div className="flex items-center gap-2.5">
						<span className="text-fg-secondary flex items-center gap-1.5 font-mono text-xs">
							{activeFile}
						</span>
						{targetLineNumber && (
							<span className="border-primary/30 bg-primary/15 text-primary animate-in fade-in zoom-in-95 flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-semibold duration-200">
								<span className="bg-primary size-1.5 animate-pulse rounded-full" />
								Line {targetLineNumber}
							</span>
						)}
					</div>
					<Button
						variant="outline"
						color="neutral"
						size="28"
						onClick={handleCopy}
						className="text-fg-secondary hover:text-fg font-semibold">
						{copied ? (
							<>
								<Check className="text-success-text size-3.5" />
								<span className="text-success-text">Copied!</span>
							</>
						) : (
							<>
								<Copy className="size-3.5" />
								<span>Copy Code</span>
							</>
						)}
					</Button>
				</div>

				{/* Code Editor Body */}
				<div
					ref={codeContainerRef}
					className="custom-shiki-container bg-bg flex-1 overflow-auto p-1">
					<CodeArea
						code={activeCode}
						language="tsx"
						theme={resolvedTheme === "dark" ? "github-dark" : "github-light"}
						lineNumbers={true}
						highlightLineNumbers={
							targetLineNumber ? [targetLineNumber] : undefined
						}
						className="no-scrollbar h-full w-full rounded-none bg-transparent p-0 font-mono text-[13px] leading-relaxed"
					/>
				</div>
			</div>
		</div>
	)
}
