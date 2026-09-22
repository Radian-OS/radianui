/**
 * Flat Node Tree — Single Source of Truth
 *
 * Every node is stored in a Record<string, TreeNode>, keyed by unique ID.
 * Parent-child relationships are expressed via `parentId` and `childrenIds`,
 * giving O(1) access to any node by ID.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export const NODE_TYPES = [
	"root",
	"section",
	"container",
	"heading",
	"paragraph",
	"button",
	"image",
	"divider",
	"spacer",
] as const

export type NodeType = (typeof NODE_TYPES)[number]

export interface TreeNode {
	/** Unique identifier */
	id: string
	/** The kind of element this node represents */
	type: NodeType
	/** Parent node ID — `null` only for the root node */
	parentId: string | null
	/** Ordered list of child node IDs */
	childrenIds: string[]
	/** Type-specific props (text content, heading level, image src, etc.) */
	props: Record<string, unknown>
	/** Per-node inline style overrides (CSS property → value) */
	style: Record<string, string>
}

export interface NodeTree {
	/** The ID of the root node */
	rootId: string
	/** Flat map of all nodes — O(1) lookup */
	nodes: Record<string, TreeNode>
}

// ---------------------------------------------------------------------------
// ID Generation
// ---------------------------------------------------------------------------

let counter = 0

export function generateId(prefix: string = "node"): string {
	counter++
	return `${prefix}_${Date.now().toString(36)}_${counter.toString(36)}`
}

/** Reset counter — useful for deterministic tests */
export function resetIdCounter(): void {
	counter = 0
}

// ---------------------------------------------------------------------------
// Helpers — Read
// ---------------------------------------------------------------------------

/** O(1) node lookup. Returns `undefined` if not found. */
export function getNode(tree: NodeTree, id: string): TreeNode | undefined {
	return tree.nodes[id]
}

/** Returns ordered child nodes for the given parent ID. */
export function getChildren(tree: NodeTree, parentId: string): TreeNode[] {
	const parent = tree.nodes[parentId]
	if (!parent) return []
	return parent.childrenIds
		.map((childId) => tree.nodes[childId])
		.filter(Boolean)
}

/** Returns the parent node, or `undefined` for the root. */
export function getParent(tree: NodeTree, id: string): TreeNode | undefined {
	const node = tree.nodes[id]
	if (!node || node.parentId === null) return undefined
	return tree.nodes[node.parentId]
}

/** Returns all descendant IDs (depth-first) including the node itself. */
export function getDescendantIds(tree: NodeTree, id: string): string[] {
	const result: string[] = [id]
	const node = tree.nodes[id]
	if (!node) return result
	for (const childId of node.childrenIds) {
		result.push(...getDescendantIds(tree, childId))
	}
	return result
}

// ---------------------------------------------------------------------------
// Helpers — Write (Immutable — returns new tree)
// ---------------------------------------------------------------------------

/**
 * Create a fresh node with sensible defaults.
 */
export function createNode(
	type: NodeType,
	overrides: Partial<Omit<TreeNode, "type">> = {}
): TreeNode {
	return {
		id: overrides.id ?? generateId(type),
		type,
		parentId: overrides.parentId ?? null,
		childrenIds: overrides.childrenIds ?? [],
		props: overrides.props ?? {},
		style: overrides.style ?? {},
	}
}

/**
 * Add a new node as a child of `parentId` at the given `index`.
 * If `index` is omitted, appends to the end.
 * Returns the new tree and the inserted node.
 */
export function addNode(
	tree: NodeTree,
	parentId: string,
	node: TreeNode,
	index?: number
): { tree: NodeTree; node: TreeNode } {
	const parent = tree.nodes[parentId]
	if (!parent) {
		throw new Error(`Parent node "${parentId}" not found`)
	}

	const insertedNode: TreeNode = { ...node, parentId }

	const newChildrenIds = [...parent.childrenIds]
	if (index !== undefined && index >= 0 && index <= newChildrenIds.length) {
		newChildrenIds.splice(index, 0, insertedNode.id)
	} else {
		newChildrenIds.push(insertedNode.id)
	}

	const newNodes = {
		...tree.nodes,
		[parentId]: { ...parent, childrenIds: newChildrenIds },
		[insertedNode.id]: insertedNode,
	}

	return {
		tree: { ...tree, nodes: newNodes },
		node: insertedNode,
	}
}

