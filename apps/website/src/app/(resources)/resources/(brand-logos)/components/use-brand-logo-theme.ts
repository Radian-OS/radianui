"use client"

import { useSyncExternalStore } from "react"
import { useTheme } from "next-themes"
import type { BrandLogoTheme } from "./brand-logos-data"

const subscribe = () => () => {}
const getSnapshot = () => true
const getServerSnapshot = () => false

export function useBrandLogoTheme(): BrandLogoTheme {
	const { resolvedTheme } = useTheme()
	// React uses the server snapshot for the first hydration render, even when
	// next-themes already knows the browser's saved theme.
	const hydrated = useSyncExternalStore(
		subscribe,
		getSnapshot,
		getServerSnapshot
	)
	return hydrated && resolvedTheme === "dark" ? "dark" : "light"
}
