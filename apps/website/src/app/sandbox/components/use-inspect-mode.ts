"use client"

import { type RefObject, useEffect } from "react"
import { highlightJsx, resolveElementSourceDetails } from "./source-locator"
import type { PreviewKey, ViewMode } from "./types"

export function useInspectMode(
	iframeRef: RefObject<HTMLIFrameElement | null>,
	viewMode: ViewMode,
	activeComponent: PreviewKey,
	componentFiles: Record<string, string> = {},
	defaultFile: string = "page.tsx"
) {
	useEffect(() => {
		const iframe = iframeRef.current
		if (!iframe) return

		const setupInspect = () => {
			try {
				const doc = iframe.contentDocument || iframe.contentWindow?.document
				if (!doc) return

				const existingStyle = doc.getElementById("sandbox-inspect-style")
				const existingBadge = doc.getElementById("sandbox-inspect-badge")
				if (existingStyle) existingStyle.remove()
				if (existingBadge) existingBadge.remove()

				if (viewMode !== "inspect") return

				const style = doc.createElement("style")
				style.id = "sandbox-inspect-style"
				style.textContent = `
					.sandbox-inspect-hover {
						outline: 2px dashed #0284c7 !important;
						outline-offset: -1px !important;
						cursor: crosshair !important;
						transition: outline 0.1s ease-in-out !important;
					}
				`
				doc.head.appendChild(style)

				const badge = doc.createElement("div")
				badge.id = "sandbox-inspect-badge"
				badge.style.position = "fixed"
				badge.style.zIndex = "999999"
				badge.style.display = "none"
				badge.style.pointerEvents = "none"
				badge.style.maxWidth = "520px"
				badge.style.minWidth = "240px"
				badge.style.borderRadius = "8px"
				badge.style.overflow = "hidden"
				badge.style.fontFamily =
					"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
				badge.style.fontSize = "11px"
				badge.style.lineHeight = "1.4"
				badge.style.backgroundColor = "#0d1117"
				badge.style.color = "#e6edf3"
				badge.style.border = "1px solid rgba(255, 255, 255, 0.18)"
				badge.style.boxShadow =
					"0 8px 32px rgba(0, 0, 0, 0.55), 0 2px 8px rgba(0, 0, 0, 0.35)"
				doc.body.appendChild(badge)

				let currentHovered: HTMLElement | null = null

				const handleMouseOver = (e: MouseEvent) => {
					const target = e.target as HTMLElement | null
					if (
						!target ||
						target === badge ||
						target === doc.body ||
						target === doc.documentElement
					) {
						return
					}

					if (currentHovered && currentHovered !== target) {
						currentHovered.classList.remove("sandbox-inspect-hover")
					}

					currentHovered = target
					target.classList.add("sandbox-inspect-hover")

					const rect = target.getBoundingClientRect()
					const details = resolveElementSourceDetails(
						target,
						componentFiles,
						defaultFile
					)

					const dims = `${Math.round(rect.width)} × ${Math.round(rect.height)} px`
					const sourceText = `${details.file}:${details.lineNumber}`
					const highlighted = highlightJsx(details.fullCode)

					let tagBadgesHtml = `<span style="background:rgba(56,189,248,0.18);color:#38bdf8;padding:1.5px 6px;border-radius:4px;font-weight:700;">&lt;${details.tag}&gt;</span>`
					if (details.parentTag && details.parentTag !== details.tag) {
						tagBadgesHtml = `<span style="background:rgba(192,132,252,0.18);color:#c084fc;padding:1.5px 6px;border-radius:4px;font-weight:700;">&lt;${details.parentTag}&gt;</span><span style="color:#64748b;font-size:10px;margin:0 2px;">›</span>${tagBadgesHtml}`
					}

					badge.innerHTML = `
						<div style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:6px 10px;background:rgba(255,255,255,0.06);border-bottom:1px solid rgba(255,255,255,0.1);font-size:10.5px;">
							<div style="display:flex;align-items:center;min-width:0;overflow:hidden;gap:2px;">
								${tagBadgesHtml}
							</div>
							<div style="display:flex;align-items:center;gap:6px;color:#94a3b8;font-size:10px;flex-shrink:0;">
								<span>${dims}</span>
								<span>•</span>
								<span style="color:#cbd5e1;font-weight:600;">${sourceText}</span>
							</div>
						</div>
						<div style="padding:8px 10px;max-height:220px;overflow-y:auto;background:#090d16;">
							<pre style="margin:0;font-family:inherit;font-size:11px;line-height:1.45;white-space:pre-wrap;word-break:break-word;tab-size:2;color:#f1f5f9;">${highlighted}</pre>
						</div>
					`

					badge.style.display = "block"

					// Intelligent viewport positioning
					const badgeRect = badge.getBoundingClientRect()
					const badgeHeight = badgeRect.height || 140
					const badgeWidth = badgeRect.width || 320

					const clientWidth = doc.documentElement.clientWidth || 800
					const clientHeight = doc.documentElement.clientHeight || 600

					let badgeTop = rect.top - badgeHeight - 8
					if (badgeTop < 8) {
						badgeTop = rect.bottom + 8
					}
					if (badgeTop + badgeHeight > clientHeight - 8) {
						badgeTop = Math.max(8, clientHeight - badgeHeight - 8)
					}

					let badgeLeft = Math.max(
						8,
						Math.min(rect.left, clientWidth - badgeWidth - 16)
					)

					badge.style.top = `${Math.round(badgeTop)}px`
					badge.style.left = `${Math.round(badgeLeft)}px`
				}

				const handleMouseOut = (e: MouseEvent) => {
					const target = e.target as HTMLElement | null
					if (target && target === currentHovered) {
						target.classList.remove("sandbox-inspect-hover")
						badge.style.display = "none"
						currentHovered = null
					}
				}

				doc.addEventListener("mouseover", handleMouseOver, true)
				doc.addEventListener("mouseout", handleMouseOut, true)

				return () => {
					doc.removeEventListener("mouseover", handleMouseOver, true)
					doc.removeEventListener("mouseout", handleMouseOut, true)
					if (currentHovered) {
						currentHovered.classList.remove("sandbox-inspect-hover")
					}
					const s = doc.getElementById("sandbox-inspect-style")
					const b = doc.getElementById("sandbox-inspect-badge")
					if (s) s.remove()
					if (b) b.remove()
				}
			} catch (err) {
				console.error("Error setting up inspect mode:", err)
			}
		}

		const cleanup = setupInspect()
		iframe.addEventListener("load", setupInspect)

		return () => {
			iframe.removeEventListener("load", setupInspect)
			cleanup?.()
		}
	}, [viewMode, activeComponent, iframeRef, componentFiles, defaultFile])
}