/**
 * Remove a node and all its descendants from the tree.
 * Also removes the node from its parent's `childrenIds`.
 */
export function removeNode(tree: NodeTree, id: string): NodeTree {
	const node = tree.nodes[id]
	if (!node) return tree
	if (id === tree.rootId) {
		throw new Error("Cannot remove the root node")
	}

	// Collect all IDs to remove
	const idsToRemove = new Set(getDescendantIds(tree, id))

	// Build new nodes map without removed IDs
	const newNodes: Record<string, TreeNode> = {}
	for (const [nodeId, n] of Object.entries(tree.nodes)) {
		if (idsToRemove.has(nodeId)) continue

		// If this node is the parent, remove the child from childrenIds
		if (nodeId === node.parentId) {
			newNodes[nodeId] = {
				...n,
				childrenIds: n.childrenIds.filter((cid) => cid !== id),
			}
		} else {
			newNodes[nodeId] = n
		}
	}

	return { ...tree, nodes: newNodes }
}

/**
 * Move a node to a new parent at the given index.
 * Handles removing from old parent and inserting into new parent.
 */
export function moveNode(
	tree: NodeTree,
	id: string,
	newParentId: string,
	index?: number
): NodeTree {
	const node = tree.nodes[id]
	if (!node) throw new Error(`Node "${id}" not found`)
	if (id === tree.rootId) throw new Error("Cannot move the root node")

	const oldParentId = node.parentId
	if (!oldParentId) throw new Error("Node has no parent")

	// Prevent moving a node into its own subtree
	const descendantIds = new Set(getDescendantIds(tree, id))
	if (descendantIds.has(newParentId)) {
		throw new Error("Cannot move a node into its own subtree")
	}

	const newNodes = { ...tree.nodes }

	// Remove from old parent
	const oldParent = newNodes[oldParentId]
	if (oldParent) {
		newNodes[oldParentId] = {
			...oldParent,
			childrenIds: oldParent.childrenIds.filter((cid) => cid !== id),
		}
	}

	// Insert into new parent
	const newParent = newNodes[newParentId]
	if (!newParent) throw new Error(`New parent "${newParentId}" not found`)

	const newChildrenIds = [...newParent.childrenIds]
	if (index !== undefined && index >= 0 && index <= newChildrenIds.length) {
		newChildrenIds.splice(index, 0, id)
	} else {
		newChildrenIds.push(id)
	}

	newNodes[newParentId] = { ...newParent, childrenIds: newChildrenIds }
	newNodes[id] = { ...node, parentId: newParentId }

	return { ...tree, nodes: newNodes }
}

/**
 * Partially update a node's props (shallow merge).
 */
export function updateNodeProps(
	tree: NodeTree,
	id: string,
	props: Record<string, unknown>
): NodeTree {
	const node = tree.nodes[id]
	if (!node) throw new Error(`Node "${id}" not found`)

	return {
		...tree,
		nodes: {
			...tree.nodes,
			[id]: {
				...node,
				props: { ...node.props, ...props },
			},
		},
	}
}

/**
 * Partially update a node's style overrides (shallow merge).
 */
export function updateNodeStyle(
	tree: NodeTree,
	id: string,
	style: Record<string, string>
): NodeTree {
	const node = tree.nodes[id]
	if (!node) throw new Error(`Node "${id}" not found`)

	return {
		...tree,
		nodes: {
			...tree.nodes,
			[id]: {
				...node,
				style: { ...node.style, ...style },
			},
		},
	}
}

// ---------------------------------------------------------------------------
// Serialization
// ---------------------------------------------------------------------------

/** Serialize tree to JSON string (for localStorage / export). */
export function serializeTree(tree: NodeTree): string {
	return JSON.stringify(tree, null, 2)
}

/** Deserialize JSON string back to a NodeTree. */
export function deserializeTree(json: string): NodeTree {
	return JSON.parse(json) as NodeTree
}
