"use client"

import type { CSSProperties, KeyboardEvent } from "react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

const TOTAL_CREDITS = 100
const TOTAL_BARS = 45
const VALUE_ANIMATION_MS = 950
const STATE_INTERVAL_MS = 5000
const usageBars = Array.from({ length: TOTAL_BARS }, (_, id) => ({ id }))

function getCleanTickFill(value: number) {
	if (value <= 0) {
		return 0
	}

	if (value >= 1) {
		return 1
	}

	return value >= 0.55 ? 1 : 0
}

const usageRows = [
	{
		date: "January 16, 2026",
		model: "Kimi K3 Moonshot",
		credits: "212.1K",
	},
	{
		date: "January 17, 2026",
		model: "Codex 5.3 Thinking",
		credits: "523.1K",
	},
	{
		date: "January 18, 2026",
		model: "Claude Opus 4.8",
		credits: "322K",
	},
	{
		date: "January 19, 2026",
		model: "Gemini 3 Pro",
		credits: "234K",
	},
	{
		date: "January 20, 2026",
		model: "Codex 5.2 Thinking",
		credits: "832K",
	},
]

function getRevealStyle(index: number): CSSProperties {
	return {
		animationDelay: `${90 + index * 95}ms`,
	}
}

const creditStates = [
	{
		name: "Steady",
		percentUsed: 82.6,
		progress: "ticks",
		font: '"Inter", system-ui, sans-serif',
		bg: "var(--color-elevation-level1)",
		border: "var(--color-border)",
		text: "var(--color-fg)",
		muted: "var(--color-fg-secondary)",
		divider: "var(--color-border)",
		soft: "var(--color-fill3)",
		dash: "var(--color-fill4)",
		accent: "var(--color-primary)",
		toggle: "var(--color-info)",
		radius: "11.25px",
		buttonRadius: "999px",
		padX: "19.75px",
		padTop: "20.5px",
		barWidth: "4px",
		barHeight: "28px",
		barRadius: "999px",
		barGap: "6.25px",
		rowHeight: "32px",
	},
	{
		name: "Comfortable",
		percentUsed: 64.8,
		progress: "pill",
		font: '"Space Grotesk", system-ui, sans-serif',
		bg: "var(--color-elevation-level1)",
		border: "var(--color-border)",
		text: "var(--color-fg)",
		muted: "var(--color-fg-secondary)",
		divider: "var(--color-border)",
		soft: "var(--color-fill3)",
		dash: "var(--color-fill4)",
		accent: "var(--color-success)",
		toggle: "var(--color-info)",
		radius: "12px",
		buttonRadius: "999px",
		padX: "19.75px",
		padTop: "20.5px",
		barWidth: "4px",
		barHeight: "24px",
		barRadius: "999px",
		barGap: "6.25px",
		rowHeight: "31px",
	},
	{
		name: "Accelerating",
		percentUsed: 76.4,
		progress: "ticks",
		font: '"Sora", system-ui, sans-serif',
		bg: "var(--color-elevation-level1)",
		border: "var(--color-border)",
		text: "var(--color-fg)",
		muted: "var(--color-fg-secondary)",
		divider: "var(--color-border)",
		soft: "var(--color-fill3)",
		dash: "var(--color-fill4)",
		accent: "var(--color-primary)",
		toggle: "var(--color-info)",
		radius: "10px",
		buttonRadius: "999px",
		padX: "19.75px",
		padTop: "20.5px",
		barWidth: "3.5px",
		barHeight: "28px",
		barRadius: "2px",
		barGap: "6.75px",
		rowHeight: "32px",
	},
	{
		name: "Terminal",
		percentUsed: 91.2,
		progress: "square",
		font: '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
		bg: "var(--color-elevation-level1)",
		border: "var(--color-border)",
		text: "var(--color-fg)",
		muted: "var(--color-fg-secondary)",
		divider: "var(--color-border)",
		soft: "var(--color-fill3)",
		dash: "var(--color-fill4)",
		accent: "var(--color-error)",
		toggle: "var(--color-error)",
		radius: "0px",
		buttonRadius: "0px",
		padX: "19.75px",
		padTop: "20.5px",
		barWidth: "4px",
		barHeight: "28px",
		barRadius: "0px",
		barGap: "6.25px",
		rowHeight: "32px",
	},
	{
		name: "Balanced",
		percentUsed: 58.3,
		progress: "rail",
		font: '"Urbanist", system-ui, sans-serif',
		bg: "var(--color-elevation-level1)",
		border: "var(--color-border)",
		text: "var(--color-fg)",
		muted: "var(--color-fg-secondary)",
		divider: "var(--color-border)",
		soft: "var(--color-fill3)",
		dash: "var(--color-fill4)",
		accent: "var(--color-info)",
		toggle: "var(--color-info)",
		radius: "13px",
		buttonRadius: "999px",
		padX: "19.75px",
		padTop: "20.5px",
		barWidth: "5px",
		barHeight: "22px",
		barRadius: "4px",
		barGap: "5px",
		rowHeight: "32px",
	},
	{
		name: "Compact",
		percentUsed: 69.5,
		progress: "ticks",
		font: '"Manrope", system-ui, sans-serif',
		bg: "var(--color-elevation-level1)",
		border: "var(--color-border)",
		text: "var(--color-fg)",
		muted: "var(--color-fg-secondary)",
		divider: "var(--color-border)",
		soft: "var(--color-fill3)",
		dash: "var(--color-fill4)",
		accent: "var(--color-primary)",
		toggle: "var(--color-info)",
		radius: "9px",
		buttonRadius: "6px",
		padX: "18.5px",
		padTop: "18.75px",
		barWidth: "3.5px",
		barHeight: "24px",
		barRadius: "1.5px",
		barGap: "6px",
		rowHeight: "30.5px",
	},
	{
		name: "Chunky",
		percentUsed: 87.9,
		progress: "striped-rail",
		font: '"Outfit", system-ui, sans-serif',
		bg: "var(--color-elevation-level1)",
		border: "color-mix(in srgb, var(--color-fg-secondary), transparent 70%)",
		text: "var(--color-fg)",
		muted: "var(--color-fg-secondary)",
		divider: "var(--color-border)",
		soft: "var(--color-fill3)",
		dash: "var(--color-fill4)",
		accent: "var(--color-warning)",
		toggle: "var(--color-info)",
		radius: "18px",
		buttonRadius: "14px",
		padX: "20.75px",
		padTop: "21px",
		barWidth: "6px",
		barHeight: "30px",
		barRadius: "999px",
		barGap: "4.25px",
		rowHeight: "31.25px",
	},
	{
		name: "Console Grid",
		percentUsed: 73.1,
		progress: "striped-ticks",
		font: '"Azeret Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
		bg: "var(--color-elevation-level1)",
		border: "var(--color-border)",
		text: "var(--color-fg)",
		muted: "var(--color-fg-secondary)",
		divider: "var(--color-border)",
		soft: "var(--color-fill3)",
		dash: "var(--color-fill4)",
		accent: "var(--color-info)",
		toggle: "var(--color-info)",
		radius: "4px",
		buttonRadius: "2px",
		padX: "19.75px",
		padTop: "20.5px",
		barWidth: "4px",
		barHeight: "26px",
		barRadius: "0px",
		barGap: "6.25px",
		rowHeight: "32px",
	},
]

