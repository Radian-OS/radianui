import { describe, expect, it } from "vitest"
import postcss from "postcss"
import { ensureEmojiCss } from "../../src/utils/ensureEmojiCss"

describe("shared emoji CSS", () => {
	it("adds font support while preserving themes and charset ordering", () => {
		const result = ensureEmojiCss(
			'@charset "UTF-8";\n@import "tailwindcss";\n@theme { --color-primary: red; }'
		)
		const root = postcss.parse(result)
		expect(root.first?.type).toBe("atrule")
		expect((root.first as postcss.AtRule).name).toBe("charset")
		expect(result).toContain("--color-primary: red")
		expect(result).toContain('"noto-color-emoji-flags"')
		expect(result).toContain("@utility font-emoji")
		expect(result).toContain("var(--font-body, sans-serif)")
	})
	it("preserves existing emoji utility overrides and is idempotent", () => {
		const source =
			'@import "noto-color-emoji-flags";\n@utility font-emoji { font-family: CustomEmoji; }'
		expect(ensureEmojiCss(source)).toBe(source)
		const partial = "@utility font-emoji { font-family: CustomEmoji; }"
		const result = ensureEmojiCss(partial)
		expect(result).toContain("CustomEmoji")
		expect(ensureEmojiCss(result)).toBe(result)
	})
})
