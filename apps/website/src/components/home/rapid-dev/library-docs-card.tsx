"use client"

import type { CSSProperties, ReactNode } from "react"
import React, { useCallback, useEffect, useRef, useState } from "react"
import {
	Bookmark,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	Clipboard,
	Code2,
	Copy,
	FileUp,
	PenTool,
	Plus,
	ScrollText,
	SquareTerminal,
	Terminal,
	X,
} from "lucide-react"
import Image from "next/image"
import { FigmaIcon, ResourcesIcon } from "@/components/custom/icon"
import { cn } from "@/lib/utils"

const ROTATE_MS = 5800

type SidebarItem = {
	label: string
	Icon: React.ComponentType<{ size?: number; "aria-hidden"?: boolean }>
	badge?: string
}

type SidebarSection = {
	title: string
	items: SidebarItem[]
}

const accordionContents = [
	{
		id: 1,
		trigger: "What is Radian OS?",
		content:
			"Radian OS is a high-quality design and development library aimed at building systems that scale quickly. It enables rapid transition from design to product in just a few hours.",
	},
	{
		id: 2,
		trigger: "What components are available in Radian OS?",
	},
	{
		id: 3,
		trigger: "What application components does Radian OS provide?",
	},
	{
		id: 4,
		trigger: "How can I stay updated with Radian OS developments?",
	},
]

const pages = [
	{
		name: "Button",
		slug: "button",
		description:
			"Highly responsive, clickable elements built for form submissions, link actions, and clear user choices.",
		Preview: ButtonPreview,
	},
	{
		name: "Accordion",
		slug: "accordion",
		description:
			"Clean, stacked panels that expand and collapse to organize large amounts of information and save page space.",
		Preview: AccordionPreview,
	},
	{
		name: "Badge",
		slug: "badge",
		description:
			"Small, colorful labels used to show quick status updates, counts, or categories next to your content.",
		Preview: BadgePreview,
	},
	{
		name: "Avatar",
		slug: "avatar",
		description:
			"Display user profile pictures or initials with clean, automated backup designs when an image fails to load.",
		Preview: AvatarPreview,
	},
	{
		name: "File Upload",
		slug: "file-upload",
		description:
			"A reliable drag-and-drop box that lets users easily upload documents, images, and files to your website.",
		Preview: FileUploadPreview,
	},
] as const

const sidebarSections: SidebarSection[] = [
	{
		title: "Getting Started",
		items: [
			{ label: "Introduction", Icon: Clipboard },
			{ label: "Installation", Icon: Terminal },
			{ label: "CLI", Icon: SquareTerminal },
			{ label: "Figma", Icon: FigmaIcon },
			{ label: "Changelog", Icon: ScrollText },
			{ label: "Resources", Icon: ResourcesIcon, badge: "New" },
		],
	},
	{
		title: "Installation",
		items: [
			{ label: "Nextjs", Icon: Terminal },
			{ label: "Vite", Icon: FileUp },
			{ label: "Manual", Icon: Code2 },
		],
	},
	{
		title: "Fundamentals",
		items: [
			{ label: "Colors", Icon: PenTool },
			{ label: "Typography", Icon: Code2 },
			{ label: "Iconography", Icon: Copy },
			{ label: "Theme", Icon: FileUp },
		],
	},
]

const componentLinks = [
	"Accordion",
	"Alert",
	"Alert Dialog",
	"Aspect Ratio",
	"Avatar",
	"Badge",
	"Banner",
	"Breadcrumb",
	"Button",
	"Calendar",
	"Card",
	"Carousel",
	"Checkbox",
	"Code Area",
	"Collapsible",
	"Combobox",
	"Command",
	"Context Menu",
	"Currency Input",
	"Date Picker",
	"Dialog",
	"Divider",
	"Drawer",
	"Dropdown",
	"Empty",
	"File Upload",
	"Form",
	"Hover Card",
	"Input",
	"Label",
	"Menubar",
	"Navigation Menu",
	"OTP Field",
	"Pagination",
	"Phone Number Input",
	"Popover",
	"Progress",
	"Radio Group",
	"Resizable",
	"Scroll Area",
	"Select",
	"Sidebar",
	"Skeleton",
	"Slider",
	"Sonner",
	"Spinner",
	"Stepper",
	"Switch",
	"Table",
	"Tabs",
	"Text Area",
	"Toggle",
	"Toggle Group",
	"Tooltip",
]

