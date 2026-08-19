"use client"

import { Suspense, useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

type PostHogClient = typeof import("posthog-js").default

let analyticsPromise: Promise<PostHogClient> | null = null

function loadAnalytics() {
	if (analyticsPromise) return analyticsPromise

	analyticsPromise = Promise.all([
		import("posthog-js"),
		import("web-vitals"),
	]).then(([posthogModule, vitals]) => {
		const posthog = posthogModule.default

		posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
			api_host: "/ingest",
			ui_host: "https://us.posthog.com",
			capture_pageview: false,
			capture_pageleave: true,
		})

		const captureVital =
			(name: string) =>
			(metric: { value: number; rating: string; delta: number }) => {
				posthog.capture(`${name}_measured`, {
					value: metric.value,
					rating: metric.rating,
					delta: metric.delta,
					page_url: window.location.pathname,
				})
			}

		vitals.onLCP(captureVital("lcp"))
		vitals.onINP(captureVital("inp"))
		vitals.onCLS(captureVital("cls"))
		vitals.onFCP(captureVital("fcp"))
		vitals.onTTFB(captureVital("ttfb"))

		return posthog
	})

	return analyticsPromise
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Suspense fallback={null}>
				<PostHogAnalytics />
			</Suspense>
			{children}
		</>
	)
}

function PostHogAnalytics() {
	const pathname = usePathname()
	const searchParams = useSearchParams()

	useEffect(() => {
		const isProduction =
			window.location.hostname === "radianui.com" ||
			window.location.hostname === "www.radianui.com"

		if (!isProduction || !process.env.NEXT_PUBLIC_POSTHOG_KEY) return

		let disposed = false
		const interactionEvents = [
			"pointerdown",
			"keydown",
			"touchstart",
			"scroll",
		] as const

		const removeListeners = () => {
			interactionEvents.forEach((eventName) =>
				window.removeEventListener(eventName, startAnalytics)
			)
		}

		const startAnalytics = () => {
			removeListeners()
			void loadAnalytics().then((posthog) => {
				if (disposed) return
				posthog.capture("$pageview", { $current_url: window.location.href })
			})
		}

		interactionEvents.forEach((eventName) =>
			window.addEventListener(eventName, startAnalytics, {
				once: true,
				passive: true,
			})
		)

		return () => {
			disposed = true
			removeListeners()
		}
	}, [])

	useEffect(() => {
		if (!analyticsPromise) return

		void analyticsPromise.then((posthog) => {
			posthog.capture("$pageview", { $current_url: window.location.href })
		})
	}, [pathname, searchParams])

	return null
}
