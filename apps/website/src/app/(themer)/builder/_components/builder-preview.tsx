"use client"

import { useMemo } from "react"
import { buildTokenStyleBlock, type DesignTokens } from "../_lib/design-tokens"
import type { NodeTree } from "../_lib/node-tree"
import { RenderTree } from "../_lib/renderer"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface BuilderPreviewProps {
	tree: NodeTree
	tokens: DesignTokens
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function BuilderPreview({ tree, tokens }: BuilderPreviewProps) {
	const tokenStyleBlock = useMemo(() => buildTokenStyleBlock(tokens), [tokens])

	return (
		<div className="flex flex-1 flex-col overflow-hidden">
			{/* Toolbar */}
			<div className="border-border bg-elevation-level1 flex items-center justify-between border-b px-4 py-2">
				<div className="flex items-center gap-2">
					<div className="bg-success size-2 rounded-full" />
					<span className="text-fg-secondary text-xs font-medium">
						Live Preview
					</span>
				</div>
				<div className="flex items-center gap-3">
					<span className="text-fg-tertiary text-[11px]">
						{Object.keys(tree.nodes).length} nodes
					</span>
				</div>
			</div>

			{/* Preview Canvas */}
			<div className="flex-1 overflow-auto bg-[#f0f0f0] p-5 dark:bg-[#1a1a1a]">
				<div className="border-border mx-auto min-h-full overflow-hidden rounded-xl border bg-white shadow-sm dark:bg-[#0f0f0f]">
					{/* Inject design token CSS variables */}
					<style dangerouslySetInnerHTML={{ __html: tokenStyleBlock }} />

					{/* Render the node tree */}
					<RenderTree tree={tree} tokens={tokens} />
				</div>
			</div>
		</div>
	)
}
