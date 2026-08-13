"use client"

import { Suspense, useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import posthog from "posthog-js"
import { PostHogProvider as PHProvider, usePostHog } from "posthog-js/react"
import { onCLS, onFCP, onINP, onLCP, onTTFB } from "web-vitals"

export function PostHogProvider({ children }: { children: React.ReactNode }) {
	useEffect(() => {
		// Only init PostHog on production domain
		const isProduction =
			typeof window !== "undefined" &&
			(window.location.hostname === "radianui.com" ||
				window.location.hostname === "www.radianui.com")

		if (isProduction) {
			posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
				api_host: "/ingest",
				ui_host: "https://us.posthog.com",
				capture_pageview: false,
				capture_pageleave: true,
			})
		}
	}, [])

	return (
		<PHProvider client={posthog}>
			<SuspendedPostHogPageView />
			<WebVitals />
			{children}
		</PHProvider>
	)
}

// Web Vitals tracking component
function WebVitals() {
	const posthog = usePostHog()

	useEffect(() => {
		if (!posthog) return

		// LCP: Largest Contentful Paint - main loading metric
		// Measures: Time until largest content element loads
		// Good: < 2.5s, Poor: > 4.0s
		onLCP((metric) => {
			posthog.capture("lcp_measured", {
				value: metric.value, // milliseconds
				rating: metric.rating, // "good", "needs-improvement", or "poor"
				delta: metric.delta,
				page_url: window.location.pathname,
			})
		})

		// INP: Interaction to Next Paint (NEW - replaces FID)
		// Measures: Responsiveness to user interactions
		// Good: < 200ms, Poor: > 500ms
		onINP((metric) => {
			posthog.capture("inp_measured", {
				value: metric.value, // milliseconds
				rating: metric.rating,
				delta: metric.delta,
				page_url: window.location.pathname,
			})
		})

		// CLS: Cumulative Layout Shift - visual stability
		// Measures: Unexpected layout shifts while loading
		// Good: < 0.1, Poor: > 0.25
		onCLS((metric) => {
			posthog.capture("cls_measured", {
				value: metric.value, // unitless score
				rating: metric.rating,
				delta: metric.delta,
				page_url: window.location.pathname,
			})
		})

		// FCP: First Contentful Paint - initial loading
		// Measures: Time until first content appears
		// Good: < 1.8s, Poor: > 3.0s
		onFCP((metric) => {
			posthog.capture("fcp_measured", {
				value: metric.value, // milliseconds
				rating: metric.rating,
				delta: metric.delta,
				page_url: window.location.pathname,
			})
		})

		// TTFB: Time to First Byte - server response time
		// Measures: Server response speed
		// Good: < 800ms, Poor: > 1800ms
		onTTFB((metric) => {
			posthog.capture("ttfb_measured", {
				value: metric.value, // milliseconds
				rating: metric.rating,
				delta: metric.delta,
				page_url: window.location.pathname,
			})
		})

		// Note: FID (First Input Delay) has been replaced by INP
		// INP is the newer, more comprehensive interactivity metric
	}, [posthog])

	return null
}

// PageView tracking component
function PostHogPageView() {
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const posthog = usePostHog()

	useEffect(() => {
		if (pathname && posthog) {
			let url = window.origin + pathname
			const search = searchParams.toString()
			if (search) {
				url += "?" + search
			}
			posthog.capture("$pageview", { $current_url: url })
		}
	}, [pathname, searchParams, posthog])

	return null
}

// Suspended version to handle Next.js Suspense boundary
function SuspendedPostHogPageView() {
	return (
		<Suspense fallback={null}>
			<PostHogPageView />
		</Suspense>
	)
}
