import Script from "next/script"

const key = process.env.NEXT_PUBLIC_AHREFS_ANALYTICS_KEY

export default function AhrefsAnalytics() {
	if (!key) {
		return null
	}

	return (
		<Script
			src="https://analytics.ahrefs.com/analytics.js"
			data-key={key}
			strategy="lazyOnload"
		/>
	)
}
