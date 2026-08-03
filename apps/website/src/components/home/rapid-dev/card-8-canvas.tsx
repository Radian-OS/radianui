"use client"

import type { ReactNode } from "react"
import { useEffect, useRef, useState } from "react"
import {
	BookOpen,
	PanelRight,
	Plus,
	Search,
	SlidersHorizontal,
} from "lucide-react"
import { cn } from "@/lib/utils"

const textStyles = [
	{ name: "Heading 1", icon: "AB", tone: "heading" },
	{ name: "Heading 2", icon: "AB", tone: "heading" },
	{ name: "Heading 3", icon: "AB", tone: "heading" },
	{ name: "Heading 4", icon: "AB", tone: "heading" },
	{ name: "Heading 5", icon: "AB", tone: "heading" },
	{ name: "Heading 6", icon: "AB", tone: "heading" },
	{ name: "Body 18", icon: "abc", tone: "body" },
	{ name: "Body 16", icon: "abc", tone: "body" },
	{ name: "Body 14", icon: "abc", tone: "body" },
	{ name: "Body 13", icon: "abc", tone: "body muted" },
	{ name: "Body 12", icon: "abc", tone: "body muted" },
]

const pages = [
	"Accordion",
	"Alert",
	"Avatar",
	"Badge",
	"Banner",
	"Breadcrumb",
	"Buttons",
	"Calendar",
	"Checkbox",
	"Code Area",
	"Color Picker",
	"Credit Card",
	"Date Picker",
	"Dialog",
]

const collections = [
	["1. Device", "27"],
	["2. Theme Colors", "61"],
	["3. Color Primitives", "285"],
	["4. Font Family", "2"],
	["5. Radius", "13"],
	["6. Spacing", "35"],
]

const groups = [
	["All", "285", ""],
	["Red", "11", "red"],
	["Orange", "11", "orange"],
	["Amber", "11", "amber"],
	["Yellow", "11", "yellow"],
	["Neon", "11", "green"],
	["Green", "11", "emerald"],
	["Emerald", "11", "emerald"],
	["Teal", "11", "teal"],
]

const assets = [
	["A\u2193", "a-arrow-down"],
	["A\u2191", "a-arrow-up"],
	["Aa", "a-large-small"],
	["\u267f", "accessibility"],
	["\u2301", "activity"],
	["\u25b1", "air-vent"],
	["\u25b5", "airplay"],
	["\u25f7", "alarm-clock"],
	["\u25f4", "alarm-clock-check"],
]

const effects = [
	["Shadow", ["e1", "e2", "e3"]],
	[
		"Focus Outer Ring",
		[
			"Neutral \u25fc",
			"Primary \ud83d\udc99",
			"Success \ud83d\udfe9",
			"Destructive \ud83d\udd34",
			"focus-warning \ud83d\udfe0",
			"Info \ud83e\uddca",
			"Orange \ud83c\udf4a",
			"Yellow \ud83d\udfe1",
			"Neon \ud83c\udf4f",
			"Green \ud83d\udfe2",
			"Teal \ud83e\udda0",
			"Cyan \ud83e\uddca",
		],
	],
]

function FigmaMark() {
	return (
		<span aria-hidden="true" className="card-8-figma-mark">
			<span />
			<span />
			<span />
			<span />
			<span />
		</span>
	)
}

function PanelFrame({
	label,
	children,
}: {
	label: string
	children: ReactNode
}) {
	return (
		<div className="card-8-panel-stack">
			<p className="card-8-panel-label">{label}</p>
			<div className="card-8-panel-shell">
				<div className="card-8-panel">{children}</div>
			</div>
		</div>
	)
}

