"use client"

import { Suspense, useEffect, useState } from "react"
import { Maximize } from "lucide-react"
import Link from "next/link"
import CodeTreeContextProvider, {
	useCodeTreeContext,
} from "@/contexts/code-tree-context"
import { IconButton } from "@/registry/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"
import { BlockCodeTree } from "./block/block-code-tree"
import { BlockPreview } from "./block/block-preview"
import { ComponentPreviewCopyButton } from "./component-preview-copy-button"
import { FileTreeNode, FlatFile } from "./file-tree-wrapper"

function DisplayBlockCopyButton() {
	const { selectedFile } = useCodeTreeContext()
	return <ComponentPreviewCopyButton value={selectedFile?.content ?? ""} />
}

function SelectInitialFile({ file }: { file?: FlatFile }) {
	const { selectedFile, setSelectedFile } = useCodeTreeContext()
	useEffect(() => {
		if (file && !selectedFile) setSelectedFile(file)
	}, [file, selectedFile, setSelectedFile])
	return null
}

export type BlockCodeData = {
	nodes: FileTreeNode[]
	highlightedFiles: Array<{
		path: string
		target?: string
		content: string
		highlightedContent: string
	}>
	mappedFiles: FlatFile[]
}

export function DisplayBlockClient({
	name,
	title,
}: {
	name: string
	title: string
}) {
	const [showLeftOverlay, setShowLeftOverlay] = useState(false)
	const [tab, setTab] = useState("preview")
	const [data, setData] = useState<BlockCodeData | null>(null)
	const [error, setError] = useState(false)
	const [attempt, setAttempt] = useState(0)

	useEffect(() => {
		if (tab !== "code" || data) return
		const controller = new AbortController()
		setError(false)
		fetch(`/api/block-code/${encodeURIComponent(name)}`, {
			signal: controller.signal,
		})
			.then((response) => {
				if (!response.ok) throw new Error("Failed to load block code")
				return response.json() as Promise<BlockCodeData>
			})
			.then(setData)
			.catch(() => {
				if (!controller.signal.aborted) setError(true)
			})
		return () => controller.abort()
	}, [name, tab, data, attempt])

	return (
		<div className="mb-8">
			<div
				data-slot="block-preview"
				className="relative flex min-w-0 flex-col items-stretch">
				<CodeTreeContextProvider initialSelectedFile={null}>
					<SelectInitialFile file={data?.mappedFiles[0]} />
					<Tabs
						value={tab}
						onValueChange={setTab}
						className="border-soft bg-fill1-alpha flex w-full flex-col gap-2 rounded-2xl border p-1">
						<div className="flex items-center justify-between px-2 pt-1">
							<span className="text-fg text-sm font-medium">{title}</span>
							<div className="flex items-center gap-2">
								<TabsList className="h-8 data-[orientation=horizontal]:h-8">
									<TabsTrigger className="text-xs" value="preview">
										Preview
									</TabsTrigger>
									<TabsTrigger className="text-xs" value="code">
										Code
									</TabsTrigger>
								</TabsList>
								{data && tab === "code" && <DisplayBlockCopyButton />}
								<IconButton
									variant="outline"
									color="neutral"
									size="xs"
									className="text-fg-secondary"
									asChild>
									<Link href={`/view/${name}`} passHref target="_blank">
										<Maximize className="text-fg-tertiary" />
									</Link>
								</IconButton>
							</div>
						</div>
						<div className="flex-1">
							<TabsContent
								value="preview"
								className="mt-0 outline-none"
								forceMount>
								<Suspense fallback={<div>Loading...</div>}>
									<BlockPreview preview={name} />
								</Suspense>
							</TabsContent>
							<TabsContent
								value="code"
								onClick={() => {
									// Close the left overlay when clicked on any area of the code preview
									setShowLeftOverlay(false)
								}}
								forceMount>
								{data ? (
									<BlockCodeTree
										nodes={data.nodes}
										setShowLeftOverlay={setShowLeftOverlay}
										showLeftOverlay={showLeftOverlay}
										highlightedFiles={data.highlightedFiles}
									/>
								) : (
									<div className="p-6" role="status">
										{error ? (
											<button
												type="button"
												onClick={() => setAttempt((value) => value + 1)}>
												Could not load code. Try again.
											</button>
										) : (
											"Loading code…"
										)}
									</div>
								)}
							</TabsContent>
						</div>
					</Tabs>
				</CodeTreeContextProvider>
			</div>
		</div>
	)
}