function IconButton({
	label,
	children,
}: {
	label: string
	children: ReactNode
}) {
	return (
		<button
			aria-label={label}
			className="docs-copy-icon-button"
			tabIndex={-1}
			type="button">
			{children}
		</button>
	)
}

function ButtonPreview() {
	return (
		<div className="radian-docs-button-preview">
			<button
				className="radian-docs-button-primary"
				tabIndex={-1}
				type="button">
				Save Changes
			</button>
			<button
				className="radian-docs-button-outline"
				tabIndex={-1}
				type="button">
				Cancel
			</button>
		</div>
	)
}

function AccordionPreview() {
	return (
		<div className="radian-docs-accordion-preview">
			{accordionContents.map((item) => (
				<div
					className={`radian-docs-accordion-item ${
						item.id === 1 ? "is-open" : ""
					}`}
					key={item.id}>
					<div className="radian-docs-accordion-trigger">
						<span>{item.trigger}</span>
						<ChevronDown aria-hidden="true" size={15} />
					</div>
					{item.id === 1 && item.content ? (
						<p className="radian-docs-accordion-content">{item.content}</p>
					) : null}
				</div>
			))}
		</div>
	)
}

function BadgeDot() {
	return <span aria-hidden="true" className="radian-docs-badge-dot" />
}

function BadgePreview() {
	return (
		<div className="radian-docs-badge-preview">
			<span className="radian-docs-badge radian-docs-badge-success radian-docs-badge-sm radian-docs-rounded">
				New
			</span>
			<span className="radian-docs-badge radian-docs-badge-outline">
				<BadgeDot />
				Neutral
			</span>
			<span className="radian-docs-badge radian-docs-badge-error">
				Close
				<X aria-hidden="true" size={11} />
			</span>
			<span className="radian-docs-badge radian-docs-badge-outline radian-docs-rounded">
				44
			</span>
			<span className="radian-docs-badge radian-docs-badge-icon radian-docs-badge-outline">
				<Plus aria-hidden="true" size={11} />
			</span>
			<span className="radian-docs-badge radian-docs-badge-primary radian-docs-rounded">
				24
			</span>
			<span className="radian-docs-badge radian-docs-badge-soft-primary">
				<Bookmark aria-hidden="true" size={11} />
				Bookmark
			</span>
			<span className="radian-docs-badge radian-docs-badge-outline radian-docs-badge-avatar-pill">
				<span className="radian-docs-mini-avatar">S</span>
				Samuel
			</span>
		</div>
	)
}

function AvatarPreview() {
	return (
		<div className="radian-docs-avatar-preview">
			<Image
				alt="Kaelin Tristian"
				className="radian-docs-avatar"
				height={48}
				src="/media/female-5.jpg"
				width={48}
			/>
		</div>
	)
}

function FileUploadPreview() {
	return (
		<div className="radian-docs-upload-preview">
			<div className="radian-docs-upload-dropzone">
				<div aria-hidden="true" className="radian-docs-upload-icon">
					<FileUp size={17} />
				</div>
				<p>Upload files</p>
				<span>Drag & drop or click to browse</span>
				<small>
					<span>All files</span>
					<span className="radian-docs-upload-dot" />
					<span>Max 10 files</span>
					<span className="radian-docs-upload-dot" />
					<span>Up to 100 MB</span>
				</small>
			</div>
		</div>
	)
}

function DocsSidebar({ activeName }: { activeName: string }) {
	let revealIndex = 0

	const revealStyle = (): CSSProperties =>
		({
			animationDelay: `${90 + revealIndex++ * 38}ms`,
		}) as CSSProperties

	return (
		<aside className="docs-copy-sidebar" aria-label="Documentation navigation">
			{sidebarSections.map((section) => (
				<section key={section.title}>
					<h3 style={revealStyle()}>{section.title}</h3>
					{section.items.map(({ label, Icon, badge }) => (
						<div
							className="docs-copy-nav-row"
							key={label}
							style={revealStyle()}
							aria-hidden="true">
							<Icon size={12} />
							<span>{label}</span>
							{badge ? <b>{badge}</b> : null}
						</div>
					))}
				</section>
			))}

			<section className="docs-copy-components-nav">
				<h3 style={revealStyle()}>Components</h3>
				{componentLinks.map((name) => (
					<div
						className={`docs-copy-component-link ${
							name === activeName ? "is-active" : ""
						}`}
						key={name}
						style={revealStyle()}>
						{name}
					</div>
				))}
			</section>
		</aside>
	)
}

