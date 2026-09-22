"use client"

import { useCallback, useEffect, useState } from "react"
import { BuilderPreview } from "./_components/builder-preview"
import { BuilderSidebar } from "./_components/builder-sidebar"
import { DEFAULT_DESIGN_TOKENS, type DesignTokens } from "./_lib/design-tokens"
import { createDefaultTree } from "./_lib/default-tree"
import type { NodeTree } from "./_lib/node-tree"
import { deserializeTree, serializeTree } from "./_lib/node-tree"
import { safeValidateTree } from "./_lib/node-schema"

// ---------------------------------------------------------------------------
// localStorage key
// ---------------------------------------------------------------------------

const STORAGE_KEY_TREE = "builder:tree"
const STORAGE_KEY_TOKENS = "builder:tokens"

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default function BuilderPage() {
	const [tree, setTree] = useState<NodeTree | null>(null)
	const [tokens, setTokens] = useState<DesignTokens>(DEFAULT_DESIGN_TOKENS)
	const [isLoaded, setIsLoaded] = useState(false)

	// Hydrate from localStorage on mount
	useEffect(() => {
		let initialTree: NodeTree

		try {
			const storedTree = localStorage.getItem(STORAGE_KEY_TREE)
			if (storedTree) {
				const parsed = deserializeTree(storedTree)
				const result = safeValidateTree(parsed)
				if (result.success) {
					initialTree = parsed
				} else {
					console.warn(
						"Stored tree failed validation, using default:",
						result.error
					)
					initialTree = createDefaultTree()
				}
			} else {
				initialTree = createDefaultTree()
			}
		} catch {
			initialTree = createDefaultTree()
		}

		try {
			const storedTokens = localStorage.getItem(STORAGE_KEY_TOKENS)
			if (storedTokens) {
				const parsed = JSON.parse(storedTokens) as DesignTokens
				setTokens({ ...DEFAULT_DESIGN_TOKENS, ...parsed })
			}
		} catch {
			// ignore
		}

		setTree(initialTree)
		setIsLoaded(true)
	}, [])

	// Persist tree to localStorage on change
	useEffect(() => {
		if (!isLoaded || !tree) return
		try {
			localStorage.setItem(STORAGE_KEY_TREE, serializeTree(tree))
		} catch {
			// storage quota exceeded, etc.
		}
	}, [tree, isLoaded])

	// Persist tokens to localStorage on change
	useEffect(() => {
		if (!isLoaded) return
		try {
			localStorage.setItem(STORAGE_KEY_TOKENS, JSON.stringify(tokens))
		} catch {
			// ignore
		}
	}, [tokens, isLoaded])

	// Loading state
	if (!tree) {
		return (
			<div className="bg-fill2 flex h-screen w-full items-center justify-center">
				<div className="text-fg-tertiary flex flex-col items-center gap-3">
					<div className="border-primary size-6 animate-spin rounded-full border-2 border-t-transparent" />
					<span className="text-xs font-medium">Loading builder…</span>
				</div>
			</div>
		)
	}

	return (
		<div className="bg-fill2 flex h-screen w-full">
			<BuilderSidebar tokens={tokens} setTokens={setTokens} tree={tree} />
			<main className="flex flex-1 flex-col overflow-hidden">
				<BuilderPreview tree={tree} tokens={tokens} />
			</main>
		</div>
	)
}
