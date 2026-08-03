"use client"

import { useEffect, useRef, useState } from "react"
import type { CSSProperties, PointerEvent, ReactNode } from "react"
import {
	ArrowUp,
	Bot,
	Box,
	CheckCircle2,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	Circle,
	Clock3,
	File,
	Folder,
	GitBranch,
	GitPullRequest,
	Maximize2,
	MoreHorizontal,
	PanelRight,
	Paperclip,
	Play,
	Plus,
	Search,
	Settings,
	Sparkles,
	SplitSquareHorizontal,
	Terminal,
	X,
} from "lucide-react"

const fileTree = [
	{ depth: 0, label: ".next", type: "folder" },
	{ depth: 0, label: "node_modules", type: "folder" },
	{ depth: 0, label: "public", type: "folder", open: true },
	{ depth: 1, label: "file.svg", type: "file", color: "purple" },
	{ depth: 1, label: "globe.svg", type: "file", color: "purple" },
	{ depth: 1, label: "next.svg", type: "file", color: "purple" },
	{ depth: 1, label: "vercel.svg", type: "file", color: "purple" },
	{ depth: 1, label: "window.svg", type: "file", color: "purple" },
	{ depth: 0, label: "src", type: "folder", open: true, status: "dot" },
	{ depth: 1, label: "app", type: "folder", open: true, status: "dot" },
	{ depth: 2, label: "favicon.ico", type: "file", color: "yellow" },
	{ depth: 2, label: "globals.css", type: "file", color: "blue", meta: "9, M" },
	{ depth: 2, label: "layout.tsx", type: "file", color: "blue", meta: "M" },
	{
		depth: 2,
		label: "page.tsx",
		type: "file",
		color: "blue",
		meta: "5, M",
		active: true,
	},
	{
		depth: 1,
		label: "components",
		type: "folder",
		color: "green",
		status: "dot",
	},
	{ depth: 1, label: "lib", type: "folder", color: "green", status: "dot" },
	{ depth: 0, label: ".gitignore", type: "file" },
	{
		depth: 0,
		label: "components.json",
		type: "file",
		color: "green",
		meta: "U",
	},
	{ depth: 0, label: "eslint.config.mjs", type: "file", color: "yellow" },
	{ depth: 0, label: "next-env.d.ts", type: "file", color: "blue" },
	{ depth: 0, label: "next.config.ts", type: "file", color: "blue" },
	{
		depth: 0,
		label: "package-lock.json",
		type: "file",
		color: "yellow",
		meta: "M",
	},
	{ depth: 0, label: "package.json", type: "file", color: "yellow", meta: "M" },
	{ depth: 0, label: "postcss.config.mjs", type: "file", color: "yellow" },
	{ depth: 0, label: "README.md", type: "file", color: "muted" },
	{ depth: 0, label: "tsconfig.json", type: "file", color: "blue" },
]

