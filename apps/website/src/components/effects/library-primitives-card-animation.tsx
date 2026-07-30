"use client"

import type { CSSProperties, KeyboardEvent } from "react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
	Check,
	Copy,
	FileCode2,
	Layers3,
	Search,
	SlidersHorizontal,
	SquareStack,
} from "lucide-react"

const ROTATE_MS = 4200

const components = [
	"Accordion",
	"Alert Dialog",
	"Button",
	"Calendar",
	"Command",
	"Data Table",
	"Dropdown",
	"Input",
	"Tabs",
]

const libraryStates = [
	{
		name: "Accordion",
		command: "copy components/accordion",
		status: "4 variants",
		code: '<Accordion variant="clean" />',
		detail: ["Header", "Trigger", "Content"],
		accent: "var(--color-primary)",
		soft: "var(--color-primary-accent)",
	},
	{
		name: "Command",
		command: "copy components/command",
		status: "keyboard ready",
		code: '<CommandMenu tone="panel" />',
		detail: ["Search", "Groups", "Actions"],
		accent: "var(--color-info)",
		soft: "var(--color-info-accent)",
	},
	{
		name: "Data Table",
		command: "copy components/data-table",
		status: "filters included",
		code: '<DataTable density="compact" />',
		detail: ["Columns", "Filters", "Rows"],
		accent: "var(--color-success)",
		soft: "var(--color-success-accent)",
	},
	{
		name: "Calendar",
		command: "copy components/calendar",
		status: "date states",
		code: "<Calendar range presets />",
		detail: ["Range", "Presets", "Disabled"],
		accent: "var(--color-warning)",
		soft: "var(--color-warning-accent)",
	},
] as const

type LibraryState = (typeof libraryStates)[number]
type LibraryVars = CSSProperties & Record<`--${string}`, string>

function getLibraryStyle(state: LibraryState): LibraryVars {
	return {
		"--component-accent": state.accent,
		"--component-soft": state.soft,
	}
}

export function LibraryComponentsCard({
	className = "",
}: { className?: string } = {}) {
	const [stateIndex, setStateIndex] = useState(0)
	const [cycleReset, setCycleReset] = useState(0)
	const [isInView, setIsInView] = useState(false)
	const containerRef = useRef<HTMLElement>(null)
	const activeState = libraryStates[stateIndex]
	const libraryStyle = useMemo(
		() => getLibraryStyle(activeState),
		[activeState]
	)

	const advanceState = useCallback(() => {
		setStateIndex((current) => (current + 1) % libraryStates.length)
		setCycleReset((current) => current + 1)
	}, [])

	useEffect(() => {
		const el = containerRef.current
		if (!el) return

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsInView(true)
					observer.disconnect()
				}
			},
			{ threshold: 0.15 }
		)

		observer.observe(el)
		return () => observer.disconnect()
	}, [])

	useEffect(() => {
		if (!isInView) return
		const timeout = window.setTimeout(advanceState, ROTATE_MS)
		return () => window.clearTimeout(timeout)
	}, [advanceState, cycleReset, isInView])

	function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault()
			advanceState()
		}
	}

	return (
		<article
			aria-label="Complete library of UI components concept. Click to cycle the component library preview."
			className={`component-library-card focus:outline-none${isInView ? "is-in-view" : ""} ${className}`.trimEnd()}
			onClick={advanceState}
			onKeyDown={handleKeyDown}
			ref={containerRef}
			role="button"
			style={libraryStyle}
			tabIndex={0}>
			<header className="component-library-header">
				<div>
					<p>A Complete Library</p>
					<h2>Styled UI Components</h2>
				</div>
				<div className="component-library-count">
					<Layers3 aria-hidden="true" size={13} />
					50+
				</div>
			</header>

			<div className="component-command">
				<Search aria-hidden="true" size={13} />
				<span key={activeState.command}>{activeState.command}</span>
				<kbd>cmd k</kbd>
			</div>

			<section className="component-library-body">
				<div className="component-catalog" key={activeState.name}>
					{components.map((name, index) => {
						const isActive = name === activeState.name

						return (
							<div
								className={`component-catalog-row row-${index + 1} ${
									isActive ? "is-active" : ""
								}`}
								key={name}>
								<SquareStack aria-hidden="true" size={13} />
								<span>{name}</span>
							</div>
						)
					})}
				</div>

				<div className="component-preview-panel" key={activeState.code}>
					<div className="component-preview-top">
						<span>{activeState.name}</span>
						<span>{activeState.status}</span>
					</div>
					<div className="component-preview-window">
						<div className="component-preview-line is-wide" />
						<div className="component-preview-line" />
						<div className="component-preview-control">
							<span />
							<span />
							<span />
						</div>
					</div>
					<div className="component-code-line">
						<FileCode2 aria-hidden="true" size={13} />
						<span>{activeState.code}</span>
					</div>
					<div className="component-detail-list">
						{activeState.detail.map((item) => (
							<span key={item}>
								<Check aria-hidden="true" size={11} />
								{item}
							</span>
						))}
					</div>
				</div>
			</section>

			<footer className="component-copy-strip">
				<SlidersHorizontal aria-hidden="true" size={14} />
				<p>Pre-styled React components built with Tailwind CSS</p>
				<button aria-label="Copy component" type="button">
					<Copy aria-hidden="true" size={12} />
				</button>
			</footer>
		</article>
	)
}