type ThemeVars = CSSProperties & Record<`--${string}`, string>

function getThemeStyle(theme: (typeof creditStates)[number]): ThemeVars {
	return {
		"--card-font": theme.font,
		"--card-bg": theme.bg,
		"--card-border": theme.border,
		"--card-text": theme.text,
		"--card-muted": theme.muted,
		"--card-divider": theme.divider,
		"--card-soft": theme.soft,
		"--card-dash": theme.dash,
		"--card-accent": theme.accent,
		"--card-toggle": theme.toggle,
		"--card-radius": theme.radius,
		"--card-button-radius": theme.buttonRadius,
		"--card-pad-x": theme.padX,
		"--card-pad-top": theme.padTop,
		"--card-bar-width": theme.barWidth,
		"--card-bar-height": theme.barHeight,
		"--card-bar-radius": theme.barRadius,
		"--card-bar-gap": theme.barGap,
		"--card-row-height": theme.rowHeight,
	}
}

export function CreditCardUsageAnimation() {
	const [stateIndex, setStateIndex] = useState(0)
	const [isPopping, setIsPopping] = useState(false)
	const [cycleReset, setCycleReset] = useState(0)
	const [isInView, setIsInView] = useState(false)
	const containerRef = useRef<HTMLElement>(null)
	const [displayPercent, setDisplayPercent] = useState(
		creditStates[0].percentUsed
	)
	const displayPercentRef = useRef(displayPercent)
	const activeState = creditStates[stateIndex]
	const themeStyle = useMemo(() => getThemeStyle(activeState), [activeState])
	const isRailProgress = activeState.progress.includes("rail")
	const isStripedProgress = activeState.progress.includes("striped")
	const barProgress = (displayPercent / TOTAL_CREDITS) * TOTAL_BARS
	const usedCredits = displayPercent.toFixed(1)

	const advanceTheme = useCallback(() => {
		setStateIndex((current) => (current + 1) % creditStates.length)
		setCycleReset((current) => current + 1)
		setIsPopping(false)
		window.requestAnimationFrame(() => {
			window.requestAnimationFrame(() => setIsPopping(true))
		})
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
		const timeout = window.setTimeout(advanceTheme, STATE_INTERVAL_MS)
		return () => window.clearTimeout(timeout)
	}, [advanceTheme, cycleReset, isInView])

	useEffect(() => {
		let frameId = 0
		const startValue = displayPercentRef.current
		const endValue = activeState.percentUsed
		const startedAt = window.performance.now()

		function easeOutCubic(value: number) {
			return 1 - Math.pow(1 - value, 3)
		}

		function update(now: number) {
			const progress = Math.min((now - startedAt) / VALUE_ANIMATION_MS, 1)
			const eased = easeOutCubic(progress)
			const nextValue = startValue + (endValue - startValue) * eased
			displayPercentRef.current = nextValue
			setDisplayPercent(nextValue)

			if (progress < 1) {
				frameId = window.requestAnimationFrame(update)
			}
		}

		frameId = window.requestAnimationFrame(update)
		return () => window.cancelAnimationFrame(frameId)
	}, [activeState.percentUsed])

	function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault()
			advanceTheme()
		}
	}

	const revealClass = isInView
		? "credit-content-reveal"
		: "credit-reveal-hidden"
	const rowRevealClass = isInView ? "credit-row-reveal" : "credit-reveal-hidden"

	return (
		<article
			aria-label={`Credits usage card, ${activeState.name} state. Click to change usage state.`}
			className={`credit-usage-card credit-card-frame relative overflow-hidden focus:outline-none ${
				isPopping ? "is-popping" : ""
			}`}
			onAnimationEnd={() => setIsPopping(false)}
			onClick={advanceTheme}
			onKeyDown={handleKeyDown}
			ref={containerRef}
			role="button"
			style={themeStyle}
			tabIndex={0}>
			<div
				className={`${revealClass} flex items-start justify-between gap-[11px]`}
				style={getRevealStyle(0)}>
				<div>
					<p className="text-[11.75px] font-medium uppercase leading-none tracking-[0.12em] text-[var(--card-muted)] transition-colors duration-500">
						Credits Used
					</p>
					<p className="mt-[12px] text-[33.25px] font-semibold leading-[0.78] tracking-[0] text-[var(--card-text)] transition-colors duration-500">
						{displayPercent.toFixed(1)}%
					</p>
				</div>

				<div className="mt-[4px] flex items-center gap-[13.5px]">
					<p className="text-[12px] font-semibold leading-none tracking-[0] text-[var(--card-muted)] transition-colors duration-500">
						Auto Credit Balancer
					</p>
					<div
						aria-hidden="true"
						className="relative h-[20.25px] w-[34.25px] rounded-full bg-[var(--card-toggle)] transition-colors duration-500">
						<span className="bg-fg-inverse absolute right-[2.75px] top-1/2 h-[14.25px] w-[14.25px] -translate-y-1/2 rounded-full transition-colors duration-500" />
					</div>
				</div>
			</div>

			<div
				aria-label="Credits used progress"
				className={`${revealClass} mt-[23.5px] h-[28px] w-full ${
					isRailProgress
						? "flex items-center"
						: "flex items-center justify-between gap-[var(--card-bar-gap)]"
				} transition-[gap] duration-500`}
				style={getRevealStyle(1)}>
				{isRailProgress ? (
					<div className="h-[13px] w-full overflow-hidden rounded-[var(--card-bar-radius)] bg-[var(--card-soft)] transition-[background-color,border-radius,height] duration-500">
						<div
							className={`h-full rounded-[var(--card-bar-radius)] bg-[var(--card-accent)] transition-[background-color,border-radius] duration-500 ${
								isStripedProgress ? "progress-fill-striped-rail" : ""
							}`}
							style={{ width: `${displayPercent}%` }}
						/>
					</div>
				) : (
					usageBars.map((bar) => {
						const fill = getCleanTickFill(barProgress - bar.id)

						return (
							<span
								className="relative block overflow-hidden rounded-[var(--card-bar-radius)] bg-[var(--card-soft)] transition-[background-color,width,height,border-radius] duration-500"
								key={bar.id}
								style={{
									height: "var(--card-bar-height)",
									width: "var(--card-bar-width)",
								}}>
								<span
									className={`absolute bottom-0 left-0 w-full rounded-[var(--card-bar-radius)] bg-[var(--card-accent)] transition-[background-color,border-radius] duration-500 ${
										isStripedProgress ? "progress-fill-striped-tick" : ""
									}`}
									style={{ height: `${fill * 100}%` }}
								/>
							</span>
						)
					})
				)}
			</div>

			<p
				className={`${revealClass} mt-[12px] flex text-[13px] font-semibold uppercase leading-none tracking-[0] text-[var(--card-muted)] transition-colors duration-500`}
				style={getRevealStyle(2)}>
				<span className="inline-block w-[43px] shrink-0 tabular-nums">
					{usedCredits}M
				</span>
				<span>/ 100M Credits</span>
			</p>

			<div
				className={`${revealClass} mt-[15.25px] border-t border-dashed border-[var(--card-dash)] transition-colors duration-500`}
				style={getRevealStyle(3)}
			/>

			<div
				className={`${revealClass} mt-[15.25px] flex items-center gap-[18.5px]`}
				style={getRevealStyle(4)}>
				<h1 className="text-[15.75px] font-semibold leading-none tracking-[0] text-[var(--card-text)] transition-colors duration-500">
					Usage History
				</h1>
				<div className="flex h-[23.5px] items-center rounded-[var(--card-button-radius)] border border-[var(--card-border)] px-[9.5px] text-[12.25px] font-semibold leading-none tracking-[0] text-[var(--card-muted)] shadow-[0_1px_2px_color-mix(in_srgb,var(--card-text)_9%,transparent)] transition-[border-color,border-radius,color,background-color] duration-500">
					View All
				</div>
			</div>

			<div
				className={`${revealClass} mt-[19.5px] grid grid-cols-[1fr_1fr_61.75px] items-center text-[12.75px] font-semibold leading-none tracking-[0] text-[var(--card-muted)] transition-colors duration-500`}
				style={getRevealStyle(5)}>
				<div>Date</div>
				<div>Model</div>
				<div className="text-right">Credits</div>
			</div>

			<div
				className={`${revealClass} mt-[10.75px] border-t border-[var(--card-divider)] transition-colors duration-500`}
				style={getRevealStyle(6)}>
				{usageRows.map((row, index) => (
					<div
						className={`${rowRevealClass} grid grid-cols-[1fr_1fr_61.75px] items-center text-[12px] font-semibold leading-none tracking-[0] text-[var(--card-muted)] transition-[border-color,color,height] duration-500 ${
							index === usageRows.length - 1
								? ""
								: "border-b border-[var(--card-divider)]"
						}`}
						key={row.date}
						style={{
							height: "var(--card-row-height)",
							animationDelay: `${760 + index * 80}ms`,
						}}>
						<div>{row.date}</div>
						<div>{row.model}</div>
						<div className="text-right">{row.credits}</div>
					</div>
				))}
			</div>
		</article>
	)
}
