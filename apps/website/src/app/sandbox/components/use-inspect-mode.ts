"use client"

import { type RefObject, useEffect } from "react"
import type { PreviewKey, ViewMode } from "./types"

export function useInspectMode(
	iframeRef: RefObject<HTMLIFrameElement | null>,
	viewMode: ViewMode,
	activeComponent: PreviewKey
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
				badge.style.padding = "3px 8px"
				badge.style.borderRadius = "4px"
				badge.style.fontSize = "11px"
				badge.style.fontFamily = "ui-monospace, monospace"
				badge.style.fontWeight = "600"
				badge.style.backgroundColor = "#0284c7"
				badge.style.color = "#ffffff"
				badge.style.boxShadow = "0 2px 10px rgba(0,0,0,0.3)"
				badge.style.transition = "top 0.05s ease, left 0.05s ease"
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
					const tag = target.tagName.toLowerCase()
					const classNames =
						typeof target.className === "string"
							? target.className
									.split(" ")
									.filter((c) => c && !c.includes("sandbox-inspect"))
									.slice(0, 2)
									.map((c) => `.${c}`)
									.join("")
							: ""
					const dims = `${Math.round(rect.width)} × ${Math.round(rect.height)} px`

					badge.textContent = `${tag}${classNames} | ${dims}`
					badge.style.display = "block"

					const badgeTop = rect.top - 26 < 8 ? rect.bottom + 4 : rect.top - 26
					const badgeLeft = Math.max(
						8,
						Math.min(rect.left, (doc.documentElement.clientWidth || 800) - 220)
					)
					badge.style.top = `${badgeTop}px`
					badge.style.left = `${badgeLeft}px`
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
	}, [viewMode, activeComponent, iframeRef])
}
