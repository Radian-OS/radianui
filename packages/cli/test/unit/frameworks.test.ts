import { describe, expect, it } from "vitest"
import { FRAMEWORKS } from "@/utils/frameworks"

describe("FRAMEWORKS registry", () => {
  it("exposes next-app, vite, and manual entries", () => {
    expect(FRAMEWORKS["next-app"].name).toBe("next-app")
    expect(FRAMEWORKS["vite"].name).toBe("vite")
    expect(FRAMEWORKS["manual"].name).toBe("manual")
  })

  it("each framework provides installation and tailwind links", () => {
    for (const key of Object.keys(FRAMEWORKS) as Array<
      keyof typeof FRAMEWORKS
    >) {
      const f = FRAMEWORKS[key]
      expect(f.label.length).toBeGreaterThan(0)
      expect(f.link.installation).toMatch(/^https?:\/\//)
      expect(f.link.tailwind).toMatch(/^https?:\/\//)
    }
  })
})
