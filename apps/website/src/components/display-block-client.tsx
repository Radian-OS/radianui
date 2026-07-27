"use client"

import { Suspense, useState } from "react"
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

export function DisplayBlockClient({
	name,
	nodes,
	highlightedFiles,
	mappedFiles,
	title,
}: {
	name: string
	title: string
	nodes: FileTreeNode[]
	highlightedFiles: Array<{
		path: string
		target?: string
		content: string
		highlightedContent: string
	}>
	mappedFiles: FlatFile[]
}) {
	const [showLeftOverlay, setShowLeftOverlay] = useState(false)

	return (
		<div className="mb-8">
			<div
				data-slot="block-preview"
				className="relative flex min-w-0 flex-col items-stretch">
				<CodeTreeContextProvider initialSelectedFile={mappedFiles[0] ?? null}>
					<Tabs
						defaultValue="preview"
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
								<DisplayBlockCopyButton />
								<IconButton
									variant="outline"
									color="neutral"
									size="28"
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
								<BlockCodeTree
									nodes={nodes}
									setShowLeftOverlay={setShowLeftOverlay}
									showLeftOverlay={showLeftOverlay}
									highlightedFiles={highlightedFiles}
								/>
							</TabsContent>
						</div>
					</Tabs>
				</CodeTreeContextProvider>
			</div>
		</div>
	)
}
