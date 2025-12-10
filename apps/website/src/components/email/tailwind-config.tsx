import { Tailwind } from "@react-email/components"

export function TailwindConfig({ children }: { children: React.ReactNode }) {
	return (
		<Tailwind
			config={{
				theme: {
					extend: {
						colors: {
							primary: "oklch(0.528 0.2539 282.58)",
							"primary-accent": "oklch(0.94 0.0271 295.05)",
							"primary-focus": "oklch(0.9169 0.0383 295.46)",
							"primary-border": "oklch(0.6784 0.1708 290.38)",
							"primary-hover": "oklch(0.5768 0.2279 286.25)",
							"primary-text": "oklch(0.528 0.2539 282.58)",
							success: "oklch(0.6334 0.171 148.65)",
							"success-accent": "oklch(0.9685 0.0336 157.66)",
							"success-focus": "oklch(0.9489 0.0556 156.34)",
							"success-border": "oklch(0.7761 0.2117 148.55)",
							"success-hover": "oklch(0.6901 0.1748 149.64)",
							"success-text": "oklch(0.5388 0.1339 149.74)",
							error: "oklch(0.64 0.22 26.04)",
							"error-accent": "oklch(0.9465 0.0252 17.61)",
							"error-focus": "oklch(0.9133 0.0414 17.93)",
							"error-border": "oklch(0.719 0.1751 22.5)",
							"error-hover": "oklch(0.6786 0.2095 24.66)",
							"error-text": "oklch(0.5716 0.2125 27.27)",
							warning: "oklch(0.8016 0.1705 73.27)",
							"warning-accent": "oklch(0.9622 0.0384 83.83)",
							"warning-focus": "oklch(0.946 0.0574 85.03)",
							"warning-border": "oklch(0.7318 0.1522 75.09)",
							"warning-hover": "oklch(0.8342 0.1594 79.51)",
							"warning-text": "oklch(0.5461 0.1088 77.73)",
							info: "oklch(0.6092 0.2041 255.8)",
							"info-accent": "oklch(0.949 0.0213 245.85)",
							"info-focus": "oklch(0.9135 0.0358 249.52)",
							"info-border": "oklch(0.829 0.0811 248.83)",
							"info-hover": "oklch(0.6722 0.1615 251.56)",
							"info-text": "oklch(0.6092 0.2041 255.8)",
							bg: "oklch(1 0 0)",
							fill1: "oklch(0.9824 0.0013 286.38)",
							fill2: "oklch(0.9677 0.0027 286.35)",
							fill3: "oklch(0.9349 0.004 286.32)",
							fill4: "oklch(0.902 0.0068 286.26)",
							fg: "oklch(0.2314 0.0078 274.6)",
							"fg-secondary": "oklch(0.4515 0.0243 285.39)",
							"fg-tertiary": "oklch(0.6261 0.0268 285.6)",
							"fg-disabled": "oklch(0.7325 0.0186 285.93)",
							"fg-inverse": "oklch(1 0 0)",
							border: "oklch(0.902 0.0068 286.26)",
							alpha: "color-mix(in srgb, oklch(0.1452 0.0021 286.13), transparent 88%)",
							soft: "oklch(0.9349 0.004 286.32)",
							"soft-alpha": "color-mix(in srgb, oklch(0.1452 0.0021 286.13), transparent 92%)",
							"elevation-negative": "oklch(0.9677 0.0027 286.35)",
							"elevation-level1": "oklch(1 0 0)",
							"elevation-level2": "oklch(1 0 0)",
							"white-inverse": "oklch(1 0 0)",
							"black-inverse": "oklch(0.144 0.0028 247.09)",
							"fill1-alpha": "color-mix(in srgb, oklch(0.1452 0.0021 286.13), transparent 98%)",
							"fill2-alpha": "color-mix(in srgb, oklch(0.1452 0.0021 286.13), transparent 96%)",
							"fill3-alpha": "color-mix(in srgb, oklch(0.1452 0.0021 286.13), transparent 92%)",
							"fill4-alpha": "color-mix(in srgb, oklch(0.1452 0.0021 286.13), transparent 88%)",
						},
					},
				},
			}}>
			{children}
		</Tailwind>
	)
}