function Card8PanelSet() {
	return (
		<div className="card-8-panel-group">
			<PanelFrame label="Styles">
				<div className="card-8-panel-header">
					<strong>Styles</strong>
					<Plus aria-hidden="true" size={15} />
				</div>
				<div className="card-8-panel-content">
					<p className="card-8-section-label">Text styles</p>
					<div className="card-8-list card-8-style-list">
						{textStyles.map((style) => (
							<div className={`card-8-list-row ${style.tone}`} key={style.name}>
								<span className="card-8-chevron">{"\u203a"}</span>
								<span className="card-8-type-icon">{style.icon}</span>
								<span>{style.name}</span>
							</div>
						))}
					</div>
					<p className="card-8-section-label">Color styles</p>
					<div className="card-8-list-row">
						<span className="card-8-chevron">{"\u203a"}</span>
						<span>Patterns</span>
					</div>
				</div>
			</PanelFrame>

			<PanelFrame label="Pages">
				<div className="card-8-panel-header">
					<strong>Pages</strong>
					<span className="card-8-header-actions">
						<Search aria-hidden="true" size={15} />
						<Plus aria-hidden="true" size={15} />
					</span>
				</div>
				<div className="card-8-panel-content">
					<div className="card-8-pages-title">
						<span>{"\u2756"}</span>
						<strong>Components</strong>
					</div>
					<div className="card-8-list card-8-page-list">
						{pages.map((page, index) => (
							<div
								className={`card-8-list-row ${index > 8 ? "muted" : ""}`}
								key={page}>
								<span className="card-8-page-icon">{"\u27a1\ufe0f"}</span>
								<span>{page}</span>
							</div>
						))}
					</div>
				</div>
			</PanelFrame>

			<PanelFrame label="Variables">
				<div className="card-8-panel-header">
					<strong>Variables</strong>
					<PanelRight aria-hidden="true" size={15} />
				</div>
				<div className="card-8-panel-content card-8-flush">
					<div className="card-8-subheader">
						<strong>Collections</strong>
						<Plus aria-hidden="true" size={15} />
					</div>
					<div className="card-8-variable-list">
						{collections.map(([name, count]) => (
							<div
								className={`card-8-variable-row ${
									name.includes("Color Primitives") ? "active" : ""
								}`}
								key={name}>
								<span>{name}</span>
								<span>{count}</span>
							</div>
						))}
					</div>
					<div className="card-8-subheader card-8-bordered">
						<strong>Groups</strong>
						<span className="card-8-sort-icon">{"\u2261\u2304"}</span>
					</div>
					<div className="card-8-variable-list">
						{groups.map(([name, count, color]) => (
							<div
								className={`card-8-variable-row ${name === "All" ? "selected" : ""}`}
								key={name}>
								<span>
									{name}
									{color ? <i className={`card-8-dot ${color}`} /> : null}
								</span>
								<span>{count}</span>
							</div>
						))}
					</div>
				</div>
			</PanelFrame>

			<PanelFrame label="Assets">
				<div className="card-8-panel-header">
					<strong>Assets</strong>
					<BookOpen aria-hidden="true" size={15} />
				</div>
				<div className="card-8-panel-content">
					<div className="card-8-searchbar">
						<Search aria-hidden="true" size={13} />
						<span>Search in this library</span>
						<SlidersHorizontal aria-hidden="true" size={13} />
					</div>
					<div className="card-8-crumbs">
						<span>{"\u2039"}</span>
						<strong>Created in this file /</strong>
						<strong>{"\ud83c\udf05"} Icons</strong>
					</div>
					<div className="card-8-asset-list">
						{assets.map(([icon, label]) => (
							<div className="card-8-asset-row" key={label}>
								<span className="card-8-asset-icon">{icon}</span>
								<span>{label}</span>
							</div>
						))}
					</div>
				</div>
			</PanelFrame>

			<PanelFrame label="Effects">
				<div className="card-8-panel-header">
					<strong>Effects Styles</strong>
					<Plus aria-hidden="true" size={15} />
				</div>
				<div className="card-8-panel-content">
					{effects.map(([title, items]) => (
						<div className="card-8-effects-group" key={title as string}>
							<div className="card-8-effects-title">
								<span>{"\u2304"}</span>
								<strong>{title as string}</strong>
							</div>
							{(items as string[]).map((item) => (
								<div className="card-8-effect-row" key={item}>
									<span className="card-8-checkbox" />
									<span>{item}</span>
								</div>
							))}
						</div>
					))}
				</div>
			</PanelFrame>
		</div>
	)
}

export function Card8Canvas() {
	const ref = useRef<HTMLElement>(null)
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		const el = ref.current
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

	return (
		<section
			ref={ref}
			aria-label="Card 8 animation canvas"
			className={cn("card-8-canvas select-none", isVisible && "is-visible")}
			data-nosnippet
			aria-hidden="true">
			<div className="card-8-preview-shell">
				<div className="card-8-preview-pill">
					<FigmaMark />
					<span className="card-8-diamond">{"\u2756"}</span>
					<span>Preview</span>
					<span className="card-8-diamond">{"\u2756"}</span>
					<span>Radian Design System</span>
					<span className="card-8-diamond">{"\u2756"}</span>
					<span>Version 0.3</span>
					<PanelRight
						aria-hidden="true"
						className="card-8-preview-icon"
						size={20}
					/>
				</div>
			</div>

			<div className="card-8-panel-row">
				<Card8PanelSet />
				<Card8PanelSet />
			</div>
		</section>
	)
}
