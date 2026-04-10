/**
 * Build Tailwind theme color entries from CSS variable definitions.
 * Converts cssVars like { "primary": "..." } to { "primary": "hsl(var(--primary))" }.
 */
export function buildTailwindThemeColorsFromCssVars(
	cssVars: Record<string, string>
) {
	const colors: Record<string, string> = {}

	for (const [key, value] of Object.entries(cssVars)) {
		if (key.startsWith("--")) {
			continue
		}
		colors[key] = `hsl(var(--${key}))`
	}

	return colors
}
