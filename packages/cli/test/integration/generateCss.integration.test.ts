import { describe, expect, it } from "vitest"
import type { Preset } from "@/registry/schema"
import { generateThemeCss } from "@/utils/generateCss"

const preset: Preset = {
  id: "test",
  name: "Test Preset",
  config: {
    name: "Test Preset",
    cssVars: {
      light: { primary: "#000000", bg: "#ffffff" },
      dark: { primary: "#ffffff", bg: "#000000" },
      theme: { "--radius": "0.5rem" },
    },
    css: {
      "@import 'tailwindcss'": {},
      "@layer base": ":root { color-scheme: light dark; }",
    },
    dependencies: [],
    registryDependencies: [],
    config: { iconLibrary: "lucide", template: "next" },
  },
}

describe("integration > generateThemeCss", () => {
  it("emits the @theme block with color vars", () => {
    const css = generateThemeCss(preset)
    expect(css).toContain("@theme {")
    expect(css).toContain("--color-primary: #000000;")
    expect(css).toContain("--color-bg: #ffffff;")
  })

  it("emits the dark-mode selector with inverted vars", () => {
    const css = generateThemeCss(preset)
    expect(css).toContain(".dark {")
    expect(css).toMatch(/\.dark\s*\{[\s\S]*--color-primary:\s*#ffffff;/)
  })

  it("places at-rules before @theme", () => {
    const css = generateThemeCss(preset)
    const importIdx = css.indexOf("@import")
    const themeIdx = css.indexOf("@theme")
    expect(importIdx).toBeGreaterThan(-1)
    expect(themeIdx).toBeGreaterThan(-1)
    expect(importIdx).toBeLessThan(themeIdx)
  })

  it("includes theme variables when present", () => {
    const css = generateThemeCss(preset)
    expect(css).toContain("--radius: 0.5rem")
  })

  it("accepts a custom dark selector", () => {
    const css = generateThemeCss(preset, { darkSelector: "[data-theme=dark]" })
    expect(css).toContain("[data-theme=dark] {")
  })
})
