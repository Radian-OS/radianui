export function srgbToLinear(c: number) {
	return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
}

export function linearToSrgb(c: number) {
	return c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055
}

export function hexToRgb(hex: string) {
	hex = hex.replace("#", "")
	if (hex.length === 3)
		hex = hex
			.split("")
			.map((c) => c + c)
			.join("")
	const n = parseInt(hex, 16)
	return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

export function rgbToOklab([r, g, b]: number[]) {
	r = srgbToLinear(r)
	g = srgbToLinear(g)
	b = srgbToLinear(b)
	const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b
	const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b
	const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b
	const l_ = Math.cbrt(l)
	const m_ = Math.cbrt(m)
	const s_ = Math.cbrt(s)
	return [
		0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_,
		1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_,
		0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_,
	]
}

export function oklabToLinearRgb([L, a, b]: number[]) {
	const l_ = L + 0.3963377774 * a + 0.2158037573 * b
	const m_ = L - 0.1055613458 * a - 0.0638541728 * b
	const s_ = L - 0.0894841775 * a - 1.291485548 * b
	const l = l_ ** 3
	const m = m_ ** 3
	const s = s_ ** 3
	return [
		4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
		-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
		-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
	]
}

export function oklabToRgb(lab: number[]) {
	const [r, g, b] = oklabToLinearRgb(lab)
	return [linearToSrgb(r), linearToSrgb(g), linearToSrgb(b)]
}

export function toOklch([L, a, b]: number[]) {
	const C = Math.hypot(a, b)
	let H = (Math.atan2(b, a) * 180) / Math.PI
	if (H < 0) H += 360
	return [L, C, H]
}

export function fromOklch([L, C, H]: number[]) {
	const hr = (H * Math.PI) / 180
	return [L, C * Math.cos(hr), C * Math.sin(hr)]
}

export function inGamut(rgb: number[]) {
	return rgb.every((v) => v >= -0.001 && v <= 1.001)
}

export function fitChroma(L: number, C: number, H: number) {
	let c = C
	for (let i = 0; i < 24; i++) {
		const rgb = oklabToRgb(fromOklch([L, c, H]))
		if (inGamut(rgb)) return c
		c *= 0.92
	}
	return c
}

export function relLuminance(L: number, C: number, H: number) {
	const [r, g, b] = oklabToLinearRgb(fromOklch([L, C, H]))
	const c = (v: number) => Math.min(1, Math.max(0, v))
	return 0.2126 * c(r) + 0.7152 * c(g) + 0.0722 * c(b)
}

export function contrastVsWhite(L: number, C: number, H: number) {
	return 1.05 / (relLuminance(L, C, H) + 0.05)
}

const TEXT_CONTRAST_TARGET = 5.2

export function textShade(L: number, C: number, H: number) {
	const baseC = fitChroma(L, C, H)
	if (contrastVsWhite(L, baseC, H) >= TEXT_CONTRAST_TARGET) {
		return { l: L, c: baseC }
	}
	let lo = 0
	let hi = L
	for (let i = 0; i < 40; i++) {
		const mid = (lo + hi) / 2
		const c = fitChroma(mid, C, H)
		if (contrastVsWhite(mid, c, H) > TEXT_CONTRAST_TARGET) lo = mid
		else hi = mid
	}
	const l = (lo + hi) / 2
	const frac = (L - l) / L
	return { l, c: fitChroma(l, C * (1 - frac), H) }
}

const ROLE_T = { hover: 0.12, border: 0.24, focus: 0.81, accent: 0.9 }

export function formatOklch(L: number, C: number, H: number) {
	return `oklch(${L.toFixed(4)} ${C.toFixed(4)} ${H.toFixed(2)})`
}

export function generateCustomColorShades(
	hex: string,
	prefix: string = "primary"
) {
	const [L, C, H] = toOklch(rgbToOklab(hexToRgb(hex)))
	const text = textShade(L, C, H)

	// Calculate primary, avoiding out of gamut colors
	const primaryC = fitChroma(L, C, H)

	// Generate FG color. If luminance is > 0.45, use dark text (#111), else white (#fff).
	// We'll return it as an oklch value for consistency.
	const luminance = relLuminance(L, primaryC, H)
	const isLight = luminance > 0.45
	// #111 = approx oklch(0.2 0 0)
	// #fff = approx oklch(1 0 0)
	const fg = isLight ? "oklch(0.2 0 0)" : "oklch(1 0 0)"

	const shades = {
		[`--color-${prefix}`]: formatOklch(L, primaryC, H),
		[`--color-${prefix}-fg`]: fg,
		[`--color-${prefix}-text`]: formatOklch(text.l, text.c, H),
	} as Record<string, string>

	for (const [label, t] of Object.entries(ROLE_T)) {
		const l = L + t * (1 - L)
		const c = C * (1 - t)
		const fittedC = fitChroma(l, c, H)
		shades[`--color-${prefix}-${label}`] = formatOklch(l, fittedC, H)
	}

	return shades
}