const codeLines = [
	{ n: 1, content: [{ text: '"use client"', tone: "red" }] },
	{ n: 2, content: [] },
	{
		n: 3,
		content: [
			{ text: "import", tone: "purple" },
			{ text: " { useState, useRef } ", tone: "blue" },
			{ text: "from", tone: "purple" },
			{ text: ' "react"', tone: "red" },
		],
	},
	{
		n: 4,
		content: [
			{ text: "import", tone: "purple" },
			{ text: " { Button } ", tone: "blue" },
			{ text: "from", tone: "purple" },
			{ text: ' "@/components/ui/button"', tone: "red" },
		],
	},
	{
		n: 5,
		content: [
			{ text: "import", tone: "purple" },
			{ text: " { Input } ", tone: "blue" },
			{ text: "from", tone: "purple" },
			{ text: ' "@/components/ui/input"', tone: "red" },
		],
	},
	{
		n: 6,
		content: [
			{ text: "import", tone: "purple" },
			{ text: " { Upload, Search, Settings, Sun, Moon } ", tone: "blue" },
			{ text: "from", tone: "purple" },
			{ text: ' "lucide-react"', tone: "red" },
		],
	},
	{
		n: 7,
		content: [
			{ text: "import", tone: "purple" },
			{ text: " { useTheme } ", tone: "blue" },
			{ text: "from", tone: "purple" },
			{ text: ' "next-themes"', tone: "red" },
		],
	},
	{ n: 8, content: [] },
	{
		n: 9,
		content: [
			{ text: "export default function", tone: "purple" },
			{ text: " Home", tone: "blue" },
			{ text: "() {" },
		],
	},
	{
		n: 10,
		content: [
			{ text: "  const", tone: "purple" },
			{ text: " [icons, setIcons] ", tone: "blue" },
			{ text: "= useState([])" },
		],
	},
	{
		n: 11,
		content: [
			{ text: "  const", tone: "purple" },
			{ text: " fileInputRef ", tone: "blue" },
			{ text: "= useRef<HTMLInputElement>(null)" },
		],
	},
	{
		n: 12,
		content: [
			{ text: "  const", tone: "purple" },
			{ text: " { theme, setTheme } ", tone: "blue" },
			{ text: "= useTheme()" },
		],
	},
	{ n: 13, content: [] },
	{
		n: 14,
		content: [
			{ text: "  const", tone: "purple" },
			{ text: " handleUpload ", tone: "blue" },
			{ text: "= async (e: React.ChangeEvent<HTMLInputElement>) => {" },
		],
	},
	{ n: 15, content: [{ text: "    if (e.target.files) {", tone: "blue" }] },
	{
		n: 16,
		content: [
			{ text: "      const", tone: "purple" },
			{ text: " newIcons ", tone: "blue" },
			{ text: "= await Promise.all(" },
		],
	},
	{
		n: 17,
		content: [
			{ text: "        Array.from(e.target.files).map(async (file) => {" },
		],
	},
	{
		n: 18,
		content: [
			{ text: "          let url = URL.createObjectURL(file)", tone: "blue" },
		],
	},
	{ n: 19, content: [] },
	{
		n: 20,
		content: [
			{ text: '          if (file.type === "image/svg+xml") {', tone: "blue" },
		],
	},
	{ n: 21, content: [{ text: "            try {", tone: "purple" }] },
	{
		n: 22,
		content: [
			{ text: "              const text = await file.text()", tone: "blue" },
		],
	},
	{
		n: 23,
		content: [
			{ text: "              const parser = new DOMParser()", tone: "blue" },
		],
	},
	{
		n: 24,
		content: [
			{
				text: '              const doc = parser.parseFromString(text, "image/svg+xml")',
				tone: "blue",
			},
		],
	},
	{
		n: 25,
		content: [
			{
				text: '              const svg = doc.querySelector("svg")',
				tone: "blue",
			},
		],
	},
	{ n: 26, content: [] },
	{ n: 27, content: [{ text: "              if (svg) {", tone: "blue" }] },
	{
		n: 28,
		content: [
			{
				text: "                // Ensure the SVG fills the container",
				tone: "green",
			},
		],
	},
	{
		n: 29,
		content: [
			{
				text: '                svg.setAttribute("width", "100%")',
				tone: "green",
			},
		],
	},
	{
		n: 30,
		content: [
			{
				text: '                svg.setAttribute("height", "100%")',
				tone: "green",
			},
		],
	},
	{ n: 31, content: [{ text: "              }" }] },
	{
		n: 32,
		content: [{ text: "            } catch (error) {", tone: "purple" }],
	},
	{
		n: 33,
		content: [{ text: "              console.error(error)", tone: "blue" }],
	},
	{ n: 34, content: [{ text: "            }" }] },
	{ n: 35, content: [{ text: "          }" }] },
]

function CodeLine({
	index,
	line,
}: {
	index: number
	line: { n: number; content: { text: string; tone?: string }[] }
}) {
	return (
		<div
			className="cursor-code-line"
			style={{ "--line-index": index } as CSSProperties}>
			<span className="cursor-code-number">{line.n}</span>
			<code>
				{line.content.map((part, index) => (
					<span
						className={part.tone ? `tone-${part.tone}` : undefined}
						key={index}>
						{part.text}
					</span>
				))}
			</code>
		</div>
	)
}

