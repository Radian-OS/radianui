/**
 * Rendering Engine
 *
 * Recursive React component that walks the flat node tree and renders
 * each node as the appropriate HTML element, styled by the design tokens.
 */

"use client"

import React from "react"
import type { DesignTokens } from "./design-tokens"
import type { NodeTree, TreeNode } from "./node-tree"

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface RenderTreeProps {
	tree: NodeTree
	tokens: DesignTokens
}

interface RenderNodeProps {
	tree: NodeTree
	nodeId: string
	tokens: DesignTokens
}

// ---------------------------------------------------------------------------
// Entry Point
// ---------------------------------------------------------------------------

export function RenderTree({ tree, tokens }: RenderTreeProps) {
	return <RenderNode tree={tree} nodeId={tree.rootId} tokens={tokens} />
}

// ---------------------------------------------------------------------------
// Recursive Node Renderer
// ---------------------------------------------------------------------------

function RenderNode({ tree, nodeId, tokens }: RenderNodeProps) {
	const node = tree.nodes[nodeId]
	if (!node) return null

	const children = node.childrenIds.map((childId) => (
		<RenderNode key={childId} tree={tree} nodeId={childId} tokens={tokens} />
	))

	return renderByType(node, children, tokens)
}

// ---------------------------------------------------------------------------
// Type → Element Mapping
// ---------------------------------------------------------------------------

function renderByType(
	node: TreeNode,
	children: React.ReactNode[],
	tokens: DesignTokens
): React.ReactElement {
	switch (node.type) {
		case "root":
			return renderRoot(node, children, tokens)
		case "section":
			return renderSection(node, children)
		case "container":
			return renderContainer(node, children)
		case "heading":
			return renderHeading(node)
		case "paragraph":
			return renderParagraph(node)
		case "button":
			return renderButton(node)
		case "image":
			return renderImage(node)
		case "divider":
			return renderDivider(node)
		case "spacer":
			return renderSpacer(node)
		default:
			return (
				<div key={node.id} style={node.style}>
					{children}
				</div>
			)
	}
}

// ---------------------------------------------------------------------------
// Individual Renderers
// ---------------------------------------------------------------------------

function renderRoot(
	node: TreeNode,
	children: React.ReactNode[],
	tokens: DesignTokens
) {
	return (
		<div
			key={node.id}
			data-node-id={node.id}
			className={tokens.darkMode ? "dark" : ""}
			style={{
				minHeight: "100%",
				backgroundColor: "var(--color-bg)",
				color: "var(--color-fg)",
				fontFamily: "var(--font-body)",
				transition: "background-color 0.3s, color 0.3s",
				...node.style,
			}}>
			{children}
		</div>
	)
}

function renderSection(node: TreeNode, children: React.ReactNode[]) {
	const padding = (node.props.padding as string) ?? "80px 0"

	return (
		<section
			key={node.id}
			data-node-id={node.id}
			style={{
				width: "100%",
				padding,
				backgroundColor: (node.props.background as string) ?? "transparent",
				...node.style,
			}}>
			{children}
		</section>
	)
}

function renderContainer(node: TreeNode, children: React.ReactNode[]) {
	const maxWidth = (node.props.maxWidth as string) ?? "1200px"
	const padding = (node.props.padding as string) ?? "0 24px"

	return (
		<div
			key={node.id}
			data-node-id={node.id}
			style={{
				maxWidth,
				margin: "0 auto",
				padding,
				...node.style,
			}}>
			{children}
		</div>
	)
}

function renderHeading(node: TreeNode) {
	const level = (node.props.level as number) ?? 2
	const text = (node.props.text as string) ?? ""
	const clampedLevel = Math.min(Math.max(level, 1), 6)

	// Font size mapping based on heading level
	const fontSizes: Record<number, string> = {
		1: "3rem",
		2: "2.25rem",
		3: "1.875rem",
		4: "1.5rem",
		5: "1.25rem",
		6: "1rem",
	}

	const lineHeights: Record<number, string> = {
		1: "3.5rem",
		2: "2.75rem",
		3: "2.375rem",
		4: "2rem",
		5: "1.75rem",
		6: "1.5rem",
	}

	const style: React.CSSProperties = {
		fontFamily: "var(--font-heading)",
		fontSize: fontSizes[clampedLevel] ?? "1.5rem",
		lineHeight: lineHeights[clampedLevel] ?? "2rem",
		fontWeight: 600,
		letterSpacing: "-0.5px",
		margin: "0 0 16px 0",
		color: "var(--color-fg)",
		...node.style,
	}

	const props = {
		key: node.id,
		"data-node-id": node.id,
		style,
		children: text,
	}

	return React.createElement(`h${clampedLevel}`, props)
}

