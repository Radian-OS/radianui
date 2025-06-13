"use client"

import React, { useEffect, useRef, useState } from "react"
import { Check, Code2, Copy, Eye, Maximize, Terminal } from "lucide-react"
import Link from "next/link"
import { useCopyPaste } from "@/hooks/use-copy-paste"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { CodeArea } from "@/registry/ui/code"
import { ImperativePanelHandle, ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/registry/ui/resizable"
import { Tabs, TabsList, TabsTrigger } from "@/registry/ui/tabs"

export interface BlockPreviewProps {
	code?: string
	preview: string
	title: string
	category: string
	previewOnly?: boolean
}

const DEFAULTSIZE = 100
const SMSIZE = 25
// const MDSIZE = 58
// const LGSIZE = 80

export const BlockPreview: React.FC<BlockPreviewProps> = ({ code, preview, title, category }) => {
	// const [_, setWidth] = useState(DEFAULTSIZE)
	const [mode, setMode] = useState<"preview" | "code">("preview")
	const [iframeHeight, setIframeHeight] = useState(0)

	const terminalCode = `pnpm dlx radionos add `

	const { copied, copy } = useCopyPaste({
		code: code as string,
		title,
		category,
		eventName: "block_copy",
	})
	const { copied: cliCopied, copy: cliCopy } = useCopyPaste({
		code: terminalCode,
		title,
		category,
		eventName: "block_cli_copy",
	})

	const ref = useRef<ImperativePanelHandle>(null)

	const iframeRef = useRef<HTMLIFrameElement>(null)

	useEffect(() => {
		const iframe = iframeRef.current
		const handleLoad = () => {
			const contentHeight = iframe!.contentWindow!.document.body.scrollHeight
			setIframeHeight(contentHeight)
		}

		iframe!.addEventListener("load", handleLoad)
		return () => {
			iframe!.removeEventListener("load", handleLoad)
		}
	}, [])

	return (
		<section className="group mb-16">
			<div className="z-10 mx-auto flex max-w-7xl justify-between py-1.5">
				<div>
					<Tabs defaultValue="preview" variant="ghost">
						<TabsList>
							<TabsTrigger onClick={() => setMode("preview")} aria-label="Block preview" value="preview">
								<Eye className="size-3.5 sm:opacity-50" size={20} />
								Preview
							</TabsTrigger>
							<TabsTrigger onClick={() => setMode("code")} aria-label="Code" value="code">
								<Code2 className="size-3.5 sm:opacity-50" size={20} />
								Code
							</TabsTrigger>
						</TabsList>
					</Tabs>
				</div>
				<div className="flex items-center gap-2">
					<Button onClick={cliCopy} size="32" className="size-8 shadow-none md:w-fit" variant="neutral-outline" aria-label="copy code">
						{cliCopied ? <Check size={20} className="text-text-tertiary" /> : <Terminal size={20} className="text-text-tertiary" />}
						<span className="text-text-secondary hidden text-sm md:block">pnpm dlx radianos add</span>
					</Button>
					<Tabs defaultValue="100" variant="default" className="block lg:block" size="md">
						<TabsList>
							<TabsTrigger
								value="100"
								onClick={() => {
									if (ref?.current) {
										ref.current.resize(parseInt("100"))
									}
								}}>
								Desktop
							</TabsTrigger>
							<TabsTrigger
								value="58"
								onClick={() => {
									if (ref?.current) {
										ref.current.resize(parseInt("58"))
									}
								}}>
								Tablet
							</TabsTrigger>
							<TabsTrigger
								value="30"
								onClick={() => {
									if (ref?.current) {
										ref.current.resize(parseInt("30"))
									}
								}}>
								Mobile
							</TabsTrigger>
						</TabsList>
					</Tabs>
					<Button variant="neutral-outline" size="36" isIcon className="text-text-secondary">
						<Link href={preview} passHref target="_blank">
							<Maximize className="size-4" />
						</Link>
					</Button>
					<Button variant="neutral-outline" size="36" lead={<Copy />} className="text-text-secondary" onClick={copy}>
						{copied ? "Copied" : "Copy Code"}
					</Button>
				</div>
			</div>

			<div className="relative mx-auto max-w-[1291px] px-4 lg:px-0">
				<div className={cn("bg-white dark:bg-transparent", mode == "code" && "hidden")}>
					<ResizablePanelGroup direction="horizontal" tagName="div">
						<ResizablePanel
							ref={ref}
							id={`block-${title}`}
							order={1}
							// onResize={(size) => {
							// 	setWidth(Number(size))
							// }}
							defaultSize={DEFAULTSIZE}
							minSize={SMSIZE}
							className="h-full rounded-xl border">
							<iframe
								key={`${category}-${title}-iframe`}
								loading="lazy"
								allowFullScreen
								ref={iframeRef}
								title={title}
								height={iframeHeight}
								className="@starting:opacity-0 @starting:blur-xl h-(--iframe-height) block min-h-56 w-full duration-200 will-change-auto"
								src={preview}
								id={`block-${title}`}
								style={{ "--iframe-height": `100vh` } as React.CSSProperties}
								{...{ fetchPriority: "low" }}
							/>
						</ResizablePanel>

						<ResizableHandle className="relative w-2 before:absolute before:inset-0 before:m-auto before:h-12 before:w-1 before:rounded-full before:bg-zinc-300 before:transition-[height,background] hover:before:h-16 hover:before:bg-zinc-400 focus:before:bg-zinc-400 dark:before:bg-zinc-600 dark:hover:before:bg-zinc-500 dark:focus:before:bg-zinc-400" />
						<ResizablePanel order={2} defaultSize={100 - DEFAULTSIZE}></ResizablePanel>
					</ResizablePanelGroup>
				</div>

				<div className="max-w-7xl bg-white dark:bg-transparent">{mode == "code" && <CodeArea code={code as string} language="tsx" />}</div>
			</div>
		</section>
	)
}

export default BlockPreview
