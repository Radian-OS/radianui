import type { CSSProperties } from "react"

type UtilityColorScale = readonly [
	base: string,
	accent: string,
	focus: string,
	border: string,
	hover: string,
	text: string,
	foreground: string,
]

const utilityColorSuffixes = [
	"",
	"-accent",
	"-focus",
	"-border",
	"-hover",
	"-text",
	"-fg",
] as const

const createUtilityColorVars = (
	palette: Record<string, UtilityColorScale>
): CSSProperties =>
	Object.fromEntries(
		Object.entries(palette).flatMap(([name, values]) =>
			utilityColorSuffixes.map((suffix, index) => [
				`--color-${name}${suffix}`,
				values[index],
			])
		)
	) as CSSProperties

const lightUtilityColorVars = createUtilityColorVars({
	red: [
		"oklch(63.994% 0.22 26.022)",
		"oklch(0.956 0.02 17.516)",
		"oklch(0.914 0.041 17.928)",
		"oklch(0.719 0.175 22.489)",
		"oklch(0.678 0.21 24.689)",
		"oklch(0.571 0.212 27.25)",
		"oklch(1 0 0)",
	],
	orange: [
		"oklch(0.685 0.186 43.133)",
		"oklch(0.961 0.022 50.377)",
		"oklch(0.937 0.035 48.325)",
		"oklch(0.736 0.151 45.93)",
		"oklch(0.736 0.151 45.93)",
		"oklch(0.539 0.138 44.011)",
		"oklch(1 0 0)",
	],
	amber: [
		"oklch(0.802 0.171 73.267)",
		"oklch(0.976 0.024 83.417)",
		"oklch(0.946 0.057 85.031)",
		"oklch(0.802 0.171 73.267)",
		"oklch(0.834 0.159 79.507)",
		"oklch(0.445 0.087 78.294)",
		"oklch(0.445 0.087 78.294)",
	],
	yellow: [
		"oklch(0.9 0.174 96.856)",
		"oklch(0.985 0.028 97.622)",
		"oklch(0.96 0.077 98.121)",
		"oklch(0.801 0.163 95.171)",
		"oklch(0.909 0.163 97.518)",
		"oklch(0.468 0.089 97.47)",
		"oklch(0.468 0.089 97.47)",
	],
	neon: [
		"oklch(0.919 0.231 127.834)",
		"oklch(0.986 0.035 122.616)",
		"oklch(0.966 0.095 123.143)",
		"oklch(0.716 0.187 128.923)",
		"oklch(0.932 0.196 125.802)",
		"oklch(0.495 0.123 127.468)",
		"oklch(0.495 0.123 127.468)",
	],
	green: [
		"oklch(0.654 0.216 142.602)",
		"oklch(0.977 0.027 145.361)",
		"oklch(0.945 0.069 145.006)",
		"oklch(0.712 0.229 142.695)",
		"oklch(0.712 0.229 142.695)",
		"oklch(0.557 0.177 142.724)",
		"oklch(1 0 0)",
	],
	emerald: [
		"oklch(0.633 0.17 148.732)",
		"oklch(0.979 0.023 156.788)",
		"oklch(0.949 0.056 156.01)",
		"oklch(0.689 0.174 149.645)",
		"oklch(0.689 0.174 149.645)",
		"oklch(0.538 0.133 149.927)",
		"oklch(1 0 0)",
	],
	teal: [
		"oklch(0.644 0.125 169.297)",
		"oklch(0.98 0.028 179.036)",
		"oklch(0.951 0.07 177.568)",
		"oklch(0.747 0.146 169.063)",
		"oklch(0.747 0.146 169.063)",
		"oklch(0.543 0.101 170.735)",
		"oklch(1 0 0)",
	],
	cyan: [
		"oklch(0.656 0.109 194.818)",
		"oklch(0.982 0.026 196.729)",
		"oklch(0.953 0.056 196.258)",
		"oklch(0.737 0.125 194.786)",
		"oklch(0.737 0.125 194.786)",
		"oklch(0.552 0.089 194.881)",
		"oklch(1 0 0)",
	],
	"light-blue": [
		"oklch(0.61 0.203 255.637)",
		"oklch(0.966 0.014 246.134)",
		"oklch(0.916 0.035 246.402)",
		"oklch(0.672 0.161 251.544)",
		"oklch(0.672 0.161 251.544)",
		"oklch(0.507 0.141 252.875)",
		"oklch(1 0 0)",
	],
	blue: [
		"oklch(0.534 0.222 272.272)",
		"oklch(0.955 0.018 281.902)",
		"oklch(0.909 0.036 281.534)",
		"oklch(0.69 0.142 278.036)",
		"oklch(0.608 0.199 274.908)",
		"oklch(0.534 0.222 272.272)",
		"oklch(1 0 0)",
	],
	"violet-blue": [
		"oklch(0.528 0.253 282.555)",
		"oklch(0.965 0.016 295.276)",
		"oklch(0.917 0.038 294.81)",
		"oklch(0.68 0.169 290.359)",
		"oklch(0.577 0.228 286.026)",
		"oklch(0.528 0.253 282.555)",
		"oklch(1 0 0)",
	],
	purple: [
		"oklch(0.556 0.252 292.999)",
		"oklch(0.966 0.016 301.95)",
		"oklch(0.92 0.039 301.552)",
		"oklch(0.697 0.171 298.819)",
		"oklch(0.612 0.222 296.035)",
		"oklch(0.556 0.252 292.999)",
		"oklch(1 0 0)",
	],
	"dark-orchid": [
		"oklch(0.623 0.28 310.693)",
		"oklch(0.967 0.023 314.712)",
		"oklch(0.923 0.054 314.543)",
		"oklch(0.747 0.187 313.439)",
		"oklch(0.662 0.252 312.068)",
		"oklch(0.581 0.299 307.027)",
		"oklch(1 0 0)",
	],
	fuchsia: [
		"oklch(0.69 0.262 327.962)",
		"oklch(0.97 0.028 325.792)",
		"oklch(0.923 0.07 326.124)",
		"oklch(0.777 0.201 327.294)",
		"oklch(0.722 0.232 327.65)",
		"oklch(0.584 0.249 328.2)",
		"oklch(1 0 0)",
	],
	magenta: [
		"oklch(0.619 0.251 347.256)",
		"oklch(0.971 0.017 336.187)",
		"oklch(0.923 0.046 338.235)",
		"oklch(0.746 0.184 341.897)",
		"oklch(0.672 0.245 344.927)",
		"oklch(0.557 0.215 345.931)",
		"oklch(1 0 0)",
	],
	rose: [
		"oklch(0.651 0.221 6.174)",
		"oklch(0.96 0.018 354.12)",
		"oklch(0.919 0.039 355.771)",
		"oklch(0.748 0.149 0.148)",
		"oklch(0.687 0.195 3.186)",
		"oklch(0.547 0.198 8.148)",
		"oklch(1 0 0)",
	],
	neutral: [
		"oklch(0.2314 0.0078 274.6)",
		"oklch(0.9677 0.0027 286.35)",
		"oklch(0.9527 0.0027 286.35)",
		"oklch(0.902 0.0068 286.26)",
		"oklch(0.311 0.0125 279.19)",
		"oklch(0.4515 0.0243 285.39)",
		"oklch(0.9764 0.0013 286.38)",
	],
})

