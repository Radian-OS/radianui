import type * as HarfBuzz from "harfbuzzjs"

const rgb = (color: HarfBuzz.Color) =>
	`rgb(${color.red},${color.green},${color.blue})`
const escape = (value: string) =>
	value
		.replaceAll("&", "&amp;")
		.replaceAll('"', "&quot;")
		.replaceAll("<", "&lt;")

/** Serialize COLRv1 paint callbacks as font-independent SVG paths and gradients. */
export function exportColrSvg(
	hb: typeof HarfBuzz,
	font: HarfBuzz.Font,
	character: string,
	name: string
) {
	const buffer = new hb.Buffer()
	buffer.addText(character)
	buffer.guessSegmentProperties()
	hb.shape(font, buffer)
	const glyphs = buffer.getGlyphInfos()
	const positions = buffer.getGlyphPositions()
	if (!glyphs.length || glyphs.some((glyph) => glyph.codepoint === 0))
		throw new Error("This emoji is not supported by the vector font")
	const defs: string[] = [],
		output: string[] = []
	let serial = 0
	const id = () => `emoji-${++serial}`
	const paint = new hb.PaintFuncs()
	const open = (attributes = "") => output.push(`<g ${attributes}>`)
	const close = () => output.push("</g>")
	const fill = (value: string, opacity = 1) =>
		output.push(
			`<rect x="-16384" y="-16384" width="32768" height="32768" fill="${value}" opacity="${opacity}"/>`
		)
	const spread = (line: HarfBuzz.ColorLine) =>
		["pad", "repeat", "reflect"][line.extend]
	const stops = (line: HarfBuzz.ColorLine) =>
		[...line.colorStops]
			.sort((a, b) => a.offset - b.offset)
			.map(
				(stop) =>
					`<stop offset="${stop.offset}" stop-color="${rgb(stop.color)}" stop-opacity="${stop.color.alpha / 255}"/>`
			)
			.join("")
	const clip = (shape: string) => {
		const key = id()
		defs.push(
			`<clipPath id="${key}" clipPathUnits="userSpaceOnUse">${shape}</clipPath>`
		)
		open(`clip-path="url(#${key})"`)
	}
	paint.setPushTransformFunc((xx, yx, xy, yy, dx, dy) =>
		open(`transform="matrix(${xx} ${yx} ${xy} ${yy} ${dx} ${dy})"`)
	)
	paint.setPopTransformFunc(close)
	paint.setPushClipGlyphFunc((glyph, glyphFont) =>
		clip(`<path d="${glyphFont.glyphToPath(glyph)}"/>`)
	)
	paint.setPushClipRectangleFunc((xmin, ymin, xmax, ymax) =>
		clip(
			`<rect x="${xmin}" y="${ymin}" width="${xmax - xmin}" height="${ymax - ymin}"/>`
		)
	)
	paint.setPopClipFunc(close)
	paint.setColorFunc((_foreground, color) =>
		fill(rgb(color), color.alpha / 255)
	)
	paint.setLinearGradientFunc((line, x0, y0, x1, y1, x2, y2) => {
		// COLR's third point defines the skew of the gradient's constant-color lines.
		const nx = -(y2 - y0),
			ny = x2 - x0,
			denominator = nx * nx + ny * ny
		if (denominator) {
			const factor = ((x1 - x0) * nx + (y1 - y0) * ny) / denominator
			x1 = x0 + nx * factor
			y1 = y0 + ny * factor
		}
		const key = id()
		defs.push(
			`<linearGradient id="${key}" gradientUnits="userSpaceOnUse" x1="${x0}" y1="${y0}" x2="${x1}" y2="${y1}" spreadMethod="${spread(line)}">${stops(line)}</linearGradient>`
		)
		fill(`url(#${key})`)
	})
	paint.setRadialGradientFunc((line, x0, y0, r0, x1, y1, r1) => {
		const key = id()
		defs.push(
			`<radialGradient id="${key}" gradientUnits="userSpaceOnUse" cx="${x1}" cy="${y1}" r="${r1}" fx="${x0}" fy="${y0}" fr="${r0}" spreadMethod="${spread(line)}">${stops(line)}</radialGradient>`
		)
		fill(`url(#${key})`)
	})
	let unsupported = false
	paint.setSweepGradientFunc(() => {
		unsupported = true
	})
	paint.setImageFunc(() => {
		unsupported = true
		return false
	})
	const groupStarts: number[] = []
	paint.setPushGroupFunc(() => {
		groupStarts.push(output.length)
		open()
	})
	paint.setPopGroupFunc((mode) => {
		const start = groupStarts.pop()!
		close()
		if (mode === hb.PaintCompositeMode.SRC_IN) {
			const source = output.splice(start).join("")
			const parentStart = groupStarts.at(-1)
			if (parentStart === undefined) {
				unsupported = true
				return
			}
			const backdrop = output.splice(parentStart + 1).join("")
			const key = id()
			defs.push(
				`<mask id="${key}" maskUnits="userSpaceOnUse" x="-16384" y="-16384" width="32768" height="32768" mask-type="alpha" style="mask-type:alpha">${backdrop}</mask>`
			)
			output.push(`<g mask="url(#${key})">${source}</g>`)
		} else if (mode === hb.PaintCompositeMode.SOFT_LIGHT) {
			output[start] = '<g style="mix-blend-mode:soft-light">'
		} else if (mode !== hb.PaintCompositeMode.SRC_OVER) {
			unsupported = true
		}
	})
	paint.setColorGlyphFunc((glyph, glyphFont) =>
		glyphFont.paintGlyphOrFail(glyph, paint)
	)
	let penX = 0,
		penY = 0,
		minX = Infinity,
		minY = Infinity,
		maxX = -Infinity,
		maxY = -Infinity
	glyphs.forEach((glyph, index) => {
		const position = positions[index]
		const x = penX + position.xOffset,
			y = penY + position.yOffset
		const bounds = font.glyphExtents(glyph.codepoint)
		if (!bounds) throw new Error("Could not measure vector emoji")
		minX = Math.min(minX, x + bounds.xBearing)
		maxX = Math.max(maxX, x + bounds.xBearing + bounds.width)
		maxY = Math.max(maxY, y + bounds.yBearing)
		minY = Math.min(minY, y + bounds.yBearing + bounds.height)
		open(`transform="translate(${x} ${y})"`)
		if (!font.paintGlyphOrFail(glyph.codepoint, paint))
			throw new Error("No vector color glyph available")
		close()
		penX += position.xAdvance
		penY += position.yAdvance
	})
	if (unsupported)
		throw new Error("This emoji uses color effects not supported by SVG export")
	const width = maxX - minX,
		height = maxY - minY,
		scale = 400 / Math.max(width, height)
	const tx = (512 - width * scale) / 2 - minX * scale,
		ty = (512 - height * scale) / 2 + maxY * scale
	return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><title>${escape(name)}</title><defs>${defs.join("")}</defs><g transform="translate(${tx} ${ty}) scale(${scale} ${-scale})">${output.join("")}</g></svg>`
}
