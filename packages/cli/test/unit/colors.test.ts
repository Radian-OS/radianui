import { describe, expect, it } from "vitest"
import { bg, txt } from "@/utils/colors"

describe("colors > txt", () => {
  it("exposes chalk helpers for each semantic role", () => {
    const roles = [
      "error",
      "success",
      "warning",
      "info",
      "dark",
      "light",
      "deprecated",
      "magenta",
      "cyan",
      "bold",
      "italic",
      "underline",
      "strikethrough",
    ] as const

    for (const role of roles) {
      expect(typeof txt[role]).toBe("function")
    }
  })

  it("returns a string that contains the original input", () => {
    expect(txt.error("boom")).toContain("boom")
    expect(txt.success("ok")).toContain("ok")
    expect(txt.bold("strong")).toContain("strong")
  })
})

describe("colors > bg", () => {
  it("exposes chalk helpers for background colors", () => {
    const roles = [
      "error",
      "success",
      "warning",
      "info",
      "dark",
      "light",
      "magenta",
      "cyan",
    ] as const

    for (const role of roles) {
      expect(typeof bg[role]).toBe("function")
      expect(bg[role]("bg")).toContain("bg")
    }
  })
})