const darkUtilityColorVars = createUtilityColorVars({
	red: [
		"oklch(0.64 0.22 26.017)",
		"oklch(0.258 0.066 22.841)",
		"oklch(0.297 0.092 24.743)",
		"oklch(0.442 0.146 25.512)",
		"oklch(0.678 0.21 24.689)",
		"oklch(0.719 0.175 22.489)",
		"oklch(1 0 0)",
	],
	orange: [
		"oklch(0.685 0.186 43.133)",
		"oklch(0.264 0.043 48.474)",
		"oklch(0.331 0.07 45.801)",
		"oklch(0.5 0.127 44.136)",
		"oklch(0.685 0.186 43.133)",
		"oklch(0.736 0.151 45.93)",
		"oklch(1 0 0)",
	],
	amber: [
		"oklch(0.802 0.171 73.267)",
		"oklch(0.266 0.037 83.24)",
		"oklch(0.375 0.064 81.692)",
		"oklch(0.445 0.087 78.294)",
		"oklch(0.834 0.159 79.507)",
		"oklch(0.834 0.159 79.507)",
		"oklch(0.445 0.087 78.294)",
	],
	yellow: [
		"oklch(0.9 0.174 96.856)",
		"oklch(0.28 0.042 98.194)",
		"oklch(0.398 0.07 96.297)",
		"oklch(0.468 0.089 97.47)",
		"oklch(0.909 0.163 97.518)",
		"oklch(0.9 0.174 96.856)",
		"oklch(0.468 0.089 97.47)",
	],
	neon: [
		"oklch(0.919 0.23 127.758)",
		"oklch(0.284 0.052 124.323)",
		"oklch(0.353 0.076 126.25)",
		"oklch(0.495 0.124 127.74)",
		"oklch(0.825 0.217 129.074)",
		"oklch(0.919 0.23 127.758)",
		"oklch(0.495 0.123 127.468)",
	],
	green: [
		"oklch(0.654 0.216 142.602)",
		"oklch(0.27 0.066 143.476)",
		"oklch(0.386 0.112 143.009)",
		"oklch(0.557 0.177 142.724)",
		"oklch(0.712 0.229 142.695)",
		"oklch(0.802 0.266 142.582)",
		"oklch(1 0 0)",
	],
	emerald: [
		"oklch(0.633 0.17 148.732)",
		"oklch(0.272 0.054 152.092)",
		"oklch(0.389 0.093 150.354)",
		"oklch(0.538 0.133 149.927)",
		"oklch(0.689 0.174 149.645)",
		"oklch(0.775 0.212 148.516)",
		"oklch(1 0 0)",
	],
	teal: [
		"oklch(0.644 0.125 169.297)",
		"oklch(0.276 0.04 174.317)",
		"oklch(0.396 0.067 172.384)",
		"oklch(0.543 0.101 170.735)",
		"oklch(0.747 0.146 169.063)",
		"oklch(0.819 0.168 166.757)",
		"oklch(1 0 0)",
	],
	cyan: [
		"oklch(0.656 0.109 194.818)",
		"oklch(0.279 0.037 195.261)",
		"oklch(0.401 0.061 195.007)",
		"oklch(0.552 0.089 194.881)",
		"oklch(0.737 0.125 194.786)",
		"oklch(0.83 0.141 194.772)",
		"oklch(1 0 0)",
	],
	"light-blue": [
		"oklch(0.61 0.203 255.637)",
		"oklch(0.253 0.042 249.823)",
		"oklch(0.315 0.067 250.798)",
		"oklch(0.507 0.141 252.875)",
		"oklch(0.672 0.161 251.544)",
		"oklch(0.748 0.122 249.759)",
		"oklch(1 0 0)",
	],
	blue: [
		"oklch(0.534 0.222 272.272)",
		"oklch(0.244 0.08 274.94)",
		"oklch(0.282 0.117 272.283)",
		"oklch(0.534 0.222 272.272)",
		"oklch(0.608 0.199 274.908)",
		"oklch(0.69 0.142 278.036)",
		"oklch(1 0 0)",
	],
	"violet-blue": [
		"oklch(0.528 0.253 282.555)",
		"oklch(0.26 0.092 287.455)",
		"oklch(0.284 0.122 284.68)",
		"oklch(0.528 0.253 282.555)",
		"oklch(0.577 0.228 286.026)",
		"oklch(0.68 0.169 290.359)",
		"oklch(1 0 0)",
	],
	purple: [
		"oklch(0.556 0.252 292.999)",
		"oklch(0.254 0.084 296.86)",
		"oklch(0.296 0.123 294.393)",
		"oklch(0.556 0.252 292.999)",
		"oklch(0.612 0.222 296.035)",
		"oklch(0.697 0.171 298.819)",
		"oklch(1 0 0)",
	],
	"dark-orchid": [
		"oklch(0.623 0.28 310.693)",
		"oklch(0.255 0.081 313.678)",
		"oklch(0.326 0.127 311.952)",
		"oklch(0.581 0.299 307.027)",
		"oklch(0.662 0.252 312.068)",
		"oklch(0.747 0.187 313.439)",
		"oklch(1 0 0)",
	],
	fuchsia: [
		"oklch(0.69 0.262 327.962)",
		"oklch(0.233 0.07 327.538)",
		"oklch(0.323 0.121 327.938)",
		"oklch(0.584 0.249 328.2)",
		"oklch(0.722 0.232 327.65)",
		"oklch(0.722 0.232 327.65)",
		"oklch(1 0 0)",
	],
	magenta: [
		"oklch(0.619 0.251 347.256)",
		"oklch(0.227 0.06 341.387)",
		"oklch(0.311 0.104 343.968)",
		"oklch(0.557 0.215 345.931)",
		"oklch(0.672 0.245 344.927)",
		"oklch(0.746 0.184 341.897)",
		"oklch(1 0 0)",
	],
	rose: [
		"oklch(0.651 0.221 6.174)",
		"oklch(0.222 0.053 1.408)",
		"oklch(0.303 0.094 4.394)",
		"oklch(0.547 0.198 8.148)",
		"oklch(0.687 0.195 3.186)",
		"oklch(0.687 0.195 3.186)",
		"oklch(1 0 0)",
	],
	neutral: [
		"oklch(1 0 0)",
		"oklch(0.2314 0.0078 274.6)",
		"oklch(0.2738 0.0093 276.77)",
		"oklch(0.2738 0.0093 276.77)",
		"oklch(0.9349 0.004 286.32)",
		"oklch(0.6619 0.0235 285.74)",
		"oklch(0.2764 0.0079 264.44)",
	],
})

