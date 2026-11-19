"use client"

import { useSyncExternalStore } from "react"
import type { BrandLogoTheme } from "./brand-logos-data"

function subscribe(onChange: () => void) {
	const observer = new MutationObserver(onChange)
	observer.observe(document.documentElement, {
		attributes: true,
		attributeFilter: ["class"],
	})
	return () => observer.disconnect()
}
function getSnapshot(): BrandLogoTheme {
	return document.documentElement.classList.contains("dark") ? "dark" : "light"
}
function getServerSnapshot(): undefined {
	return undefined
}

// Follow the theme actually painted by the page, including its startup script.
export function useBrandLogoTheme() {
	return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
