/**
 * Node Tree Schema Validation
 *
 * Zod schemas that validate:
 * - Individual node structure and type-specific props
 * - Referential integrity (parent ↔ child consistency)
 * - Single root constraint
 * - No orphaned nodes
 */

import { z } from "zod"
import { NODE_TYPES } from "./node-tree"

// ---------------------------------------------------------------------------
// Type-Specific Prop Schemas
// ---------------------------------------------------------------------------

const headingPropsSchema = z.object({
	text: z.string().default("Heading"),
	level: z.number().int().min(1).max(6).default(2),
})

const paragraphPropsSchema = z.object({
	text: z.string().default("Paragraph text"),
})

const buttonPropsSchema = z.object({
	text: z.string().default("Button"),
	variant: z
		.enum(["strong", "soft", "outline", "ghost", "glossy", "smooth"])
		.default("strong"),
	color: z
		.enum(["primary", "neutral", "success", "error", "warning", "info"])
		.default("primary"),
})

const imagePropsSchema = z.object({
	src: z.string().default("/placeholder.svg"),
	alt: z.string().default("Image"),
	width: z.number().optional(),
	height: z.number().optional(),
})

const spacerPropsSchema = z.object({
	height: z.number().min(0).default(32),
})

const sectionPropsSchema = z.object({
	background: z.string().optional(),
	padding: z.string().optional(),
})

const containerPropsSchema = z.object({
	maxWidth: z.string().default("1200px"),
	padding: z.string().optional(),
})

const emptyPropsSchema = z.record(z.string(), z.unknown()).default({})

/** Map of node type → prop schema */
export const PROP_SCHEMAS: Record<string, z.ZodType> = {
	root: emptyPropsSchema,
	section: sectionPropsSchema,
	container: containerPropsSchema,
	heading: headingPropsSchema,
	paragraph: paragraphPropsSchema,
	button: buttonPropsSchema,
	image: imagePropsSchema,
	divider: emptyPropsSchema,
	spacer: spacerPropsSchema,
}

// ---------------------------------------------------------------------------
// Node Schema
// ---------------------------------------------------------------------------

export const treeNodeSchema = z.object({
	id: z.string().min(1, "Node ID cannot be empty"),
	type: z.enum(NODE_TYPES),
	parentId: z.string().nullable(),
	childrenIds: z.array(z.string()),
	props: z.record(z.string(), z.unknown()),
	style: z.record(z.string(), z.string()),
})

export type TreeNodeSchema = z.infer<typeof treeNodeSchema>

// ---------------------------------------------------------------------------
// Full Tree Schema (with referential integrity)
// ---------------------------------------------------------------------------

export const nodeTreeSchema = z
	.object({
		rootId: z.string().min(1, "Root ID cannot be empty"),
		nodes: z.record(z.string(), treeNodeSchema),
	})
	.superRefine((tree, ctx) => {
		const { rootId, nodes } = tree as {
			rootId: string
			nodes: Record<string, z.infer<typeof treeNodeSchema>>
		}

		// 1. Root must exist
		if (!nodes[rootId]) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: `Root node "${rootId}" does not exist in the tree`,
				path: ["rootId"],
			})
			return // Can't do further checks without root
		}

		// 2. Root must be of type "root"
		if (nodes[rootId].type !== "root") {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: `Root node must be of type "root", got "${nodes[rootId].type}"`,
				path: ["nodes", rootId, "type"],
			})
		}

		// 3. Root must have null parentId
		if (nodes[rootId].parentId !== null) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Root node must have null parentId",
				path: ["nodes", rootId, "parentId"],
			})
		}

		// 4. Only one root node
		const rootNodes = Object.values(nodes).filter((n) => n.type === "root")
		if (rootNodes.length > 1) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: `Expected exactly 1 root node, found ${rootNodes.length}`,
				path: ["nodes"],
			})
		}

		// 5. Referential integrity
		for (const [nodeId, node] of Object.entries(nodes)) {
			// 5a. parentId must reference an existing node
			if (node.parentId !== null && !nodes[node.parentId]) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: `Node "${nodeId}" references non-existent parent "${node.parentId}"`,
					path: ["nodes", nodeId, "parentId"],
				})
			}

			// 5b. All childrenIds must reference existing nodes
			for (const childId of node.childrenIds) {
				if (!nodes[childId]) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: `Node "${nodeId}" references non-existent child "${childId}"`,
						path: ["nodes", nodeId, "childrenIds"],
					})
				}
			}

			// 5c. Bidirectional check: if I list X as child, X must list me as parent
			for (const childId of node.childrenIds) {
				const child = nodes[childId]
				if (child && child.parentId !== nodeId) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: `Node "${nodeId}" lists "${childId}" as child, but child's parentId is "${child.parentId}"`,
						path: ["nodes", childId, "parentId"],
					})
				}
			}

			// 5d. Non-root nodes must have a parent
			if (nodeId !== rootId && node.parentId === null) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: `Non-root node "${nodeId}" has null parentId`,
					path: ["nodes", nodeId, "parentId"],
				})
			}
		}

		// 6. No orphans: every non-root node must be reachable from root
		const reachable = new Set<string>()
		const queue = [rootId]
		while (queue.length > 0) {
			const current = queue.pop()!
			if (reachable.has(current)) continue
			reachable.add(current)
			const currentNode = nodes[current]
			if (currentNode) {
				queue.push(...currentNode.childrenIds)
			}
		}

		for (const nodeId of Object.keys(nodes)) {
			if (!reachable.has(nodeId)) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: `Node "${nodeId}" is orphaned (not reachable from root)`,
					path: ["nodes", nodeId],
				})
			}
		}
	})

export type NodeTreeSchema = z.infer<typeof nodeTreeSchema>

// ---------------------------------------------------------------------------
// Validate Helpers
// ---------------------------------------------------------------------------

/**
 * Validate a node tree. Returns the parsed tree on success,
 * or throws a ZodError with detailed messages on failure.
 */
export function validateTree(tree: unknown): NodeTreeSchema {
	return nodeTreeSchema.parse(tree)
}

/**
 * Safe validation — returns a result object instead of throwing.
 */
export function safeValidateTree(tree: unknown) {
	return nodeTreeSchema.safeParse(tree)
}

/**
 * Validate type-specific props for a given node type.
 */
export function validateNodeProps(
	type: string,
	props: Record<string, unknown>
): { success: boolean; data?: Record<string, unknown>; error?: z.ZodError } {
	const schema = PROP_SCHEMAS[type]
	if (!schema) {
		return { success: true, data: props }
	}
	const result = schema.safeParse(props)
	if (result.success) {
		return { success: true, data: result.data as Record<string, unknown> }
	}
	return { success: false, error: result.error }
}
