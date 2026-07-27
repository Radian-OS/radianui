import { describe, expect, it } from "vitest"
import { spinner } from "@/utils/spinner"

describe("spinner", () => {
  it("creates an ora instance with the provided text", () => {
    const s = spinner("Loading components")
    expect(s).toBeDefined()
    expect(typeof s.start).toBe("function")
    expect(typeof s.stop).toBe("function")
    expect(typeof s.succeed).toBe("function")
    expect(typeof s.fail).toBe("function")
    expect(s.text).toContain("Loading components")
  })

  it("respects the silent option", () => {
    const s = spinner("quiet", { silent: true })
    expect(s.isSilent).toBe(true)
  })

  it("defaults to non-silent when no options are provided", () => {
    const s = spinner("noisy")
    expect(s.isSilent).toBe(false)
  })
})
