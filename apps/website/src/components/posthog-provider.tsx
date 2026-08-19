"use client"

import { Suspense, useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

type PostHogClient = typeof import("posthog-js").default

let analyticsPromise: Promise<PostHogClient> | null = null
let lastCapturedPageview: string | null = null

function capturePageview(posthog: PostHogClient, url: string) {
	if (lastCapturedPageview === url) return

	lastCapturedPageview = url
	posthog.capture("$pageview", { $current_url: url })
}

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
			autocapture: true,
			capture_pageview: false,
			capture_pageleave: true,
			disable_session_recording: false,
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
		let analyticsScheduled = false
		let animationFrame = 0
		let secondAnimationFrame = 0
		let idleCallback: number | undefined
		let fallbackTimeout: ReturnType<typeof setTimeout> | undefined
		const landingUrl = window.location.href
		const interactionEvents = [
			"pointerdown",
			"pointermove",
			"keydown",
			"touchstart",
			"scroll",
		] as const

		const removeListeners = () => {
			interactionEvents.forEach((eventName) =>
				window.removeEventListener(eventName, scheduleAnalytics)
			)
		}

		const initializeAnalytics = () => {
			if (disposed) return

			void loadAnalytics()
				.then((posthog) => {
					if (disposed) return

					capturePageview(posthog, landingUrl)
					capturePageview(posthog, window.location.href)
				})
				.catch(() => {
					// A transient chunk/network failure should not surface as a page error.
					analyticsPromise = null
					if (disposed) return
					analyticsScheduled = false
					fallbackTimeout = setTimeout(scheduleAnalytics, 5000)
				})
		}

		const scheduleAnalytics = () => {
			if (analyticsScheduled || disposed) return

			analyticsScheduled = true
			removeListeners()
			if (fallbackTimeout) clearTimeout(fallbackTimeout)

			// Give the triggering interaction two opportunities to paint before the
			// analytics bundle is downloaded, parsed, and session recording starts.
			animationFrame = window.requestAnimationFrame(() => {
				secondAnimationFrame = window.requestAnimationFrame(() => {
					if ("requestIdleCallback" in window) {
						idleCallback = window.requestIdleCallback(initializeAnalytics, {
							timeout: 3000,
						})
					} else {
						fallbackTimeout = setTimeout(initializeAnalytics, 0)
					}
				})
			})
		}

		interactionEvents.forEach((eventName) =>
			window.addEventListener(eventName, scheduleAnalytics, {
				once: true,
				passive: true,
			})
		)

		// Capture readers who remain on the page without interacting, after the
		// initial Core Web Vitals measurement window has safely passed.
		fallbackTimeout = setTimeout(scheduleAnalytics, 30_000)

		return () => {
			disposed = true
			removeListeners()
			window.cancelAnimationFrame(animationFrame)
			window.cancelAnimationFrame(secondAnimationFrame)
			if (idleCallback !== undefined && "cancelIdleCallback" in window) {
				window.cancelIdleCallback(idleCallback)
			}
			if (fallbackTimeout) clearTimeout(fallbackTimeout)
		}
	}, [])

	useEffect(() => {
		if (!analyticsPromise) return

		void analyticsPromise
			.then((posthog) => capturePageview(posthog, window.location.href))
			.catch(() => {})
	}, [pathname, searchParams])

	return null
}