function renderParagraph(node: TreeNode) {
	const text = (node.props.text as string) ?? ""

	return (
		<p
			key={node.id}
			data-node-id={node.id}
			style={{
				fontFamily: "var(--font-body)",
				fontSize: "1rem",
				lineHeight: "1.625",
				margin: "0 0 8px 0",
				color: "var(--color-fg)",
				...node.style,
			}}>
			{text}
		</p>
	)
}

function renderButton(node: TreeNode) {
	const text = (node.props.text as string) ?? "Button"
	const variant = (node.props.variant as string) ?? "strong"
	const color = (node.props.color as string) ?? "primary"

	// Map variant+color to inline styles that use CSS variables
	const baseStyles: React.CSSProperties = {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		fontFamily: "var(--font-body)",
		fontSize: "0.875rem",
		fontWeight: 500,
		height: "36px",
		padding: "0 16px",
		borderRadius: "var(--radius-control-lg)",
		border: "none",
		cursor: "pointer",
		transition: "all 0.15s ease",
		whiteSpace: "nowrap",
	}

	const colorMap: Record<string, string> = {
		primary: "var(--color-primary)",
		neutral: "var(--color-black-inverse)",
		success: "var(--color-success)",
		error: "var(--color-error)",
		warning: "var(--color-warning)",
		info: "var(--color-info)",
	}

	const fgMap: Record<string, string> = {
		primary: "var(--color-primary-fg)",
		neutral: "var(--color-white-inverse)",
		success: "white",
		error: "white",
		warning: "white",
		info: "white",
	}

	const variantStyles: Record<string, React.CSSProperties> = {
		strong: {
			backgroundColor: colorMap[color] ?? colorMap.primary,
			color: fgMap[color] ?? fgMap.primary,
		},
		soft: {
			backgroundColor: `var(--color-${color === "neutral" ? "fill2" : `${color}-accent`})`,
			color: `var(--color-${color === "neutral" ? "fg" : `${color}-text`})`,
		},
		outline: {
			backgroundColor: "transparent",
			border: `1px solid var(--color-${color === "neutral" ? "border" : `${color}-border`})`,
			color: `var(--color-${color === "neutral" ? "fg" : `${color}-text`})`,
		},
		ghost: {
			backgroundColor: "transparent",
			color: `var(--color-${color === "neutral" ? "fg" : `${color}-text`})`,
		},
	}

	return (
		<button
			key={node.id}
			data-node-id={node.id}
			type="button"
			style={{
				...baseStyles,
				...(variantStyles[variant] ?? variantStyles.strong),
				...node.style,
			}}>
			{text}
		</button>
	)
}

function renderImage(node: TreeNode) {
	const src = (node.props.src as string) ?? "/placeholder.svg"
	const alt = (node.props.alt as string) ?? "Image"
	const width = node.props.width as number | undefined
	const height = node.props.height as number | undefined

	return (
		<img
			key={node.id}
			data-node-id={node.id}
			src={src}
			alt={alt}
			width={width}
			height={height}
			style={{
				maxWidth: "100%",
				height: "auto",
				borderRadius: "var(--radius-lg)",
				...node.style,
			}}
		/>
	)
}

function renderDivider(node: TreeNode) {
	return (
		<hr
			key={node.id}
			data-node-id={node.id}
			style={{
				border: "none",
				borderTop: "1px solid var(--color-border)",
				margin: "0",
				width: "100%",
				...node.style,
			}}
		/>
	)
}

function renderSpacer(node: TreeNode) {
	const height = (node.props.height as number) ?? 32

	return (
		<div
			key={node.id}
			data-node-id={node.id}
			aria-hidden="true"
			style={{
				height: `${height}px`,
				...node.style,
			}}
		/>
	)
}
