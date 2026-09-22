/**
 * Default Starter Tree
 *
 * A simple landing page layout so the builder isn't empty on first load.
 * Structure:
 *   Root
 *   ├── Hero Section
 *   │   └── Container
 *   │       ├── Heading (h1)
 *   │       ├── Paragraph
 *   │       ├── Spacer
 *   │       └── Button
 *   ├── Features Section
 *   │   └── Container
 *   │       ├── Heading (h2)
 *   │       ├── Spacer
 *   │       ├── Paragraph (Feature 1)
 *   │       ├── Paragraph (Feature 2)
 *   │       └── Paragraph (Feature 3)
 *   └── Footer Section
 *       └── Container
 *           └── Paragraph
 */

import type { NodeTree } from "./node-tree"

export function createDefaultTree(): NodeTree {
	return {
		rootId: "root",
		nodes: {
			// Root
			root: {
				id: "root",
				type: "root",
				parentId: null,
				childrenIds: ["hero-section", "features-section", "footer-section"],
				props: {},
				style: {},
			},

			// ── Hero Section ────────────────────────────────────────────────
			"hero-section": {
				id: "hero-section",
				type: "section",
				parentId: "root",
				childrenIds: ["hero-container"],
				props: {
					padding: "120px 0",
				},
				style: {},
			},
			"hero-container": {
				id: "hero-container",
				type: "container",
				parentId: "hero-section",
				childrenIds: [
					"hero-heading",
					"hero-paragraph",
					"hero-spacer",
					"hero-button",
				],
				props: {
					maxWidth: "800px",
				},
				style: {
					textAlign: "center",
				},
			},
			"hero-heading": {
				id: "hero-heading",
				type: "heading",
				parentId: "hero-container",
				childrenIds: [],
				props: {
					text: "Build Beautiful Websites",
					level: 1,
				},
				style: {},
			},
			"hero-paragraph": {
				id: "hero-paragraph",
				type: "paragraph",
				parentId: "hero-container",
				childrenIds: [],
				props: {
					text: "A powerful static website builder with a visual editor. Customize every aspect of your design with real-time preview.",
				},
				style: {
					opacity: "0.7",
					fontSize: "1.125rem",
					lineHeight: "1.75rem",
				},
			},
			"hero-spacer": {
				id: "hero-spacer",
				type: "spacer",
				parentId: "hero-container",
				childrenIds: [],
				props: { height: 24 },
				style: {},
			},
			"hero-button": {
				id: "hero-button",
				type: "button",
				parentId: "hero-container",
				childrenIds: [],
				props: {
					text: "Get Started",
					variant: "strong",
					color: "primary",
				},
				style: {},
			},

			// ── Features Section ────────────────────────────────────────────
			"features-section": {
				id: "features-section",
				type: "section",
				parentId: "root",
				childrenIds: ["features-container"],
				props: {
					padding: "80px 0",
				},
				style: {},
			},
			"features-container": {
				id: "features-container",
				type: "container",
				parentId: "features-section",
				childrenIds: [
					"features-heading",
					"features-spacer",
					"feature-1",
					"feature-2",
					"feature-3",
				],
				props: {
					maxWidth: "1000px",
				},
				style: {
					textAlign: "center",
				},
			},
			"features-heading": {
				id: "features-heading",
				type: "heading",
				parentId: "features-container",
				childrenIds: [],
				props: {
					text: "Why Choose Us",
					level: 2,
				},
				style: {},
			},
			"features-spacer": {
				id: "features-spacer",
				type: "spacer",
				parentId: "features-container",
				childrenIds: [],
				props: { height: 40 },
				style: {},
			},
			"feature-1": {
				id: "feature-1",
				type: "paragraph",
				parentId: "features-container",
				childrenIds: [],
				props: {
					text: "⚡ Lightning Fast — Optimized static output that loads instantly with zero JavaScript overhead.",
				},
				style: {
					padding: "16px 24px",
					marginBottom: "12px",
					borderRadius: "var(--radius-lg)",
					textAlign: "left",
				},
			},
			"feature-2": {
				id: "feature-2",
				type: "paragraph",
				parentId: "features-container",
				childrenIds: [],
				props: {
					text: "🎨 Fully Customizable — Every color, font, radius, and spacing value is at your fingertips.",
				},
				style: {
					padding: "16px 24px",
					marginBottom: "12px",
					borderRadius: "var(--radius-lg)",
					textAlign: "left",
				},
			},
			"feature-3": {
				id: "feature-3",
				type: "paragraph",
				parentId: "features-container",
				childrenIds: [],
				props: {
					text: "📦 Export Anywhere — Download your design as clean JSON and render it with any framework.",
				},
				style: {
					padding: "16px 24px",
					marginBottom: "12px",
					borderRadius: "var(--radius-lg)",
					textAlign: "left",
				},
			},

			// ── Footer Section ──────────────────────────────────────────────
			"footer-section": {
				id: "footer-section",
				type: "section",
				parentId: "root",
				childrenIds: ["footer-container"],
				props: {
					padding: "40px 0",
				},
				style: {},
			},
			"footer-container": {
				id: "footer-container",
				type: "container",
				parentId: "footer-section",
				childrenIds: ["footer-divider", "footer-spacer", "footer-text"],
				props: {
					maxWidth: "1200px",
				},
				style: {
					textAlign: "center",
				},
			},
			"footer-divider": {
				id: "footer-divider",
				type: "divider",
				parentId: "footer-container",
				childrenIds: [],
				props: {},
				style: {},
			},
			"footer-spacer": {
				id: "footer-spacer",
				type: "spacer",
				parentId: "footer-container",
				childrenIds: [],
				props: { height: 24 },
				style: {},
			},
			"footer-text": {
				id: "footer-text",
				type: "paragraph",
				parentId: "footer-container",
				childrenIds: [],
				props: {
					text: "Built with the Static Website Builder — © 2026",
				},
				style: {
					opacity: "0.5",
					fontSize: "0.875rem",
				},
			},
		},
	}
}