type FloatingPanelId = "ide" | "codex" | "conversation"

type FloatingPanelState = Record<
	FloatingPanelId,
	{
		x: number
		y: number
		z: number
	}
>

type DragState = {
	id: FloatingPanelId
	offsetX: number
	offsetY: number
} | null

function WindowDots() {
	return (
		<div aria-hidden="true" className="cursor-floating-dots">
			<span />
			<span />
			<span />
		</div>
	)
}

function FloatingPanel({
	children,
	className,
	id,
	onPointerDown,
	position,
}: {
	children: ReactNode
	className: string
	id: FloatingPanelId
	onPointerDown: (
		event: PointerEvent<HTMLDivElement>,
		id: FloatingPanelId
	) => void
	position: FloatingPanelState[FloatingPanelId]
}) {
	return (
		<div
			className={`cursor-floating-card ${className}`}
			onPointerDown={(event) => onPointerDown(event, id)}
			style={
				{
					"--floating-x": `${position.x}px`,
					"--floating-y": `${position.y}px`,
					zIndex: position.z,
				} as CSSProperties
			}>
			{children}
		</div>
	)
}

export function CursorIdeCard() {
	const [floatingPanels, setFloatingPanels] = useState<FloatingPanelState>({
		ide: { x: 160, y: 102, z: 2 },
		codex: { x: 72, y: 78, z: 4 },
		conversation: { x: 1108, y: 390, z: 3 },
	})
	const highestZRef = useRef(4)
	const [dragState, setDragState] = useState<DragState>(null)
	const [replayKeys, setReplayKeys] = useState({
		ai: 0,
		codex: 0,
		code: 0,
	})

	useEffect(() => {
		const timers: number[] = []
		const firstReplayDelay = 6400
		const sectionGap = 3000

		const replay = (section: keyof typeof replayKeys) => {
			setReplayKeys((keys) => ({
				...keys,
				[section]: keys[section] + 1,
			}))
		}

		const runSequence = () => {
			replay("ai")
			timers.push(window.setTimeout(() => replay("codex"), sectionGap))
			timers.push(window.setTimeout(() => replay("code"), sectionGap * 2))
			timers.push(window.setTimeout(runSequence, sectionGap * 3))
		}

		timers.push(window.setTimeout(runSequence, firstReplayDelay))

		return () => {
			timers.forEach((timer) => window.clearTimeout(timer))
		}
	}, [])

	const bringToFront = (id: FloatingPanelId) => {
		highestZRef.current += 1
		setFloatingPanels((panels) => ({
			...panels,
			[id]: {
				...panels[id],
				z: highestZRef.current,
			},
		}))
	}

	const handleFloatingPointerDown = (
		event: PointerEvent<HTMLDivElement>,
		id: FloatingPanelId
	) => {
		const rect = event.currentTarget
			.closest(".cursor-stage")
			?.getBoundingClientRect()

		if (!rect) {
			return
		}

		const scale = rect.width / 1440

		event.currentTarget.setPointerCapture(event.pointerId)
		bringToFront(id)
		setDragState({
			id,
			offsetX: (event.clientX - rect.left) / scale - floatingPanels[id].x,
			offsetY: (event.clientY - rect.top) / scale - floatingPanels[id].y,
		})
	}

	const handleStagePointerMove = (event: PointerEvent<HTMLDivElement>) => {
		if (!dragState) {
			return
		}

		const rect = event.currentTarget.getBoundingClientRect()

		if (!rect) {
			return
		}

		const scale = rect.width / 1440

		setFloatingPanels((panels) => ({
			...panels,
			[dragState.id]: {
				...panels[dragState.id],
				x: (event.clientX - rect.left) / scale - dragState.offsetX,
				y: (event.clientY - rect.top) / scale - dragState.offsetY,
			},
		}))
	}

	const handleStagePointerUp = () => {
		setDragState(null)
	}

	return (
		<div
			className="cursor-stage"
			onPointerMove={handleStagePointerMove}
			onPointerUp={handleStagePointerUp}>
			<div
				className="cursor-window"
				onPointerDown={(event) => handleFloatingPointerDown(event, "ide")}
				style={
					{
						"--floating-x": `${floatingPanels.ide.x}px`,
						"--floating-y": `${floatingPanels.ide.y}px`,
						zIndex: floatingPanels.ide.z,
					} as CSSProperties
				}>
				<div className="cursor-titlebar">
					<div className="cursor-titlebar-left">
						<Box size={14} />
						{[
							"File",
							"Edit",
							"Selection",
							"View",
							"Go",
							"Run",
							"Terminal",
							"Help",
						].map((item) => (
							<span key={item}>{item}</span>
						))}
					</div>
					<div className="cursor-titlebar-center">
						<ChevronLeft size={14} />
						<ChevronRight size={14} />
						<span>icon-preview</span>
					</div>
					<div className="cursor-titlebar-right">
						<strong>Upgrade to Pro</strong>
						<SplitSquareHorizontal size={14} />
						<PanelRight size={14} />
						<Settings size={14} />
						<span className="cursor-window-control" />
						<Maximize2 size={12} />
						<X size={14} />
					</div>
				</div>

				<div className="cursor-main">
					<aside className="cursor-sidebar">
						<div className="cursor-activity">
							<File className="is-active" size={17} />
							<Search size={17} />
							<GitBranch size={17} />
							<GitPullRequest size={17} />
							<ChevronDown size={17} />
						</div>
						<div className="cursor-explorer">
							<h2>ICON-PREVIEW</h2>
							<div className="cursor-file-tree">
								{fileTree.map((item) => {
									const Icon = item.type === "folder" ? Folder : File

									return (
										<div
											className={`cursor-file-row ${item.active ? "is-active" : ""}`}
											key={`${item.depth}-${item.label}`}
											style={{ "--depth": item.depth } as CSSProperties}>
											{item.type === "folder" ? (
												<ChevronDown
													className={item.open ? "is-open" : ""}
													size={11}
												/>
											) : (
												<span className="cursor-file-spacer" />
											)}
											<Icon
												className={item.color ? `file-${item.color}` : ""}
												size={13}
											/>
											<span>{item.label}</span>
											{item.status ? <i /> : null}
											{item.meta ? <b>{item.meta}</b> : null}
										</div>
									)
								})}
							</div>
						</div>
						<div className="cursor-sidebar-footer">
							<span>OUTLINE</span>
							<span>TIMELINE</span>
						</div>
					</aside>

					<section className="cursor-editor">
						<div className="cursor-tabs">
							<div className="cursor-tab muted">Browser Tab</div>
							<div className="cursor-tab clean">
								components.json <span>U</span>
							</div>
							<div className="cursor-tab is-active">
								page.tsx <b>5, M</b>
								<X size={12} />
							</div>
						</div>
						<div className="cursor-breadcrumbs">
							src <ChevronRight size={10} /> app <ChevronRight size={10} />{" "}
							page.tsx <ChevronRight size={10} /> Home{" "}
							<ChevronRight size={10} /> handleUpload <ChevronRight size={10} />{" "}
							newIcons <ChevronRight size={10} /> parser
						</div>
						<div className="cursor-code-area" key={`code-${replayKeys.code}`}>
							<div className="cursor-code-rail" />
							{codeLines.map((line, index) => (
								<CodeLine index={index} key={line.n} line={line} />
							))}
							<div className="cursor-scrollbar">
								<span />
								<i />
								<b />
							</div>
						</div>
					</section>

					<aside className="cursor-agent">
						<div className="cursor-agent-toolbar">
							<div>
								<Bot size={13} />
								<span>New Agent</span>
								<X size={12} />
							</div>
							<div>
								<Plus size={14} />
								<Circle size={13} />
								<MoreHorizontal size={14} />
								<PanelRight size={13} />
							</div>
						</div>
						<div className="cursor-agent-search">Search Agents...</div>
						<div className="cursor-agent-card">
							<p>Build me a web application Radian</p>
							<div className="cursor-agent-card-footer">
								<span>∞</span>
								<strong>Composer 2.5 Fast</strong>
								<button aria-label="Attach" type="button">
									<GitPullRequest size={14} />
								</button>
								<button aria-label="Send" type="button">
									<ChevronRight size={16} />
								</button>
							</div>
						</div>
					</aside>
				</div>

				<div className="cursor-statusbar">
					<div>
						<span className="cursor-status-primary">
							<ChevronRight size={13} />
						</span>
						<GitBranch size={12} />
						<span>master*</span>
						<span>icon-preview</span>
						<Circle size={11} />
						<span>0</span>
						<Circle size={11} />
						<span>1</span>
						<span>Live Share</span>
					</div>
					<div>
						<span>Cursor Tab</span>
						<span>Go Live</span>
					</div>
				</div>
			</div>
			<FloatingPanel
				className="cursor-codex-panel"
				id="codex"
				onPointerDown={handleFloatingPointerDown}
				position={floatingPanels.codex}>
				<div className="cursor-floating-titlebar cursor-floating-dark">
					<WindowDots />
					<span>Codex</span>
				</div>
				<div className="cursor-codex-body" key={`codex-${replayKeys.codex}`}>
					<div className="cursor-codex-prompt">
						<Terminal size={12} />
						<p>Build the upload card and wire it to Radian components.</p>
					</div>
					<div className="cursor-codex-events">
						<div>
							<CheckCircle2 size={12} />
							<span>Created preview states</span>
						</div>
						<div>
							<CheckCircle2 size={12} />
							<span>Updated file tree</span>
						</div>
						<div>
							<Clock3 size={12} />
							<span>Reviewing accessibility labels</span>
						</div>
					</div>
					<div className="cursor-codex-input">
						<span>&gt;</span>
						<p>Ask Codex to continue...</p>
					</div>
					<div className="cursor-codex-footer">
						<Play size={12} />
						<span>auto</span>
						<strong>Opus 4.8</strong>
						<small>1M context</small>
					</div>
				</div>
			</FloatingPanel>

			<FloatingPanel
				className="cursor-ai-panel"
				id="conversation"
				onPointerDown={handleFloatingPointerDown}
				position={floatingPanels.conversation}>
				<div className="cursor-floating-titlebar">
					<WindowDots />
					<span>AI conversation</span>
				</div>
				<div className="cursor-ai-body" key={`ai-${replayKeys.ai}`}>
					<div className="cursor-ai-header">
						<div>
							<Bot size={14} />
							<span>Chat</span>
						</div>
						<small>Editing page.tsx</small>
					</div>
					<div className="cursor-ai-thread">
						<div className="cursor-ai-message user">
							<p>Create a polished upload flow for the docs page.</p>
						</div>
						<div className="cursor-ai-message assistant">
							<span>
								<Sparkles size={12} />
								Thinking
							</span>
							<p>
								I&apos;ll update the preview component, add file validation, and
								keep the install section consistent with the existing page.
							</p>
						</div>
						<div className="cursor-ai-thinking">
							<span />
							<p>Reading component structure</p>
						</div>
						<div className="cursor-ai-message assistant compact">
							<span>
								<CheckCircle2 size={12} />
								Edited
							</span>
							<p>Preview and code example are now in sync.</p>
						</div>
					</div>
					<div className="cursor-ai-message assistant">
						<Sparkles size={13} />
						<p>
							I’ll add drag states, file validation, and a clean empty state.
						</p>
					</div>
					<div className="cursor-ai-compose">
						<Paperclip size={13} />
						<span>Ask about this component...</span>
						<button aria-label="Send message" type="button">
							<ArrowUp size={14} />
						</button>
					</div>
				</div>
			</FloatingPanel>
			<div className="cursor-stage-fade" />
		</div>
	)
}