export const lightThemeVars = {
	...lightUtilityColorVars,

	// Primary
	"--color-primary": "oklch(0.528 0.2539 282.58)",
	"--color-primary-accent": "oklch(0.94 0.0271 295.05)",
	"--color-primary-focus": "oklch(0.9169 0.0383 295.46)",
	"--color-primary-hover": "oklch(0.5768 0.2279 286.25)",
	"--color-primary-text": "oklch(0.4304 0.202 282.82)",

	// Success
	"--color-success": "oklch(0.6334 0.171 148.65)",
	"--color-success-accent": "oklch(0.9685 0.0336 157.66)",
	"--color-success-focus": "oklch(0.9489 0.0556 156.34)",
	"--color-success-hover": "oklch(0.6901 0.1748 149.64)",
	"--color-success-text": "oklch(0.5388 0.1339 149.74)",

	// Error
	"--color-error": "oklch(0.64 0.22 26.04)",
	"--color-error-accent": "oklch(0.9465 0.0252 17.61)",
	"--color-error-focus": "oklch(0.9133 0.0414 17.93)",
	"--color-error-hover": "oklch(0.6786 0.2095 24.66)",
	"--color-error-text": "oklch(0.5716 0.2125 27.27)",

	// Warning
	"--color-warning": "oklch(0.8016 0.1705 73.27)",
	"--color-warning-accent": "oklch(0.9622 0.0384 83.83)",
	"--color-warning-focus": "oklch(0.946 0.0574 85.03)",
	"--color-warning-hover": "oklch(0.8342 0.1594 79.51)",
	"--color-warning-text": "oklch(0.5461 0.1088 77.73)",

	// Information
	"--color-info": "oklch(0.6092 0.2041 255.8)",
	"--color-info-accent": "oklch(0.949 0.0213 245.85)",
	"--color-info-focus": "oklch(0.9135 0.0358 249.52)",
	"--color-info-hover": "oklch(0.6722 0.1615 251.56)",
	"--color-info-text": "oklch(0.4663 0.1065 251.21)",

	// Background
	"--color-bg": "oklch(1 0 0)",
	"--color-fill1": "oklch(0.9824 0.0013 286.38)",
	"--color-fill2": "oklch(0.9677 0.0027 286.35)",
	"--color-fill3": "oklch(0.9349 0.004 286.32)",
	"--color-fill4": "oklch(0.902 0.0068 286.26)",

	// Foreground
	"--color-fg": "oklch(0.2314 0.0078 274.6)",
	"--color-fg-secondary": "oklch(0.4515 0.0243 285.39)",
	"--color-fg-tertiary": "oklch(0.6261 0.0268 285.6)",
	"--color-fg-disabled": "oklch(0.8352 0.011 286.16)",
	"--color-fg-inverse": "oklch(1 0 0)",

	// Border
	"--color-border": "oklch(0.902 0.0068 286.26)",
	"--color-alpha":
		"color-mix(in srgb, oklch(0.1452 0.0021 286.13), transparent 88%)",
	"--color-soft": "oklch(0.9349 0.004 286.32)",
	"--color-soft-alpha":
		"color-mix(in srgb, oklch(0.1452 0.0021 286.13), transparent 92%)",

	// Background elevation
	"--color-elevation-negative": "oklch(0.9677 0.0027 286.35)",
	"--color-elevation-level1": "oklch(1 0 0)",
	"--color-elevation-level2": "oklch(1 0 0)",

	// Inverse
	"--color-white-inverse": "oklch(1 0 0)",
	"--color-black-inverse": "oklch(0.144 0.0028 247.09)",

	// Background fill alpha
	"--color-fill1-alpha":
		"color-mix(in srgb, oklch(0.1452 0.0021 286.13), transparent 98%)",
	"--color-fill2-alpha":
		"color-mix(in srgb, oklch(0.1452 0.0021 286.13), transparent 96%)",
	"--color-fill3-alpha":
		"color-mix(in srgb, oklch(0.1452 0.0021 286.13), transparent 92%)",
	"--color-fill4-alpha":
		"color-mix(in srgb, oklch(0.1452 0.0021 286.13), transparent 88%)",
} as CSSProperties

