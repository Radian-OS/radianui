"use client"

import { useEffect } from "react"

export function GlobalKeyboardListener() {
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (!e.ctrlKey && !e.metaKey && (e.key === "c" || e.key === "C")) {
				const activeEl = document.activeElement as HTMLElement | null
				const isInput =
					activeEl?.tagName === "INPUT" ||
					activeEl?.tagName === "TEXTAREA" ||
					activeEl?.isContentEditable
				const hasSelection = Boolean(window.getSelection()?.toString())

				if (!isInput && !hasSelection) {
					if (window !== window.parent) {
						e.preventDefault()
						window.parent.postMessage({ type: "TOGGLE_COMMENT_MODE" }, "*")
					}
				}
			}
		}

		window.addEventListener("keydown", handleKeyDown)
		return () => window.removeEventListener("keydown", handleKeyDown)
	}, [])

	return null
}
