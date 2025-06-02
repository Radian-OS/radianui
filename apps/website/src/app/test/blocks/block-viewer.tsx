"use client"

import React, { useEffect, useRef, useState } from "react"
import { Check, Code2, Copy, Eye, Maximize, Monitor, Smartphone, Tablet, Terminal } from "lucide-react"
import Link from "next/link"
import { useCopyPaste } from "@/hooks/use-copy-paste"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import { CodeArea } from "@/registry/ui/code"
import { Divider } from "@/registry/ui/divider"
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
const MDSIZE = 58
const LGSIZE = 80

export const BlockPreview: React.FC<BlockPreviewProps> = ({ code, preview, title, category, previewOnly }) => {
	const [width, setWidth] = useState(DEFAULTSIZE)
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
			<div>
				<div className="z-10 mx-auto flex max-w-7xl justify-between py-1.5 pl-8 pr-6">
					<div className="-ml-3 flex items-center gap-3">
						{code && (
							<>
								<Tabs defaultValue="preview" variant="ghost">
									<TabsList>
										<TabsTrigger onClick={() => setMode("preview")} aria-label="Block preview" value="preview">
											<Eye className="size-3.5 sm:opacity-50" />
											Preview
										</TabsTrigger>
										<TabsTrigger onClick={() => setMode("code")} aria-label="Code" value="code">
											<Code2 className="size-3.5 sm:opacity-50" />
											Code
										</TabsTrigger>
									</TabsList>
								</Tabs>
								<Divider orientation="vertical" className="hidden !h-4 lg:block" />
								<Tabs defaultValue="100" variant="ghost" className="hidden lg:block">
									<TabsList>
										<TabsTrigger
											value="100"
											onClick={() => {
												if (ref?.current) {
													ref.current.resize(parseInt("100"))
												}
											}}>
											<Monitor className="h-3.5 w-3.5" />
										</TabsTrigger>
										<TabsTrigger
											value="58"
											onClick={() => {
												if (ref?.current) {
													ref.current.resize(parseInt("58"))
												}
											}}>
											<Tablet className="h-3.5 w-3.5" />
										</TabsTrigger>
										<TabsTrigger
											value="30"
											onClick={() => {
												if (ref?.current) {
													ref.current.resize(parseInt("30"))
												}
											}}>
											<Smartphone className="h-3.5 w-3.5" />
										</TabsTrigger>
									</TabsList>
								</Tabs>
								<Divider orientation="vertical" className="hidden !h-4 lg:block" />
							</>
						)}
						{previewOnly && (
							<>
								{" "}
								<span className="ml-2 text-sm capitalize">{title}</span>
								<Divider orientation="vertical" className="!h-4" />{" "}
							</>
						)}
						<Button variant="neutral-outline" size="32" className="size-8">
							<Link href={preview} passHref target="_blank">
								<Maximize className="size-4" />
							</Link>
						</Button>
						<Divider orientation="vertical" className="hidden !h-4 lg:block" />
						<span className="text-muted-foreground hidden text-sm lg:block">{width < MDSIZE ? "Mobile" : width < LGSIZE ? "Tablet" : "Desktop"}</span>{" "}
					</div>

					<div className="flex items-center gap-2">
						{code && (
							<>
								<Button onClick={cliCopy} size="32" className="size-8 shadow-none md:w-fit" variant="neutral-outline" aria-label="copy code">
									{cliCopied ? <Check className="size-4" /> : <Terminal className="!size-3.5" />}
									<span className="hidden font-mono text-xs md:block">pnpm dlx radianos add</span>
								</Button>
								<Divider className="!h-4" orientation="vertical" />
								<Button onClick={copy} size="32" variant="neutral-outline" aria-label="copy code" className="size-8">
									{copied ? <Check className="size-4" /> : <Copy className="!size-3.5" />}
								</Button>
							</>
						)}
					</div>
				</div>
			</div>

			<div className="relative mx-auto max-w-[1291px] px-4 lg:px-0">
				<div className={cn("bg-white dark:bg-transparent", mode == "code" && "hidden")}>
					<ResizablePanelGroup direction="horizontal" tagName="div">
						<ResizablePanel
							ref={ref}
							id={`block-${title}`}
							order={1}
							onResize={(size) => {
								setWidth(Number(size))
							}}
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