export const darkThemeVars = {
	...darkUtilityColorVars,

	// Primary
	"--color-primary": "oklch(0.528 0.2539 282.58)",
	"--color-primary-accent": "oklch(0.2294 0.0753 289.19)",
	"--color-primary-focus": "oklch(0.2538 0.1064 285.61)",
	"--color-primary-hover": "oklch(0.5768 0.2279 286.25)",
	"--color-primary-text": "oklch(0.7757 0.1162 292.43)",

	// Success
	"--color-success": "oklch(0.6334 0.171 148.65)",
	"--color-success-accent": "oklch(0.271 0.0537 151.74)",
	"--color-success-focus": "oklch(0.3887 0.0924 150.55)",
	"--color-success-hover": "oklch(0.6901 0.1748 149.64)",
	"--color-success-text": "oklch(0.871 0.1501 153.14)",

	// Error
	"--color-error": "oklch(0.64 0.22 26.04)",
	"--color-error-accent": "oklch(0.2567 0.0648 22.77)",
	"--color-error-focus": "oklch(0.2973 0.0922 24.71)",
	"--color-error-hover": "oklch(0.6786 0.2095 24.66)",
	"--color-error-text": "oklch(0.7884 0.1226 20.19)",

	// Warning
	"--color-warning": "oklch(0.8016 0.1705 73.27)",
	"--color-warning-accent": "oklch(0.2663 0.0372 84.34)",
	"--color-warning-focus": "oklch(0.3744 0.0636 81.14)",
	"--color-warning-hover": "oklch(0.8342 0.1594 79.51)",
	"--color-warning-text": "oklch(0.8776 0.1255 82.88)",

	// Information
	"--color-info": "oklch(0.6092 0.2041 255.8)",
	"--color-info-accent": "oklch(0.2739 0.0462 248.76)",
	"--color-info-focus": "oklch(0.3147 0.0668 250.78)",
	"--color-info-hover": "oklch(0.6722 0.1615 251.56)",
	"--color-info-text": "oklch(0.829 0.0811 248.83)",

	// Background
	"--color-bg": "oklch(0.144 0.0028 247.09)",
	"--color-fill1": "oklch(0.1652 0.0062 285.7)",
	"--color-fill2": "oklch(0.1881 0.006 285.81)",
	"--color-fill3": "oklch(0.2314 0.0078 274.6)",
	"--color-fill4": "oklch(0.2738 0.0093 276.77)",

	// Foreground
	"--color-fg": "oklch(1 0 0)",
	"--color-fg-secondary": "oklch(0.6619 0.0235 285.74)",
	"--color-fg-tertiary": "oklch(0.5553 0.0292 285.41)",
	"--color-fg-disabled": "oklch(0.4515 0.0243 285.39)",
	"--color-fg-inverse": "oklch(0.2314 0.0078 274.6)",

	// Border
	"--color-border": "oklch(0.2738 0.0093 276.77)",
	"--color-alpha": "color-mix(in srgb, oklch(1 0 0), transparent 88%)",
	"--color-soft": "oklch(0.2314 0.0078 274.6)",
	"--color-soft-alpha": "color-mix(in srgb, oklch(1 0 0), transparent 92%)",

	// Background elevation
	"--color-elevation-negative": "oklch(0 0 0)",
	"--color-elevation-level1": "oklch(0.1881 0.006 285.81)",
	"--color-elevation-level2": "oklch(0.2314 0.0078 274.6)",

	// Inverse
	"--color-white-inverse": "oklch(0.144 0.0028 247.09)",
	"--color-black-inverse": "oklch(1 0 0)",

	// Background fill alpha
	"--color-fill1-alpha": "color-mix(in srgb, oklch(1 0 0), transparent 98%)",
	"--color-fill2-alpha": "color-mix(in srgb, oklch(1 0 0), transparent 96%)",
	"--color-fill3-alpha": "color-mix(in srgb, oklch(1 0 0), transparent 92%)",
	"--color-fill4-alpha": "color-mix(in srgb, oklch(1 0 0), transparent 88%)",
} as CSSProperties
