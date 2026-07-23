import { describe, expect, it } from "vitest"
import {
  COLORS,
  DEFAULT_BRAND_COLOR,
  DEFAULT_FONT,
  DEFAULT_FRAMEWORK,
  DEFAULT_PROJECT_NAME,
  FALLBACK_PACKAGE_MANAGER,
  FONTS,
  MAX_PROJECT_NAME_LENGTH,
} from "@/registry/constants"

describe("registry constants", () => {
  it("COLORS entries include a title, value, and hex code", () => {
    expect(COLORS.length).toBeGreaterThan(0)
    for (const c of COLORS) {
      expect(c.title).toBeTypeOf("string")
      expect(c.value).toBeTypeOf("string")
      expect(c.hex).toMatch(/^#[0-9A-Fa-f]{6}$/)
    }
  })

  it("FONTS entries include a title and value", () => {
    expect(FONTS.length).toBeGreaterThan(0)
    for (const f of FONTS) {
      expect(f.title).toBeTypeOf("string")
      expect(f.value).toBeTypeOf("string")
    }
  })

  it("the default brand color and font exist in their lists", () => {
    expect(COLORS.find((c) => c.value === DEFAULT_BRAND_COLOR)).toBeDefined()
    expect(FONTS.find((f) => f.value === DEFAULT_FONT)).toBeDefined()
  })

  it("DEFAULT_FRAMEWORK is next-app", () => {
    expect(DEFAULT_FRAMEWORK).toBe("next-app")
  })

  it("DEFAULT_PROJECT_NAME is within the allowed length", () => {
    expect(DEFAULT_PROJECT_NAME.length).toBeLessThanOrEqual(
      MAX_PROJECT_NAME_LENGTH
    )
  })

  it("FALLBACK_PACKAGE_MANAGER is npm", () => {
    expect(FALLBACK_PACKAGE_MANAGER).toBe("npm")
  })
})