export function LibraryDocsCard() {
	const [pageIndex, setPageIndex] = useState(0)
	const [resetTick, setResetTick] = useState(0)
	const [isVisible, setIsVisible] = useState(false)
	const frameRef = useRef<HTMLElement>(null)
	const activePage = pages[pageIndex]
	const Preview = activePage.Preview

	const advancePage = useCallback(() => {
		setPageIndex((current) => (current + 1) % pages.length)
		setResetTick((current) => current + 1)
	}, [])

	useEffect(() => {
		const el = frameRef.current
		if (!el) return

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true)
					observer.disconnect()
				}
			},
			{ threshold: 0.15 }
		)

		observer.observe(el)
		return () => observer.disconnect()
	}, [])

	useEffect(() => {
		if (!isVisible) return
		const timeout = window.setTimeout(advancePage, ROTATE_MS)
		return () => window.clearTimeout(timeout)
	}, [advancePage, resetTick, isVisible])

	return (
		<article
			aria-label="Radian component documentation preview"
			className={cn("docs-copy-frame select-none", isVisible && "is-visible")}
			onClick={advancePage}
			ref={frameRef}
			tabIndex={-1}>
			<DocsSidebar activeName={activePage.name} />
			<main className="docs-copy-main">
				<div className="docs-copy-top-actions">
					<IconButton label="Previous component">
						<ChevronLeft aria-hidden="true" size={12} />
					</IconButton>
					<IconButton label="Next component">
						<ChevronRight aria-hidden="true" size={12} />
					</IconButton>
				</div>

				<div className="docs-copy-page-content" key={activePage.slug}>
					<p className="docs-copy-kicker">Components</p>
					<h2>{activePage.name}</h2>
					<p className="docs-copy-description">{activePage.description}</p>

					<div className="docs-copy-source-row">
						<button
							className="docs-copy-source-button"
							tabIndex={-1}
							type="button">
							<Code2 aria-hidden="true" size={12} />
							<span>Source Code</span>
						</button>
						<div className="docs-copy-install-actions">
							<button
								className="docs-copy-install-button"
								tabIndex={-1}
								type="button">
								<Terminal aria-hidden="true" size={12} />
								<span>Install</span>
							</button>
						</div>
					</div>

					<section className="docs-copy-preview-card">
						<header className="docs-copy-preview-header">
							<strong>Component Preview</strong>
							<div className="docs-copy-preview-tabs">
								<button className="is-active" tabIndex={-1} type="button">
									Preview
								</button>
								<button tabIndex={-1} type="button">
									Code
								</button>
								<IconButton label="Copy preview code">
									<Clipboard aria-hidden="true" size={11} />
								</IconButton>
							</div>
						</header>

						<div className="docs-copy-preview-box">
							<div className="docs-copy-preview-stage">
								<Preview />
							</div>
						</div>
					</section>

					<div className="docs-copy-divider" />
					<section className="docs-copy-install-section">
						<h3>Installation</h3>
						<div className="docs-copy-install-tabs">
							<button className="is-active" tabIndex={-1} type="button">
								Command
							</button>
							<button tabIndex={-1} type="button">
								Manual
							</button>
						</div>
						<div className="docs-copy-command-card">
							<div className="docs-copy-package-tabs">
								<button className="is-active" tabIndex={-1} type="button">
									pnpm
								</button>
								<button tabIndex={-1} type="button">
									npm
								</button>
								<button tabIndex={-1} type="button">
									yarn
								</button>
								<button tabIndex={-1} type="button">
									bun
								</button>
								<IconButton label="Copy install command">
									<Clipboard aria-hidden="true" size={11} />
								</IconButton>
							</div>
							<code>pnpm dlx radianui@latest add {activePage.slug}</code>
						</div>
					</section>
				</div>
			</main>
		</article>
	)
}
