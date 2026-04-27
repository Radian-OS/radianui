"use client"

import { useState } from "react"
import { Maximize } from "lucide-react"
import Link from "next/link"
import { IconButton } from "@/styles/default/ui/button"
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/styles/default/ui/tabs"
import { BlockCodeTree } from "./block/block-code-tree"
import { BlockPreview } from "./block/block-preview"
import { FileTreeNode, FlatFile } from "./file-tree-wrapper"

export function DisplayBlockClient({
	name,
	nodes,
	highlightedFiles,
	mappedFiles,
}: {
	name: string
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
		<Tabs defaultValue="preview" className="gap-0">
			<div className="flex justify-between pb-3">
				<TabsList size="md">
					<TabsTrigger aria-label="Block preview" value="preview">
						Preview
					</TabsTrigger>
					<TabsTrigger aria-label="Code" value="code">
						Code
					</TabsTrigger>
				</TabsList>
				<div className="flex items-center gap-2">
					<IconButton
						variant="outline"
						color="neutral"
						size="36"
						className="text-fg-secondary"
						asChild>
						<Link href={`/view/${name}`} passHref target="_blank">
							<Maximize className="text-fg-tertiary" />
						</Link>
					</IconButton>
				</div>
			</div>
			<TabsContent value="preview" forceMount>
				<BlockPreview preview={name} />
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
					mappedFiles={mappedFiles}
				/>
			</TabsContent>
		</Tabs>
	)
}
