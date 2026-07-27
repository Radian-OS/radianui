import {
	AVATAR_BLEND_OPACITY,
	GRADIENT_MAP,
	SOLID_COLOR_MAP,
	getImageBackgroundTint,
	resolveRadianColor,
} from "@/constants/avatar-playground-utils"

/**
 * Renders the avatar + background tone onto an off-screen canvas and returns
 * the result as a PNG Blob.  Pure DOM helper — no React dependency.
 */
export const createCompositeBlob = async (
	tone: string,
	src: string,
	shouldApplyShadow: boolean
): Promise<Blob | null> => {
	const size = 512
	const canvas = document.createElement("canvas")
	canvas.width = size
	canvas.height = size
	const ctx = canvas.getContext("2d")
	if (!ctx) return null
	let backgroundImage: HTMLImageElement | null = null
	const imageBackgroundTint = getImageBackgroundTint(tone)

	if (SOLID_COLOR_MAP[tone]) {
		ctx.fillStyle = SOLID_COLOR_MAP[tone]
		ctx.fillRect(0, 0, size, size)
	} else if (GRADIENT_MAP[tone]) {
		const g = GRADIENT_MAP[tone]
		if (g.base) {
			ctx.fillStyle = g.base
			ctx.fillRect(0, 0, size, size)
			const grad = ctx.createLinearGradient(0, 0, 0, size)
			grad.addColorStop(0, g.overlayFrom || "rgba(255, 255, 255, 0)")
			grad.addColorStop(1, g.overlayTo || "rgba(36, 46, 66, 0.16)")
			ctx.fillStyle = grad
			ctx.fillRect(0, 0, size, size)
		} else if (g.from && g.to) {
			const grad = ctx.createLinearGradient(0, 0, size, size)
			grad.addColorStop(0, g.from)
			grad.addColorStop(1, g.to)
			ctx.fillStyle = grad
			ctx.fillRect(0, 0, size, size)
		}
	} else if (tone.startsWith("grad-custom:")) {
		const parts = tone.split(":")
		const grad = ctx.createLinearGradient(0, 0, size, size)
		grad.addColorStop(0, parts[1])
		grad.addColorStop(1, parts[2])
		ctx.fillStyle = grad
		ctx.fillRect(0, 0, size, size)
	} else if (tone.startsWith("radian:")) {
		const color = resolveRadianColor(tone)
		ctx.fillStyle = color
		ctx.fillRect(0, 0, size, size)
	} else if (tone.startsWith("#")) {
		ctx.fillStyle = tone
		ctx.fillRect(0, 0, size, size)
	} else if (tone.startsWith("http") || tone.startsWith("/")) {
		try {
			const bgImg = new window.Image()
			bgImg.crossOrigin = "anonymous"
			bgImg.src = tone
			await new Promise<void>((resolve, reject) => {
				bgImg.onload = () => resolve()
				bgImg.onerror = reject
			})
			backgroundImage = bgImg
			ctx.drawImage(bgImg, 0, 0, size, size)
		} catch {
			// Background image failed to load, continue with transparent bg
		}
	} else if (tone !== "none") {
		// Fallback: fill white so the "Image" copy format is never transparent
		ctx.fillStyle = "#FFFFFF"
		ctx.fillRect(0, 0, size, size)
	}

	try {
		const avatarImg = new window.Image()
		avatarImg.crossOrigin = "anonymous"
		avatarImg.src = src
		await new Promise<void>((resolve, reject) => {
			avatarImg.onload = () => resolve()
			avatarImg.onerror = reject
		})

		ctx.drawImage(avatarImg, 0, 0, size, size)

		// The avatar source is opaque, so the Color Burn fill must be composited
		// above it to affect the exported pixels.
		if (shouldApplyShadow) {
			ctx.save()
			ctx.globalAlpha = AVATAR_BLEND_OPACITY
			ctx.globalCompositeOperation = "color-burn"
			if (
				imageBackgroundTint ||
				SOLID_COLOR_MAP[tone] ||
				tone.startsWith("#") ||
				tone.startsWith("radian:")
			) {
				ctx.fillStyle =
					imageBackgroundTint ||
					SOLID_COLOR_MAP[tone] ||
					(tone.startsWith("radian:") ? resolveRadianColor(tone) : tone)
				ctx.fillRect(0, 0, size, size)
			} else if (GRADIENT_MAP[tone]) {
				const gradient = GRADIENT_MAP[tone]
				if (gradient.base) {
					ctx.fillStyle = gradient.base
					ctx.fillRect(0, 0, size, size)
					const sheen = ctx.createLinearGradient(0, 0, 0, size)
					sheen.addColorStop(
						0,
						gradient.overlayFrom || "rgba(255, 255, 255, 0)"
					)
					sheen.addColorStop(1, gradient.overlayTo || "rgba(36, 46, 66, 0.16)")
					ctx.fillStyle = sheen
					ctx.fillRect(0, 0, size, size)
				} else if (gradient.from && gradient.to) {
					const fill = ctx.createLinearGradient(0, 0, size, size)
					fill.addColorStop(0, gradient.from)
					fill.addColorStop(1, gradient.to)
					ctx.fillStyle = fill
					ctx.fillRect(0, 0, size, size)
				}
			} else if (tone.startsWith("grad-custom:")) {
				const [, from, to] = tone.split(":")
				const fill = ctx.createLinearGradient(0, 0, size, size)
				fill.addColorStop(0, from)
				fill.addColorStop(1, to)
				ctx.fillStyle = fill
				ctx.fillRect(0, 0, size, size)
			} else if (backgroundImage) {
				ctx.drawImage(backgroundImage, 0, 0, size, size)
			}
			ctx.restore()
		}
	} catch {
		return null
	}

	return new Promise((resolve) => canvas.toBlob(resolve, "image/png"))
}
